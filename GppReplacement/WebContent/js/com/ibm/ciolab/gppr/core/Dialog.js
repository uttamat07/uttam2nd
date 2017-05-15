dojo.provide("com.ibm.ciolab.core.Dialog");

dojo.require("dijit.Dialog");
dojo.require("com.ibm.ciolab.core.Button");

dojo.declare("com.ibm.ciolab.core.Dialog", [dijit.Dialog], {
    "data-dojo-i18n": true,
    baseClass: "v17-dialog",
    templateString: dojo.cache("com", "ibm/ciolab/core/templates/Dialog.html"),
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
    hide: function(cb, context){
        this.inherited(arguments);
        if(dojo.isFunction(cb)){
            cb();
        }
    }
});