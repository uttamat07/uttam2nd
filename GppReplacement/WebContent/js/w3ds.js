/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var overlay = __webpack_require__(1)
	var tray = __webpack_require__(3)
	var tabGroup = __webpack_require__(4)
	var tooltip = __webpack_require__(5)
	var dismissible = __webpack_require__(6)
	var dropdown = __webpack_require__(7)
	var progressBar = __webpack_require__(8)
	var accordion = __webpack_require__(9)
	var setHeight = __webpack_require__(10)
	var carousel = __webpack_require__(11)
	var jumpLink = __webpack_require__(16)

	function catchErrors(arg, fn) {
		try {
	        return fn(arg);
	    } catch (e) {
	        console.error("Error: ", e)
	    }
	}

	function initOverlays() {
		var overlayClasses = '.ds-overlay, .ds-overlay-focus, .ds-overlay-fullscreen'
		var overlays = Array.prototype.slice.apply(document.querySelectorAll(overlayClasses))
		overlays.forEach(function(overlayEl) {
			catchErrors(overlayEl, overlay)
		})
	}

	function initTrays() {
		var trayClasses = '.ds-tray'
		var trays = Array.prototype.slice.apply(document.querySelectorAll(trayClasses))
		trays.forEach(function(trayEl) {
			catchErrors(trayEl, tray)
		})
	}

	function initTabs() {
		var tabClasses = '.ds-tabs'
		var tabs = Array.prototype.slice.apply(document.querySelectorAll(tabClasses))
		tabs.forEach(function(tabEl) {
			catchErrors(tabEl, tabGroup)
		})
	}

	function initTooltips() {
		var tooltipClasses = '.ds-tooltip'
		var tooltips = Array.prototype.slice.apply(document.querySelectorAll(tooltipClasses))
		catchErrors(tooltips, initCaretPositionStyleTag)
		tooltips.forEach(function(tooltipEl) {
			catchErrors(tooltipEl, tooltip)
		})
	}

	function initCaretPositionStyleTag(tooltips) {
		var style = document.createElement('style')
		style.id = tooltip.styleTagId
		style.innerHTML = ''
		document.head.appendChild(style)
	}

	function initDismissibles() {
		var dismissibleClasses = '.ds-dismissible'
		var dismissibles = Array.prototype.slice.apply(document.querySelectorAll(dismissibleClasses))
		dismissibles.forEach(function(dismissibleEl) {
			catchErrors(dismissibleEl, dismissible)
		})
	}

	function initDropdowns() {
		var dropdownClasses = '.ds-dropdown'
		var dropdowns = Array.prototype.slice.apply(document.querySelectorAll(dropdownClasses))
		dropdowns.forEach(function(dropdownEl) {
			catchErrors(dropdownEl, dropdown)
		})
	} 

	function initProgressBars() {
		var progressBarClasses = '.ds-progress-bar'
		var progressBars = Array.prototype.slice.apply(document.querySelectorAll(progressBarClasses))
		progressBars.forEach(function(progressBarEl) {
			catchErrors(progressBarEl, progressBar.progressBar)
		})
	}

	function initFileUpload() {
		var fileUploadClasses = '.ds-file-upload'
		var fileUploads = Array.prototype.slice.apply(document.querySelectorAll(fileUploadClasses))
		fileUploads.forEach(function(fileUploadEl) {
			catchErrors(fileUploadEl, progressBar.fileUpload)
		})
	}

	function initAccordions() {
		var accordionClasses = '.ds-accordion, .ds-accordion-small, .ds-accordion-large'
		var accordions = Array.prototype.slice.apply(document.querySelectorAll(accordionClasses))
		accordions.forEach(function(accordionEl) {
			catchErrors(accordionEl, accordion)
		})
	}

	function initSetSameHeight() {
		// get groups
		var setHeightArray = document.querySelectorAll('[class*="ds-set-height-"]')

		var setHeightGroups = Array.prototype.reduce.call(setHeightArray, function(acc, currentEl) {
			// get group name (always keep ds-set-height-group-name at the front)
			var itemClassName = currentEl.className.split(' ')[0]
			var groupName = itemClassName.split('ds-set-height-')[1]

			// check if group exists, if so add
			if(acc[groupName]){
			// else add group name as key on object
				acc[groupName] = acc[groupName].concat(currentEl)
			} else {
			// add element
				acc[groupName] = [currentEl]
			}

			return acc
		}, {})

		for (var key in setHeightGroups) {
			setHeight(setHeightGroups[key])
			catchErrors(setHeightGroups[key], setHeight)
		}
	}

	function initCarousels() {
		var carouselClasses = '.ds-carousel'
		var carousels = Array.prototype.slice.apply(document.querySelectorAll(carouselClasses))
		carousels.forEach(function(carouselEl) {
			catchErrors(carouselEl, carousel)
		})
	}

	function initJumpLinks() {
		var jumpLinkTags = 'a[href^="#"]'
		var jumpLinks = Array.prototype.slice.apply(document.querySelectorAll(jumpLinkTags))
		jumpLinks.forEach(function(jumpLinkEl) {
			if(jumpLinkEl.hash.length > 0)
			catchErrors(jumpLinkEl, jumpLink)
		})
	}

	window.onload = function() {
		initOverlays()
		initTrays()
		initTabs()
		initTooltips()
		initDismissibles()
		initDropdowns()
		initProgressBars()
		initFileUpload()
		initAccordions()
		initSetSameHeight()
		initCarousels()
		initJumpLinks()
	}

	window.onresize = function() {
		initSetSameHeight()
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(2)
	var objectFrom = utils.objectFrom
	var keycodes = utils.keycodes

	var bodyEl = document.querySelector('body')

	function openOverlay(el, closeControl) {
		el.classList.add('ds-open')
		bodyEl.style.overflow = 'hidden'
		el.setAttribute('aria-hidden', false)

		closeControl.focus()
	}

	function closeOverlay(el, openControl) {
		el.classList.remove('ds-open')
		bodyEl.style.overflow = 'auto'
		el.setAttribute('aria-hidden', true)

		openControl.focus()
	}

	function overlay(el, options) {
		var dataAttrs = objectFrom(el.dataset)
		opts = objectFrom(el.dataset, options)
		var openControl = document.querySelector('#' + el.id + '-open')
		var closeControl
		var ariaHide

		el.setAttribute('aria-hidden', 'true')
		el.setAttribute('role', 'dialog')
		el.querySelector('.ds-overlay-box').setAttribute('role', 'document')

		// add close button unless data-close-button="false" or included in options
		if (opts.closeButton !== 'false')
			el.querySelector('.ds-overlay-box').insertAdjacentHTML('afterbegin', '<button class="ds-close ds-button ds-flat"><span class="ds-icon-x"></span></button>')

		closeControl = el.querySelector('.ds-close')

		openControl.addEventListener('click', function(e) {

			// get all direct body children except overlay
			ariaHide = Array.prototype.slice.call(document.querySelectorAll('body > :not(.ds-overlay-container)')).filter(function(element) {
				return element !== el
			})

			// listen for esc key and exit overlay
			window.addEventListener('keydown', escListener)

			window.addEventListener('focusin', outsideFocusListener)

			// listen for all clicks, close overlay if outside 'overlay-content'
			if (el.className.split(' ').indexOf('ds-overlay-focus') === -1) {
				el.addEventListener('click', outsideClickListener)
			}

			openOverlay(el, closeControl)

			ariaHide.forEach(function(element) {
				element.setAttribute('aria-hidden', true)
			})
		})

		closeControl.addEventListener('click', function() {
			ariaHide.forEach(function(element) {
				element.setAttribute('aria-hidden', false)
			})

			closeThisOverlay()
		})

		function closeThisOverlay() {
			el.removeEventListener('click', outsideClickListener)
			window.removeEventListener('focusin', outsideFocusListener)
			window.removeEventListener('keydown', escListener)
			closeOverlay(el, openControl)
		}

		function outsideClickListener(e) {
			if (!isClickInsideOverlayContent(e.target))
				closeThisOverlay()

		}

		function outsideFocusListener(e) {
			if (!isFocusInsideOverlayContent(e.target))
				closeControl.focus()
		}

		function escListener(ev) {
			if (ev.keyCode === keycodes.esc) closeThisOverlay()
		}

		function isClickInsideOverlayContent(target) {
			if (target.className.split(' ').indexOf('ds-overlay-box') !== -1)
				return true;
			else if (target.id === el.id)
				return false;
			else
				return isClickInsideOverlayContent(target.parentNode)
		}

		function isFocusInsideOverlayContent(target) {
			if (target.className.split(' ').indexOf('ds-overlay-box') !== -1)
				return true
			else if (target === bodyEl)
				return false
			else
				return isFocusInsideOverlayContent(target.parentNode)
		}
	}

	module.exports = overlay

/***/ },
/* 2 */
/***/ function(module, exports) {

	// returns a new object made up of objects passed in
	// each object in arguments takes precedence over the previous object
	function objectFrom() {
		var args = Array.prototype.slice.call(arguments)

		var obj = args.reduce(function(result, arg) {

			// get enumerable properties and copy to new obj
			if (arg instanceof DOMStringMap) { // if it's a DOMStringMap, handle it custom
				for (var key in arg) {
					result[key] = arg[key]
				}
			} else {
				for (var key in arg) {
					if (arg.propertyIsEnumerable(key)) {
						result[key] = arg[key]
					}
				}
			}


			return result
		}, {})

		return obj
	}


	// extremely basic event handling
	function events() {

		var listeners = {}

		return {
			addListener: addListener,
			removeListener: removeListener,
			trigger: trigger
		}

		function trigger(evt) {
			var additionalArgs = Array.prototype.slice.call(arguments, 1)
			listeners[evt].forEach(function(fn) {
				fn.apply(null, additionalArgs)
			})
		}

		function addListener(evt, fn) {
			if (!listeners[evt]) listeners[evt] = [ fn ]
			else listeners[evt].push(fn)

			return fn
		}

		function removeListener(evt, fn) {
			if (evt instanceof Function) {
				// if evt is a function, remove that function from all events
				for (var key in listeners) {
					listeners[key].filter(filterListener)
				}
			} else if (!fn) {
				// if there's not a function, remove the event
				listeners[evt] = undefined
			}
			else {
				// if there's an event and a function, remove the function from the event
				listeners[evt].filter(filterListener)
			}

			function filterListeners(listenerFn) {
				return listenerFn !== fn
			}
		}
	}

	function uniqueId(prefix, idSet) {
		var id
		var lastId 

		prefix = prefix || ''
		idSet = idSet || _uniqueIds
		lastId = idSet[idSet.length - 1]

		if (idSet.length) {
			id = atLeast4Chars(+lastId + 1 + '')
		} else {
			id = '0001'
		}

		id = prefix + id
		idSet.push(id)
		return id

		function atLeast4Chars(str) {
			if (str.length < 4) {
				return atLeast4Chars('0' + str)
			} else {
				return str
			}
		}
	}

	function scrollTo(element, to, duration){
		var start = element.scrollTop,
	    change = (to - start),
	    increment = 20;

	  var animateScroll = function(elapsedTime) {
	    elapsedTime += increment;
	    var position = easeInOut(elapsedTime, start, change, duration);
	    element.scrollTop = position;

	    if (elapsedTime < duration) {
	      setTimeout(function() {
	          animateScroll(elapsedTime);
	      }, increment);
	    }
	  };

	  animateScroll(0);
	}

	// Will come back and adjust this later
	function easeInOut(currentTime, start, change, duration) {
	    currentTime /= duration / 2;
	    if (currentTime < 1) {
	        return change / 2 * currentTime * currentTime + start;
	    }
	    currentTime -= 1;
	    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
	}

	function createUniqueIdSet(prefix, idSet) {
		if (prefix instanceof Array) {
			prefix = null
			idSet = prefix
		}

		preix = prefix || ''
		idSet = idSet || []

		return {
			id: function() { 
				return uniqueId(prefix, idSet)
			}
		}
	}

	var _uniqueIds = []

	function listenOnce(el) {

		var additionalArgs = Array.prototype.slice.call(arguments, 1)

		el.addEventListener.apply(el, additionalArgs)

		function callback(e) {
			el.removeEventListener.apply(el, additionalArgs)
			cb(e)
		}
	}

	var keycodes = {
		esc: 27,
		enter: 13,
		space: 32,
		tab: 9,
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		shift: 16
	}

	var focusableQuerySelector = [
		'a[href]',
		'area[href]',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'button:not([disabled])',
		'iframe',
		'object',
		'embed',
		'*[tabindex]',
		'*[contenteditable]'
	]

	module.exports = {
		objectFrom: objectFrom,
		keycodes: keycodes,
		events: events,
		uniqueId: uniqueId,
		createUniqueIdSet: createUniqueIdSet,
		listenOnce: listenOnce,
		focusable: focusableQuerySelector.join(', '),
		scrollTo: scrollTo,
		easeInOut: easeInOut
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	var body = document.querySelector('body')

	function openTray(el) {
		el.className += ' ds-open'
		// enables amination to button when tray is open (example page)
		el.parentElement.className += ' ds-tray-open'
		// enable tabbing down for trays with overflow text
		el.tabIndex = 0
	}

	function closeTray(el) {
		el.className = el.className.split(' ').filter(function(cl) {
			return cl === 'ds-open' ? false : true
		}).join(' ')

		// enables amination to button when tray is open (example page)
		el.parentElement.className = el.parentElement.className.split(' ').filter(function(cl) {
			return cl === 'ds-tray-open' ? false : true
		}).join(' ')

		el.tabIndex = -1
	}

	function tray(el) {
		var openControls = Array.prototype.slice.apply(document.querySelectorAll('.' + el.id + '-open'))
		var closeControls = Array.prototype.slice.apply(document.querySelectorAll('.' + el.id + '-close'))
		var isOpen = false
		var isClosePending = false

		var openActions = [ 'click' ]

		if (el.classList.contains('ds-tray-hover-open'))
			openActions.push('mouseenter')

		openControls.forEach(function(control) {
			openActions.forEach(function(action) {
				control.addEventListener(action, openListener)
			})
		})

		function openListener(e) {
			addCloseListener(e.target)

			if(!e.keyCode || e.keyCode === 13) {
				if (isOpen) {
					return (isClosePending = false)
				}
			}

			openTray(el)
			isOpen = true
		}

		function addCloseListener(control) {

			if(el.classList.contains('ds-tray-hover-open')){
				control.addEventListener('mouseleave', closeListener)

				el.addEventListener('mouseenter', trayHovered)

				closeControls.forEach(function(control) {
					control.addEventListener('mouseenter', closeListener)
				})
			}

			document.addEventListener('click', outsideClickListener, true)
			control.addEventListener('keydown', closeListener)

			// jumping back to parent button (focusout doesn't work in FF)
			el.addEventListener('blur', trayToButton)
		}

		function trayToButton(e){
			var button = e.target.offsetParent.querySelector('.ds-button')

			if(e.target.classList.contains('ds-open')) {
				button.focus()
			}
		}

		function removeCloseListener(control) {
			document.removeEventListener('click', outsideClickListener, true)
			control.removeEventListener('keydown', closeListener)
			control.removeEventListener('mouseleave', closeListener)

		}

		function outsideClickListener(ev) {
			ev.stopPropagation()

			if (!isClickInsideTray(ev.target))
				closeListener(ev)
		}

		function closeListener(e) {
			if (!isOpen) return

			var control = this

			// if ( el.classList.contains('ds-open') && e.keyCode === 9 ){
			// 	console.log('tab back to button')
			// 	el.previousElementSibling.childNodes[1].focus()
			// }

			if(!e.keyCode || e.keyCode === 13) {
				isClosePending = true
			} else {
				isClosePending = false
			}

			setTimeout(function() {
				if (isClosePending === false) return

				closeTray(el)
				removeCloseListener(control)
				isOpen = false

				closeControls.filter(function(closeControl) {
					return closeControl !== control
				}).forEach(function(control) {
					control.removeEventListener('mouseenter', closeListener)
				})
			}, 10)
		}

		function trayHovered() {
			isClosePending = false

			el.addEventListener('mouseleave', closeListener)
		}

		function isClickInsideTray(target) {
			if (target.tagName === 'BODY') {
				return false;
			} else if (target.classList.contains('ds-tray'))
				return true;
			else if (target.id === el.id)
				return false;
			else
				return isClickInsideTray(target.parentNode)
		}
	}

	module.exports = tray

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(2)

	var keycodes = utils.keycodes
	var listenOnce = utils.listenOnce

	function tabGroup(el) {
		var controlsContainer = el.querySelector('.ds-tab-controls')
		var controls = Array.prototype.slice.apply(controlsContainer.querySelectorAll('.ds-tab-controls .ds-button'))
		var removeSelectedPending

		var controlEvents = [ 'click' ]

		if (controlsContainer.className.split(' ').indexOf('ds-tab-controls-hover') !== -1) {
			controlEvents.push('mouseenter')
		}

		var tabs = controls.map(function(control) {
			var contentContainerId = '#' + control.id.split('-').map(function(str) {
					return str === 'control' ? 'content' : str
				}, '').join('-')

			return {
				control: control,
				content: control.id ? el.querySelector(contentContainerId) : null
			}
		})

		// listen for arrow keys for looking at tab options
		controlsContainer.addEventListener('keydown', tabChangeKeypress)

		controls.forEach(function(control) {
			if (!control.classList.contains('ds-selected'))
				control.setAttribute('tabindex', -1)
		})

		tabs.forEach(function(tab) {

			if (tab.control.className.split(' ').indexOf('ds-selected') === -1)
				if (tab.content) tab.content.style.display = 'none'

			controlEvents.forEach(function(ev) {

				tab.control.addEventListener(ev, function() {
					switchSelected(tab)
					centerActiveTab()
				})
			})

			if (controlEvents.indexOf('mouseenter') !== -1) {

				tab.control.addEventListener('mouseleave', removeSelectedListener)

				if (tab.content) {
					tab.content.addEventListener('mouseenter', function() {
						removeSelectedPending = false
					})

					tab.content.addEventListener('mouseleave', function() {
						removeSelected(tab)
					})
				}
			}
		})

		centerActiveTab()

		function switchSelected(newTab) {
			removeSelectedPending = false

			tabs.forEach(function(tab) {

				if (tab === newTab) {
					tab.control.className += ' ds-selected'
					tab.control.setAttribute('tabindex', 0)
					if (tab.content) tab.content.style.display = ''
				}
				else {
					removeSelected(tab)
					if (tab.content) tab.content.style.display = 'none'
				}
			})
		}

		function removeSelectedListener() {
			removeSelectedPending = true

			setTimeout(function() {
				if (!removeSelectedPending) return

				tabs.forEach(removeSelected)
			}, 10)
		}

		function removeSelected(tab) {

			var removedSelected = tab.control.className.split(' ').filter(function(cl) {
				return cl !== 'ds-selected'
			}).join(' ')

			tab.control.className = removedSelected
			tab.control.setAttribute('tabindex', -1)
		}

		function centerActiveTab() {
			var tabContols = el.getElementsByClassName('ds-tab-controls')[0];
			var selectedTab = el.querySelectorAll('.ds-tab-controls .ds-selected')[0]

			if (!selectedTab) return

			var offset = ((selectedTab.offsetLeft) % tabContols.scrollWidth) - (tabContols.clientWidth / 2.25)

			tabContols.scrollLeft = offset
		}

		// moves focus between tab options via left & right arrows
		function tabChangeKeypress(e) {
			var index
			var target = e.target

			if (e.keyCode === keycodes.left) {
				controls.forEach(function(control, i) {
					if (control === target && i > 0) index = i - 1
				})
			} else if (e.keyCode === keycodes.right) {
				controls.forEach(function(control, i, arr) {
					if (control === target && i < arr.length - 1) index = i + 1
				})
			}

			if (index >= 0) controls[index].focus()
		}
	}

	module.exports = tabGroup

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(2)

	var listenOnce = utils.listenOnce
	var focusable = utils.focusable

	var body = document.querySelector('body')
	var styleTagId = 'tooltip-caret-positions'

	function openTooltip(el) {
		el.querySelector('.ds-tooltip-content').style.overflow = 'visible'
		el.className += ' ds-open'
	}

	function closeTooltip(el) {
		var content = el.querySelector('.ds-tooltip-content')
		content.addEventListener('transitionend', transitionEnded)

		el.className = el.className.split(' ').filter(function(cl) {
			return cl === 'ds-open' ? false : true
		}).join(' ')

		function transitionEnded(ev) {
			content.removeEventListener('transitionend', transitionEnded)
			content.style.overflow = ''
		}
	}

	function tooltip(el) {
		var style = document.querySelector('#' + styleTagId)
		var openControl = el.querySelector('.ds-tooltip-trigger') ? openControl = el.querySelector('.ds-tooltip-trigger') : openControl = document.querySelector('#' + el.id)
		var openAction = 'mouseover'
		var closeAction = 'mouseout'
		var tooltipTriggers = Array.prototype.slice.call(el.querySelectorAll('.ds-tooltip-trigger'))
		var focusableEls = Array.prototype.slice.call(el.querySelectorAll(focusable))
				.filter(function(focusEl) {
					// Pick up tabindexes in tooltip trigger
					return !focusEl.classList.contains('ds-tooltip-trigger')
				})
				.map(function(focusEl){
					return {
						el: focusEl,
						tabindex: focusEl.getAttribute('tabindex')
					}
				})

		// look for items to add tabindex to
		focusableEls.forEach(function(focusEl){
			focusEl.el.setAttribute('tabindex', -1)
		})

		tooltipTriggers.forEach(function(trigger){
			// if tabindexes already set in html, don't change anything
			if(trigger.getAttribute('tabindex') == null){
				trigger.setAttribute('tabindex', 0)
			}
		})

		createCaretPositionStyle(style, el)

		if (el.className.split(' ').indexOf('ds-click') !== -1) {
			openAction = closeAction = 'click'
		}

		addOpenListener(el)


		function addOpenListener(el) {
			openControl.addEventListener(openAction, openListener)
			el.addEventListener('keydown', openListener)
		}

		function removeOpenListener() {
			openControl.removeEventListener(openAction, openListener)
			el.removeEventListener('keydown', openListener)
		}

		function openListener(e) {
			if(!e.keyCode || e.keyCode === 13){
				removeOpenListener()
				openTooltip(el)
				addCloseListener(el)
			}
		}

		function checkOpenTooltip(tooltip) {
			var openTooltips = document.querySelectorAll('.ds-tooltip.ds-open')
			var itemToOpen = tooltip.target.parentElement
			var itemId = itemToOpen.id

			// close itself if clicked anywhere on the page
			if( (itemToOpen.className.split(' ').indexOf('ds-tooltip') === -1) ){
				removeCloseListener()
				closeTooltip(el)
				addOpenListener(el)
				return
			}

			// close previous one before opening a new one
			for(var i = 0; i < openTooltips.length; i++){
				// Don't touch tooltip style examples
				if(openTooltips[i].className.split(' ').indexOf('example') === -1) {

					if(openTooltips[i].id !== itemToOpen.id){
						// close the one that's open atm
						removeCloseListener()
						closeTooltip(openTooltips[i])

						// open the one that's clicked on
						openTooltip(itemToOpen)
						addCloseListener(itemToOpen)

						// clear array
						openTooltips = [];

						return
					}

					//close itself when clicked on its own icon
					else if(openTooltips[i].id === itemToOpen.id ){
						// eventCache = tooltip
						removeCloseListener()
						closeTooltip(el)
						tooltip.stopPropagation()
						addOpenListener(el)

						return
					}
				}
			}
		}

		function outsideClickListener(ev) {
			ev.stopPropagation()
			
			// check if the next focused element is a 'focusableEl'
			// if so, say it's a match
			var match = focusableEls.reduce(function(acc, curr) {
				if (curr.el === ev.relatedTarget) return true
				else return acc
			}, false)

			// skip this so tooltip doesn't close if there's a match
			if (!match){
				checkOpenTooltip(ev)
			}

		}

		function addCloseListener(el) {
			// add exception for focusable elements, so it doesn't close itself when tabbed into
			focusableEls.forEach(function(focusEl){
				if (focusEl.tabindex) {
					focusEl.el.setAttribute('tabindex', focusEl.tabindex)
				} else {
					focusEl.el.setAttribute('tabindex', 0)
				}
			})

			if(!el.classList.contains('ds-click')){
				// listening for mouseover & mouseout
				el.addEventListener(closeAction, closeListener)
			}

			// needed for when clicking on its own icon
			document.addEventListener('click', outsideClickListener, true)
			el.addEventListener('keydown', closeListener)

			// when tabbing away from icon with open tooltip to another icon
			el.addEventListener('blur', outsideClickListener, true)
		}

		function removeCloseListener() {
			focusableEls.forEach(function(focusEl){
				focusEl.el.setAttribute('tabindex', -1)
			})


			if(!el.classList.contains('ds-click')){
				el.removeEventListener(closeAction, closeListener)
			}

			document.removeEventListener("click", outsideClickListener, true)
			el.removeEventListener('keydown', closeListener)
			el.removeEventListener('blur', outsideClickListener, true)
		}

		function closeListener(e) {
			if(!e.keyCode || e.keyCode === 13){
				closeTooltip(el)
				removeCloseListener()
				addOpenListener(el)
			}
		}

		function createCaretPositionStyle() {
			var percent = el.querySelector('.ds-tooltip-content').dataset.caret
			var contentSelector

			if (percent == null) return

			if (style.innerHTML.indexOf(percent) === -1) {
				contentSelector = '.ds-tooltip-content[data-caret="' + percent + '"]'
				style.innerHTML += contentSelector + '::before, ' + contentSelector + '::after { left: ' + percent + '%; }\n'
			}
		}

		// function isInsideTooltipContainer(target) {
		// 	var tooltipContainerAttr = target.attributes && target.attributes['data-tooltip-container']
		// 	if (tooltipContainerAttr && tooltipContainerAttr.value.split(' ').indexOf(el.id) !== -1)
		// 		return true
		// 	else if (target === body)
		// 		return false
		// 	else
		// 		return isInsideTooltipContainer(target.parentNode)
		// }
	}

	module.exports = tooltip
	module.exports.styleTagId = 'tooltip-caret-positions'


/***/ },
/* 6 */
/***/ function(module, exports) {

	var bodyEl = document.querySelector('body')

	function dismiss(el) {
		el.remove()
		bodyEl.style.overflow = 'auto'
	}

	function dismissible(el) {
		var closeControl = el.querySelector('.ds-close')

		function click(event) {
			el.classList.add('ds-fade')
			el.addEventListener('transitionend', transitionEnded)
		}

		function transitionEnded(event) {
			if (event.target.classList.contains('ds-dismissible')) {
				el.removeEventListener('transitionend', transitionEnded)
				el.classList.remove('ds-fade')
				dismiss(el)
			}
			closeControl.removeEventListener('click', click)
		}

		closeControl.addEventListener('click', click)
	}

	module.exports = dismissible

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(2)

	var keycodes = utils.keycodes
	var focusable = utils.focusable

	var bodyEl = document.querySelector('body')

	function openMenu(el) {
		el.classList.add('ds-open')
	}

	function closeMenu(el) {
		el.classList.remove('ds-open')
	}

	function dropdown(el) {
		var openAction = 'click'
		var closeAction = 'click'
		var items = Array.prototype.slice.call(el.querySelectorAll('.ds-option'))
		var focusableEls = Array.prototype.slice.call(el.querySelectorAll(focusable))
			.map(function(focusEl) {
				return {
					el: focusEl,
					tabindex: focusEl.getAttribute('tabindex')
				}
			})
		var focusedout

		focusableEls.forEach(function(focusEl) {
			focusEl.el.setAttribute('tabindex', -1)
		})

		items.forEach(function(item) {
			item.setAttribute('tabindex', -1)
		})

		if (el.classList.contains('ds-hover')) {
			openAction = 'mouseenter'
			closeAction = 'mouseleave'
		}

		function addOpenListener() {
			el.addEventListener(openAction, openListener)
			el.addEventListener('keydown', keydownOpenListener)
		}

		function removeOpenListener() {
			el.removeEventListener(openAction, openListener)
			el.removeEventListener('keydown', keydownOpenListener)
		}

		function addCloseListener() {
			el.addEventListener(closeAction, clickCloseListener)
			el.addEventListener('keydown', keydownCloseListener)
			el.addEventListener('blur', blurListener, true)
			el.addEventListener('focus', focusListener, true)
		}

		function removeCloseListener() {
			el.removeEventListener(closeAction, clickCloseListener)
			el.removeEventListener('keydown', keydownCloseListener)
			el.removeEventListener('blur', blurListener, true)
			el.removeEventListener('focus', focusListener, true)
		}

		function openListener() {
			removeOpenListener()

			focusableEls.forEach(function(focusEl) {
				if (focusEl.tabindex)
					focusEl.el.setAttribute('tabindex', focusEl.tabindex)
				else
					focusEl.el.removeAttribute('tabindex')
			})

			items.forEach(function(item, i) {
				if (item.getAttribute('tabindex') === '-1')
					item.setAttribute('tabindex', 0)
			})

			openMenu(el)
			addCloseListener()
		}

		function keydownOpenListener(e) {
			if (e.keyCode === keycodes.enter || e.keyCode === keycodes.space) {
				e.preventDefault()
				openListener()
			}
		}

		function keydownCloseListener(e) {
			if (e.keyCode === keycodes.enter || e.keyCode === keycodes.space) {
				e.preventDefault()
				clickCloseListener(e)
			}
		}

		function clickCloseListener(e) {
			var closeClasses = [
				'ds-dropdown',
				'ds-dropup',
				'ds-title',
				'ds-option'
			]

			var shouldClose = closeClasses.reduce(function(acc, currClass) {
				return acc || e.target.classList.contains(currClass)
			}, false)
			
			if (shouldClose)
				closeListener()
			else
				e.stopPropagation()
		}

		function blurListener(e) {
			focusedout = true
			
			requestAnimationFrame(function() {
				if (focusedout) closeListener()
			})
		}

		function focusListener() {
			focusedout = false
		}

		function closeListener() {
			removeCloseListener()

			focusableEls.forEach(function(focusEl) {
				focusEl.el.setAttribute('tabindex', -1)
			})

			items.forEach(function(item) {
				item.setAttribute('tabindex', -1)
			})

			closeMenu(el)
			el.focus()
			addOpenListener()
		}

		addOpenListener()
	}

	module.exports = dropdown

/***/ },
/* 8 */
/***/ function(module, exports) {

	
	var bodyEl = document.querySelector('body')

	function progressBar(el) {
		var progress = el.querySelector('.ds-progress') 
		var progressCounter = el.querySelector('.ds-progress-counter')
		
		var val = progress.dataset.value || 0;
		var max = progress.dataset.maxValue || 100;
		var min = progress.dataset.minValue || 0;

		// set initial progress value based on data-value
		setProgress(val)

		// create an observer instance
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				// get new progress value from mutation observer
				var newVal = mutation.target.dataset.value;
				// set new progress value
				setProgress(newVal);
			});
		});

		// set observer, pass in the target node and observer options
		observer.observe(progress, { attributes: true });
		
		function setProgress(val) {
			if (val > min && val <= max) {
				progress.style.width = val + '%';
				if (progressCounter) setProgressCounter(val)
			} else if (val > max) {
				progress.style.width = max + '%';
				if (progressCounter) setProgressCounter(max)
			} else {
				progress.style.width = min + '%';
				if (progressCounter) setProgressCounter(min)
			}
		}

		function setProgressCounter(val) {
			progressCounter.innerHTML = val;
			progressCounter.style.left = 'calc(' + val + '% - ' + (progressCounter.offsetWidth/2) + 'px)';
		}
	}

	function fileUpload(el) {
		var progress = el.querySelector('.ds-progress') 
		var val = progress.dataset.value || 0;

		setProgress(val)

		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				// get new progress value from mutation observer
				var newVal = mutation.target.dataset.value;
				// set new progress value
				setProgress(newVal);
			});
		});

		// set observer, pass in the target node and observer options
		observer.observe(progress, { attributes: true });

		function setProgress(val) {
			progress.style.width = val + '%';
		}
	}

	module.exports = {
		progressBar: progressBar,
		fileUpload: fileUpload
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var bodyEl = document.querySelector('body')

	var utils = __webpack_require__(2)
	var keycodes = utils.keycodes
	var focusable = utils.focusable

	function openAccordion(target) {
		target.classList.add('ds-open')
	}

	function closeAccordion(target) {
		target.classList.remove('ds-open')
	}

	function accordion(el) {
		var accordionItems = Array.prototype.slice.call(el.querySelectorAll('.ds-accordion-control'))

		var focusableEls = Array.prototype.slice.call(el.querySelectorAll(focusable))
			.map(function(focusableEl) {
				return {
					el: focusableEl,
					tabindex: focusableEl.getAttribute('tabindex')
				}
			})

		accordionItems.forEach(function(item) {
			// make these keyboard accessible
			item.setAttribute('tabindex', 0)

			// add listeners on accordion title
			// for click and `enter` key to toggle
			item.addEventListener('click', accordionToggle)
			item.addEventListener('keydown', function(e) {
				if (e.keyCode === keycodes.enter)
					accordionToggle.call(this, e)
			})
		})

		hideFocusableEls()

		function accordionToggle(e) {
			var accordionItem = this

			// only toggle if either the title or control was directly clicked
			// expandable part of accordion is nested within `control`
			if (!e.target.classList.contains('ds-accordion-title') && !e.target.classList.contains('ds-accordion-control'))
				return

			if (accordionItem.classList.contains('ds-open')) {
				hideFocusableEls()
				closeAccordion(accordionItem)
			} else {
				showFocusableEls()
				openAccordion(accordionItem)
			}
		}

		function hideFocusableEls() {
			focusableEls.forEach(function(focusableEl) {
				focusableEl.el.setAttribute('tabindex', -1)
			})
		}

		function showFocusableEls() {
			focusableEls.forEach(function(focusableEl) {
				if (focusableEl.tabindex) {
					focusableEl.el.setAttribute('tabindex', focusableEl.tabindex)
				} else {
					focusableEl.el.removeAttribute('tabindex')
				}
			})
		}
	}

	module.exports = accordion

/***/ },
/* 10 */
/***/ function(module, exports) {

	var bodyEl = document.querySelector('body')

	function setHeight(group){
		var tallest = 0

		group.forEach(function(item) {
			var itemHeight = item.offsetHeight
			tallest = (itemHeight > tallest ? itemHeight : tallest)
		})

		group.forEach(function(item) {
			item.style.minHeight = tallest + "px"
		})
	}

	module.exports = setHeight

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var eventHandler = __webpack_require__ (2).events
	var createIndicators = __webpack_require__(12)
	var createArrows = __webpack_require__(14)

	function carousel(el, initialSelectedSlide) {


		/* -- BEGIN VARS -- */
		var events = eventHandler()
		var itemsContainer = el.querySelector('.ds-carousel-items')
		var items = Array.prototype.slice.call(el.querySelectorAll('.ds-carousel-items > *'))
		var isLooping = el.classList.contains('ds-infinite')
		var disabledArrowDirection = null
		var disabledArrow = null
		var indicators
		var arrows
		var methods = {
			nextIndex: next,
			prevIndex: prev,
			firstIndex: first,
			lastIndex: last,
			changePosition: changePosition
		}
		initialSelectedSlide = initialSelectedSlide || 0
		/* -- END VARS -- */



		/* -- BEGIN INIT SEQUENCE -- */

		indicators = createIndicators(el, items, events, initialSelectedSlide)

		arrows = createArrows(indicators.el, events)

		setWorkingCarouselStyles()

		events.addListener('changePosition', function(num) {
			changePosition(num)
		})

		events.addListener('arrowClick', function(direction) {
			var pendingPosition

			if (direction === 'left') pendingPosition = prev(indicators.position())
			else if (direction === 'right') pendingPosition = next(indicators.position())

			indicators.position(pendingPosition)
			changePosition(pendingPosition)
		})
		/* -- END INIT SEQUENCE -- */



		/* -- BEGIN METHODS -- */

		function next(currentPosition) {

			var pendingPosition = currentPosition >= last()
				? isLooping ? first() : null
				: currentPosition + 1

			return pendingPosition
		}

		function prev(currentPosition) {

			var pendingPosition = currentPosition <= first()
				? isLooping ? last() : null
				: currentPosition - 1

			return pendingPosition
		}

		function first() {
			return 0
		}

		function last() {
			return items.length - 1
		}

		function changePosition(num) {
			if (num == null) return
			itemsContainer.style.left = (num * -100) + '%'

			if (isLooping)
				return

			if ((disabledArrowDirection === 'left' && num !== 0) || (disabledArrowDirection === 'right' && num !== items.length - 1)) {
				enableArrow()
			}

			if (num === 0)
				disableArrow(num)
			else if (num === items.length - 1)
				disableArrow(num)
		}

		function disableArrow(index) {
			disabledArrowDirection = index === 0 ? 'left' : 'right'
			disabledArrow = disabledArrowDirection === 'left' ? arrows.elements.left : arrows.elements.right

			disabledArrow.style.opacity = 0
			disabledArrow.classList.add('ds-disabled')
		}

		function enableArrow() {
			disabledArrow.style.display = ''
			disabledArrow.classList.remove('ds-disabled')
			disabledArrow.style.opacity = 1
			disabledArrowDirection = null
			disabledArrow = null

		}
		/* -- END METHODS -- */



		/* -- BEGIN INIT FUNCTIONS -- */
		function setWorkingCarouselStyles() {
			// each item should be size of the carousel
			// item container should be 100% * num of items
			var itemContainerWidth = (items.length * 100) + '%'

			// each item set to 1 / numOfItems, matches width of carousel
			var itemWidth = (100 / items.length) + '%'

			itemsContainer.style.width = itemContainerWidth
			items.forEach(function(item) {
				item.style.width = itemWidth
			})

			// set position for initial slide
			changePosition(initialSelectedSlide || 0)
		}
		/* -- END INIT FUNCTIONS -- */
	}




	module.exports = carousel

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var template = __webpack_require__(13)

	function indicators(carouselEl, items, events, selected) {


		/*-- BEGIN VARS -- */
		var currentPosition = selected || 0
		var indicatorAttrs = {
			classes: carouselEl.classList,
			numOfItems: items.length
		}
		var indicators
		/*-- END VARS -- */



		/* -- BEGIN INIT SEQUENCE -- */
		indicators = createIndicators()
		addListeners()
		/* -- END INIT SEQUENCE -- */



		/* -- BEGIN RETURNED API -- */
		return {
			position: position,
			addListeners: addListeners,
			removeListeners: removeListeners,
			el: carouselEl.querySelector('.ds-carousel-position-indicator')
		}
		/* -- END RETURNED API -- */



		/* -- BEGIN METHODS & PRIVATE FUNCS -- */
		function position(num) {
			if (typeof num === 'undefined') {
			// if nothing was passed in, treat as a getter
				return currentPosition
			} else if (num === null) {
			// if it is null, don't do anything
				return
			} else if (typeof num !== 'number') {
			// if it's anything else that's not a number, warn
				return console.warn('cannot change position to a non-number')
			} else {
			// save the new position and change the selected indicator
				currentPosition = num
				changeIndicator(num)
			}
		}

		function addListeners() {
			indicators.forEach(function(ind) {
				ind.addEventListener('click', clickListener)
			})
		}

		function removeListeners() {
			indicators.forEach(function(ind) {
				ind.removeEventListener('click', clickListener)
			})
		}

		function clickListener(evt) {
			var indicator = evt.target
			var index = +indicator.dataset.index
			
			// don't do anything if they clicked the already selected one
			if (index === currentPosition)
				return

			currentPosition = index

			changeIndicator(index)

			events.trigger('changePosition', index)
		}

		function changeIndicator(index) {
			indicators.forEach(function(indicator, i) {
				if (i === index) indicator.classList.add('ds-selected')
				else indicator.classList.remove('ds-selected')
			})
		}
		/* -- END METHODS & PRIVATE FUNCS -- */



		/* -- BEGIN INIT FUNCTIONS -- */
		function createIndicators() {
			var html = template(getIndicatorOptions(indicatorAttrs))
			carouselEl.insertAdjacentHTML('beforeend', html)

			var indicators = carouselEl.querySelectorAll('.ds-carousel-position-indicator > div')

			return Array.prototype.slice.call(indicators)
		}

		function getIndicatorOptions(indicatorAttrs) {
			var opts = {}

			var specifiedType = indicatorAttrs.classes.contains('ds-carousel-controls-circle') 
				? 'circle'
				: indicatorAttrs.classes.contains('ds-carousel-controls-number')
					? 'number'
					: null

			// set positionIndicator template options
			opts.items = indicatorAttrs.numOfItems

			opts.type = opts.items < 6 ? specifiedType || 'circle' : 'condensed'

			opts.color = indicatorAttrs.classes.contains('ds-carousel-controls-color')

			return opts
		}
		/* -- END INIT FUNCTIONS -- */
	}

	module.exports = indicators

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function (data) {
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }

	 var type = data.type ;
	__p += '\n';
	 var color = data.color && type === 'circle' ;
	__p += '\n';
	 var items = [] ;
	__p += '\n';
	 for (var i = 0; i < data.items; i++) { items.push(i) } ;
	__p += '\n\n\n<div class="ds-carousel-position-indicator ds-' +
	((__t = ( type )) == null ? '' : __t) +
	' ' +
	((__t = ( color ? 'ds-color' : '' )) == null ? '' : __t) +
	'">\n\n	';
	 if (type !== 'condensed') { ;
	__p += '\n\n		';
	 items.forEach(function(item, i) { ;
	__p += '\n			<div class="ds-indicator ' +
	((__t = ( i === 0 ? 'ds-selected' : '' )) == null ? '' : __t) +
	'" data-index="' +
	((__t = ( i )) == null ? '' : __t) +
	'">' +
	((__t = ( type === 'number' ? i + 1 : '')) == null ? '' : __t) +
	'</div>\n		';
	 }) ;
	__p += '\n\n	';
	 } else { ;
	__p += '\n\n		<div class="ds-indicator">1 / ' +
	((__t = ( data.items )) == null ? '' : __t) +
	'</div>\n\n	';
	 } ;
	__p += '\n\n</div>\n\n';
	return __p
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var template = __webpack_require__(15)

	function arrows(indicatorEl, events) {


		/*-- BEGIN VARS -- */
		var arrows
		/*-- END VARS -- */



		/* -- BEGIN INIT SEQUENCE -- */
		arrows = createArrows()
		addListeners()
		/* -- END INIT SEQUENCE -- */



		/* -- BEGIN RETURNED API -- */
		return {
			elements: {
				left: arrows.filter(function(arrow) { return arrow.classList.contains('ds-left') })[0],
				right: arrows.filter(function(arrow) { return arrow.classList.contains('ds-right') })[0]
			},
			addListeners: addListeners,
			removeListeners: removeListeners
		}
		/* -- END RETURNED API -- */



		/* -- BEGIN METHODS -- */
		function addListeners() {
			arrows.forEach(function(arrow) {
				arrow.addEventListener('click', clickListener)
			})
		}

		function removeListeners() {
			arrows.forEach(function(arrow) {
				arrow.removeEventListener('click', clickListener)
			})
		}

		function clickListener(evt) {
			var arrow = evt.target
			var direction = arrow.classList.contains('ds-left')
				? 'left'
				: 'right'

			events.trigger('arrowClick', direction)
		}
		/* -- END METHODS -- */



		/* -- BEGIN INIT FUNCTIONS -- */
		function createArrows() {
			var leftArrow = template({ direction: 'left' })
			var rightArrow = template({ direction: 'right' })
			
			indicatorEl.insertAdjacentHTML('afterbegin', leftArrow)
			indicatorEl.insertAdjacentHTML('beforeend', rightArrow)

			var arrows = indicatorEl.querySelectorAll('.ds-carousel-arrow')

			return Array.prototype.slice.call(arrows)
		}

		function getArrowOptions(arrowAttrs) {
			var opts = {}

			return opts
		}
		/* -- END INIT FUNCTIONS -- */
	}

	module.exports = arrows

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function (data) {
	var __t, __p = '';
	__p += '<div class="ds-carousel-arrow ds-' +
	((__t = ( data.direction )) == null ? '' : __t) +
	'"></div>';
	return __p
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(2)
	var scrollTo = utils.scrollTo
	var easeInOut = utils.easeInOut

	function jumpLink(el) {
		var page = document.querySelector('body')
		var anchorName = document.querySelector(el.hash)
		//offsetTop will not work, btw
		var scrollPos = anchorName.getBoundingClientRect().top

		el.addEventListener('click', function(evt){
			evt.preventDefault()
			scrollTo(page, scrollPos, 600);
		})
	}

	module.exports = jumpLink

/***/ }
/******/ ]);