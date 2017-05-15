/**
 * Copyright Â© 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date	Change Flag	Author	Descriptions of Changes 2012-08-24	CREATE	zhouhk@cn.ibm.com	Created.
 */
package com.ibm.cio.gppr.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.htmlparser.jericho.Renderer;
import net.htmlparser.jericho.Segment;
import net.htmlparser.jericho.Source;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.ibm.cio.gppr.service.exception.ServiceException;
import com.ibm.cio.gppr.service.vo.UserVO;
import com.ibm.cio.gppr.utility.DalIntegration;
import com.ibm.cio.gppr.utility.GpprConstants;

import com.ibm.cio.gppr.entities.OpportunityIncentive;
import com.ibm.ciolab.persistence.framework.DAOConfigurationException;
import com.ibm.ciolab.persistence.framework.GridCapableEntity;
import com.ibm.ciolab.staticforms.dealreg.entities.BlockedAccount;
//import com.ibm.ws.policyset.admin.commands.GetRequiredBindingVersion;

import com.ibm.cio.gppr.uuid.UUID;

/**
 * Servlet implementation class SendEmailNotificationServlet
 */
public class CreateIncentiveServlet extends HttpServlet {
	  private static final Logger LOGGER = Logger.getLogger(CreateIncentiveServlet.class);
	  private static final int sizeThreshold = 10000000;
	  JSONObject ro = new JSONObject(); 
	    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	      try{
	    	  
	    	  String name = request.getParameter("incentiveName");
	    	  String status = request.getParameter("status");
	    	  String description = request.getParameter("incentiveDescription");
	    	  String startdate = request.getParameter("startDate");
	    	  String endDate = request.getParameter("endDate");
	    	  String businessOwner = request.getParameter("businessOwner");
	    	  String oiExpiration = request.getParameter("oiExpiration");
	    	  String solRequired = request.getParameter("solutions");
	    	  String membershipType = request.getParameter("membershipType");
	    	  String submissionEmail = request.getParameter("submissionEmail");
	    	  String reminderEmail = request.getParameter("reminderEmail");
	    	  String expirationEmail = request.getParameter("expirationEmail");
	    	  String daysPriorToExpiration = request.getParameter("priorExpiration");
	    	  String daysPriorToReminder = request.getParameter("priorReminder");
	    	  
	    	  System.out.println("Incentive Name :"+name);
	    	  System.out.println("Incentive status :"+status);
	    	  System.out.println("Incentive description :"+description);
	    	  System.out.println("Incentive start Date :"+startdate);
	    	  System.out.println("Incentive end Date :"+endDate);
	    	  System.out.println("Incentive businessOwner :"+businessOwner);
	    	  System.out.println("Incentive oiExpiration :"+oiExpiration);
	    	  System.out.println("Incentive solutions :"+solRequired);
	    	  System.out.println("Incentive membershipType :"+membershipType);
	    	  System.out.println("Incentive submissionEmail :"+submissionEmail);
	    	  System.out.println("Incentive reminderEmail :"+reminderEmail);
	    	  System.out.println("Incentive expirationEmail :"+expirationEmail);
	    	  
	    	 
	    	  
	  		try{
								
				String dbName = "jdbc/dealreg";
				InitialContext ctx = new InitialContext();
				DataSource ds = (DataSource) ctx.lookup(dbName);
				ctx.close();
				Connection con = ds.getConnection();
				String query = "insert into GPPR.OPPURTUNITY_INCENTIVE (ID,NAME, DESCRIPTION,STATUS_CODE,START_DATE,END_DATE,EXPIRATION_PERIOD,BUSINESS_OWNER,MEMBERSHIP_TYPE_CODE,SOLUTIONS_REQUIRED,CONFIRMATION_EMAIL,EXPIRATION_EMAIL,REMINDER_EMAIL,DAYS_PRIORTO_EXPIRATION_MAIL,DAYS_PRIORTO_REMINDER_MAIL ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				
				PreparedStatement preparedStatement = con.prepareStatement(query);
				
				preparedStatement.setString(1, UUID.randomUUID().toString());
				preparedStatement.setString(2, name);
				preparedStatement.setString(3, description);
				preparedStatement.setString(4, status);
				preparedStatement.setTimestamp(5, getCurrentTimeStamp());
				preparedStatement.setTimestamp(6, getCurrentTimeStamp());
				preparedStatement.setInt(7, 1);
				preparedStatement.setString(8, businessOwner);
				preparedStatement.setString(9, membershipType);
				preparedStatement.setString(10, solRequired);
				preparedStatement.setString(11, submissionEmail);
				preparedStatement.setString(12, expirationEmail);
				preparedStatement.setString(13, reminderEmail);
				preparedStatement.setString(14, daysPriorToExpiration);
				preparedStatement.setString(15, daysPriorToReminder);
				
				preparedStatement.executeUpdate();
				
				System.out.println("Record is inserted into GPPR table!");
				
	  		}catch (NamingException e) {
					throw new DAOConfigurationException("DataSource jdbc/dealreg is missing in JNDI.", e);
			}
	    	  
	    	 
	  		
	  		/*DalIntegration dalIntegration =  DalIntegration.getDalIntegration();
	    	  OpportunityIncentive inc = new OpportunityIncentive();
	    	  dalIntegration.getOppurtunityIncentiveService().insert(inc);*/
	    	  
	    	  
	    }
        catch (Exception e) {
        	
            e.printStackTrace();
        }
        this.sendResponse(request,response, ro);
	    }
	   
	    private void sendResponse(HttpServletRequest req,HttpServletResponse res, JSONObject ro) {
	        try {
	            String message = "Incentive Created Successfully";
	            req.setAttribute("message", message);
	           RequestDispatcher rd =  req.getRequestDispatcher("/js/com/ibm/ciolab/gppr/templates/Success.jsp");
	            rd.include(req, res);  
	        }
	        catch (Exception e) {
	            this.LOGGER.info("Got exception in sending response:  " + e.getMessage());
	        }
	        finally {
	           
	        }
	    }
	    
	 

	    private static java.sql.Timestamp getCurrentTimeStamp() {

			java.util.Date today = new java.util.Date();
			return new java.sql.Timestamp(today.getTime());

		}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
		// TODO Auto-generated method stub
	}

}
