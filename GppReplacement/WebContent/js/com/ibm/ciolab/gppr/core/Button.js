dojo.provide("com.ibm.ciolab.core.Button");

dojo.require("dijit.form.Button");

dojo.declare("com.ibm.ciolab.core.Button", [dijit.form.Button], {
    showLoading: function(){
        dojo.style(this.focusNode, {
            background: "url('theme/image/ajax-loader-small.gif') no-repeat 0 1px"
        });
        this.set("disabled", true);
    },
    hideLoading: function(){
        dojo.style(this.focusNode, {
            background: "none"
        });
        this.set("disabled", false);
    }
});