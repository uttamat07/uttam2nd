package com.ibm.cio.gppr.dao;

/**
 * This interface IOpportunityStorageDao represents a JDBC data access object
 * that is mapped to a single database table of the same name.
 *
 * To add additional query methods add another finder method as per the following example:
 * <code>
 *	  Returns the Role from the database matching the given roleName, otherwise
 *	  null.
 *	  
 *	  @param roleName
 *	             The roleName of the role to be returned.
 *	  @return The Role from the database matching the given roleName, otherwise
 *	          null.
 *	  @throws Exception
 *	              If something fails at database level.
 *	
 *	public Role findByName(String roleName) throws Exception;
 * </code>
 * Copyright � 2012 IBM Corporation. All Rights Reserved.
 * 
 * Change Log: 
 * 
 * Date					Change Flag			Author						Descriptions of Changes
 * April 3, 2012	    CREATE				Mike Long                   Initial Creation
 *
 */

import com.ibm.ciolab.persistence.framework.dao.IDao;
import com.ibm.cio.gppr.entities.OpportunityIncentive;

public interface IOpportunityStorageDao extends IDao {

	/**
	 * Returns a row from the database matching the given submission id,
	 * otherwise null.
	 * 
	 * @param id
	 *            The submission id of the row to be returned.
	 * @return The opportunity storage from the database matching the given
	 *         submission ID, otherwise null.
	 * @throws Exception
	 *             If something fails at database level.
	 */
	public OpportunityIncentive findBySubmissionId(Long submissionId)
			throws Exception;
	
	void updateRegExpireDate(String requestId,java.sql.Date regExpireDate) throws Exception;

}