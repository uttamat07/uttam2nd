dojo.provide("com.ibm.ciolab.core.BaseGrid");

dojo.require("com.ibm.ciolab.core._UtilMixin");
dojo.require("dojox.grid.DataGrid");
dojo.require("dojox.data.ServiceStore");
dojo.require("dijit.layout.ContentPane");

dojo.declare("com.ibm.ciolab.core.BaseGrid", [dojox.grid.DataGrid, com.ibm.ciolab.core._UtilMixin], {
    widgetName : null,
    style: "width:100%",
    "class": "baseGridWidget",
    service: null,
    fields: [],   //fields to be displayed
    storeParams: null,  //parameters to be passed to store
    queries: [],
    columnStyle :"border:none !important;color:#000000;padding:10px 5px;vertical-align:middle;outline:none;word-wrap:break-word;",//story 5627
    headerStyle: "color:#000000 !important;cursor:pointer;outline:none;border:none;padding:2px 5px",//story 5627
    noDataMessage: "No record found!",
    errorMessage: "Sorry, an error occurred, please try again later!",
    autoHeight: true,
    //	autoRender: true,
    //autoWidth: true,
    columnReordering: true,
    selectable: true,
    unsortableCols: [],
    paging: false,
    datePattern: "MM/dd/yyyy",
    
    constructor: function(params){
        dojo.mixin(this, params);
        this.layout = this.structure = this.getStructure();
    },
    
    initialize: function(){
        this.updateGrid();
    },
    
    _getStore: function(){
        this.storeParams || (this.storeParams = []);
        if(dojo.isArray(this.storeParams)){
            //checking for invalid params
            var invalidParams = dojo.filter(this.storeParams, function(p){
                return !(this[p] || this[p]===false);
            }, this);
            if(invalidParams.length){
                throw dojo.string.substitute("Params ${0} check failed for ${1}", [invalidParams, this.declaredClass]);
            }
            if(!this.service){
                throw "No service for " + this.declaredClass;
            }
            var params = dojo.map(this.storeParams, function(p){
                return this[p];
            }, this);
            return new dojox.data.ServiceStore({
                service: this.service,
                _doQuery :function(){
                    return this.service.apply(null, params);
                }
            });
        }else{
            throw dojo.string.substitute("store params for ${0} should be Array!", [this.declaredClass]);
        }
    },
    
    getStructure: function(){
        var cells = dojo.map(this.fields, function(f, i){
            return this._cellNormalize(f, i);
        }, this);
        return {noscroll: false, cells: cells};
    },
    /**
     * override for column reordering
     */
    onMoveColumn: function(){
        //this.inherited(arguments);
        this.updateGrid();
    },
    
    //over write the method so as to add sort filter to background service
    setSortInfo: function(inSortInfo){
        if(this.canSort(inSortInfo)){
            this.sortInfo = inSortInfo;
            var sortProps = this.getSortProps()[0] ;
            this.sortQuery = {
                type: "sort",
                property: sortProps["attribute"],
                value: (sortProps["descending"] ? "desc" : "asc")
            };
            this.updateGrid();
        }
    },
    /**
     * when pagination widget change the page number, call pageChanged funciton of grid.
     */
    pageChanged: function(pageNo){
        pageNo || (pageNo = 1);
        this.pageQuery = {
            type: "page",
            property: pageNo,
            value: 5    //default page size
        };
        this.updateGrid();
    },
    /**
     *update the grid, props will be mixed into the grid during the update process if provided!
     */
    updateGrid: function(){
        // build the filters
        this.queries = [];
        if(!this.clientSideSupport){
            if(dojo.isArray(this.filterQuery)){
                this.queries = this.queries.concat(this.filterQuery);
            }
            this.sortQuery && this.queries.push(this.sortQuery);
            this.paging && this.pageQuery && this.queries.push(this.pageQuery);
        }
        this.store = this._getStore();
        this.setStore(this.store);
        //this._refresh(true);
    },
    /**
     * normalize the field provide by user into a cell that can be used in grid structure
     */
    _cellNormalize: function(field, index){
        var temp, hidden, styles, headerStyles, formatter;
        formatter = dojo.isFunction(temp = field["formatter"]) ? 
            temp : dojo.isFunction(temp = this[field.field + "Formatter"]) ? 
            temp : this.defaultFormatter;
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
        return new dijit.layout.ContentPane({
            "content": html,
            "onClick":func
        });
    },
    
    /**
     *default formatter, deals with empty value, bool and date
     */
    defaultFormatter: function(value){
        if(value && value.time){
            return this.grid.formatDate(new Date(value.time), this.grid.datePattern);
        }else if(typeof value === "boolean"){
            return value ? "Yes" : "No";
        }else{
            return value || this.grid.defaultCell || "";
        }
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
        return dojo.indexOf(this.unsortableCols, Math.abs(col)) === -1;
    },
    
    /**
     * bind default cell click event
     */
    onCellClick: function(e){
        var cb = this[e.cell.click || e.cell.field+"Click"];
        if(dojo.isFunction(cb)){
            cb(e.grid, e.cell, e.rowIndex);
        }else{
            this.inherited(arguments);
        }
    },
    /**
     * override this method to disable this "no data message"
     */
    _onFetchBegin: function(size, req){
        if(!this.scroller){
            return;
        }
        if(this.rowCount != size){
            if(req.isRender){
                this.scroller.init(size, this.keepRows, this.rowsPerPage);
                this.rowCount = size;
                this._setAutoHeightAttr(this.autoHeight, true);
                this._skipRowRenormalize = true;
                this.prerender();
                this._skipRowRenormalize = false;
            }else{
                this.updateRowCount(size);
            }
        }
        this.showMessage();
    },
    
    _onFetchComplete: function(resultSet, args){
        var items = [];
        if(dojo.isArray(resultSet)){//client side refresh
            items = resultSet;
        }else{
            items = resultSet.items.list;
            if(this.clientSideSupport){
                this.items = items;
            }
        }
        items = this._processResult(this.clientSideSupport ? this.items : items);
        this._resize();
        arguments[0] = items;
        arguments[1].results = items;
        if(!items.length){
            this.showMessage(this.noDataMessage);
        }
        this.inherited(arguments);
        this.updateRowCount(items.length);
        this.noDataMessage = "No record found!";
    },
    onFetchError: function(err){
        err && (this.errorMessage += ("<br>"+err.error.msg));
        if(/ResultSet .+ circular reference/i.test(err.error.msg)){
        	console.debug("circular error, refresh grid!");
        	this.updateGrid();
        }
        this.inherited(arguments);
    },
    _processResult: function(result){
        return result;
    }
});
