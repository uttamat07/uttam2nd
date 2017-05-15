dojo.provide("com.ibm.ciolab.core.DummyStore");


dojo.declare("com.ibm.ciolab.core.DummyStore", null, {
    service: null,//main.getService(main.constants.serviceURL.TUSCANY, "getData"),
    
    constructor: function(options){
        console.debug("store constructor", this, options);
        dojo.mixin(this, options);
    },
    
	fetch: function(args){
        args = args || {};
        console.debug(args);
        var self = this;

        var scope = args.scope || self;
        var defResult = this.service();
        defResult.request = args;
        defResult.addCallback(function(results){
            var resultSet = {
              "totalCount": results.length,
              "items": results
            };
            if(args.onBegin){
                args.onBegin.call(scope, resultSet.totalCount, args);
            }
            if(args.onComplete){
                args.onComplete.call(scope, resultSet, args);
            }
            return results;
        });
        defResult.addErrback(args.onError && function(err){
            return args.onError.call(scope, err, args);
        });
        args.abort = function(){
            // abort the request
            defResult.cancel();
        };
        args.store = this;
        return args;
    },
    getFeatures: function(){
			return {
				"dojo.data.api.Read": true
			};
    }
});
