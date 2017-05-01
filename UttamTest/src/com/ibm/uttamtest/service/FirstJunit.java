package com.ibm.uttamtest.service;

public class FirstJunit {

	/**
	 * @param args
	 */
	private String message;
	public FirstJunit(String message){
		this.message=message;
	}
public String printMessage(){
	
	System.out.println("message...."+message);
	
	return message;
}
}
