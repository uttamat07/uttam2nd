dojo.provide("com.ibm.ciolab.core.Login");

dojo.require("dijit.form.ValidationTextBox");
dojo.require("com.ibm.ciolab.core._Widget");
dojo.require("com.ibm.ciolab.core.Button");

dojo.requireLocalization("com.ibm.ciolab.core", "Login");

dojo.declare("com.ibm.ciolab.core.Login", [com.ibm.ciolab.core._Widget], {
    templateString: dojo.cache("com", "ibm/ciolab/core/templates/Login.html"),
    postMixInProperties: function(){
		dojo.mixin(this.i18n, dojo.i18n.getLocalization("com.ibm.ciolab.core", "Login"));
	},
    postCreate: function(){
        var that = this;
        this.inherited(arguments);
        dojo.connect(this,"onKeyPress", function(evt) {
            var key = evt.keyCode;
            if(key == dojo.keys.ENTER) {
                that.login();
            }
            evt.stopPropagation();
        });
    },
    login: function(){
        var that = this;
        this.loginButton.showLoading();
        //that.specialAPI(); Just for RND 
        var xhrArgs = {
            url : "j_security_check",//that.Constants.loginSettings.login,
            handleAs: "text",
            content : {
                j_username: that.userNameInput.get("value"),
                j_password: that.userPassword.get("value")
            },
            handle: function(data) {
                if(data === "failed"){
                    that.loginFailed();
                }else{
                	that.loginSuccess();
                }
            }
        };
        dojo.xhrPost(xhrArgs);
    },
    loginSuccess: function(){
        var that = this;
        this.getService(this.constants.serviceURL.TUSCANY, "getUserInfo")().then(function(result){
            dojo.publish("user/login/success", [result]);
            that.loginButton.hideLoading();
        });
    },
    loginFailed: function(){
        dojo.style(this.loginFailedText,"display","block");
        this.userPassword.set("value", "");
        this.loginButton.hideLoading();
    },
    
    
    /*
     * Just for RND
     * specialAPI:function(){
         	console.log("CLICKED EVENT CALLED :::::::::::: ");
         	var xhrArgs= {
               url: "https://w3-dev.api.ibm.com/bp/test/gpp/opportunity/incentive/eligibility?ceid=10ait1j7&lvl20='BK100','BM990','BPB00', 'BQ400', 'BSS00'&client_id=174118fb-7133-4ca3-abad-566aadb95839",              
               headers : {
            	    'Accept' : 'application/json',
            	    'Content-Type' : 'application/json;charset=utf-8',
            	},
               load: function(responseObj){
            	   responseObj = dojo.fromJson(responseObj);
              	  console.log("RESPONSE OBJECT :::::::::::: "+responseObj);
              	  console.log("RESPONSE COTAINS ::::::::::: "+JSON.stringify(responseObj));
               }
             };
         	dojo.xhrGet(xhrArgs);         
    }*/
    
});