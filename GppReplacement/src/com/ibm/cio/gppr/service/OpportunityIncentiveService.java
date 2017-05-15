package com.ibm.cio.gppr.service;

import org.apache.log4j.Logger;

import com.ibm.ciolab.persistence.framework.service.DaoService;
import com.ibm.cio.gppr.dao.jdbc.OpportunityIncentiveDao;

/**
 * This class wraps a DAO class with a transactional service wrapper. See
 * com.ibm.ciolab.dforms.dealreg.dao.framework.DaoService for an example of how
 * to invoke methods inside a single transaction. Methods at the service layer
 * are also transactional as per the EJB "REQUIRED" behavior. Service layer
 * methods can call each other and still behave transactionally.
 * 
 * The following example shows how to add a new transactional method for doing
 * something to a DAO. See the Dao javadocs for the accompanying documentation.
 * <code>
 * 	public Role findRole(String roleName) throws Throwable {
 * 		Transaction transaction = Transaction.getInstance();
 * 		Long methodGuid = random.nextLong() + System.currentTimeMillis();
 * 		String methodName = methodGuid.toString();
 * 		Role role = null;
 * 		try {
 * 			transaction.start(methodName);
 * 			role = ((IRoleDao) this.dao).findByName(roleName);
 * 			transaction.commit(methodName);
 * 		} catch (Exception t) {
 * 			transaction.rollback(methodName);
 * 			throw t;
 * 		} finally {
 * 			transaction.end(methodName);
 * 		}
 * 		return role;
 * 	}
 * 
 * </code> Copyright � 2012 IBM Corporation. All Rights Reserved.
 * 
 * Change Log:
 * 
 * Date Change Flag Author Descriptions of Changes April 3, 2012 CREATE Mike
 * Long Initial Creation
 * 
 * @see com.ibm.ciolab.persistence.framework.service.DaoService
 * @see com.ibm.ciolab.persistence.framework.Transaction
 */
public class OpportunityIncentiveService extends DaoService implements
		IOpportunityIncentiveService, java.io.Serializable {

	

	public OpportunityIncentiveService() {
		this.setDAO(new OpportunityIncentiveDao());
	}
}
