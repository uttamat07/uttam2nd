package com.ibm.ciolab.persistence.framework;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

/**
 * This class represents a transaction for an SQL database. Use
 * {@link #configure(String)} to obtain to configure the transaction object for
 * given database name. Then use {@link #configure(String)} to get an instance
 * for use in a DAO or transaction service object. The specific instance
 * returned depends on the properties file configuration. It provides methods to
 * start a transaction, get the current connection for a transaction, commit a
 * transaction, and roll back a transaction. Transactions are assigned per
 * thread so that this class can behave according to the rules of EJB or
 * Springframework declarative transactions. A typical use case for this class
 * is as follows: 1) A method registers itself as owning a transaction using
 * start(String transactionOwner). This method does nothing if there is already
 * a transaction in process for the current thread. 2) A DAO class obtains the
 * connection associated with the current transaction from the
 * currentTransactionForThread instance variable and issues some SQL statements.
 * The currentTransactionForThread field uses thread local storage. 3) The
 * method that started the transaction commits the transaction using the commit
 * method here. 4)The owner of the transaction then ends the transaction to
 * clean up resources(e.g. Return the database connection to the connection pool
 * and destroying the threadLocal to prevent memory leaks.
 * 
 * 
 * This class contains an internal CurrentConnection object which contains the
 * database connection and the transaction owner. This mechanism allows methods
 * to behave as per the "REQUIRED" EJB transaction attribute.
 * 
 * <p>
 * 
 * From the EJB Documentation: Required Attribute - If the client is running
 * within a transaction and invokes the enterprise bean's method, the method
 * executes within the clien's transaction. If the client is not associated with
 * a transaction, the container starts a new transaction before running the
 * method.
 * 
 * <p>
 * 
 * In Addition, this class requires a properties file named 'dao.properties' in
 * the classpath with each of the following properties:
 * 
 * <pre>
 * name.url *
 * name.driver
 * name.username
 * name.password
 * </pre>
 * 
 * Those marked with * are required, others are optional and can be left away or
 * empty. Only the username is required when any password is specified.
 * <ul>
 * <li>The 'name' must represent the database name in
 * {@link #getInstance(String)}.</li>
 * <li>The 'name.url' must represent either the JDBC URL or JNDI name of the
 * database.</li>
 * <li>The 'name.driver' must represent the full qualified class name of the
 * JDBC driver.</li>
 * <li>The 'name.username' must represent the username of the database login.</li>
 * <li>The 'name.password' must represent the password of the database login.</li>
 * </ul>
 * If you specify the driver property, then the url property will be assumed as
 * JDBC URL. If you omit the driver property, then the url property will be
 * assumed as JNDI name. When using JNDI with username/password preconfigured,
 * you can omit the username and password properties as well.
 * <p
 * Here are basic examples of valid properties for a database with the name
 * 'javabase':
 * 
 * <pre>
 * javabase.jdbc.url = jdbc:mysql://localhost:3306/javabase
 * javabase.jdbc.driver = com.mysql.jdbc.Driver
 * javabase.jdbc.username = java
 * javabase.jdbc.password = d$7hF_r!9Y
 * </pre>
 * 
 * <pre>
 * javabase.jndi.url = java:comp/env/jdbc/myds
 * </pre>
 * 
 * Here is a basic use example:
 * 
 * <pre>
 * DAOFactory javabase = DAOFactory.getInstance(&quot;javabase.jdbc&quot;);
 * UserDAO userDAO = javabase.getUserDAO();
 * </pre>
 * 
 * @author Mike Long
 */

public abstract class Transaction {

	private static final Logger logger = Logger.getLogger(Transaction.class);

	// Constants
	// ----------------------------------------------------------------------------------

	/**
	 * This map is a collection of configured Transaction objects registered by
	 * name via the Transaction.configure method.
	 */
	private static Map<String, Transaction> transactions = new HashMap<String, Transaction>();

	private static final String PROPERTY_URL = "url";
	private static final String PROPERTY_DRIVER = "driver";
	private static final String PROPERTY_USERNAME = "username";
	private static final String PROPERTY_PASSWORD = "password";

	private static DAOProperties properties;

	private static final ThreadLocal<CurrentTransaction> threadLocal = new ThreadLocal<CurrentTransaction>();

	// Actions
	// ------------------------------------------------------------------------------------

	/**
	 * Creates a new Transaction object for the given database name and adds it
	 * to the list of Transaction instances available with getInstance. If a
	 * transaction already exists for the given database name it does not
	 * replace it.
	 * 
	 * @param connectionName
	 *            The database name to configure a new Transaction instance for.
	 * @throws DAOConfigurationException
	 *             If the database name is null, or if the properties file is
	 *             missing in the classpath or cannot be loaded, or if a
	 *             required property is missing in the properties file, or if
	 *             either the driver cannot be loaded or the datasource cannot
	 *             be found.
	 * 
	 * @see Transaction.getInstance(String connectionName);
	 * @see Transaction.getInstance();
	 * 
	 */
	public static synchronized void configure(String connectionName)
			throws DAOConfigurationException {
		if (connectionName == null) {
			throw new DAOConfigurationException("Database name is null.");
		}
		if (transactions.containsKey(connectionName))
			return;

		Transaction namedTransaction;
		properties = new DAOProperties(connectionName);
		String url = properties.getProperty(PROPERTY_URL, true);
		String driverClassName = properties.getProperty(PROPERTY_DRIVER, false);
		String password = properties.getProperty(PROPERTY_PASSWORD, false);
		String username = properties.getProperty(PROPERTY_USERNAME,
				password != null);

		// If driver is specified, then load it to let it register itself with
		// DriverManager.
		if (driverClassName != null) {
			try {
				Class.forName(driverClassName);
			} catch (ClassNotFoundException e) {
				throw new DAOConfigurationException("Driver class '"
						+ driverClassName + "' is missing in classpath.", e);
			}
			namedTransaction = new DriverManagerTransaction(url, username,
					password);
		}

		// Else assume URL as DataSource URL and lookup it in the JNDI.
		else {
			DataSource dataSource;
			try {
				dataSource = (DataSource) new InitialContext().lookup(url);
			} catch (NamingException e) {
				throw new DAOConfigurationException("DataSource '" + url
						+ "' is missing in JNDI.", e);
			}
			if (username != null) {
				namedTransaction = new DataSourceWithLoginTransaction(
						dataSource, username, password);
			} else {
				namedTransaction = new DataSourceTransaction(dataSource);
			}
		}
		transactions.put(connectionName, namedTransaction);

	}

	/**
	 * This method returns the default configured Transaction instance. This
	 * mechanism is not meant to support distributed transactions. It merely
	 * allows different named database connections for a given application.
	 * 
	 * 
	 * @return the current default(there can only be one) transaction instance.
	 * @throws IllegalStateException
	 *             if more than one transaction has been configured. You must
	 *             use the overloaded version of getInstance(String name) if you
	 *             have transactions to more than one database.
	 * 
	 * @see Transaction.configure(String connectionName);
	 */
	public static Transaction getInstance() {
		if (transactions.size() == 0) {
			throw new IllegalStateException(
					"You must first configure the transaction with database connection information.");
		}
		if (transactions.size() > 1) {
			throw new IllegalStateException(
					"More than one transaction has been configured via Transaction.configure. Please use the overloaded version of this method which takes a connectionName parameter.");
		}
		return transactions.values().iterator().next();// Get the first and only
														// Transaction object in
														// the map.
	}

	/**
	 * This method returns the Transaction instance configured with the given
	 * connectionName. This mechanism is not meant to support distributed
	 * transactions. It merely allows different named database connections for a
	 * given application.
	 * 
	 * @param connectionName
	 *            The database name to return a new Transaction instance for.
	 * @return the Transaction with the given name.
	 * @throws IllegalStateException
	 *             if more than one transaction has been configured. You must
	 *             use the overloaded version of getInstance(String name) if you
	 *             have transactions to more than one database.
	 * 
	 * @see Transaction.configure(String connectionName);
	 */
	public static Transaction getInstance(String connectionName) {
		if (transactions.size() == 0) {
			throw new IllegalArgumentException(
					"You must first configure the transaction with database connection information.");
		}
		if (connectionName == null) {
			return Transaction.getInstance();
		}
		if (!transactions.containsKey(connectionName)) {
			throw new IllegalArgumentException("No database named["
					+ connectionName
					+ "] has been configured on the Transaction object.");
		}
		return transactions.get(connectionName);
	}

	/**
	 * This method returns the DAOProperties object initialized with the
	 * configuration of this Transaction instance.
	 * 
	 * @return the DAOProperties object.
	 * @throws IllegalStateException
	 *             if this instance of Transaction has not yet been configured.
	 */
	public static DAOProperties getDAOProperties() throws Exception {
		if (properties == null) {
			throw new IllegalStateException(
					"DAOProperties has not been initialized: you must first configure the transaction with database connection information.");
		}
		return properties;
	}

	/**
	 * Returns a connection to the database. Package private so that it can be
	 * used inside the DAO package only.
	 * 
	 * @return A connection to the database.
	 * @throws SQLException
	 *             If acquiring the connection fails.
	 */
	/**
	 * Close the Connection.
	 * 
	 * @param connection
	 *            The Connection to be closed quietly.
	 * @throws SQLException
	 */
	private void close(Connection connection) throws SQLException {
		if (connection != null) {
			connection.close();
		}
	}

	/**
	 * Returns a connection to the database.
	 * 
	 * @return A connection to the database.
	 * @throws SQLException
	 *             If acquiring the connection fails.
	 */
	protected abstract Connection getConnection() throws SQLException;

	/**
	 * This method gets the connection associated with a transaction.
	 */
	public final Connection getConnectionForTransaction() {
		CurrentTransaction current = (CurrentTransaction) threadLocal.get();
		if (current != null && current.connection != null) {
			logger.debug(current.connection.hashCode());
			return current.connection;
		} else {
			throw new IllegalStateException(
					"Either the currentTransaction is null or it does not have a database connection.");
		}
	}

	/**
	 * This method commits the transaction if the currentMethodName owns the
	 * transaction. Otherwise it does nothing.
	 * 
	 * @param currentMethodName
	 *            - An identifier uniquely naming the method.
	 * @throws SQLException
	 */
	public void commit(String currentMethodName) throws SQLException {
		if (StringUtils.isEmpty(currentMethodName)) {
			throw new IllegalArgumentException(
					"The currentMethodName cannot be null or empty.");
		}
		CurrentTransaction current = (CurrentTransaction) threadLocal.get();
		if (currentMethodName.equals(current.transactionOwner)) {
			logger.debug("committing transaction for connection:"
					+ current.connection.hashCode());
			current.connection.commit();
		} else {
			logger.debug("Not committing transaction for connection because this method is not the owner.");
		}
	}

	/**
	 * This method rolls back the transaction if the currentMethodName owns the
	 * transaction. Otherwise it marks it for rollback by the owning method
	 * name.
	 * 
	 * @param currentMethodName
	 *            - An identifier uniquely naming the method.
	 * @throws SQLException
	 */
	public void rollback(String currentMethodName) throws SQLException {
		if (StringUtils.isEmpty(currentMethodName)) {
			throw new IllegalArgumentException(
					"The currentMethodName cannot be null or empty.");
		}
		CurrentTransaction current = (CurrentTransaction) threadLocal.get();
		if (currentMethodName.equals(current.transactionOwner)) {
			logger.debug("rolling back transaction for connection:"
					+ current.connection.hashCode());
			current.connection.rollback();
		} else {
			logger.debug("Not rolling back transaction for connection because this method is not the owner.");
		}
	}

	/**
	 * This method creates a new connection for the thread and stores it in
	 * thread local storage for use by other methods in the current thread. If a
	 * transaction has already been started for the thread it does nothing.
	 * 
	 * @param currentMethodName
	 *            - An identifier uniquely naming the method.
	 * @throws SQLException
	 */
	public void start(String currentMethodName) throws SQLException {
		if (threadLocal.get() == null) {
			logger.debug("starting transaction" );
			CurrentTransaction currentTransaction = new CurrentTransaction(
					currentMethodName);
			threadLocal.set(currentTransaction);
		}
	}

	/**
	 * This method ends the transaction for the thread if the transaction name
	 * (usually the method name with some UID appended to allow recursive calls)
	 * matches the currentMethodName. Otherwise it does nothing.
	 * 
	 * For the former it currently returns the connection to the pool or closes
	 * it.
	 * 
	 * @param currentMethodName
	 *            - An identifier uniquely naming the method.
	 * @throws SQLException
	 */
	public void end(String currentMethodName) throws SQLException {
		if (StringUtils.isEmpty(currentMethodName)) {
			throw new IllegalArgumentException(
					"The currentMethodName cannot be null or empty.");
		}
		CurrentTransaction current = (CurrentTransaction) threadLocal.get();
		if (currentMethodName.equals(current.transactionOwner)) {
			logger.debug("Ending transaction.");
			this.close(current.connection);
			threadLocal.remove();
		} else {
			logger.debug("Not ending transaction because this method is not the owner.");
		}
	}

	private class CurrentTransaction {

		String transactionOwner;
		Connection connection;

		public CurrentTransaction(String transactionOwner) throws SQLException {
			if (StringUtils.isEmpty(transactionOwner)) {
				throw new IllegalArgumentException(
						"The transactionOwner cannot be null or empty.");
			}
			this.transactionOwner = transactionOwner;
			this.connection = Transaction.this.getConnection();
			this.connection.setAutoCommit(false);
		}

	}
}
