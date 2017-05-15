package com.ibm.cio.gppr.utility;


import com.ibm.ciolab.persistence.framework.Transaction;
import com.ibm.cio.gppr.service.IOpportunityIncentiveService;
import com.ibm.cio.gppr.service.OpportunityIncentiveService;
import com.ibm.ciolab.staticforms.dealreg.services.LuProgramService;




public class DalIntegration {
	
	  private static DalIntegration instance = new DalIntegration();
	
	  public IOpportunityIncentiveService getOppurtunityIncentiveService(){
		  return new OpportunityIncentiveService();
	  }
	  
	  public static DalIntegration getDalIntegration () {	    
	   if (instance == null) {
	    	//LOGGER.info("DAL integration static initialization");
	    	instance = new DalIntegration();
	    	Transaction.configure(GpprProperties.getDatasource());
	    }
	    return instance;
	  }
	  
	 
}
