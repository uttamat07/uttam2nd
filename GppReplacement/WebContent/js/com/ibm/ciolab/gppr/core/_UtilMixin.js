dojo.provide("com.ibm.ciolab.core._UtilMixin");

dojo.require("dojo.rpc.JsonService");
dojo.require("dojox.encoding.digests.SHA1");

dojo.declare("com.ibm.ciolab.core._UtilMixin", null, {
	serviceCache: {},
	callback: null,
	getService : function(serviceUrl, serviceName){
        var that = this;
		if(serviceUrl && serviceName){
			var service = null;
			if(this.serviceCache[serviceUrl]){
				service = this.serviceCache[serviceUrl];
			}else{
				service = new dojo.rpc.JsonService(serviceUrl);
				service.resultCallback = function(/* dojo.Deferred */ deferredRequestHandler){
					var tf = dojo.hitch(this,
						function(obj){
							if(obj.error!=null){
								deferredRequestHandler.errback(obj);
								if(typeof obj.error == 'object' && obj.error.code=="403"){
									dojo.publish("need/login");
								}else{
									var msg = obj.error.msg;
									if(msg === "Record can not be deleted!"){
										main.dialog.alert("<h3 class='ibm-errorLarge-link' style='padding:5px 5px 5px 40px !important'>" +
												"Action not permitted</h3><p>This record is in use and cannot be deleted from the system.</p>");
									}else if(/Customer (\S+) Already Exists/.test(msg)){
										main.dialog.alert("<h3 class='ibm-errorLarge-link' style='padding:5px 5px 5px 40px !important'>" +
										"Duplicate customer name</h3><p>A customer with the End User name, "
												+ RegExp.$1 + ", already exists. Enter a new name or Cancel and locate the existing customer.</p>");
									}else if(/Timeoff (\S+) Already Exists/i.test(msg)){
										main.dialog.alert("<h3 class='ibm-errorLarge-link' style='padding:5px 5px 5px 40px !important'>" +
												"Time-off period already exists</h3><div style='padding-top:15px;width:620px;line-height:25px;'>An overlapping Time-off period already exists for this user. You cannot create overlapping time-off periods.If the overlapping period is <I>Activated</I> it must be deactivated.If the overlapping time-period is <I>Unactivated</I> it needs to be edited or deleted in order for this time-off period to be created.</div>");
									}else if(/ResultSet .+ circular reference/i.test(msg)){
										//do not popup error alert if it's circular reference exception, will handle it in grid
									}else if(msg.substring(0, 5).toLowerCase()=="alert"){
										main.dialog.alert("<h3 class='ibm-errorLarge-link' style='padding:5px 5px 5px 40px !important'>Alert</h3><p>" + msg.substring(6) + "</p>");
									}else{
										main.dialog.alert("<h3>Server Error</h3>"+msg);
									}
                                }
							}else{
								deferredRequestHandler.callback(this.parseResults(obj));
							}
						});
					return tf;
				};
				if(service.smd.error && service.smd.error.code=="403"){
					dojo.publish("need/login");
				}
				this.serviceCache[serviceUrl] = service;
			}
			if(service[serviceName]){
				//provide an empty cancel callback to avoid error throwing
				service[serviceName].cancel = function(){};
				return service[serviceName];
			}else{
				this.serviceCache[serviceUrl] = null;
				dojo.publish("need/login");
				return null;
			}
		}else{
			console.log("Parameter serviceUrl or serviceName is missing!");
			return null;
		}
	},
        formatDate: function(/* String|Date */ obj, /* String */ pattern){
            /**
             * format a date object into a date string, or a date string into a date object
             */
            return dojo.date.locale[dojo.isString(obj)?"parse":"format"](obj, {datePattern: pattern||"MM/dd/yyyy", selector: "date"});
        },
        uid: function(/* Object */object){
            /**
             * generate a unique id based on the object, 
             * random unique id is generated is object is provide
             */
            var prefix = "uid-", i = 0;
            return function(object){
                return arguments.length ? (dojox.encoding.digests.SHA1(dojo.toJson(object))) : (prefix + (++i));
            };
        }(),
        newFilledArray: function(len, val) {
            /**
             *create a array with default value
             */
            var rv = new Array(len);
            while (--len >= 0) {
                rv[len] = val;
            }
            return rv;
        },
        parseHtml: function(/* String */ html){
            /**
             * parse html string into dom nodes which is contained in a html fragment
             */
            var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
            temp.innerHTML = html;
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            return frag;
        }
});