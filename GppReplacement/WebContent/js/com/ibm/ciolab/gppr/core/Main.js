dojo.provide("com.ibm.ciolab.core.Main");

dojo.require("dojo.hash");
dojo.require("com.ibm.ciolab.core._Widget");
dojo.require("com.ibm.ciolab.core.Login");
dojo.require("com.ibm.ciolab.core.Dialog");
dojo.requireLocalization("com.ibm.ciolab.core", "Main");

dojo.declare("com.ibm.ciolab.core.Main", [com.ibm.ciolab.core._Widget], {
	templateString: dojo.cache("com", "ibm/ciolab/core/templates/Main.html"),

	currentPage: "",
	currentUser: null,
	lastHash: "",
	serviceCache: [],

	unsecuredPages: [], // need set in project Main widget

	loginPage: null,
	
	currentWidget: [],
    
    dialog: null,
	
    
    constructor : function(){
    	
    	globalObj = this;
    },
	postMixInProperties: function(){
		dojo.mixin(this.i18n, dojo.i18n.getLocalization("com.ibm.ciolab.core", "Main"));
        this.dialog = new com.ibm.ciolab.core.Dialog();
		this.inherited(arguments);
	},
	
	initialize: function(){
		var that = this;
		this.showLoading();
		this.currentPage = (dojo.hash() || this.constants.homePage);
		this.currentWidget[0] = this;
		//5255
		dojo.subscribe("comments/saved", dojo.hitch(this, "handleHash"));
		dojo.subscribe("/dojo/hashchange", dojo.hitch(this, "handleHash"));
		dojo.subscribe("need/login", function(){
	        that.dialog.hide(); //close dialog if there's any
	        dojo.hash("Login");
		});
		dojo.subscribe("select/tabs", this, "setMenuItemSelected");
		dojo.subscribe("user/login/success", function(user){
			that.currentUser = user;
			that.showUserProfile(user);
			if(that.currentPage && that.currentPage!="Login"){
				dojo.hash(that.currentPage);
			}else{
				dojo.hash(that.constants.homePage);
			}
			that._renderMenuItems();
		});
        dojo.byId("projectName").innerHTML = this.i18n.projectName;
		dojo.byId("pageName").innerHTML = this.i18n.projectName;
		return dojo.xhrPost({
			url: that.constants.serviceURL.TUSCANY,
			handleAs: "json",
			handle: function(data){
				that._renderMenuItems();
				if(!data.error){//session avaliable
					that.getService(that.constants.serviceURL.TUSCANY, "getUserInfo")().then(function(user){
						that.hideLoading();
						if(user){
							that.currentUser = user;
							that.showUserProfile(user);
						}
						if(dojo.hash() == ""){
							dojo.hash(that.currentPage);
						}else{
							that.handleHash(that.currentPage);
						}
					});
				}else{
					that.hideLoading();
					if(dojo.hash() == ""){
						dojo.hash(that.currentPage);
					}else{
						that.handleHash(that.currentPage);
					}
					if(that.currentPage != "Login"){
						that.showSignIn();
					}
				}
			}
		});
	},
	showUserProfile: function(user){
		var ssoDiv = dojo.byId("ibm-sso");
		dojo.addClass(ssoDiv, "ibm-profile-links-divider");
		dojo.empty(ssoDiv);
		var thumbnail = dojo.create("span",{
			"class":"ibm-thumbnail"
		},ssoDiv);
		dojo.create("img",{
			width:25,
			height:25,
			src:this.constants.BLUEPAGES_IMAGE_API_URL+user.intranetId,
			alt: "Login User Image"
		},thumbnail);

		var welcome = dojo.create("a",{
			"class":"ibm-user",
			innerHTML:this.i18n.welcomeBack
		},ssoDiv);
		dojo.create("span",{
			id:"ibm-user-name",
			style:{
				"paddingLeft":"5px"
			},
			innerHTML:user.name
		},welcome);
		if(!dojo.byId("ibm-portal-logout-link")){
			var logoutDiv = dojo.create("div", {
			    id: "ibm-portal-logout-link",
			    "class": "ibm-profile-links-divider ibm-profile-links-divider--transparent"
			}, dojo.byId("ibm-profile-links"));
			var logout = dojo.create("a",{
				innerHTML:this.i18n.logout
			},logoutDiv);
	    }
		dojo.connect(logout, "click", dojo.hitch(this, "_logout"));
	},
	showSignIn: function(){
		var ssoDiv = dojo.byId("ibm-sso");
		dojo.removeClass(ssoDiv);
		dojo.empty(ssoDiv);
		dojo.destroy(dojo.byId("ibm-portal-logout-link"));
		dojo.create("span",{
			"class":"ibm-thumbnail"
		},ssoDiv);
		dojo.create("a",{
			innerHTML: this.i18n.login,
			"class": "ibm-sso-signin",
			href: "#Login"
		},ssoDiv);
	},
	getMenuItems: function(){
	// description:
	//		get avaialiable menu items according with context(login status/user/user role/etc.)
	//		should be implements in project main widget to show the menu bar of project
	},
	_logout: function(){
		var that = this;
		dojo.xhrGet({
			url: "ibm_security_logout",
			handleAs: "text",
			preventCache: true,
			handle: function(data, ioargs) {
				if (ioargs.xhr.status == 200) {
					that.logoutSuccess();
				} else {
					console.log("logout error");
				}
			}
		});
	},
	logoutSuccess: function(){
		this.currentUser = null;
		this.showSignIn();
		this._renderMenuItems();
		dojo.hash(this.constants.homePage);
        dojo.publish("logout/success");
	},
	handleHash: function(hash){
		//Story 5255-start
		if(globalObj['showPopUp']){
			globalObj['url']= dojo.hash();
			return false;
		}
		if(globalObj['url']!=null || globalObj['url']!=undefined){
			hash=globalObj['url'];
			globalObj['url']=null;
		}
		//Story 5255-end
		var that = this;
		var widgetPath = that._getPathFromHash(hash);
		var currentPath;
		if(widgetPath[0] !== this.constants.loginPage){
			currentPath = widgetPath.join("/");
			this.currentPage = dojo.hash();
		}
		var param = that._getParamFromHash();
		var menuItems = this.getMenuItems();
		var functionNeedFire = false;
		if(widgetPath){
			// if user already login|visit Login page|page is avaiable for non-login user then show the page 
			// otherwise go to login page. use AAA/* to let all pages under AAA accessible for non-login user
			var isUnsecuredPage = dojo.indexOf(this.unsecuredPages,currentPath)>-1;
			if(!isUnsecuredPage){
				for(var j = 0; j < widgetPath.length; j++){
					if(dojo.indexOf(this.unsecuredPages, widgetPath.slice(0, j).join("/") + "/*") > -1){
						isUnsecuredPage = true;
						break;
					}
				}
			}
			
			var hasAccess = false;
			if((!(widgetPath[0]=="Login" || isUnsecuredPage)) && this.currentUser != null){
				
				hasAccess = that.checkHashAccess(widgetPath, menuItems);
				
				if(!hasAccess){
					that.dialog.showErrorMsg(this.i18n.accessError);
					return;
				}
			}

			var navigationBar = dojo.byId("ibm-navigation-trail");
			dojo.empty(navigationBar);

			if(this.currentUser || widgetPath[0]=="Login" || isUnsecuredPage){
				for(var i = 0; i < widgetPath.length; i++){
					var menuItem = dojo.filter(menuItems, function(item){
						// get the menu item with current hash value
						// because we set default subtab hash in main tab 
						// we just compare first level of hash for main tab item
						return item.hash && 
						((item.hash.split("/").slice(0, i+1).join("/")) === widgetPath.slice(0, i+1).join("/"));
					});
					var navText = "";
					if(menuItem.length > 0){
						navText = menuItem[0].text || widgetPath[i];
						menuItems = menuItem[0].subtabs || [];
					}else{
						navText = widgetPath[i];
						menuItems = [];
					}
					dojo.create("li", {
						innerHTML: navText
					},navigationBar);
					var functionName = "display"+widgetPath[i];
					if(!this.lastHash || !this.lastHash[i] || widgetPath[i] != this.lastHash[i] || functionNeedFire){
						functionNeedFire = true;
						if(dojo.isFunction(this.currentWidget[i][functionName])){
							if(i == widgetPath.length - 1){
								if(param){
									this.currentWidget[i][functionName](param);
								}else{
									this.currentWidget[i+1] = this.currentWidget[i][functionName]();
								}
							}else{
								this.currentWidget[i+1] = this.currentWidget[i][functionName]();
							}
						}
					}
				}
			}else{
				this._renderMenuItems();
				dojo.hash("Login");
			}
			this.lastHash = widgetPath;
		}
	},
	_getPathFromHash: function(hash){
		var h = (hash || dojo.hash());
		return h.split("?")[0] && h.split("?")[0].split("/");
	},
	_getParamFromHash: function(){
		var param = {};
		if(dojo.hash().split("?")[1]){
			dojo.forEach(dojo.hash().split("?")[1].split("&"), function(item){
				var obj = item.split("=");
				param[obj[0]] = obj[1];
			});
			return param;
		}else{
			return false;
		}
	},
	_renderMenuItems: function(){
		var items = this.getMenuItems();
		dojo.empty(dojo.byId("ibm-primary-tabs"));
		var ul = dojo.create("ul", {
			"class": "ibm-tabs"
		},dojo.byId("ibm-primary-tabs"));
		for(var i=0;i<items.length;i++){
			var li = dojo.create("li",{
				id:items[i].id
			},ul);
			if(i==0){
				dojo.addClass(li, "ibm-active");
			}
			var li_a = dojo.create("a",{
				innerHTML:items[i].text
			},li);
			if(items[i].hash){
				dojo.attr(li_a, "href", "#"+items[i].hash);
			}
			if(items[i].clickEvent){
				dojo.connect(li_a, "click", dojo.hitch(this, items[i].clickEvent));
			}
		}
	},
	_renderSubTabItems: function(items){
		var ul = dojo.create("ul", {
			"class": "ibm-tabs"
		},dojo.byId("ibm-secondary-tabs"));
		for(var i=0;i<items.length;i++){
			var li = dojo.create("li",{
				id:items[i].id
			},ul);
			if(i==0){
				dojo.addClass(li, "ibm-active");
			}
			var li_a = dojo.create("a",{
				innerHTML:items[i].text
			},li);
			if(items[i].hash){
				dojo.attr(li_a, "href", "#"+items[i].hash);
			}
			if(items[i].clickEvent){
				dojo.connect(li_a, "click", dojo.hitch(this, items[i].clickEvent));
			}
		}
	},
	setMenuItemSelected: function(id, subtabid){
		// summary:
		//		set one of menu item as selected
		// description:
		//		add ibm-active class in selected menu item and remove class of other items
		this._renderMenuItems();
		dojo.query("#ibm-primary-tabs > ul > li").forEach(function(node){
			dojo.removeClass(node);
		});
		if(dojo.byId(id)){
			var menuItem = dojo.filter(this.getMenuItems(), function(item){
				return item.id === id;
			})[0];
			dojo.empty(dojo.byId("ibm-secondary-tabs"));
			menuItem.subtabs && this._renderSubTabItems(menuItem.subtabs);
			if(subtabid){
				dojo.query("#ibm-secondary-tabs > ul > li").forEach(function(node){
					dojo.removeClass(node);
				});
				if(dojo.byId(subtabid)){
					dojo.addClass(dojo.byId(subtabid), "ibm-active");
					dojo.removeAttr(dojo.byId(subtabid).children[0], "href");
				}
			}
			dojo.addClass(dojo.byId(id), "ibm-active");
			dojo.removeAttr(dojo.byId(id).children[0], "href");
		}
	},
	displayLogin: function(){
		this.currentUser = null;
		dojo.empty(dojo.byId("ibm-sso"));
//		dojo.destroy(dojo.byId("ibm-portal-logout-link"));
		if(this.loginPage==null){
			this.loginPage = new com.ibm.ciolab.core.Login();
		}
		this.showChild(this.loginPage);
	},
	checkHashAccess: function(widgetPath, menuItems){
		var hasAccess = false;
		for(var i = 0; i < widgetPath.length; i++){
			var menuItem = dojo.filter(menuItems, function(item){
				// get the menu item with current hash value
				// because we set default subtab hash in main tab 
				// we just compare first level of hash for main tab item
				var itemHash = item.hash && 
				     ((item.hash.split("/").slice(0, i+1).join("/")) === widgetPath.slice(0, i+1).join("/"));
				
				if(itemHash && "Admin" == item.hash.split("/").slice(0, i+1).join("/"))
				{
					for(var j = 0; j < item.subtabs.length; j++){
					itemHash = (item.subtabs[j].hash.split("/").slice(j+1, j+2).join("/") == widgetPath.slice(j+1, j+2).join("/"))
					}
				}
				return itemHash;
			});
			
			if(menuItem && menuItem.length > 0){
				hasAccess = true;
				break;
			}
		}

		return hasAccess;
	}	
});
