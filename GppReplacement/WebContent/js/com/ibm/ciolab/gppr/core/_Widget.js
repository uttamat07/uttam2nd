dojo.provide("com.ibm.ciolab.core._Widget");

dojo.require("dijit._WidgetBase");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.ciolab.core._UtilMixin");
dojo.require("dijit.layout.BorderContainer");
dojo.require("com.ibm.ciolab.Constants");

dojo.requireLocalization("com.ibm.ciolab.core", "_Widget");

dojo.declare("com.ibm.ciolab.core._Widget", [dijit._Widget, dijit._Templated, com.ibm.ciolab.core._UtilMixin], {
    i18n: {},
    widgetsInTemplate: true,
    templateString: "<div></div>",
    loadingDiv: null,
	constants: new com.ibm.ciolab.Constants(),
	postMixInProperties: function(){
		dojo.mixin(this.i18n, dojo.i18n.getLocalization("com.ibm.ciolab.core", "_Widget"));
	},
    postCreate: function(){
        for(var i=0; i<this._attachPoints.length; i++){
            var element = this._attachPoints[i];
            if(dojo.hasAttr(this[element],"data-dojo-i18n") || this[element]["data-dojo-i18n"]){
                if(this[element].containerNode){
                    this[element].containerNode.innerHTML = this.i18n[element];
                }else{
                    this[element].innerHTML = this.i18n[element];
                }
            }
        }
    },
    initialize: function(){},
    finalize: function(){},
    showChild: function(widget){
        var that = this;
        dojo.forEach(this.childrenContainer.getChildren(),function(childWidget){
            childWidget.finalize();
            that.childrenContainer.removeChild(childWidget);
        });
        this.childrenContainer.addChild(widget);
        widget.showLoading();
        dojo.when(widget.initialize(), function(){
            widget.hideLoading();
        });
    },
    showLoading: function(loadingMessage){
        dojo.style(this.domNode, "display", "none");
        if(dojo.byId("widgetLoadingDiv") == null){
            this.loadingDiv = dojo.create("div",{
                id: "widgetLoadingDiv",
                style:{
                    textAlign: "center",
                    verticalAlign: "middle",
                    lineHeight: "250px",
                    fontSize: "1.1em"
                }
            }, this.domNode, "after");
            dojo.create("span", {
                "class": "loadingIcon"
            }, this.loadingDiv);
            this.loadingMessageDiv = dojo.create("span", {
                innerHTML: loadingMessage || this.i18n.widgetLoadingMessage,
                style: {
                    paddingLeft: "5px"
                }
            }, this.loadingDiv);
        }
    },
    hideLoading: function(){
        dojo.style(this.domNode, "display", "block");
        dojo.destroy(dojo.byId("widgetLoadingDiv"));
    },
    changeLoadingMessage: function(message){
        this.loadingMessageDiv.innerHTML = message;
    }
});