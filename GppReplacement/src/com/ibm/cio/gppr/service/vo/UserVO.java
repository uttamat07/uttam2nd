/**
 * Copyright © 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date			Change Flag		Author					Descriptions of Changes
 * 2012-07-18	CREATE			zhouhk@cn.ibm.com		Created.
 */
package com.ibm.cio.gppr.service.vo;

import com.ibm.cio.service.vo.UserProfileVO;

public class UserVO extends UserProfileVO {

    private Boolean isDealRegReviewer = false;
    private Boolean isHostingBidReviewer = false;
    private Boolean isBlanketBidReviewer = false;
    private Boolean isFederalReviewer = false;
    private Boolean isIGSReviewer = false;
    private Boolean isBPOReviewer = false;
    private Boolean isBusinessOwner = false;
    private Boolean isIBMAdmin = false;
  //Story 15412 - Addition of new Role DealRegTriage Admin
    private Boolean isDealRegTriage = false;
    public Boolean getIsDealRegReviewer() {
        return isDealRegReviewer;
    }

    public void setIsDealRegReviewer(Boolean isDealRegReviewer) {
        this.isDealRegReviewer = isDealRegReviewer;
    }

    public Boolean getIsHostingBidReviewer() {
        return isHostingBidReviewer;
    }

    public void setIsHostingBidReviewer(Boolean isHostingBidReviewer) {
        this.isHostingBidReviewer = isHostingBidReviewer;
    }

    public Boolean getIsBlanketBidReviewer() {
        return isBlanketBidReviewer;
    }

    public void setIsBlanketBidReviewer(Boolean isBlanketBidReviewer) {
        this.isBlanketBidReviewer = isBlanketBidReviewer;
    }

    public Boolean getIsFederalReviewer() {
        return isFederalReviewer;
    }

    public void setIsFederalReviewer(Boolean isFederalReviewer) {
        this.isFederalReviewer = isFederalReviewer;
    }

    public Boolean getIsIGSReviewer() {
        return isIGSReviewer;
    }

    public void setIsIGSReviewer(Boolean isIGSReviewer) {
        this.isIGSReviewer = isIGSReviewer;
    }

    public Boolean getIsBPOReviewer() {
        return isBPOReviewer;
    }

    public void setIsBPOReviewer(Boolean isBPOReviewer) {
        this.isBPOReviewer = isBPOReviewer;
    }

    public Boolean getIsBusinessOwner() {
        return isBusinessOwner;
    }

    public void setIsBusinessOwner(Boolean isBusinessOwner) {
        this.isBusinessOwner = isBusinessOwner;
    }

    public Boolean getIsIBMAdmin() {
        return isIBMAdmin;
    }

    public void setIsIBMAdmin(Boolean isIBMAdmin) {
        this.isIBMAdmin = isIBMAdmin;
    }
    public Boolean getIsDealRegTriage() {
		return isDealRegTriage;
	}

	public void setIsDealRegTriage(Boolean isDealRegTriage) {
		this.isDealRegTriage = isDealRegTriage;
	}
    
}
