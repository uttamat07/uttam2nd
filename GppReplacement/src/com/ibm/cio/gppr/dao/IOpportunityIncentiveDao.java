package com.ibm.cio.gppr.dao;

/**
 * This interface IOpportunityStorageDao represents a JDBC data access object
 * 
 */

import com.ibm.ciolab.persistence.framework.dao.IDao;
import com.ibm.cio.gppr.entities.OpportunityIncentive;


public interface IOpportunityIncentiveDao extends IDao {
	
	/**
	 * Returns a row from the database matching the given submission id,
	 * otherwise null.
	 * 
	 * @param id
	 *            The submission id of the row to be returned.
	 * @return The opportunity power from the database matching the given
	 *         submission ID, otherwise null.
	 * @throws Exception
	 *             If something fails at database level.
	 */
	
	
	

}
