dojo.provide("com.ibm.ciolab.core.SuggestMultipleInput");

dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit._HasDropDown");

dojo.declare("com.ibm.ciolab.core.SuggestMultipleInput", [dijit.form.ValidationTextBox, dijit._HasDropDown], {
    selectOnClick: false,
    dropDown: null,
    max: 5,
    currSelectIndex: -1,
    resultItems : [],
    selected: "",
    initMessage: "Type to start",
    delay: 500, //delay to make jsonp request, in millisecond
    toru : null, // 23046
    
    postCreate:function(){
    	this.suggestService = main.getService(main.constants.serviceURL.DEALREG, "intranetIDSuggest");
        var dropDownWith = dojo.style(this.textbox, "width");
        this.dropDown = new dijit.layout.ContentPane({
            content: this.initMessage,
            style: {"width": dropDownWith+"px"}
        }, document.createElement("div"));
        this.inherited(arguments);
    },
    setSelected: function(index){
    //9481 changes start
    	var prevValArr=[];
    	var previousValues = this.get('value');
        prevValArr = previousValues.split(",");
    	this.selected = this.resultItems[index];
    	if(prevValArr.length<2){    		
    		this.set("value", this.selected);
    	}else{
    		var fullStr = previousValues;
    		if(this.selected != '' && this.selected != null && this.selected != undefined)
    		{
    			fullStr = previousValues.substring(0,previousValues.lastIndexOf(","))+","+this.selected;
    		}
    		this.set("value", fullStr);
    	}
    	this.selected = "";
    //9481 changes end           
    },
    openDropDown: function(){
        this.inherited(arguments);
        this.focus();
        this.focusNode.focus();
    },
    
    _createOption: function(){
        var options = new dojo.NodeList();
        dojo.forEach(this.resultItems, function(item, i){
            var opt = dojo.create("div", {
                index: i,
                innerHTML: item
            });
            options.push(opt);
        }, this);
        options.onclick(this, function(e){
            this.setSelected(dojo.attr(e.target, "index"));
            this.closeDropDown(true);
        }).onmouseenter(this, function(e){
            dojo.addClass(e.target, "focused");
        }).onmouseleave(this, function(e){
            dojo.removeClass(e.target, "focused");
        });
        if(this._focused){
            if(options.length){
                this.dropDown.setContent(options);
            }else{
               this.dropDown.setContent("<div>No match found</div>");
            }
            this.openDropDown();
        }
        this.toru = options.length;
    },
    
    _refreshState:function(){
        var cache = {};
        var load = function(data){
            cache[lastInput] = data;
            this.set("resultItems", data);
        };
        var timeoutId, lastInput;
        var deferreds = {};
        return function(){
            this.focus();
            // this.focusNode.focus(); // Commented for 6389
            lastInput = this.get("value").toLowerCase();
            //9481 changes start
            var tempArr = lastInput.split(",");
            lastInput = tempArr[tempArr.length-1];
            //481 changes end
            if(lastInput !== ""){
                if(cache[lastInput]){//cached
                    this.set("resultItems", cache[lastInput]);
                }else{
                    if(this.dropDown.get("content") !== this.dropDown.loadingMessage){
                        this.dropDown.setContent(this.dropDown.loadingMessage);
                    }
                    if(timeoutId){
                        clearTimeout(timeoutId);
                        deferreds[timeoutId] && deferreds[timeoutId].cancel();
                    }
                    timeoutId = setTimeout(dojo.hitch(this, function(){var d = this.suggestService(lastInput); deferreds[timeoutId] = d; d.then(dojo.hitch(this, load), console.log);}), this.delay);
                }
            }
        };
    }(),
    
    _onKey: function(/*Event*/ e){
        // summary:
        //	Callback when the user presses a key on menu popup node
        if(this.disabled || this.readOnly){
                return;
        }
        var d = this.dropDown;
        if(d && this._opened && d.handleKey){
            if(d.handleKey(e) === false){
                return;
            }
        }
        if(d && this._opened && e.keyCode === dojo.keys.ESCAPE){
                this.toggleDropDown();
                return;
        }
        // override the _onKey function in dijit._HasDropDown, remove the e.charOrCode == " " to enable the textbox can input blank
        var optionCount = this.resultItems.length;
        if(e.keyCode === dojo.keys.DOWN_ARROW){
            if(this._opened){
                this.currSelectIndex = ((this.currSelectIndex+1) % optionCount);
            }else{
                this._onDropDownMouseDown(e);
            }
        }
        if(e.keyCode === dojo.keys.UP_ARROW){
            if(this._opened){
                if(this.currSelectIndex === -1){
                    this.currSelectIndex = optionCount;
                }
                this.currSelectIndex = (this.currSelectIndex+(optionCount-1)) % optionCount;
            }else{
                this._onDropDownMouseUp(e);
            }
        }
        if(e.keyCode === dojo.keys.ENTER){
            if(this._opened){
                if(this.currSelectIndex===-1){
                    this.currSelectIndex = 0;
                }
                this.setSelected(this.currSelectIndex);
                this.currSelectIndex = -1;
                this.closeDropDown(true);
            }else{
                this._onDropDownMouse(e);
            }
        }
        //update list style
        dojo.query("div", d.domNode).forEach(function(itemNode){
            if(dojo.attr(itemNode, "index") == this.currSelectIndex){
                dojo.addClass(itemNode, "focused");
            }else{
                dojo.removeClass(itemNode, "focused");
            }
        }, this);
        
    },

    _onDropDownKeydown: function(/*Event*/ e){
        if(e.keyCode === dojo.keys.DOWN_ARROW || e.keyCode === dojo.keys.ENTER){
            e.preventDefault();	// stop IE screen jump
        }
    },
        
    //set resultItems fetched from jsonp service
    _setResultItemsAttr: function(items){
    	this.resultItems = items;
        this._createOption();
    },

    reset: function(){
        this.attr("value","");
    },

    onBlur: function(){
    	//update input's display value
       var prevValArr=[];
    	var previousValues = this.get('value');
        prevValArr = previousValues.split(",");
        if(previousValues=='' || previousValues==null){//Defect 11105 
    		this.set("value", "");
    	}else{
    		if(prevValArr.length<2){
    			if(this.selected == '' || this.selected == null)
        		{
        			this.set("value", previousValues);
        			this.setSelected(previousValues);
                    this.closeDropDown(true);
        		}
        		else
        		{
        			this.set("value", this.selected);
        			this.selected = "";
        		}
        	}else{
        		if(this.selected == '' || this.selected == null)
        		{
        			this.set("value", previousValues);
        			this.setSelected(previousValues);
                    this.closeDropDown(true);
        		}
        		else
        		{
        			var fullStr = previousValues.substring(0,previousValues.lastIndexOf(","))+ "," + this.selected;
        			this.set("value", fullStr);
        			this.selected = "";
        		}
        	}
    	}
        
        
        //23046
    	if(this.toru ==0) {
    		if(this.get("value")!=""){
	    		if(!dojox.validate.isEmailAddress(this.get("value")))
	    		{
	    			this.set("value",this.get("value"));
	    		}
	    		else
    			{
	        		if((this.get("value").indexOf(" ")==-1))
	        			this.set("value",this.get("value")+" ");
    			}
    		}
    	}
    	else if(this.toru !==0 && this.get("value")!=""){	// entered email id which is there in the bulepage but user does not entered full qualified email. eg:-saravap3
    		this.set("value",this.get("value"));
    	}       
        // end 23046
        
    	this.inherited(arguments);
    },

    onFocus: function(){
    	// 23046
    	if((this.get("value").indexOf(" ")!=-1)){
    		var fullStr = this.get("value").substring(0,this.get("value").lastIndexOf(" "));
			this.set("value", fullStr);
    	}
    	// end 23046
        this._setEnd();
        this.inherited(arguments);
    },
        
    _setEnd: function(){// set cursor to end of input
        var textbox = this.textbox, length = textbox.value.length;
        if(textbox.createTextRange){
            var r = textbox.createTextRange();
            r.moveStart('character', length);
            r.collapse(true);
            r.select();
        } else if(textbox.selectionStart !== length){
            textbox.setSelectionRange(length, length);
        }
    } 
});

