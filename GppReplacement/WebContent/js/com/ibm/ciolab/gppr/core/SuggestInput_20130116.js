dojo.provide("com.ibm.ciolab.core.SuggestInput");

dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit._HasDropDown");
dojo.require("dojo.io.script");

dojo.declare("com.ibm.ciolab.core.SuggestInput", [dijit.form.ValidationTextBox, dijit._HasDropDown], {
    selectOnClick: false,
    dropDown: null,
    itemsArray: [],
    max: 5,
    currSelectIndex: -1,
    display: "email",   //could be "email" or "name"
    resultItems : [],
    multiple : false,   //is multiple mode is enabled
    itemTemplate: "${name}<br/>${email}",
    initMessage: "Type to start",
    delay: 500, //delay to make jsonp request, in millisecond
    VALUE_SEPARATOR: ",",
    
    postCreate:function(){
        var dropDownWith = dojo.style(this.textbox, "width");
        this.dropDown = new dijit.layout.ContentPane({
            content: this.initMessage,
            style: {"width": dropDownWith}
        }, document.createElement("div"));
        this.inherited(arguments);
    },
    setSelected: function(index){
        var selectedItem = this.resultItems[index];
        if(this.multiple){
            this.itemsArray.push(selectedItem);
            this.set("value", dojo.map(this.itemsArray, function(item){
                return item[this.display];
            }, this).join(this.VALUE_SEPARATOR));
        }else{
            this.itemsArray = [selectedItem];
            this.set("value", selectedItem[this.display]);
        }
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
                innerHTML: dojo.string.substitute(this.itemTemplate, item)
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
    },
    
    _refreshState:function(){
        var cache = {};
        var jsonpArgs = {
            url: "http://faces.tap.ibm.com/api/find/",
            callbackParamName: "callback",
            preventCache: true
        };
        var load = function(data){
            cache[lastInput] = data;
            this.set("resultItems", data);
        };
        function jsonp(args){
            dojo.io.script.get(args).addCallbacks(dojo.hitch(this, load), console.log);
        }
        var timeoutId, lastInput;
        return function(){
            this.focus();
            this.focusNode.focus();
            lastInput = this.get("value").split(this.VALUE_SEPARATOR).pop().toLowerCase();
            if(lastInput !== ""){
                if(cache[lastInput]){//cached
                    this.set("resultItems", cache[lastInput]);
                }else{
                    if(this.dropDown.get("content") !== this.dropDown.loadingMessage){
                        this.dropDown.setContent(this.dropDown.loadingMessage);
                    }
                    if(timeoutId){
                        clearTimeout(timeoutId);
                    }
                    jsonpArgs.content = {limit: this.max, q: lastInput};
                    timeoutId = setTimeout(dojo.hitch(this, function(){jsonp.call(this, jsonpArgs);}), this.delay);
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
            if(dojo.attr(itemNode, "index") === this.currSelectIndex){
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
        this.resultItems = dojo.filter(items, function(item){
            return item.name && item.email;
        }, this);
        this._createOption();
    },

    _getItemsAttr:function(){
        return this.itemsArray;
    },

    _setItemsAttr:function(items){
        this.itemsArray = items;
        this.set("value", dojo.map(items, function(item){
            return item[this.display];
        }, this).join(this.VALUE_SEPARATOR));
    },

    _getItemAttr:function(){
        return this.get("items").slice(0, 1).pop();
    },

    _setItemAttr:function(item){
        this.set("items", [item]);
    },

    reset: function(){
        this.itemsArray = [];
        this.attr("value","");
    },

    onBlur: function(){
        this.set("items", this.get("items"));//update input's display value
        this.inherited(arguments);
    },

    onFocus: function(){
        if(this.multiple && this.get("items").length){
            this.set("value", this.get("value") + this.VALUE_SEPARATOR);
        }
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

