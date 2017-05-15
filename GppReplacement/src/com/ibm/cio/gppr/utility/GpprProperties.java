package com.ibm.cio.gppr.utility;


import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class GpprProperties extends Properties{



  
  /**
   * 
   */
  private static final long serialVersionUID = -3121032804414350190L;
  
  private static String propertiesFilename = "drW3.properties"; 
  private static  GpprProperties instance =null;
  private InputStream input;
 
  
  private GpprProperties() {
    super();
    try {
      input = this.getClass().getClassLoader()
      .getResourceAsStream(propertiesFilename);

    if (input != null) this.load(input);
    } catch(IOException e) {
      e.printStackTrace();
      return;
    }
  }

  private static GpprProperties getInstance() {
    if (instance == null) {
      instance = new GpprProperties();
    }
    return instance;
  }
  
  public static String getDeploymentEnvironment(){
	  return getInstance().getProperty("deployment.environment") ;
  }
  public static String getTestRoles(){
	  return getInstance().getProperty("test.roles") ;
  }
  public static String getDatasource(){
	  return getInstance().getProperty("datasource") ;
  }
  public static String getBpoReviewerRoleName(){
	  return getInstance().getProperty("bpo.reviewer.role") ;
  }
  public static String getDealRegReviewerRoleName(){
	  return getInstance().getProperty("dealreg.reviewer.role") ;
  }
  public static String getIBMAdminRoleName(){
	  return getInstance().getProperty("admin.role") ;
  }
  public static String getBusinessOwnerRoleName(){
	  return getInstance().getProperty("business.owner.role") ;
  }
  public static String getFederalReviewerRoleName(){
	  return getInstance().getProperty("federal.reviewer.role") ;
  }
//Story 15412 - Addition of new Role DealRegTriage Admin
  public static String getDealRegTriageRoleName(){
	  return getInstance().getProperty("dealregtriage.admin.role") ;
  }
  public static String getFederalCheckTaskName(){
	  return getInstance().getProperty("task.federal.check.name") ;
  }
  
  public static String getIGSReviewerRoleName(){
	  return getInstance().getProperty("igs.reviewer.role") ;
  }
  public static String getBlanketBidReviewerRoleName(){
	  return getInstance().getProperty("blanket.reviewer.role") ;
  }
  public static String getHostingBidReviewerRoleName(){
	  return getInstance().getProperty("hosting.reviewer.role") ;
  }
  
  public static String getAddRoleNames(){
	  return getInstance().getProperty("add.roles.names") ;
  }
  
  public static String getTaskNames(){
	  return getInstance().getProperty("task.names") ;
  }
  
  public static String getTaskWithDupesNames(){
	  return getInstance().getProperty("task.dupe.names") ;
  }
  
  public static String getTaskSectorName(){
	  return getInstance().getProperty("task.sector.name") ;
  }
  
  public static String getTaskBpoName(){
	  return getInstance().getProperty("task.bpo.name") ;
  }
  
  public static String getTaskParalleBpo(){
	  return getInstance().getProperty("task.parallel.bpo") ;
  }
  
  public static String getHsTaskName(){
	  return getInstance().getProperty("hs.task.name") ;
  }
  public static String getCoachCategorizeCustomer(){
	  return getInstance().getProperty("coach.categorize") ;
  }
  public static String getCoachVerifyCustomer(){
	  return getInstance().getProperty("coach.verify") ;
  }
  public static String getCoachDuplicates(){
	  return getInstance().getProperty("coach.duplicates") ;
  }
  public static String getCoachCompleted(){
	  return getInstance().getProperty("coach.completed") ;
  }
  public static String getCoachFinalAssessment(){
	  return getInstance().getProperty("coach.finalassesment") ;
  }
  public static String getCoachAutoreject(){
	  return getInstance().getProperty("coach.autoreject") ;
  }
 
  public static String getRequestStatuses(){
	  return getInstance().getProperty("requests.statuses") ;
  }
//story 2247 - Added to get end user classification details
  public static String getEndUserClassification(){
	  return getInstance().getProperty("end.user.classification") ;
  }
  //end
//story 18409 - added to get gpp error status
 public static String getMTasksGppErrorStatus(){
	return getInstance().getProperty("end.user.gppErrorStatus");  
 }
 // end 
  public static String getProcessStatuses(){
	  return getInstance().getProperty("process.statuses") ;
  }
  public static String getSectorCommentPrefix(){
	  return getInstance().getProperty("sector.comment") ;
  }
  public static String getSectorMessagePrefix(){
	  return getInstance().getProperty("sector.message") ;
  }
 
  public static String getBlockTemplatesIDs(){
	  return getInstance().getProperty("block.templates") ;
  }
  
  public static Long getBlockDefaultExpiration(){
	  return Long.parseLong(getInstance().getProperty("block.default.expiration")) ;
  }
  
  public static String getOpportunityPowerPreffix(){
	  return getInstance().getProperty("opportunity.power.preffix") ;
  }
  
  public static String getOpportunitySystemxPreffix(){
	  return getInstance().getProperty("opportunity.systemx.preffix") ;
  }
  
  public static String getOpportunityLenovooemPreffix(){
	  return getInstance().getProperty("opportunity.lenovooem.preffix") ;
  }
  
  public static String getOpportunityStoragePreffix(){
	  return getInstance().getProperty("opportunity.storage.preffix") ;
  }
  
  public static String getOpportunityPureFlexPreffix(){
	  return getInstance().getProperty("opportunity.pureflex.preffix") ;
  }
  
  public static String getOpportunityHvecPreffix(){
	  return getInstance().getProperty("opportunity.hvec.preffix") ;
  }
  // Story 23773 - starts
  public static String getOpportunityLinuxonePreffix(){
	  return getInstance().getProperty("opportunity.linuxone.preffix") ;
  }
  // Story 23773 - ends
  
// Task for MSA Check,Blanket Check,IGS Approval-Story5587
  public static String getMSACheckTaskName(){
	  return getInstance().getProperty("task.msa.check.name") ;
  }
  public static String getBlanketCheckTaskName(){
	  return getInstance().getProperty("task.blanket.check.name") ;
  }
  public static String getIGSApprovalTaskName(){
	  return getInstance().getProperty("task.igs.approval.name") ;
  }
  
  public static String getMailSmtpHostName(){
	  return getInstance().getProperty("mail.smtp.host") ;
  }
  public static String getMailSentFormId(){
	  return getInstance().getProperty("mail.smtp.sentfrom") ;
  }
  
  // start 18597 sector process task name changed
  public static String getIbmInputClient(){
	  return getInstance().getProperty("ibm.input.client") ;
  }
  public static String getIbmInputBrand(){
	  return getInstance().getProperty("ibm.input.brand") ;
  }
  public static String getIbmInputBrandLabelCheck(){
	  return getInstance().getProperty("ibm.sector.process.brand") ;
  }
  public static String getIbmInputClientLabelCheck(){
	  return getInstance().getProperty("ibm.sector.process.client");
  }
  public static String getIBMInputProcessClientHashTaskName(){
	  return getInstance().getProperty("ibm.input.client.hash");
  }
  public static String getIBMInputProcessBrandHashTaskName(){
	  return getInstance().getProperty("ibm.input.brand.hash");
  }
  // defect 20155
  public static String getSectorComplete(){
	  return getInstance().getProperty("sector.complete.task");
  }
  public static String getIbmInputCompleteLabel(){
	  return getInstance().getProperty("ibm.input.complete");
  }
  // end 
  // Story 18598 starts
  public static String getIbmInputVoters(){
	  return getInstance().getProperty("ibm.input.voters") ;
  }
  public static String getImtReviewVoter(){
	  return getInstance().getProperty("imt.review.voter") ;
  }
  // Story 18598 ends
  
  //Defect 25580 starts
  public static String getTaskInputClient(){
	  return getInstance().getProperty("task.sector.inputClient") ;
  }
  public static String getTaskInputBrand(){
	  return getInstance().getProperty("task.sector.inputBrand") ;
  }
  //Defect 25580 End  
  public static String getTaskInputComplete(){
	  return getInstance().getProperty("task.sector.inputComplete") ;
  }
  
  public static String getTaskImtReview(){
	  return getInstance().getProperty("task.sector.imtReview") ;
  } 
  public static String getTaskExecReview(){
	  return getInstance().getProperty("task.sector.execReview");
  }
  //Story 21870 and 21869 starts
  public static String getFrSearchStr(){
	  return getInstance().getProperty("search.french.Str");
  }
//Story 21870 and 21869 End

  
}
  