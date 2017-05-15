dojo.provide("com.ibm.ciolab.core.DialogNew");

dojo.require("dijit.Dialog");
dojo.require("com.ibm.ciolab.core.Button");
dojo.require("dojo.cookie");
dojo.require("com.ibm.ciolab.dr.mytasks.ViewForm");

dojo.declare("com.ibm.ciolab.core.DialogNew", [dijit.Dialog], {
    "data-dojo-i18n": true,
    baseClass: "v17-dialog",
    templateString: dojo.cache("com", "ibm/ciolab/core/templates/DialogNew.html"),
    contentWidget: null,
    
    newInstance: function(){
        return new this.constructor();
    },
    alert: function(content, okCb){
        //  summary:
        //      Display dialog with only one "Ok" button
        this.clear().set({"content": content, "button": {"label":"Ok", "cb": okCb}}).show();
    },
    confirm: function(content, okCb, cancelCb){
        //  summary:
        //      Display with two buttons, "Ok" and "Cancel"
        this.clear().set({
            "content": content, 
            "button": [
                    {"label":"Yes", "cb": okCb},
                    {"label":"No", "cb": cancelCb}
                ]}
        ).show();
    },
    info: function(content, submitCb){
        //  summary:
        //      Display dialog with button "Submit"
        this.clear().set({"content": content, "button": {"label":"Submit", "cb": submitCb}}).show();
    },
    showErrorMsg: function(msg){
        var msgDiv = dojo.query(".ibm-error", this.domNode)[0];
        if(msgDiv){
            msgDiv.innerHTML = msg;
        }else{
            this.newInstance().alert(msg);
        }
    },
    _setContentAttr: function(/*com.ibm.ciolab.core._Widget|String|DomNode|Nodelist*/ content){
        //console.debug("_setContentAttr", content);
        if(content.declaredClass){//widget as content
            this.contentWidget = content;
        }else{
            this.inherited(arguments);
        }
        return this;
    },
    _setButtonAttr: function(buttons){
        if(!dojo.isArray(buttons)){
            buttons = [buttons];
        }
        dojo.forEach(buttons, function(button){
            var b = new com.ibm.ciolab.core.Button({
                "label": button.label
            });
            b.placeAt(this.buttonContainer);
            var callback = "hide";
            if(dojo.isFunction(button.cb)){
                callback = function(){
                    button.cb.call(b, this, button.data);
                };
            }
            dojo.connect(b, "onClick", this, callback);
            
        }, this);
        return this;
    },
    clear: function(){
        /**
         * clear content and buttons
         */
        dojo.forEach(dijit.findWidgets(this.buttonContainer), function(w){w.destroy();});
        if(this.contentWidget){
            this.contentWidget.destroy();
            this.contentWidget = null;
        }
        this.containerNode.innerHTML = "";
        return this;
    },
    onShow: function(){
        if(this.contentWidget){
            this.contentWidget.placeAt(dojo.create("div", {}, this.containerNode));
            this.contentWidget.containerDialog = this;
            this.contentWidget.initialize();
        }
    },
    onHide: function(){
        var self = this;
        if('0' !== this.id.charAt(this.id.length-1)){
            setTimeout(function(){
                console.debug("destory dialog " + self.id);
                self.destroyRecursive();
            }, 1000);
        }
    },
    
    dialoghide: function(cb, context){
      this.inherited(arguments);
      if(dojo.isFunction(cb)){
          cb();
      }
  },
//    hide: function(cb, context){
//        this.inherited(arguments);
//        if(dojo.isFunction(cb)){
//            cb();
//        }
//    },
 
    oNCancel:function(){
    	
    	var viewFormcookie = dojo.cookie("viewFormCookie");
    	var IRCookie = dojo.cookie("IRCookie");
    	//var RegResCookie = dojo.cookie("RegistrationResponseCookie");
    	//var ExtActCookie = dojo.cookie("externalActivitiesCookie");
    
    	 
    	if(viewFormcookie == "viewForm"){
    		var viewFormObject = new com.ibm.ciolab.dr.mytasks.ViewForm();
    		viewFormObject.oNCancel();
    	}
    	else if(IRCookie == "IR"){
    		var IRObject = new com.ibm.ciolab.dr.mytasks.ReviewRegistrationRequest();
    		IRObject.oNCancel();
    	}
    	/*else if(RegResCookie == "RegistrationResponse"){
    		console.log("Coming to RegRes Cookie");
    		var RegResObject = new com.ibm.ciolab.dr.mytasks.RegistrationResponse();
    		RegResObject.oNCancel();
    	}
    	else if(ExtActCookie == "externalActivities"){
    		console.log("Coming ExtAct Cookies");
    		var ExtActObject = new com.ibm.ciolab.dr.mytasks.ExternalActivities();
    		ExtActObject.oNCancel();
    	}*/  	
    	
    	
    	
    	var widget_flag = window.SelectedCheckBox;
    	if(window.SelectedCheckBoxEvent != undefined && window.SelectedCheckBoxEvent != null){//Defect 29704 fix
	    	if(widget_flag != undefined && widget_flag != null){
		    	var getValue_flag = widget_flag.get("value");
		    	if (getValue_flag == "on" ){
		    	widget_flag.set("value", false);
		    	   	main.getService(main.constants.serviceURL.DEALREG, "flagRequest")(window.flagProcessId, false); //Defect 29704 fix
			    	if(viewFormcookie == "viewForm"){
				    	var finalLoc = window.location.href.substr(0, window.location.href.indexOf("&flagged=", 0)+9) + "N"; //Defect 29704 fix
		                window.location.href = finalLoc; //Defect 29704 fix
			    	}
                window.flagValue = "N"; //Defect 29704 fix
		    	} else {
		    	widget_flag.set("value", true);
		    	main.getService(main.constants.serviceURL.DEALREG, "flagRequest")(window.flagProcessId, true);//Defect 29704 fix
		    	if(viewFormcookie == "viewForm"){
			    	var finalLoc1 = window.location.href.substr(0, window.location.href.indexOf("&flagged=", 0)+9) + "Y";//Defect 29704 fix
	                window.location.href = finalLoc1;//Defect 29704 fix
		    	}
                window.flagValue = "Y";//Defect 29704 fix
		    	}
		    	window.SelectedCheckBox = null;	
		    	window.flagProcessId = null;//Defect 29704 fix
	    	}    
	    	window.SelectedCheckBoxEvent = null;//Defect 29704 fix
    	}	
    	
    	var widget_IVR = window.SelectedCheckBoxIVR;    	
    	if(window.SelectedCheckBoxIVREvent != undefined && window.SelectedCheckBoxIVREvent != null){  //Defect 29704 fix
	    	if(widget_IVR != undefined && widget_IVR != null){
			   	var getValue_IVR = widget_IVR.get("value");
			   	if (getValue_IVR == "on"){
			      	widget_IVR.set("value", false);
			      	main.getService(main.constants.serviceURL.DEALREG, "updateIVR")(window.ivrRequestId, false);//Defect 29704 fix
			      	/*var finalLoc = window.location.href.substr(0, window.location.href.indexOf("&flagged=", 0)+9) + "N";//Defect 29704 fix
	                window.location.href = finalLoc;//Defect 29704 fix
                	window.flagValue = "N";//Defect 29704 fix*/
			       } else {
			      	widget_IVR.set("value", true);
			      	main.getService(main.constants.serviceURL.DEALREG, "updateIVR")(window.ivrRequestId, true);//Defect 29704 fix
			      	/*var finalLoc1 = window.location.href.substr(0, window.location.href.indexOf("&flagged=", 0)+9) + "Y";//Defect 29704 fix
	                window.location.href = finalLoc1;//Defect 29704 fix
	                window.flagValue = "Y";//Defect 29704 fix*/
			       }
			   	window.SelectedCheckBoxIVR = null;	
			   	window.ivrRequestId = null;//Defect 29704 fix
	    	}
	    	window.SelectedCheckBoxIVREvent = null; //Defect 29704 fix
    	}
    	
    	console.log(" window.SelectedCheckBoxParityEvent ==> " + window.SelectedCheckBoxParityEvent);
    	var widget_Parity = window.SelectedCheckBoxParity;    	
    	if(window.SelectedCheckBoxParityEvent != undefined && window.SelectedCheckBoxParityEvent != null){ //Defect 29704 fix
	    	if(widget_Parity != undefined && widget_Parity != null){
			   	var getValue_Parity = widget_Parity.get("value");
			  	if (getValue_Parity == "on"){
			       	widget_Parity.set("value", false);
			       	main.getService(main.constants.serviceURL.DEALREG, "updateParity")(window.parityRequestId, false);//Defect 29704 fix
			       /*var finalLoc = window.location.href.substr(0, window.location.href.indexOf("&flagged=", 0)+9) + "N";//Defect 29704 fix
	                window.location.href = finalLoc;//Defect 29704 fix
	                window.flagValue = "N";//Defect 29704 fix*/
			        } else {
			        widget_Parity.set("value", true);
			        main.getService(main.constants.serviceURL.DEALREG, "updateParity")(window.parityRequestId, true);//Defect 29704 fix
			        /*var finalLoc1 = window.location.href.substr(0, window.location.href.indexOf("&flagged=", 0)+9) + "Y";//Defect 29704 fix
	                window.location.href = finalLoc1;//Defect 29704 fix
	                window.flagValue = "Y";//Defect 29704 fix*/
			        }
			  	window.SelectedCheckBoxParity = null;	
			  	window.parityRequestId = null;//Defect 29704 fix
	    	}
	    	window.SelectedCheckBoxParityEvent = null;//Defect 29704 fix
    	}
    	this.hide();
    	
    }
});