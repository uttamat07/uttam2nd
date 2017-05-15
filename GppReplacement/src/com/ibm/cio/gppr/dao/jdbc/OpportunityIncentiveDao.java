package com.ibm.cio.gppr.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ibm.ciolab.persistence.framework.DAOException;
import com.ibm.ciolab.persistence.framework.GridCapableEntity;
import com.ibm.ciolab.persistence.framework.Transaction;
import com.ibm.ciolab.persistence.framework.dao.CrudDao;
import com.ibm.ciolab.staticforms.dealreg.entities.BlockedAccount;
import com.ibm.cio.gppr.dao.IOpportunityIncentiveDao;
import com.ibm.cio.gppr.entities.OpportunityIncentive;

/**
 * This class represents a SQL Database Access Object for the OpportunityIncentive
 * Value Object. This DAO should be used as a central point for the mapping
 * between the OpportunityIncentive Value Object (the entities package) and its
 * SQL database table name. To add additional query methods add an SQL string as
 * below and use that string in the context of another finder method as per the
 * following example: <code>
 * 	private static final String SQL_FIND_BY_ROLENAME = "SELECT role_id, role_name, created_ts, created_by, updated_ts, updated_by, 1 as persistent FROM deal.role WHERE role_name = ?";
 * </code>
 * 
 * 
 * <code>
 *  Returns the Role from the database matching the given roleName, otherwise
 * 	null.
 * </code>
 * 
 * <code>
 * 
 * @param roleName
 *            The roleName of the role to be returned.
 * @return The Role from the database matching the given roleName, otherwise
 *         null.
 * @throws Exception
 *             If something fails at database level.
 * 
 *             public Role findByName(String roleName) throws Exception { return
 *             find(SQL_FIND_BY_ROLENAME, roleName); } </code>
 * 
 *             Copyright � 2012 IBM Corporation. All Rights Reserved.
 * 
 *             Change Log:
 * 
 *             Date Change Flag Author Descriptions of Changes April 3, 2012
 *             CREATE Mike Long Initial Creation
 */
public final class OpportunityIncentiveDao extends CrudDao implements
		IOpportunityIncentiveDao {

	/**
	 * No arg constructor for OpportunityIncentive
	 */
	public OpportunityIncentiveDao() {
	}
	
	/**
	 * SQL for inserting a row.
	 */
	protected String getSQL_INSERT() {
		return " insert into GPPR.OPPORTUNITY_INCENTIVE (ID,NAME, DESCRIPTION,STATUS_CODE,START_DATE,END_DATE,EXPIRATION_PERIOD,BUSINESS_OWNER,MEMBERSHIP_TYPE_CODE,SOLUTIONS_REQUIRED,CONFIRMATION_EMAIL,EXPIRATION_EMAIL,REMINDER_EMAIL,DAYS_PRIORTO_EXPIRATION_MAIL,DAYS_PRIORTO_REMINDER_MAIL ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	}
	
	/**
	 * SQL for deleting a single row by Primary Key
	 */
	protected String getSQL_DELETE() {
		return "delete from  GPPR.OPPORTUNITY_INCENTIVE  where ID = ? ";
	}
	
	/**
	 * SQL for finding by Primary Key
	 */
	protected String getSQL_FIND_BY_ID() {
		return "select NAME, DESCRIPTION,STATUS_CODE,START_DATE,END_DATE,EXPIRATION_PERIOD,BUSINESS_OWNER,MEMBERSHIP_TYPE_CODE,SOLUTIONS_REQUIRED,CONFIRMATION_EMAIL,EXPIRATION_EMAIL,REMINDER_EMAIL,DAYS_PRIORTO_EXPIRATION_MAIL,DAYS_PRIORTO_REMINDER_MAIL,'Y' as PERSISTENT from GPPR.OPPORTUNITY_INCENTIVE where   ID = ?  "; 
	}

	

	/**
	 * SQL for finding all rows and ordering by Primary Key
	 */
	protected String getSQL_LIST_ORDER_BY_ID() {
		return "select NAME, DESCRIPTION,STATUS_CODE,START_DATE,END_DATE,EXPIRATION_PERIOD,BUSINESS_OWNER,MEMBERSHIP_TYPE_CODE,SOLUTIONS_REQUIRED,CONFIRMATION_EMAIL,EXPIRATION_EMAIL,REMINDER_EMAIL,DAYS_PRIORTO_EXPIRATION_MAIL,DAYS_PRIORTO_REMINDER_MAIL,'Y' as PERSISTENT  from GPPR.OPPORTUNITY_INCENTIVE order by ID  "; 
	}
	
	/**
	 * SQL for updating a single row by Primary Key
	 * Task 10897, to add DECISION_FINAL_TS
	 */
	protected String getSQL_UPDATE() {
		return " update DEAL.OPPORTUNITY_STORAGE set PRIMARY_EMAIL = ?, DOCLINK = ?, COMMENTS = ?, SENT_TO_BPM_TS = ?, EXPIRE_TYPE = ?, GPP_FOCALPOINT = ?, PROPOSED_HW = ?, CMR = ?, ENDUSER_INSTALL_DT = ?, CUST_ID = ?, REG_TYPE_CDE = ?, PREV_REQUEST_NUMBER = ?,PARENT_REQ_NUM=?, DECISION_FINAL_DT = ?, REG_EXPIRED_DT = ?, UPDATED_TS = current timestamp, UPGRADE_DATA = ?, COMPETITIVE_DATA = ?, GPP_NUMBER = ?, OPPORTUNITY_DISC_REVENUE = ?,  SUBMISSION_ID = ?, IN_GPP_FLAG = ?,     ISV_FLAG = ?  ,     ISV_INSTALLED_FLAG = ?  ,     DATA_MANAGED_FLAG = ?  ,     DISTRIBUTOR_CDE = ?  ,     DISTRIBUTOR_CONTACT_NAME = ?  ,     DISTRIBUTOR_CONTACT_EMAIL = ?  ,     OPPORTUNITY_TYPE_CDE = ?  ,     APPLICATIONS_TO_INSTALL = ?  ,     OPPORTUNITY_LIST_PRICE = ?  ,     SELL_EXCLUSIVE_FLAG = ?  ,     OPPORTUNITY_STATUS_CDE = ?  ,     DEAL_REG_NUMBER = ?   , ATTENTION = ? , PARITY = ?, IVR = ? , SECTOR_FLAG = ?, ACCOUNT_CHECKS = ?  , UPDATED_BY = ? ,OPPORTUNITY_INCLUDE=?, DECISION_FINAL_TS = ?, SUPPORT_DOC_CDE = ?, OPPORTUNITY_END_USER_PRICE = ?, NET_NEW_PRODUCT_DATA = ?, TECH_REFRESH_DATA = ?, HW_CONSOLIDATION_DATA = ?, ANOTHER_BP_FLAG = ?, ISV_TYPE_CDE = ?, ISV_NEW_DATA = ?, ISV_ADDITIONAL_DATA = ?, ISV_VERSION_DATA = ?, ISV_RELEASE_DATA = ?, PARENT_REQUEST_ID = ?  where    REQUEST_ID = ?   and UPDATED_TS = ?  "; //added opportunity_include column,story 14291
	}

	
	
	protected Object[] mapForUpdate(GridCapableEntity vo) {
		Object[] values = null;
		return values;
	}
	
	protected void validatePkForInsert(GridCapableEntity vo) {
		if (((OpportunityIncentive) vo).getName() == null) {
			throw new IllegalArgumentException(
					"Incentive Name cannot be null for an insert.");
		}
	}
	
	/**
	 * This method validates the primary keys for a given update above.
	 */
	protected void validatePkForUpdate(GridCapableEntity vo) {
		if (((OpportunityIncentive) vo).getName() == null) {
			throw new IllegalArgumentException(
					"Incentive Name cannot be null for an insert.");
		}
	}
	
	/**
	 * This method sets the parameters for the delete prepared statement shown
	 * as a constant above.
	 */
	protected Object[] mapForDelete(GridCapableEntity vo) {
		OpportunityIncentive inc = (OpportunityIncentive) vo;

		Object[] values = { inc.getID() };
		return values;
	}

	
	/**
	 * This method sets the parameters for the insert prepared statement shown
	 * as a constant above.
	 */
	protected Object[] mapForInsert(GridCapableEntity vo) {
		OpportunityIncentive opportunity = (OpportunityIncentive) vo;
		
		Object[] values = { 
				opportunity.getID(),
				opportunity.getName(),
				opportunity.getDesc(),	
				opportunity.getStatus(),
				opportunity.getStartDate(),
				opportunity.getEndDate(),
				opportunity.getExpPeriod(),
				opportunity.getBusOwner(),
				opportunity.getMemType(),
				opportunity.getSolRequired(),
				opportunity.getConfEmail(),
				opportunity.getExpEmail(),
				opportunity.getRemEmail(),
				opportunity.getDaysPriorToExpirationMail(),
				opportunity.getDaysPriorToReminderMail()};//Story 27947
					
		return values;
	}

	/**
	 * Map the current row of the given ResultSet to a OpportunityStorage.
	 * 
	 * @param resultSet
	 *            The ResultSet of which the current row is to be mapped to an
	 *            OpportunityStorage.
	 * @return The mapped OpportunityStorage from the current row of the given
	 *         ResultSet.
	 * @throws SQLException
	 *             If something fails at database level.
	 */
	protected OpportunityIncentive mapForSelect(ResultSet resultSet)
			throws SQLException {
		
		OpportunityIncentive inc =null;
		return inc;
	}
	
	

	
	
	/**
	 * Overloading the CrudDao method to Create the given row in the database.
	 * 
	 * @param vo
	 *            The row to be created in the database.
	 * @returns the generated key value if an auto-generated key is declared in
	 *          the database for the table. Otherwise null.
	 * @throws IllegalArgumentException
	 *             If the primary key is not null.
	 * @throws Exception
	 *             If something fails at database level.
	 */
	public <T extends GridCapableEntity> Long insert(T vo) throws Exception {
		

		Object[] values = mapForInsert(vo);

		Connection connection = null;
		PreparedStatement preparedStatement = null;
		ResultSet generatedKeys = null;

		try {
			connection = Transaction.getInstance(connectionName)
					.getConnectionForTransaction();
			;
			preparedStatement = prepareStatement(connection, getSQL_INSERT(),true, values);
			
			int affectedRows = preparedStatement.executeUpdate();
			if (affectedRows == 0) {
				throw new DAOException(
						"Insert operation failed, no rows affected.");
			}

			ResultSet rs = preparedStatement.getGeneratedKeys();
			Long insertedKeyValue = null;
			if (rs.next()) {
				insertedKeyValue = rs.getLong(1);
				//logger.debug("key value for insert:" + rs.getLong(1));
			}
			return insertedKeyValue;
		} finally {
			close(preparedStatement, generatedKeys);
		}
	}
		
		/**
		 * Update the given row in the database. The primary key must not be null,
		 * otherwise it will throw IllegalArgumentException.
		 * 
		 * @param vo
		 *            The row to be updated in the database.
		 * @throws IllegalArgumentException
		 *             If the primary key is null.
		 * @throws Exception
		 *             If something fails at database level.
		 */
		public <T extends GridCapableEntity> void update(T vo) throws Exception {
			validatePkForUpdate(vo);

			Object[] values = mapForUpdate(vo);

			Connection connection = null;
			PreparedStatement preparedStatement = null;

			try {
				connection = Transaction.getInstance(connectionName)
						.getConnectionForTransaction();
				;
				
				preparedStatement = prepareStatement(connection, getSQL_UPDATE(),
							false, values);
				
				int affectedRows = preparedStatement.executeUpdate();
				if (affectedRows == 0) {
					throw new DAOException("Updating failed, no rows affected.");
				}
			} finally {
				close(preparedStatement);
			}
		
	}
		/**
		 * SQL for inserting a row.
		 */
		protected String getSQL_INSERT_WITH_SUBMITTED_TS() {
			return " insert into DEAL.OPPORTUNITY_STORAGE (PRIMARY_EMAIL, DOCLINK, COMMENTS, SENT_TO_BPM_TS, EXPIRE_TYPE, GPP_FOCALPOINT, PROPOSED_HW, CMR, ENDUSER_INSTALL_DT, CUST_ID, REG_TYPE_CDE, PREV_REQUEST_NUMBER,PARENT_REQ_NUM, DECISION_FINAL_DT, REG_EXPIRED_DT, UPGRADE_DATA, COMPETITIVE_DATA, GPP_NUMBER, OPPORTUNITY_DISC_REVENUE, REQUEST_ID, SUBMISSION_ID, IN_GPP_FLAG, ISV_FLAG, ISV_INSTALLED_FLAG, DATA_MANAGED_FLAG, DISTRIBUTOR_CDE, DISTRIBUTOR_CONTACT_NAME, DISTRIBUTOR_CONTACT_EMAIL, OPPORTUNITY_TYPE_CDE, APPLICATIONS_TO_INSTALL, OPPORTUNITY_LIST_PRICE, SELL_EXCLUSIVE_FLAG, OPPORTUNITY_STATUS_CDE, DEAL_REG_NUMBER, ATTENTION, PARITY, IVR, SECTOR_FLAG, ACCOUNT_CHECKS, UPDATED_BY, SUPPORT_DOC_CDE, DECISION_FINAL_TS, OPPORTUNITY_INCLUDE, SUBMITTED_TS, OPPORTUNITY_END_USER_PRICE, NET_NEW_PRODUCT_DATA, TECH_REFRESH_DATA, HW_CONSOLIDATION_DATA, ANOTHER_BP_FLAG, ISV_TYPE_CDE, ISV_NEW_DATA, ISV_ADDITIONAL_DATA, ISV_VERSION_DATA, ISV_RELEASE_DATA, PARENT_REQUEST_ID) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,current timestamp, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		}

		/**
		 * SQL for updating a single row by Primary Key
		 * Task 10897, to add DECISION_FINAL_TS
		 */
		protected String getSQL_UPDATE_WITH_SUBMITTED() {
			return " update DEAL.OPPORTUNITY_STORAGE set PRIMARY_EMAIL = ?, DOCLINK = ?, COMMENTS = ?, SENT_TO_BPM_TS = ?, EXPIRE_TYPE = ?, GPP_FOCALPOINT = ?, PROPOSED_HW = ?, CMR = ?, ENDUSER_INSTALL_DT = ?, CUST_ID = ?, REG_TYPE_CDE = ?, PREV_REQUEST_NUMBER = ?,PARENT_REQ_NUM=?, DECISION_FINAL_DT = ?, REG_EXPIRED_DT = ?, UPDATED_TS = current timestamp, UPGRADE_DATA = ?, COMPETITIVE_DATA = ?, GPP_NUMBER = ?, OPPORTUNITY_DISC_REVENUE = ?,  SUBMISSION_ID = ?, IN_GPP_FLAG = ?,     ISV_FLAG = ?  ,     ISV_INSTALLED_FLAG = ?  ,     DATA_MANAGED_FLAG = ?  ,     DISTRIBUTOR_CDE = ?  ,     DISTRIBUTOR_CONTACT_NAME = ?  ,     DISTRIBUTOR_CONTACT_EMAIL = ?  ,     OPPORTUNITY_TYPE_CDE = ?  ,     APPLICATIONS_TO_INSTALL = ?  ,     OPPORTUNITY_LIST_PRICE = ?  ,     SELL_EXCLUSIVE_FLAG = ?  ,     OPPORTUNITY_STATUS_CDE = ?  ,     DEAL_REG_NUMBER = ?   , ATTENTION = ? , PARITY = ?, IVR = ? , SECTOR_FLAG = ?, ACCOUNT_CHECKS = ?  , UPDATED_BY = ? ,OPPORTUNITY_INCLUDE=?, SUBMITTED_TS = current timestamp, DECISION_FINAL_TS = ?, SUPPORT_DOC_CDE = ?, OPPORTUNITY_END_USER_PRICE = ?, NET_NEW_PRODUCT_DATA = ?, TECH_REFRESH_DATA = ?, HW_CONSOLIDATION_DATA = ?, ANOTHER_BP_FLAG = ?, ISV_TYPE_CDE = ?, ISV_NEW_DATA = ?, ISV_ADDITIONAL_DATA = ?, ISV_VERSION_DATA = ?, ISV_RELEASE_DATA = ?, PARENT_REQUEST_ID = ?    where    REQUEST_ID = ?   and UPDATED_TS = ?  ";
		}
		
		
		
		/**
		 * Update the given row in the database. The primary key must not be null,
		 * otherwise it will throw IllegalArgumentException.
		 * 
		 * @param regExpireDate
		 *            The row to be updated in the database.
		 * @throws IllegalArgumentException
		 *             If the primary key is null.
		 * @throws Exception
		 *             If something fails at database level.
		 */
		public void updateRegExpireDate(String requestId, java.sql.Date regExpireDate)
				throws Exception {
			
			Connection connection = null;
			PreparedStatement preparedStatement = null;

			try {
				connection = Transaction.getInstance(connectionName)
						.getConnectionForTransaction();
				
					preparedStatement = prepareStatement(connection, getREG_EXPIRE_DATE(), false,regExpireDate, requestId);	// Task 18847
				
				int affectedRows = preparedStatement.executeUpdate();
				if (affectedRows == 0) {
					throw new DAOException("Updating failed, no rows affected.");
				}
			} finally {
				close(preparedStatement);
			}
			
		}
		
		/**
		 * SQL for updating a single row by Primary Key
		 * Task 18847
		 */
		
		private String getREG_EXPIRE_DATE(){
			return "UPDATE DEAL.OPPORTUNITY_STORAGE SET REG_EXPIRED_DT = ? WHERE REQUEST_ID = ?";	
		}
}