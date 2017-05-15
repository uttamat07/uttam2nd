dojo.provide("com.ibm.ciolab.core.BaseGrid");

dojo.require("dojox.grid.DataGrid");
dojo.require("dojox.data.ServiceStore");
dojo.require("dijit.layout.ContentPane");
dojo.require("com.ibm.ciolab.core.DummyStore");

dojo.declare("com.ibm.ciolab.core.BaseGrid", dojox.grid.DataGrid, {
	widgetName : null,
	style: "width:100%;",
	"class": "base-grid",
	service: null,
	fields: [],   //fields to be displayed
	storeParams: null,  //parameters to be passed to store
	filters: [],
	sortFilter: null,
	customFilters: [],
	columnStyle :"border:none !important;color:#666666;padding:10px;vertical-align:middle;outline:none;",
	headerStyle: "color:#000000 !important;cursor:pointer;outline:none;border:none;padding:10px",
	noDataMessage: "No record found!",
	errorMessage: "Sorry, an error occurred, please try again later!",
	//autoHeight: true,
    //height: "300px",
	//autoRender: true,
    selectable: true,
    columnReordering: true,
	unsortableCols: [],
	FILTER_SORT_ORDER_DESC: "desc",
	FILTER_SORT_ORDER_ASC: "asc",
	constructor: function(params){
        console.debug("b constructor");
		dojo.mixin(this, params);
		this.layout = this.structure = this.getStructure();
        //this.setStore(this._getStore());
	},
	_getStore: function(){
        var self = this;
		this.storeParams || (this.storeParams = []);
		if(dojo.isArray(this.storeParams)){
			var failedParams = [], params = dojo.map(this.storeParams,function(p){
				if(this[p]||this[p]===false){
					return this[p];
				}else{
					failedParams.push(p);
					return null;
				}
			}, this);//.filter(function(p){return !!p;});
			if(failedParams.length){
				this.paramsCheckFail(failedParams);
				return;
			}
			if(!this.service){
				throw "No service for this grid";
			}
            console.debug(this, this.service);
//			return new com.ibm.ciolab.core.DummyStore({
//				"service": self.service
//			});
return new dojox.data.ServiceStore({
				service: this.service,
				_doQuery :function(){
					return this.service.apply(null, params);
				}
			});
		}else{
			throw "Parameters list for store should be Array!";
		}
	},
	paramsCheckFail: function(failedParams){
		if(console && console.warn){
			console.warn("Params check failed!", failedParams);
		}
	},
	getStructure: function(){
		var cells = dojo.map(this.fields, function(f){
			return this._cellNormalize(f);
		}, this);
		return {
			noscroll: true,
			cells : cells
		};
	},
	//over write the method so as to add sort filter to background service
	setSortInfo: function(inSortInfo){
		if(this.canSort(inSortInfo)){
			this.sortInfo = inSortInfo;
			var sortProps = this.getSortProps()[0] ;
			this.sortFilter = {
				filterType:sortProps["attribute"],
				filterValue: (sortProps["descending"]?this.FILTER_SORT_ORDER_DESC:this.FILTER_SORT_ORDER_ASC)
			};
			this.updateGrid();
		}
	},
	/**
     *update the grid, props will be mixed into the grid during the update process if provided!
     */
	updateGrid: function(/*Object*/props){
		// build the filters
		this.filters = [];
		if(this.customFilters && this.customFilters.length > 0){
			this.filters=this.filters.concat(this.customFilters);
		}
		this.sortFilter && this.filters.push(this.sortFilter);
        
		if(dojo.isObject(props)){   //back up the grids properties
			var propsBak = dojo.clone(props);
			for(var prop in props){
				propsBak[prop] = this[prop];
			}
			dojo.mixin(this, props);
		}
		this.store = this._getStore();
		this._refresh(true);
		propsBak && dojo.mixin(this, propsBak); //restore properties
	},
	/**
     * normalize the field provide by user into a cell that can be used in grid structure
     */
	_cellNormalize: function(field, index){
		var temp, hidden, styles, headerStyles, formatter;
		formatter = dojo.isFunction(temp = (field["formatter"] || this[field.field + "Formatter"])) ? temp : (function(value){
			return value;
		});
		hidden = field.hasOwnProperty("hidden") ? !!field["hidden"] : !field.hasOwnProperty("name");
		styles = field["styles"] || this.columnStyle;
		headerStyles = field["headerStyles"] || this.headerStyle;
		field["unsortable"] && this.unsortableCols.push(index+1);
		dojo.mixin(field, {
			"styles": styles,
			"headerStyles": headerStyles,
			"formatter": formatter,
			"hidden": hidden,
			"noresize":true
		});
		return field;
        
	},
	/**
     * wrap the cell html with an widget, and attach the function to it
     */
	cellWithEvent: function(/*String*/html, /*String|Function*/func){
		var that = this, params = Array.prototype.slice.call(arguments, 2);
		func = (func ? (dojo.isFunction(func) ? func : (function(f){
			return function(){
				that[f].apply(that, params);
			};
		})(func)) : null);
		return new cloudburst.widget.SimpleWidget({
			"content": html,
			"onClick":func
		});
	},
	/**
     *truncate text
     */
	truncateFormatter: function(text, length){
		if(text && text.length>length){
			var truncated = text.substr(0, length-3) + "...";
			var div = dojo.create("div", {
				innerHTML: truncated,
				title: "click to expand",
				style: {
					width: "100%",
					cursor:"pointer"
				},
				onclick: function(){
					if(this.innerHTML == text){
						this.innerHTML = truncated;
						this.title = "click to expand";
					}else{
						this.innerHTML = text;
						this.title = "click to fold";
					}
				}
			});
			return new dijit.layout.ContentPane({
				"content": div
			});
		}
		return text;
	},
	/**
     * to determine whether this column can sort or not
     */
	canSort: function(col){
		if(this.unsortableCols.length){
			for(var i in this.unsortableCols){
				if(this.unsortableCols[i]===Math.abs(col)){
					return false;
				}
			}
		}
		return true;
	},
	_onFetchComplete: function(result){
		this._resize();
		this.inherited(arguments);
	},
	onFetchError: function(err){
		err && (this.errorMessage += ("<br>"+err));
		this.inherited(arguments);
	}
});
