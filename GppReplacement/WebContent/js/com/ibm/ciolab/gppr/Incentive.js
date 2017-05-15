dojo.provide("com.ibm.ciolab.gppr.Incentive");

dojo.require("dijit.form.Select");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.NumberTextBox");
dojo.require("com.ibm.ciolab.dr.DRCMultiSelect");
dojo.require("com.ibm.ciolab.core.Button");
dojo.require("dojox.form.CheckedMultiSelect");

dojo.declare("com.ibm.ciolab.gppr.Incentive", [com.ibm.ciolab.dr._Widget], {
    templateString: dojo.cache("com", "ibm/ciolab/gppr/templates/Incentive.html"),
    statusFilter: {},
    programFilter: {},
    localFilter: {},
    //Story 2247 - End user classification filter added
    endUserClassificationFilter:{},
    distributorFilter:{},
    start: {},
    end: {},
    taskTrunarounds: {},
    tasksColumnsP1: ["REVIEW_REGISTRATION","FEDERAL_CHECK", "FEDERAL_RESPONSE"],
    tasksColumnsP2: ["DUPE_REVIEW"],
    tasksColumnsP3: ["SECTOR_COMPLETE"],
   
    submitted: function(){

    	
        var that = this;
        var filters = [];
        this.start = null;
        this.end = null;
        if(this.programFilter.getData()){
            filters.push({
                type: "in",
                property: "program",
                value: this.programFilter.getData()
            });
        }

        if(this.statusFilter.getData()){
            filters.push({
                type: "in",
                property: "status",
                value: this.statusFilter.getData()
            });
        }
        if(this.locationFilter.getData()){
            filters.push({
                type: "in",
                property: "location",
                value: this.locationFilter.getData()
            });
        }
        //Story 2247 - Federal Indicator
        if(this.endUserClassificationFilter.getData()){
             filters.push({
                 type: "in",
                 property: "endUserClassification",
                 value: this.endUserClassificationFilter.getData()
            });
        }
        //Story 21842 start 
        if(this.distributorFilter.getData()){
            filters.push({
                type: "in",
                property: "distributor",
                value: this.distributorFilter.getData()
           });
       }
      //Story 21842 end
        if(this.businessPartnerFilter.get("value")){
            filters.push({
                type: "*=",
                property: "businessPartner",
                value: this.businessPartnerFilter.get("value")
            });
        }
      //Story 21842 start
        if(this.distributorContactFilter.get("value")){
            filters.push({
                type: "*=",
                property: "distributorContact",
                value: this.distributorContactFilter.get("value")
            });
        }
        if(this.distributorEmailFilter.get("value")){
            filters.push({
                type: "*=",
                property: "distributorEmail",
                value: this.distributorEmailFilter.get("value")
            });
        }
      //Story 21842 start end
        
        if(this.endUserFilter.get("value")){
            filters.push({
                type: "*=",
                property: "endUserName",
                value: this.endUserFilter.get("value")
            });
        }
        if(this.registrationIdFilter.get("value")){
            filters.push({
                type: "=",
                property: "registrationId",
                value: this.registrationIdFilter.get("value")
            });
        }
        if(this.solutionIdFilter.get("value")){
            filters.push({
                type: "=",
                property: "submissionId",
                value: this.solutionIdFilter.get("value")
            });
        }else if(!this.solutionIdFilter.isValid()){
            main.dialog.alert(this.i18n.validsolutionLabel);
            return;
        }

        if(this.startTime.get("value")){
            this.start = {
                type: ">=",
                property: "submissionStartDate",
                value: new Date(this.startTime.get("displayedValue")).getTime() + ""
            };
        }
        //8502 - fix for setting the end date time stamp to 23:59:59 
        if(this.endTime.get("value")){
            this.end = {
                type: "<=",
                property: "submissionEndDate",
                value: new Date(this.endTime.get("displayedValue")).getTime() + ((1000*60*60*24)-1) + ""
            };
        }
        if(this.start && !this.end){
            filters.push(this.start);
        }
        else if(this.end && !this.start){
            filters.push(this.end);
        }
        else if(this.start && this.end && dojo.date.compare(this.startTime.get("value"), this.endTime.get("value")) <= 0){
            filters.push(this.start);
            filters.push(this.end);
        }
        if(filters.length === 0){
            return;
        }
        this.submitButton.showLoading();
        this.getService(this.constants.serviceURL.DEALREG, "getAdminReport")(filters).then(function(result){
            that.submitButton.hideLoading();
            that.renderReport(result);
        }, function(error){
            that.submitButton.hideLoading();
        }
        
        );
    },
    
    renderReport: function(result){
    	var that = this;
        var taskNameCount = 0;
        var myWindow = window.open("", "_blank", 'scrollbars=yes,resizable=yes,modal=yes,alwaysRaised=yes,menubar=yes');
        var reportDiv = dojo.create("div", {});
        var table = dojo.create("table", {
            width: "12000px",
            borderCollapse: "collapse",
            cellspacing: 0,
            cellpadding: 0
        }, reportDiv);
        var tr = dojo.create("tr", {}, table);
        //story 2247 - Added new column endUserClassification
        //Epic B2 story 51831//sector missing
        // PROD 25581 added new columns - "Machine_type_Model","Machine_type_Model_and_Serial","Vendor_MachineModel"    
        var columns = ["requestId", "registrationId","brand", "status",  "expiredDate","approvalDate","submittedDate", "requestType","businessPartner","CEID",
                       "endUserName","endUserClassification","ISR","ISV", "accountType", "location", "installAddresses","opportunityName","distributorName",
                       "proposedHardware","Machine_type_Model","Machine_type_Model_and_Serial","Vendor_MachineModel","revenue","IBMExclusivity",   "sendToBPM","dealRegReviewer"];
        dojo.forEach(columns, function(column){
        	dojo.create("th", {
                innerHTML: that.i18n[column + "TH"]
            }, tr);
        });

        // create task turnaround columns part one
        this.renderTaskTurnaroundTH(this.tasksColumnsP1, tr);

        dojo.create("th", {
            innerHTML: this.i18n.bpoReviewerTH
        }, tr);

        // create task turnaround columns part two
        this.renderTaskTurnaroundTH(this.tasksColumnsP2, tr);

        columns = ["responseToBP", "ibmResponseTs", "ivr"];
        dojo.forEach(columns, function(column){
            dojo.create("th", {
                innerHTML: that.i18n[column + "TH"]
            }, tr);
        });

        // create sectors turnaround columns
        for(var i = 1; i < 4; i++){
        	dojo.create("th", {
                innerHTML: that.i18n.sectorNamesTH + " " + i
            }, tr);
            dojo.create("th", {
                innerHTML: that.i18n.sectorVotesTH
            }, tr);
            dojo.create("th", {
                innerHTML: that.i18n.sectorProcessTH + that.i18n.taskNameStartTH
            }, tr);
            dojo.create("th", {
                innerHTML: that.i18n.sectorProcessTH + that.i18n.taskNameEndTH
            }, tr);
            dojo.create("th", {
                innerHTML: that.i18n.sectorProcessTH + that.i18n.taskNameTurnaroundTH
            }, tr);
        }

        // create task turnaround columns part three
       this.renderTaskTurnaroundTH(this.tasksColumnsP3, tr);
       
        // fill result
        dojo.forEach(result.items.list, function(record){
        	var tr = dojo.create("tr", {}, table);
        	var userName = record.endUserName.split("&").join('&amp;');

            dojo.create("td", {
                innerHTML: record.requestId
            }, tr);
            dojo.create("td", {
                innerHTML: record.registrationId
            }, tr);
            dojo.create("td", {
                innerHTML: record.program
            }, tr);
            dojo.create("td", {
                innerHTML: record.status
            }, tr);

            dojo.create("td", {
                innerHTML: record.expiration
            }, tr);
            dojo.create("td", {
                innerHTML: record.approvalDate
            }, tr);
            dojo.create("td", {
                //innerHTML: record.submittedDate ? that.formatDate(new Date(record.submittedDate), "yyyy-MM-dd HH:mm:ss") : ""
            	innerHTML: record.submittedDateStr ? record.submittedDateStr : ""
            }, tr);

            dojo.create("td", {
                innerHTML: record.requestType
            }, tr);
            

            dojo.create("td", {
                innerHTML: record.businessPartner
            }, tr);
            dojo.create("td", {
                innerHTML: record.CEID
            }, tr);
            /*for defect 22070 start*/
            if(dojo.isIE){
            	 dojo.create("td", {
            		 innerHTML: userName
                 }, tr);
            }else{
            	 dojo.create("td", {
                     innerHTML: record.endUserName
                 }, tr);
            }
            /*for defect 22070 end*/

            //Story 2247 - End user classification added 
            dojo.create("td", {
                innerHTML: record.endUserClassification
            }, tr);
            dojo.create("td", {
                innerHTML: record.ISR
            }, tr);

            dojo.create("td", {
                innerHTML: record.ISV
            }, tr);


            //Story 2247 change ends
            dojo.create("td", {
                innerHTML: (dojo.indexOf(record.flags, "S") >= 0) ? "Y" : "N" // contains S in flags - Y otherwise N
            }, tr);
            dojo.create("td", {
                innerHTML: record.location
            }, tr);           

            dojo.create("td", {
                innerHTML: record.installAddresses
            }, tr); 
            /*for defect 22070 start*/
            if(dojo.isIE){
            	//Defect 24394 starts - dojox.html.entities.encode(record.opportunityName) doesn't work
            	var opportunityNameIE = record.opportunityName.split("&").join('&amp;');
            	dojo.create("td", {
            		innerHTML: opportunityNameIE
            	}, tr);
            	// Defect 24394 - ends
        	}else{
            	 dojo.create("td", {
                     innerHTML: record.opportunityName
                 }, tr);
            }
            /*for defect 22070 end*/
           
            dojo.create("td", {
                innerHTML: record.distributorName
            }, tr);
            
            dojo.create("td", {
                innerHTML: record.proposedHardware
            }, tr);
            
            
            // PROD 25581
            dojo.create("td", {
                innerHTML: record.netNewData
            }, tr);
            
           
            if(record.ibmMESUpgradeData!=null && record.ibmMESUpgradeData.trim()!="")
        	{
	        	dojo.create("td", {
	                innerHTML: record.ibmMESUpgradeData
	            }, tr);
        	}
            
            else if(record.technologyRefresh !=null && record.technologyRefresh.trim()!=""){
            	dojo.create("td", {
                    innerHTML: record.technologyRefresh
                }, tr);
            }
            
            else {
            	dojo.create("td", {
                    innerHTML: record.hardwareConsolidation
                }, tr);
            }            
            
            dojo.create("td", {
                innerHTML: record.competitiveData
            }, tr);
            // end
            
            dojo.create("td", {
                innerHTML: record.reveniew
            }, tr);
            
            dojo.create("td", {
                innerHTML: record.IBMExclusivity
            }, tr);
            
           

            if(record.processTurnaronds.length === 0){ // if no turn arounds exist
                dojo.create("td", {
                    colspan: 69
                }, tr);
            }else{
                that.renderTurnaroundInfo(record.processTurnaronds[0], record.flags, tr);
            }
            for(var i = 1; i < record.processTurnaronds.length; i++){
                var tr = dojo.create("tr", {}, table);
                dojo.create("td", {
                    colspan: 13    //defect 8265 changed 12- 13
                }, tr);
                that.renderTurnaroundInfo(record.processTurnaronds[i], record.flags, tr);
            }
        });

        var downloadLinkDiv = dojo.create("div", {});
        var downloadForm = dojo.create("form", {
            name: "downloadForm",
            action: "report",
            method: "post"
        }, downloadLinkDiv);
        dojo.create("input", {
            type: "hidden",
            name: "content",
            value: reportDiv.innerHTML
        }, downloadForm);
        var downloadLink = dojo.create("a", {
            innerHTML: "Download xls file",
            onclick: "javascript: document.downloadForm.submit()",
            style: {
                cursor: "pointer",
                textDecoration: "underline"
            }
        }, downloadLinkDiv);
        myWindow.document.write("<html><body><style>table {border-collapse:collapse;} th, td {border:#000000 1px solid; text-align: center}</style>"
                + "<div style='font-weight: bold; font-size: 1.1em'>" + this.i18n.reportTitle1 + "</div>"
                + "<div style='font-size: 0.9em; padding-bottom:5px'>" + this.i18n.reportTitle2 + "</div>"
                + reportDiv.innerHTML + downloadLinkDiv.innerHTML + "</body></html>");
    },
    getDatesDifference: function(millSeconds){
        var oneMinute = 60 * 1000;
        var oneHour = 60 * oneMinute;
        var oneDay = 24 * oneHour;
        var days = Math.floor(millSeconds / oneDay);
        var hours = Math.floor((millSeconds - days * oneDay) / oneHour);
        var minutes = (millSeconds - days * oneDay - hours * oneHour) / oneMinute === 0 ? 0 : Math.ceil((millSeconds - days * oneDay - hours * oneHour) / oneMinute);
       //17642
       // var checkSign = that.getSign(days);//Added for 18086 - start
        var checkSign = "";
        /*if (days === 0 || isNaN(days))
    		checkSign = -1;
    	else
    		 checkSign = 1;
        
        if(checkSign == -1){ 
        	return "N/A";
        }else{   
        	return days + " days/" + hours + " hours/" + minutes + " minutes";
        }*/
        
        if(days !== 0 || isNaN(days)){
        	checkSign = 1;   
        	return days + " days/" + hours + " hours/" + minutes + " minutes";
        }else if(days === 0 || isNaN(days)){
        	checkSign = 1;
        	return "0" + " days/" + hours + " hours/" + minutes + " minutes";
        }else if((days === 0 && hours === 0) || (isNaN(days)) ){
        	checkSign = 1;
			return "0" + " days/" + "0" + " hours/" + minutes + " minutes";
		}else if((days === 0 && hours === 0 && minutes === 0) || (isNaN(days)) ){
			checkSign = -1;
			return "0";
		}
        
	    /*if(checkSign == -1){ 
	    	return "N/A";
	    }else{   
	    	return days + " days/" + hours + " hours/" + minutes + " minutes";
	    }*/
    },
    getSign: function(x){
    	if (x === 0 || isNaN(x)) {
    	    return x;
    	  }
    	  return x > 0 ? 1 : -1;
    },//for defect 18086 ends
    renderTurnaroundInfo: function(process, flags, tr){
    	var that = this;
        // reset taskTurnarounds object
        this.taskTrunarounds = {};
        //prepare taskTurnaounds object
        dojo.forEach(process.taskTurnaounds, function(task){
            that.taskTrunarounds[task.taskName] = {
                
            	//start: task.start ? that.formatDate(new Date(task.start), "yyyy-MM-dd HH:mm:ss") : "",
                //end: task.end ? that.formatDate(new Date(task.end), "yyyy-MM-dd HH:mm:ss") : "",

                start: task.startDateStr ? task.startDateStr : "",
                end: task.endDateStr ? task.endDateStr : "",
                turnaround: (task.end && task.start) ? that.getDatesDifference(task.end - task.start) : ""
            };
        });
        //17341,17937
     
        dojo.create("td", {
         	 innerHTML: process.sendToBPMStr
        }, tr);
        
        dojo.create("td", {
        	
            innerHTML: process.dealRegReviewer
        }, tr);
        dojo.forEach(this.tasksColumnsP1, function(key){
           that.renderTaskTurnaround(key, tr); 
        });
        dojo.create("td", {
            innerHTML: process.bpoReviewer
        }, tr);
        dojo.forEach(this.tasksColumnsP2, function(key){
           that.renderTaskTurnaround(key, tr); 
        });
        dojo.create("td", {
            innerHTML: process.responseToBP
        }, tr);
        dojo.create("td", {
            //innerHTML: process.ibmResponseTs ? this.formatDate(new Date(process.ibmResponseTs), "yyyy-MM-dd HH:mm:ss") : ""
        	innerHTML: process.ibmResponseTsStr ? process.ibmResponseTsStr : ""
        }, tr);
        dojo.create("td", {
            innerHTML: (dojo.indexOf(flags, "I") >= 0) ? "Y" : "N"
        }, tr);
        for(var k = 0; k < 3; k++){
            this.renderSectorTurnaround(process.sectorTurnarounds ? process.sectorTurnarounds[k] : null, tr);
        }
        dojo.forEach(this.tasksColumnsP3, function(key){
           that.renderTaskTurnaround(key, tr); 
        });
    },
    renderTaskTurnaround: function(key, tr){
        if(this.taskTrunarounds[this.constants.taskName[key]]){
            dojo.create("td", {
                innerHTML: this.taskTrunarounds[this.constants.taskName[key]].start
            }, tr);
            dojo.create("td", {
                innerHTML: this.taskTrunarounds[this.constants.taskName[key]].end
            }, tr);
            dojo.create("td", {
                innerHTML: this.taskTrunarounds[this.constants.taskName[key]].turnaround
            }, tr);
        }else{
            for(var i = 0; i < 3; i++){
                dojo.create("td", {
                    innerHTML: "N/A"
                }, tr);
            }
        }
    },
    renderSectorTurnaround: function(sectorTurnaround, tr){
    	if(sectorTurnaround){
            dojo.create("td", {
                innerHTML: sectorTurnaround.name
            }, tr);
            dojo.create("td", {
                innerHTML: sectorTurnaround.response
            }, tr);
            dojo.create("td", {
                //innerHTML: sectorTurnaround.start ? this.formatDate(new Date(sectorTurnaround.start), "yyyy-MM-dd HH:mm:ss") : ""
                innerHTML: sectorTurnaround.startDateStr ? sectorTurnaround.startDateStr : ""
            }, tr);
            dojo.create("td", {
                //innerHTML: sectorTurnaround.end ? this.formatDate(new Date(sectorTurnaround.end), "yyyy-MM-dd HH:mm:ss") : ""
                innerHTML: sectorTurnaround.endDateStr ? sectorTurnaround.endDateStr : ""
            }, tr);
            dojo.create("td", {
                innerHTML: (sectorTurnaround.end && sectorTurnaround.start) ? this.getDatesDifference(sectorTurnaround.end - sectorTurnaround.start) : ""
            }, tr);
        }else{
            for(var j = 0; j < 5; j++){
                dojo.create("td", {
                    innerHTML: "N/A"
                }, tr);
            }
        }
    },
        renderTaskTurnaroundTH: function(taskNames, tr){
        var that = this;
        dojo.forEach(taskNames, function(key){
        	dojo.create("th", {
                innerHTML: that.constants.taskName[key] + " " + that.i18n["taskNameStartTH"]
            }, tr);
            dojo.create("th", {
                innerHTML: that.constants.taskName[key] + " " + that.i18n["taskNameEndTH"]
            }, tr);
            dojo.create("th", {
                innerHTML: that.constants.taskName[key] + " " + that.i18n["taskNameTurnaroundTH"]
            }, tr);
        });
    }
});
