package com.ibm.cio.gppr.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;


/**
 * This class is a Java Bean Value Object that provides a one-to-one mapping to
 * the fields in the database table of the same name.
 * 
 * It behaves properly in the context of the Java collections framework with a
 * proper equals and hashcode method defined as per the primary key of a table.
 * 
 * Copyright � 2012 IBM Corporation. All Rights Reserved.
 * 
 * Change Log:
 * 
 * Date Change Flag Author Descriptions of Changes April 3, 2012 CREATE Mike
 * Long Initial Creation
 * 
 */
public class OpportunityIncentive extends Opportunity implements Serializable {

	private static final long serialVersionUID = -8719486557835982200L;

	
	/**
	 * Constructor that takes every field as a parameter.
	 */
	

	public OpportunityIncentive 
			(String ID,
			String name,
			String desc,
			String status,
			Timestamp startDate,
			Timestamp endDate,
			int expPeriod,
			String busOwner,
			String memType,
			String solRequired,
			String confEmail,
			String expEmail,
			String remEmail,
			int daysPriorToExpirationMail,
			int daysPriorToReminderMail){	
		this.setID(ID);
		this.setName(name);
		this.setDesc(desc);
		this.setStatus(status);
		this.setStartDate(startDate);
		this.setEndDate(endDate);
		this.setExpPeriod(expPeriod);
		this.setBusOwner(busOwner);
		this.setMemType(memType);
		this.setSolRequired(solRequired);
		this.setConfEmail(confEmail);
		this.setExpEmail(expEmail);
		this.setRemEmail(remEmail);
		this.setDaysPriorToExpirationMail(daysPriorToExpirationMail);
		this.setDaysPriorToReminderMail(daysPriorToReminderMail);
		
	}
	
	private String ID;	
	private String name;
	private String desc;
	private String status;
	private java.sql.Timestamp startDate;
	private java.sql.Timestamp endDate;
	private int expPeriod;
	private String busOwner;
	private String memType;
	private String solRequired;
	private String confEmail;
	private String expEmail;
	private String remEmail;
	private int daysPriorToExpirationMail;
	private int daysPriorToReminderMail;
	
	

	/**
	 * No Arg constructor that takes every field as a parameter.
	 */
	public OpportunityIncentive() {
	}
	
	public String getID() {
		return ID;
	}

	
	public void setID(String ID) {
		this.ID = ID;
	}
	
	public int getExpPeriod() {
		return expPeriod;
	}

	
	public void setExpPeriod(int expPeriod) {
		this.expPeriod = expPeriod;
	}
	
	public int getDaysPriorToReminderMail() {
		return daysPriorToReminderMail;
	}

	
	public void setDaysPriorToReminderMail(int daysPriorToReminderMail) {
		this.daysPriorToReminderMail = daysPriorToReminderMail;
	}
	
	public int getDaysPriorToExpirationMail() {
		return daysPriorToExpirationMail;
	}

	
	public void setDaysPriorToExpirationMail(int daysPriorToExpirationMail) {
		this.daysPriorToExpirationMail = daysPriorToExpirationMail;
	}
	
	public String getRemEmail() {
		return remEmail;
	}

	
	public void setRemEmail(String remEmail) {
		this.remEmail = remEmail;
	}
	

	public String getExpEmail() {
		return expEmail;
	}

	
	public void setExpEmail(String expEmail) {
		this.expEmail = expEmail;
	}
	
	public String getConfEmail() {
		return confEmail;
	}

	
	public void setConfEmail(String confEmail) {
		this.confEmail = confEmail;
	}
	
	public String getSolRequired() {
		return solRequired;
	}

	
	public void setSolRequired(String solRequired) {
		this.solRequired = solRequired;
	}
	
	public String getMemType() {
		return memType;
	}

	
	public void setMemType(String memType) {
		this.memType = memType;
	}
	
	public String getBusOwner() {
		return busOwner;
	}

	
	public void setBusOwner(String busOwner) {
		this.busOwner = busOwner;
	}

	
	public String getName() {
		return name;
	}

	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDesc() {
		return desc;
	}

	
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
	public String getStatus() {
		return status;
	}

	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public java.sql.Timestamp getStartDate() {
		return startDate;
	}

	public void setStartDate(java.sql.Timestamp startDate) {
		this.startDate = startDate;
	}
	
	public java.sql.Timestamp getEndDate() {
		return endDate;
	}

	public void setEndDate(java.sql.Timestamp endDate) {
		this.endDate = endDate;
	}
	
	
	
	
}
