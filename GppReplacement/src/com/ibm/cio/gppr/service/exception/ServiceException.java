package com.ibm.cio.gppr.service.exception;

/**
 *
 * @author gimm
 */
public final class ServiceException extends Exception{
    
	private static final long serialVersionUID = 1L;

	public ServiceException(String message){
    	super(generateMessage(message));
    }
    
    private static String generateMessage (String message){
    	if (message.contains("DB2 SQL Error: SQLCODE=-532, SQLSTATE=23001"))
    		message="Record can not be deleted!";
    	return message;
    }
}
