dojo.provide("com.ibm.ciolab.core.Pagination");

dojo.require("dojo.cache");
dojo.require("com.ibm.ciolab.core._Widget");

dojo.declare("com.ibm.ciolab.core.Pagination", [com.ibm.ciolab.core._Widget], {
	// summary:
	//		Pagination widget for DataGrid
	// description:
	//		This is a pagination widget for datagrid, show total number of records
	//		and publish a event named gridId+"/PageNumber/Changed" with the current page number when change page number
	// example:
	// |	var datagrid = new com.ibm.ciolab.core.DataGrid();
	// |	var pagination = new com.ibm.ciolab.core.Pagination({targetGrid:datagrid});
	// Or
	// |	var datagrid = new com.ibm.ciolab.core.DataGrid({id:"grid1"});
	// |	var pagination = new com.ibm.ciolab.core.Pagination({gridId:"grid1"});
    
	// gridId: String
	//		The id of target datagrid of this pagination. 
	//		If this value is null, will use the id attribute of targetGrid
	gridId: null,
	
	// targetGrid: DataGrid
	//		The target datagrid of this pagination
	targetGrid: null,
	
	// _currentPageNo: [private] Int
	//		Current page number, default is 1
	_currentPageNo: 1,
	
	// _numberOfPages: [private] Int
	//		How many pages of the records
	_numberOfPages: 0,
	
	templateString: dojo.cache("com", "ibm/ciolab/core/templates/Pagination.html"),
    
	postCreate: function(){
		var that = this;
		this.inherited(arguments);
		if(this.targetGrid != null){
			this.gridId = this.targetGrid.attr("id");
		}
		dojo.subscribe(this.gridId + "/NumberOfRecords/Changed", this, "showNumberOfRecords");
		
		dojo.connect(this.prePageLink, "onclick", function(){
			if(that._currentPageNo > 1){
				that.selectPage(that._currentPageNo - 1);
			}
		});
		
		dojo.connect(this.nextPageLink, "onclick", function(){
			if(that._currentPageNo < that._numberOfPages){
				that.selectPage(that._currentPageNo + 1);
			}
		});
	},
	showNumberOfRecords: function(/*Int*/ totalNumber, /*Int*/ numberOfPages){
		// summary:
		//		Show total number of records and number range	
		this.totalNum.innerHTML = totalNumber;
		this._numberOfPages = numberOfPages;
		if(this._currentPageNo * 10 > this.totalNum.innerHTML){
			this.numRange.innerHTML = ((this._currentPageNo - 1) * 10 + 1) + " - " + this.totalNum.innerHTML;
		}else{
			this.numRange.innerHTML = ((this._currentPageNo - 1) * 10 + 1) + " - " + (this._currentPageNo * 10) ;
		}
	},
	selectPage: function(pageNo){
		// summary:
		//		Select one page number
		// description:
		//		Select a page nubmer, change the display of widget and publish the PageNumber/Changed event
		this._currentPageNo = pageNo;
		dojo.publish(this.gridId + "/PageNumber/Changed", [pageNo]);
	}
});