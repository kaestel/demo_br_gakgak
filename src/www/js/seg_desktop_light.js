
/*u.js*/
var u, Util = u = new function() {}
u.version = 5;
u.bug = function() {}
u.stats = new function() {this.pageView = function(){};this.event = function(){};this.customVar = function(){}}

/*u-debug.js*/
Util.testURL = function(url) {
	return true;
	return document.domain.match(/.local$|^w\./);
}
Util.debug = function(output) {
	if(Util.testURL()) {
		var element, br;
		if(Util.debugWindow && Util.debugWindow.document) {
			element = Util.debugWindow.document.createTextNode(output);
			br = Util.debugWindow.document.createElement('br');
			Util.debugWindow.document.body.appendChild(element);
			Util.debugWindow.document.body.appendChild(br);
			Util.debugWindow.scrollBy(0,1000);
		}
		else {
			Util.openDebugger();
			if(!Util.debugWindow) {
				alert("Disable popup blocker!");
			}
			else {
				Util.debug(output);
			}
		}
	}
}
Util.debugWindow = false;
Util.openDebugger = function() {
	Util.debugWindow = window.open("", "debugWindow", "width=600, height=400, scrollbars=yes, resizable=yes");
	Util.debugWindow.document.body.style.fontFamily = "Courier";
	var element = Util.debugWindow.document.createTextNode("--- new session ---");
	var br = Util.debugWindow.document.createElement('br');
	Util.debugWindow.document.body.appendChild(br);
	Util.debugWindow.document.body.appendChild(element);
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
}
Util.tracePointer = function(e) {
	if(Util.testURL()) {
		var position = document.createElement("div");
		document.body.appendChild(position);
		position.id = "debug_pointer";
		position.style.position = "absolute";
		position.style.backgroundColor = "#ffffff";
		position.style.color = "#000000";
		this.trackMouse = function(event) {
			u.ge("debug_pointer").innerHTML = event.pageX+"x"+event.pageY;
			u.ge("debug_pointer").style.left = 7+event.pageX+"px";
			u.ge("debug_pointer").style.top = 7+event.pageY+"px";
		}
		u.e.addEvent(e, "mousemove", this.trackMouse);
	}
}
Util.bug = function(target, message, color) {
	if(Util.testURL()) {
		var option, options = new Array(new Array(0, "auto", "auto", 0), new Array(0, 0, "auto", "auto"), new Array("auto", 0, 0, "auto"), new Array("auto", "auto", 0, 0));
		if((!color && !message) || (!color && isNaN(target))) {
			color = message;
			message = target;
			target = 0;
		}
		if(!color) {
			color = "black";
		}
		if(!u.ge("debug_"+target)) {
			for(var i = 0; option = options[i]; i++) {
				if(!u.ge("debug_id_"+i)) {
					var d_target = document.createElement("div");
					document.body.appendChild(d_target);
					d_target.style.position = "absolute";
					d_target.style.zIndex = 100;
					d_target.style.top = option[0];
					d_target.style.right = option[1];
					d_target.style.bottom = option[2];
					d_target.style.left = option[3];
					d_target.style.backgroundColor = "#ffffff";
					d_target.style.color = "#000000";
					d_target.style.textAlign = "left";
					d_target.style.padding = "3px";
					d_target.id = "debug_id_"+i;
					d_target.className = "debug_"+target;
					break;
				}
			}
		}
		u.ae(u.ge("debug_"+target), "div", ({"style":"color: " + color})).innerHTML = message;
	}
}
Util.htmlToText = function(string) {
	return string.replace(/>/g, "&gt;").replace(/</g, "&lt;");
}
Util.listObjectContent = function(object) {
	var x, s = "-s-<br>";
	for(x in object) {
		if(object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) == "string") {
			s += x + "=" + object[x]+" -> " + u.nodeId(object[x]) + "<br>";
		}
		else {
			s += x + "=" + object[x]+"<br>";
		}
	}
	s += "-e-"
	return s;
}
Util.nodeId = function(node) {
	return node.id ? node.id : (node.className ? node.className : (node.name ? node.name : node.nodeName));
}
/*u-dom.js*/
Util.getElement = u.ge = function(identifier, target) {
	var e, i, regexp, t;
	t = target ? target : document;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			return e;
		}
	}
	return t.getElementsByTagName(identifier).length ? t.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, target) {
	var e, i, regexp, t;
	var elements = new Array();
	t = target ? target : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			elements.push(e);
		}
	}
	return elements.length ? elements : t.getElementsByTagName(identifier);
}
Util.querySelector = u.qs = function(query, target) {
	t = target ? target : document;
	return t.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, target) {
	t = target ? target : document;
	return t.querySelectorAll(query);
}
Util.getSibling = u.gs = function(e, direction) {
	try {
		var node_type = e.nodeType;
		var ready = false;
		var prev_node = false;
		for(var i = 0; node = e.parentNode.childNodes[i]; i++) {
			if(node.nodeType == node_type) {
				if(ready) {
					return node;
				}
				if(node == e) {
					if(direction == "next") {
						ready = true;
					}
					else {
						return prev_node;
					}
				}
				else {
					prev_node = node;
				}
			}
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.gs, called from: "+arguments.callee.caller);
	}
}
Util.previousSibling = u.ps = function(e, exclude) {
	var node = e.previousSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.nodeType == 8 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.previousSibling;
		}
	}
	else {
		while(node && (node.nodeType == 3 || node.nodeType == 8)) {
			node = node.previousSibling;
		}
	}
	return node;
}
Util.nextSibling = u.ns = function(e, exclude) {
	var node = e.nextSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.nodeType == 8 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.nextSibling;
		}
	}
	else {
		while(node && (node.nodeType == 3 || node.nodeType == 8)) {
			node = node.nextSibling;
		}
	}
	return node;
}
Util.appendElement = u.ae = function(e, node_type, attributes) {
	try {
		var node = e.appendChild(document.createElement(node_type));
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
		u.bug("e="+e + ":nodename="+e.nodeName + ":id="+e.id + ":classname="+e.classname + ":attributes=" + attribute);
	}
}
Util.insertElement = u.ie = function(e, node_type, attributes) {
	try {
		var node = e.insertBefore(document.createElement(node_type), e.firstChild);
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.getIJ, called from: "+arguments.callee.caller);
	}
}
Util.getIJ = function(e, id) {
	try {
		var regexp = new RegExp(id + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
		if(e.className.match(regexp)) {
			return e.className.match(regexp)[0].replace(id + ":", "");
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.getIJ, called from: "+arguments.callee.caller);
	}
}
Util.setClass = u.sc = function(e, classname) {
	try {
		e.className = classname;
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.setClass, called from: "+arguments.callee.caller);
	}
}
Util.addClass = u.ac = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(!regexp.test(e.className)) {
				e.className += e.className ? " " + classname : classname;
				e.offsetTop;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.addClass, called from: "+arguments.callee.caller);
	}
}
Util.removeClass = u.rc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp(classname + " | " + classname + "|" + classname);
			e.className = e.className.replace(regexp, "");
			e.offsetTop;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.toggleClass = u.tc = function(e, classname, second_classname) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(e.className)) {
			Util.removeClass(e, classname);
			if(second_classname) {
				Util.addClass(e, second_classname);
			}
			return second_classname;
		}
		else {
			Util.addClass(e, classname);
			if(second_classname) {
				Util.removeClass(e, second_classname);
			}
			return classname;
		}
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.toggleClass, called from: "+arguments.callee.caller);
	}
}
Util.hasClass = u.hc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(regexp.test(e.className)) {
				return true;
			}
			else {
				return false;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.hasClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.applyStyle = u.as = function(e, style, value) {
	try {
		e.style[style] = value;
		e.offsetHeight;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.applyStyle("+u.nodeId(e)+", "+style+", "+value+") called from: "+arguments.callee.caller);
	}
}
Util.getComputedStyle = u.gcs = function(e, attribute) {
	e.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(attribute);
	}
	return false;
}
Util.wrapElement = u.we = function(e, wrap, attributes) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	if(attributes) {
		for(attribute in attributes) {
			wrap.setAttribute(attribute, attributes[attribute]);
		}
	}
	wrap.appendChild(e);
	return wrap;
}

/*u-animation.js*/
Util.Animation = u.a = new function() {
	this.support = function() {
		var node = document.createElement("div");
		if(node.style[this.variant() + "Transition"] !== undefined) {
			return true;
		}
		return false;
	}
	this.variant = function(e) {
		if(this.implementation == undefined) {
			if(document.body.style.webkitTransition != undefined) {
				this.implementation = "webkit";
			}
			else if(document.body.style.MozTransition != undefined) {
				this.implementation = "Moz";
			}
			else if(document.body.style.oTransition != undefined) {
				this.implementation = "o";
			}
			else {
				this.implementation = "";
			}
		}
		return this.implementation;
	}
	this.translate = function(e, x, y) {
		var variant_string = this.variant();
		if(variant_string == "webkit") {
			e.style[variant_string + "Transform"] = "translate3d("+x+"px, "+y+"px, 0)";
		}
		else {
			e.style[variant_string + "Transform"] = "translate("+x+"px, "+y+"px)";
		}
		e.element_x = x;
		e.element_y = y;
		e._x = x;
		e._y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotate = function(e, deg) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		e._rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.scale = function(e, scale) {
		e.style[this.variant() + "Transform"] = "scale("+scale+")";
		e.scale = scale;
		e._scale = scale;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setOpacity = function(e, opacity) {
		e.style.opacity = opacity;
		e._opacity = opacity;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setWidth = function(e, width) {
		var width_px = (width == "auto" ? width : (width.toString().match(/\%/) ? width : width+"px"));
		e.style.width = width_px;
		e._width = width;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setHeight = function(e, height) {
		var height_px = (height == "auto" ? height : (height.toString().match(/\%/) ? height : height+"px"));
		e.style.height = height_px;
		e._height = height;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotateTranslate = function(e, deg, x, y) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg) translate("+x+"px, "+y+"px)";
		e.rotation = deg;
		e.element_x = x;
		e.element_y = y;
		e._rotation = deg;
		e._x = x;
		e._y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.translateRotate = function(e, x, y, deg) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px) rotate("+deg+"deg)";
		e.element_x = x;
		e.element_y = y;
		e.rotation = deg;
		e._x = x;
		e._y = y;
		e._rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.transition = function(e, transition) {
		try {
			e.style[this.variant() + "Transition"] = transition;
			u.e.addEvent(e, this.variant() + "TransitionEnd", this._transitioned);
			u.e.addEvent(e, "transitionend", this._transitioned);
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				var d = duration[0];
				e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
			}
			else {
				e.duration = false;
			}
			e.offsetHeight;
		}
		catch(exception) {
			u.bug("Exception ("+exception+") in u.a.transition, called from: "+arguments.callee.caller);
		}
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.fadeIn = function(e, duration) {
		duration = duration == undefined ? "0.5s" : duration;
		u.as(e, "opacity", 0);
		if(u.gcs(e, "display") == "none") {
			u.as(e, "display", "block");
		}
		u.a.transition(e, "all "+duration+" ease-in");
		u.as(e, "opacity", 1);
	}
}

/*u-events.js*/
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation()
		}
	}
	this.addEvent = function(e, type, action) {
		try {
			e.addEventListener(type, action, false);
		}
		catch(exception) {
			alert("exception in addEvent:" + e + "," + type + ":" + exception);
		}
	}
	this.removeEvent = function(e, type, action) {
		try {
			e.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in removeEvent:" + e + "," + type + ":" + exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.removeStartEvent = this.removeDownEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.addMoveEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.removeMoveEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.addEndEvent = this.addUpEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(e, "mouseout", this._snapback);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.removeEvent(e, "mouseout", this._snapback);
		}
	}
	this.overlap = function(element, target, strict) {
		if(target.constructor.toString().match("Array")) {
			var target_start_x = Number(target[0]);
			var target_start_y = Number(target[1]);
			var target_end_x = Number(target[2]);
			var target_end_y = Number(target[3]);
		}
		else {
			var target_start_x = target.element_x ? target.element_x : 0;
			var target_start_y = target.element_y ? target.element_y : 0;
			var target_end_x = Number(target_start_x + target.offsetWidth);
			var target_end_y = Number(target_start_y + target.offsetHeight);
		}
		var element_start_x = Number(element.element_x);
		var element_start_y = Number(element.element_y);
		var element_end_x = Number(element_start_x + element.offsetWidth);
		var element_end_y = Number(element_start_y + element.offsetHeight);
		if(strict && element_start_x >= target_start_x && element_start_y >= target_start_y && element_end_x <= target_end_x && element_end_y <= target_end_y) {
			return true;
		}
		else if(strict) {
			return false;
		}
		else if(element_end_x < target_start_x || element_start_x > target_end_x || element_end_y < target_start_y || element_start_y > target_end_y) {
			return false;
		}
		return true;
	}
	this.resetClickEvents = function(e) {
		u.t.resetTimer(e.t_held);
		u.t.resetTimer(e.t_clicked);
		this.removeEvent(e, "mouseup", this._dblclicked);
		this.removeEvent(e, "touchend", this._dblclicked);
		this.removeEvent(e, "mousemove", this._clickCancel);
		this.removeEvent(e, "touchmove", this._clickCancel);
		this.removeEvent(e, "mousemove", this._move);
		this.removeEvent(e, "touchmove", this._move);
	}
	this.resetDragEvents = function(e) {
		this.removeEvent(e, "mousemove", this._pick);
		this.removeEvent(e, "touchmove", this._pick);
		this.removeEvent(e, "mousemove", this._drag);
		this.removeEvent(e, "touchmove", this._drag);
		this.removeEvent(e, "mouseup", this._drop);
		this.removeEvent(e, "touchend", this._drop);
		this.removeEvent(e, "mouseout", this._snapback);
		this.removeEvent(e, "mouseout", this._drop);
		this.removeEvent(e, "mousemove", this._scrollStart);
		this.removeEvent(e, "touchmove", this._scrollStart);
		this.removeEvent(e, "mousemove", this._scrolling);
		this.removeEvent(e, "touchmove", this._scrolling);
		this.removeEvent(e, "mouseup", this._scrollEnd);
		this.removeEvent(e, "touchend", this._scrollEnd);
	}
	this.resetEvents = function(e) {
		this.resetClickEvents(e);
		this.resetDragEvents(e);
	}
	this.resetNestedEvents = function(e) {
		while(e && e.nodeName != "HTML") {
			this.resetEvents(e);
			e = e.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = new Date().getTime();
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			var node = this;
			while(node) {
				if(node.e_drag || node.e_swipe) {
					u.e.addMoveEvent(this, u.e._clickCancel);
					break;
				}
				else {
					node = node.parentNode;
				}
			}
			u.e.addMoveEvent(this, u.e._move);
			u.e.addEndEvent(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.addMoveEvent(this, u.e._pick);
			u.e.addEndEvent(this, u.e._drop);
		}
		if(this.e_scroll) {
			u.e.addMoveEvent(this, u.e._scrollStart);
			u.e.addEndEvent(this, u.e._scrollEnd);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		u.e.resetClickEvents(this);
		if(typeof(this.clickCancelled) == "function") {
			this.clickCancelled(event);
		}
	}
	this._move = function(event) {
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(e) {
		e.e_hold = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._held = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(e) {
		e.e_click = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._clicked = function(event) {
		u.stats.event(this, "clicked");
		u.e.resetNestedEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(e) {
		e.e_dblclick = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.e.resetNestedEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.drag = function(e, target, strict, snapback) {
		e.e_drag = true;
		e.strict = strict ? true : false;
		e.allowed_offset = e.strict ? 0 : 250;
		e.elastica = 2;
		e.snapback = snapback ? true : false;
		if(target.constructor.toString().match("Array")) {
			e.start_drag_x = Number(target[0]);
			e.start_drag_y = Number(target[1]);
			e.end_drag_x = Number(target[2]);
			e.end_drag_y = Number(target[3]);
		}
		else {
			e.start_drag_x = target.element_x ? target.element_x : 0;
			e.start_drag_y = target.element_y ? target.element_y : 0;
			e.end_drag_x = Number(e.start_drag_x + target.offsetWidth);
			e.end_drag_y = Number(e.start_drag_y + target.offsetHeight);
		}
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		e.locked = ((e.end_drag_x - e.start_drag_x == e.offsetWidth) && (e.end_drag_y - e.start_drag_y == e.offsetHeight));
		e.vertical = (!e.locked && e.end_drag_x - e.start_drag_x == e.offsetWidth);
		e.horisontal = (!e.locked && e.end_drag_y - e.start_drag_y == e.offsetHeight);
		u.e.addStartEvent(e, this._inputStart);
	}
	this._pick = function(event) {
		var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
		var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
		u.e.resetNestedEvents(this);
		if(init_speed_x > init_speed_y && this.horisontal || init_speed_x < init_speed_y && this.vertical || !this.vertical && !this.horisontal) {
		    u.e.kill(event);
			this.move_timestamp = new Date().getTime();
			this.current_xps = 0;
			this.current_yps = 0;
			this.start_input_x = u.eventX(event) - this.element_x; // - u.absLeft(this);//(event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
			this.start_input_y = u.eventY(event) - this.element_y; // - u.absTop(this);//.targetTouches ? event.targetTouches[0].pageY : event.pageY);
			u.a.transition(this, "none");
			if(typeof(this.picked) == "function") {
				this.picked(event);
			}
			u.e.addMoveEvent(this, u.e._drag);
			u.e.addEndEvent(this, u.e._drop);
		}
	}
	this._drag = function(event) {
			this.new_move_timestamp = new Date().getTime();
				var offset = false;
				this.current_x = u.eventX(event) - this.start_input_x;
				this.current_y = u.eventY(event) - this.start_input_y;
					this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
					this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
				this.move_timestamp = this.new_move_timestamp;
				if(this.vertical) {
					this.element_y = this.current_y;
				}
				else if(this.horisontal) {
					this.element_x = this.current_x;
				}
				else if(!this.locked) {
					this.element_x = this.current_x;
					this.element_y = this.current_y;
				}
				if(!this.locked) {
					if(u.e.overlap(this, new Array(this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y), true)) {
						if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.horisontal)) {
							if(this.current_xps < 0) {
								this.swiped = "left";
							}
							else {
								this.swiped = "right";
							}
						}
						else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.vertical)) {
							if(this.current_yps < 0) {
								this.swiped = "up";
							}
							else {
								this.swiped = "down";
							}
						}
						u.a.translate(this, this.element_x, this.element_y);
					}
					else {
						this.swiped = false;
						this.current_xps = 0;
						this.current_yps = 0;
						if(this.element_x < this.start_drag_x && !this.vertical) {
							offset = this.element_x < this.start_drag_x - this.allowed_offset ? - this.allowed_offset : this.element_x - this.start_drag_x;
							this.element_x = this.start_drag_x;
							this.current_x = this.element_x + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_x + this.offsetWidth > this.end_drag_x && !this.vertical) {
							offset = this.element_x + this.offsetWidth > this.end_drag_x + this.allowed_offset ? this.allowed_offset : this.element_x + this.offsetWidth - this.end_drag_x;
							this.element_x = this.end_drag_x - this.offsetWidth;
							this.current_x = this.element_x + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_x = this.element_x;
						}
						if(this.element_y < this.start_drag_y && !this.horisontal) {
							offset = this.element_y < this.start_drag_y - this.allowed_offset ? - this.allowed_offset : this.element_y - this.start_drag_y;
							this.element_y = this.start_drag_y;
							this.current_y = this.element_y + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_y + this.offsetHeight > this.end_drag_y && !this.horisontal) {
							offset = (this.element_y + this.offsetHeight > this.end_drag_y + this.allowed_offset) ? this.allowed_offset : (this.element_y + this.offsetHeight - this.end_drag_y);
							this.element_y = this.end_drag_y - this.offsetHeight;
							this.current_y = this.element_y + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_y = this.element_y;
						}
						if(offset) {
							u.a.translate(this, this.current_x, this.current_y);
						}
					}
				}
			if(typeof(this.moved) == "function") {
				this.moved(event);
			}
	}
	this._drop = function(event) {
		u.e.resetEvents(this);
		if(this.e_swipe && this.swiped) {
			if(this.swiped == "left") {
				if(typeof(this.swipedLeft) == "function") {
					this.swipedLeft(event);
				}
			}
			else if(this.swiped == "right") {
				if(typeof(this.swipedRight) == "function") {
					this.swipedRight(event);
				}
			}
			else if(this.swiped == "down") {
				if(typeof(this.swipedDown) == "function") {
					this.swipedDown(event);
				}
			}
			else if(this.swiped == "up") {
				if(typeof(this.swipedUp) == "function") {
					this.swipedUp(event);
				}
			}
		}
		else if(!this.locked && this.start_input_x && this.start_input_y) {
			this.start_input_x = false;
			this.start_input_y = false;
			this.current_x = this.element_x + (this.current_xps/2);
			this.current_y = this.element_y + (this.current_yps/2);
			if(this.current_x < this.start_drag_x) {
				this.current_x = this.start_drag_x;
			}
			else if(this.current_x + this.offsetWidth > this.end_drag_x) {
				this.current_x = this.end_drag_x - this.offsetWidth;
			}
			if(this.current_y < this.start_drag_y) {
				this.current_y = this.start_drag_y;
			}
			else if(this.current_y + this.offsetHeight > this.end_drag_y) {
				this.current_y = this.end_drag_y - this.offsetHeight;
			}
			if(!this.strict && (this.current_xps || this.current_yps)) {
				u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
			}
			else {
				u.a.transition(this, "all 0.1s cubic-bezier(0,0,0.25,1)");
			}
			u.a.translate(this, this.current_x, this.current_y);
		}
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this.swipe = function(e, target, strict) {
		e.e_swipe = true;
		u.e.drag(e, target, strict);
	}
	this._swipe = function(event) {
	}
	this.scroll = function(e) {
		e.e_scroll = true;
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._scrollStart = function(event) {
		u.e.resetNestedEvents(this);
		this.move_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.start_input_x = u.eventX(event) - this.element_x;
		this.start_input_y = u.eventY(event) - this.element_y;
		u.a.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.addMoveEvent(this, u.e._scrolling);
		u.e.addEndEvent(this, u.e._scrollEnd);
	}
	this._scrolling = function(event) {
		this.new_move_timestamp = new Date().getTime();
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
		this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
		this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
		this.move_timestamp = this.new_move_timestamp;
		if(u.scrollY() > 0 && -(this.current_y) + u.scrollY() > 0) {
			u.e.kill(event);
			window.scrollTo(0, -(this.current_y) + u.scrollY());
		}
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this._scrollEnd = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this._snapback = function(event) {
	    u.e.kill(event);
		u.bug(2, "snap")
		if(this.start_input_x && this.start_input_y) {
			input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
			offset_x = 0;
			offset_y = 0;
			if(this.vertical) {
				offset_y = input_y - this.current_y;
			}
			else if(this.horisontal) {
				offset_x = input_x - this.current_x;
			}
			else {
				offset_x = input_x - this.current_x;
				offset_y = input_y - this.current_y;
			}
			u.a.translate(this, (this.element_x+offset_x), (this.element_y+offset_y));
		}
	}
}

/*u-string.js*/
Util.cutString = function(string, length) {
	var matches, i;
	if(string.length <= length) {
		return string;
	}
	else {
	length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; match = matches[i]; i++){
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.randomKey = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "1234567890abcdefghijklmnopqrstuvwxyz".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
/*u-system.js*/
Util.explorer = function(version, scope) {
	if(document.all) {
		var undefined;
		var current_version = navigator.userAgent.match(/(MSIE )(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.safari = function(version, scope) {
	if(navigator.userAgent.indexOf("Safari") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(Safari\/)(\d+)(.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.webkit = function(version, scope) {
	if(navigator.userAgent.indexOf("AppleWebKit") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(AppleWebKit\/)(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.firefox = function(version, scope) {
	var browser = navigator.userAgent.match(/(Firefox\/)(\d+\.\d+)/i);
	if(browser) {
		var current_version = browser[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.opera = function() {
	return (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
}
Util.windows = function() {
	return (navigator.userAgent.indexOf("Windows") >= 0) ? true : false;
}
Util.osx = function() {
	return (navigator.userAgent.indexOf("OS X") >= 0) ? true : false;
}

/*u-position.js*/
Util.absoluteX = u.absX = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + u.absX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.absoluteY = u.absY = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + u.absY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeX = u.relX = function(e) {
	if(u.gcs(e, "position").match(/absolute/) == null && e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absolute/) == null) {
		return e.offsetLeft + u.relX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.relativeY = u.relY = function(e) {
	if(u.gcs(e, "position").match(/relative|absolute/) == null && e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absolute/) == null) {
		return e.offsetTop + u.relY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeOffsetX = u.relOffsetX = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absX(e.offsetParent); // - e.offsetLeft u.relOffsetX(e.offsetParent);
	}
	return 0; //u.absX(e) - e.offsetLeft;
}
Util.relativeOffsetY = u.relOffsetY = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absY(e.offsetParent);
	}
	return 0; // u.absY(e) - e.offsetTop;
}
Util.actualWidth = function(e) {
	return parseInt(u.gcs(e, "width"));
}
Util.actualHeight = function(e) {
	return parseInt(u.gcs(e, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.documentElement.offsetWidth;
}
Util.htmlHeight = u.htmlH = function() {
	return document.documentElement.offsetHeight;
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}

/*u-cookie.js*/
Util.saveCookie = function(name, value) {
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +";"
}
Util.savePermCookie = function(name, value) {
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +";expires=Mon, 04-Apr-2020 05:00:00 GMT;"
}
Util.getCookie = function(name) {
	var matches;
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.delCookie = function(name) {
	document.cookie = encodeURIComponent(name) + "=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

/*u-image.js*/
Util.Image = u.i = new function() {
	this.load = function(e, src) {
		var image = new Image();
		image.e = e;
		u.addClass(e, "loading");
	    u.e.addEvent(image, 'load', u.i._loaded);
		image.src = src;
	}
	this._loaded = function(event) {
		u.removeClass(this.e, "loading");
		if(typeof(this.e.loaded) == "function") {
			this.e.loaded(event);
		}
	}
	this._progress = function(event) {
		u.bug("progress")
		if(typeof(this.e.progress) == "function") {
			this.e.progress(event);
		}
	}
	this._debug = function(event) {
		u.bug("event:" + event.type);
	}
}

/*u-timer.js*/
Util.Timer = u.t = new function() {
	this.actions = new Array();
	this.objects = new Array();
	this.timers = new Array();
	this.setTimer = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setTimeout("u.t.executeTimer("+id+")", timeout);
		return id;
	}
	this.resetTimer = function(id) {
		clearTimeout(this.timers[id]);
		this.objects[id] = false;
	}
	this.executeTimer = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
		this.objects[id].exe = null;
		this.actions[id] = null;
		this.objects[id] = false;
		this.timers[id] = null;
	}
	this.setInterval = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setInterval("u.t.executeInterval("+id+")", timeout);
		return id;
	}
	this.resetInterval = function(id) {
		clearInterval(this.timers[id]);
		this.objects[id] = false;
	}
	this.executeInterval = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
	}
	this.valid = function(id) {
		return this.objects[id] ? true : false;
	}
}

/*u-hash.js*/
Util.Hash = u.h = new function() {
	this.catchEvent = function(callback, node) {
		this.node = node;
		this.node.callback = callback;
		hashChanged = function(event) {
			u.h.node.callback();
		}
		if("onhashchange" in window && !u.explorer(7, "<=")) {
			window.onhashchange = hashChanged;
		}
		else {
			u.current_hash = window.location.hash;
			window.onhashchange = hashChanged;
			setInterval(
				function() {
					if(window.location.hash !== u.current_hash) {
						u.current_hash = window.location.hash;
						window.onhashchange();
					}
				}, 200
			);
		}
	}
	this.cleanHash = function(string, levels) {
		if(!levels) {
			return string.replace(location.protocol+"//"+document.domain, "");
		}
		else {
			var i, return_string = "";
			var hash = string.replace(location.protocol+"//"+document.domain, "").split("/");
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanUrl = function(string, levels) {
		string = string.split("#")[0].replace(location.protocol+"//"+document.domain, "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
}

/*u-link.js*/
Util.link = function(e) {
	var a = (e.nodeName.toLowerCase() == "a" ? e : u.qs("a", e));
	u.addClass(e, "link");
	e.url = a.href;
	a.removeAttribute("href");
	u.e.click(e);
}

/*u-request.js*/
Util.createRequestObject = function(type) {
	var request_object = false;
		try {
			request_object = new XMLHttpRequest();
		}
		catch(e){
			request_object = new ActiveXObject("Microsoft.XMLHTTP");
		}
	if(request_object) {
		return request_object;
	}
	u.bug("Could not create HTTP Object");
	return false;
}
Util.Request = function(node, url, parameters, method, async) {
	if(typeof(node) != "object") {
		var node = new Object();
	}
	node.url = url;
	node.parameters = parameters ? parameters : "";
	node.method = method ? method : "GET";
	node.async = async ? async : false;
	if(node.method.match(/GET|POST|PUT|PATCH/i)) {
		node.HTTPRequest = this.createRequestObject();
		node.HTTPRequest.node = node;
		if(node.async) {
			node.HTTPRequest.onreadystatechange = function() {
				if(node.HTTPRequest.readyState == 4) {
					u.validateResponse(this);
				}
			}
		}
		try {
			if(node.method.match(/GET/i)) {
				node.url += node.parameters ? ((!node.url.match(/\?/g) ? "?" : "&") + node.parameters) : "";
				node.HTTPRequest.open(node.method, node.url, node.async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				node.HTTPRequest.send();
			}
			else if(node.method.match(/POST|PUT|PATCH/i)) {
				node.HTTPRequest.open(node.method, node.url, node.async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				node.HTTPRequest.send(node.parameters);
			}
		}
		catch(e) {
			u.bug("request exception:" + e);
			u.validateResponse(node.HTTPRequest);
			return;
		}
		if(!async) {
			u.validateResponse(node.HTTPRequest);
		}
	}
	else if(node.method.match(/SCRIPT/i)) {
		node.url = url;
		var key = u.randomString();
		document[key] = new Object();
		document[key].node = node;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.responseText = response;
			u.validateResponse(response_object);
		}
		u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node.url + "?" + parameters + "&callback=document."+key+".responder"}));
	}
}
Util.requestParameters = function() {
	u.bug("params:" + arguments.length)
}
Util.testResponseForJSON = function(responseText) {
	if(responseText.trim().substr(0, 1).match(/[\{\[]/i) && responseText.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = eval("("+responseText+")");
			if(typeof(test) == "object") {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.testResponseForHTML = function(responseText) {
	if(responseText.trim().substr(0, 1).match(/[\<]/i) && responseText.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = responseText;
			if(test.childNodes.length) {
				var body_class = responseText.match(/<body class="([a-z0-9A-Z_ ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = responseText.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.evaluateResponse = function(responseText) {
	var object;
	if(typeof(responseText) == "object") {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
				response_string = responseText.trim();
				var json = u.testResponseForJSON(response_string.substr(1, response_string.length-2));
				if(json) {
					return json;
				}
				var html = u.testResponseForHTML(response_string.substr(1, response_string.length-2));
				if(html) {
					return html;
				}
				return responseText;
		}
		var json = u.testResponseForJSON(responseText);
		if(json) {
			return json;
		}
		var html = u.testResponseForHTML(responseText);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(response){
	var object;
	if(response) {
		try {
			if(response.status) {
				if(!response.status.toString().match(/403|404|500/)) {
					object = u.evaluateResponse(response.responseText);
				}
			}
			else {
				if(response.responseText) {
					object = u.evaluateResponse(response.responseText);
				}
			}
		}
		catch(exception) {
			u.bug("HTTPRequest exection:" + e);
		}
	}
	if(typeof(response.node.Response) == "function") {
		response.node.Response(object);
	}
}

/*u-init-static.js*/
Util.Objects = u.o = new Object();
Util.init = function(scope) {
	var i, e, elements, ij_value;
	scope = scope && scope.nodeName ? scope : document;
	elements = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; e = elements[i]; i++) {
		while((ij_value = u.getIJ(e, "i"))) {
			u.removeClass(e, "i:"+ij_value);
			if(ij_value && typeof(u.o[ij_value]) == "object") {
				u.o[ij_value].init(e);
			}
		}
	}
}

/*u-form.js*/
Util.Form = u.f = new function() {
	this.getParams = function(form, type) {
		var i, input, select, textarea, param;
		var params = new Array();
		var inputs = u.qsa("input", form);
		var selects = u.qsa("select", form)
		var textareas = u.qsa("textarea", form)
		for(i = 0; input = inputs[i]; i++) {
			if((input.type == "checkbox" || input.type == "radio")) {
				if(input.checked) {
					params[input.name] = input.value;
				}
			}
			else if(!input.type.match(/button|submit/i)) {
				params[input.name] = input.value;
			}
		}
		for(i = 0; select = selects[i]; i++) {
			params[select.name] = select.options[select.selectedIndex].value;
		}
		for(i = 0; textarea = textareas[i]; i++) {
			params[textarea.name] = textarea.value;
		}
		if(type == "string") {
			var string = "";
			for(param in params) {
				string += param + "=" + encodeURIComponent(params[param]) + "&";
			}
			return string;
		}
		return params;
	}
}

/*u-array-desktop_light.js*/
if(!Array.prototype.unshift || new Array(1,2).unshift(0) != 3) {
	Array.prototype.unshift = function(a) {
		var b;
		this.reverse();
		b = this.push(a);
		this.reverse();
		return b
	};
}
if(!Array.prototype.shift) {
	Array.prototype.shift = function() {
		for(var i = 0, b = this[0], l = this.length-1; i < l; i++ ) {
			this[i] = this[i+1];
		}
		this.length--;
		return b;
	};
}
if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for(var i = (start || 0); i < this.length; i++) {
			if(this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}

/*u-dom-desktop_light.js*/
Util.getComputedStyle = u.gcs = function(e, attribute) {
	e.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(attribute);
	}
	else if(document.body.currentStyle && attribute != "opacity") {
		attribute = attribute.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		return e.currentStyle[attribute].replace("px", "");
	}
	else if(document.body.currentStyle && attribute == "opacity" && e.currentStyle["filter"]) {
		var match = e.currentStyle["filter"].match(/Opacity=([0-9]+)/);
		if(match) {
			return match[1]/100;
		}
	}
	return false;
}
Util.appendElement = u.ae = function(e, node_type, attributes) {
	try {
		var node = e.appendChild(document.createElement(node_type));
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					if(!document.all || (attribute != "class" && attribute != "type")) {
						node.setAttribute(attribute, attributes[attribute]);
					}
				}
				if(document.all && attributes["class"]) {
					u.addClass(node, attributes["class"]);
				}
				if(document.all && attributes["type"]) {
					node.type = attributes["type"];
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
		u.bug("e="+e + ":nodename="+e.nodeName + ":"+(e.id ? ("id="+e.id) : ("classname="+e.className)) + ":node_type="+node_type+":attributes=" + attributes);
	}
}
Util.insertElement = u.ie = function(e, node_type, attributes) {
	var node = e.insertBefore(document.createElement(node_type), e.firstChild);
	if(attributes) {
		if(typeof(attributes) == "object") {
			for(attribute in attributes) {
				node.setAttribute(attribute, attributes[attribute]);
			}
			if(document.all && attributes["class"]) {
				u.addClass(node, attributes["class"]);
			}
		}
		else {
			u.addClass(node, attributes)
		}
	}
	return node;
}
if(document.querySelector == undefined) {
	(function(){
	var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		expando = "sizcache" + (Math.random() + '').replace('.', ''),
		done = 0,
		toString = Object.prototype.toString,
		hasDuplicate = false,
		baseHasDuplicate = true,
		rBackslash = /\\/g,
		rReturn = /\r\n/g,
		rNonWord = /\W/;
	[0, 0].sort(function() {
		baseHasDuplicate = false;
		return 0;
	});
	var Sizzle = function( selector, context, results, seed ) {
		results = results || [];
		context = context || document;
		var origContext = context;
		if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
			return [];
		}
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}
		var m, set, checkSet, extra, ret, cur, pop, i,
			prune = true,
			contextXML = Sizzle.isXML( context ),
			parts = [],
			soFar = selector;
		do {
			chunker.exec( "" );
			m = chunker.exec( soFar );
			if ( m ) {
				soFar = m[3];
				parts.push( m[1] );
				if ( m[2] ) {
					extra = m[3];
					break;
				}
			}
		} while ( m );
		if ( parts.length > 1 && origPOS.exec( selector ) ) {
			if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
				set = posProcess( parts[0] + parts[1], context, seed );
			} else {
				set = Expr.relative[ parts[0] ] ?
					[ context ] :
					Sizzle( parts.shift(), context );
				while ( parts.length ) {
					selector = parts.shift();
					if ( Expr.relative[ selector ] ) {
						selector += parts.shift();
					}
					set = posProcess( selector, set, seed );
				}
			}
		} else {
			if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
					Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
				ret = Sizzle.find( parts.shift(), context, contextXML );
				context = ret.expr ?
					Sizzle.filter( ret.expr, ret.set )[0] :
					ret.set[0];
			}
			if ( context ) {
				ret = seed ?
					{ expr: parts.pop(), set: makeArray(seed) } :
					Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
				set = ret.expr ?
					Sizzle.filter( ret.expr, ret.set ) :
					ret.set;
				if ( parts.length > 0 ) {
					checkSet = makeArray( set );
				} else {
					prune = false;
				}
				while ( parts.length ) {
					cur = parts.pop();
					pop = cur;
					if ( !Expr.relative[ cur ] ) {
						cur = "";
					} else {
						pop = parts.pop();
					}
					if ( pop == null ) {
						pop = context;
					}
					Expr.relative[ cur ]( checkSet, pop, contextXML );
				}
			} else {
				checkSet = parts = [];
			}
		}
		if ( !checkSet ) {
			checkSet = set;
		}
		if ( !checkSet ) {
			Sizzle.error( cur || selector );
		}
		if ( toString.call(checkSet) === "[object Array]" ) {
			if ( !prune ) {
				results.push.apply( results, checkSet );
			} else if ( context && context.nodeType === 1 ) {
				for ( i = 0; checkSet[i] != null; i++ ) {
					if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
						results.push( set[i] );
					}
				}
			} else {
				for ( i = 0; checkSet[i] != null; i++ ) {
					if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
						results.push( set[i] );
					}
				}
			}
		} else {
			makeArray( checkSet, results );
		}
		if ( extra ) {
			Sizzle( extra, origContext, results, seed );
			Sizzle.uniqueSort( results );
		}
		return results;
	};
	Sizzle.uniqueSort = function( results ) {
		if ( sortOrder ) {
			hasDuplicate = baseHasDuplicate;
			results.sort( sortOrder );
			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[ i - 1 ] ) {
						results.splice( i--, 1 );
					}
				}
			}
		}
		return results;
	};
	Sizzle.matches = function( expr, set ) {
		return Sizzle( expr, null, null, set );
	};
	Sizzle.matchesSelector = function( node, expr ) {
		return Sizzle( expr, null, null, [node] ).length > 0;
	};
	Sizzle.find = function( expr, context, isXML ) {
		var set, i, len, match, type, left;
		if ( !expr ) {
			return [];
		}
		for ( i = 0, len = Expr.order.length; i < len; i++ ) {
			type = Expr.order[i];
			if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
				left = match[1];
				match.splice( 1, 1 );
				if ( left.substr( left.length - 1 ) !== "\\" ) {
					match[1] = (match[1] || "").replace( rBackslash, "" );
					set = Expr.find[ type ]( match, context, isXML );
					if ( set != null ) {
						expr = expr.replace( Expr.match[ type ], "" );
						break;
					}
				}
			}
		}
		if ( !set ) {
			set = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( "*" ) :
				[];
		}
		return { set: set, expr: expr };
	};
	Sizzle.filter = function( expr, set, inplace, not ) {
		var match, anyFound,
			type, found, item, filter, left,
			i, pass,
			old = expr,
			result = [],
			curLoop = set,
			isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );
		while ( expr && set.length ) {
			for ( type in Expr.filter ) {
				if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
					filter = Expr.filter[ type ];
					left = match[1];
					anyFound = false;
					match.splice(1,1);
					if ( left.substr( left.length - 1 ) === "\\" ) {
						continue;
					}
					if ( curLoop === result ) {
						result = [];
					}
					if ( Expr.preFilter[ type ] ) {
						match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );
						if ( !match ) {
							anyFound = found = true;
						} else if ( match === true ) {
							continue;
						}
					}
					if ( match ) {
						for ( i = 0; (item = curLoop[i]) != null; i++ ) {
							if ( item ) {
								found = filter( item, match, i, curLoop );
								pass = not ^ found;
								if ( inplace && found != null ) {
									if ( pass ) {
										anyFound = true;
									} else {
										curLoop[i] = false;
									}
								} else if ( pass ) {
									result.push( item );
									anyFound = true;
								}
							}
						}
					}
					if ( found !== undefined ) {
						if ( !inplace ) {
							curLoop = result;
						}
						expr = expr.replace( Expr.match[ type ], "" );
						if ( !anyFound ) {
							return [];
						}
						break;
					}
				}
			}
			if ( expr === old ) {
				if ( anyFound == null ) {
					Sizzle.error( expr );
				} else {
					break;
				}
			}
			old = expr;
		}
		return curLoop;
	};
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	var getText = Sizzle.getText = function( elem ) {
	    var i, node,
			nodeType = elem.nodeType,
			ret = "";
		if ( nodeType ) {
			if ( nodeType === 1 || nodeType === 9 ) {
				if ( typeof elem.textContent === 'string' ) {
					return elem.textContent;
				} else if ( typeof elem.innerText === 'string' ) {
					return elem.innerText.replace( rReturn, '' );
				} else {
					for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText( elem );
					}
				}
			} else if ( nodeType === 3 || nodeType === 4 ) {
				return elem.nodeValue;
			}
		} else {
			for ( i = 0; (node = elem[i]); i++ ) {
				if ( node.nodeType !== 8 ) {
					ret += getText( node );
				}
			}
		}
		return ret;
	};
	var Expr = Sizzle.selectors = {
		order: [ "ID", "NAME", "TAG" ],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
		},
		leftMatch: {},
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
		attrHandle: {
			href: function( elem ) {
				return elem.getAttribute( "href" );
			},
			type: function( elem ) {
				return elem.getAttribute( "type" );
			}
		},
		relative: {
			"+": function(checkSet, part){
				var isPartStr = typeof part === "string",
					isTag = isPartStr && !rNonWord.test( part ),
					isPartStrNotTag = isPartStr && !isTag;
				if ( isTag ) {
					part = part.toLowerCase();
				}
				for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
					if ( (elem = checkSet[i]) ) {
						while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}
						checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
							elem || false :
							elem === part;
					}
				}
				if ( isPartStrNotTag ) {
					Sizzle.filter( part, checkSet, true );
				}
			},
			">": function( checkSet, part ) {
				var elem,
					isPartStr = typeof part === "string",
					i = 0,
					l = checkSet.length;
				if ( isPartStr && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					for ( ; i < l; i++ ) {
						elem = checkSet[i];
						if ( elem ) {
							var parent = elem.parentNode;
							checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
						}
					}
				} else {
					for ( ; i < l; i++ ) {
						elem = checkSet[i];
						if ( elem ) {
							checkSet[i] = isPartStr ?
								elem.parentNode :
								elem.parentNode === part;
						}
					}
					if ( isPartStr ) {
						Sizzle.filter( part, checkSet, true );
					}
				}
			},
			"": function(checkSet, part, isXML){
				var nodeCheck,
					doneName = done++,
					checkFn = dirCheck;
				if ( typeof part === "string" && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
				checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
			},
			"~": function( checkSet, part, isXML ) {
				var nodeCheck,
					doneName = done++,
					checkFn = dirCheck;
				if ( typeof part === "string" && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
				checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
			}
		},
		find: {
			ID: function( match, context, isXML ) {
				if ( typeof context.getElementById !== "undefined" && !isXML ) {
					var m = context.getElementById(match[1]);
					return m && m.parentNode ? [m] : [];
				}
			},
			NAME: function( match, context ) {
				if ( typeof context.getElementsByName !== "undefined" ) {
					var ret = [],
						results = context.getElementsByName( match[1] );
					for ( var i = 0, l = results.length; i < l; i++ ) {
						if ( results[i].getAttribute("name") === match[1] ) {
							ret.push( results[i] );
						}
					}
					return ret.length === 0 ? null : ret;
				}
			},
			TAG: function( match, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( match[1] );
				}
			}
		},
		preFilter: {
			CLASS: function( match, curLoop, inplace, result, not, isXML ) {
				match = " " + match[1].replace( rBackslash, "" ) + " ";
				if ( isXML ) {
					return match;
				}
				for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
					if ( elem ) {
						if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
							if ( !inplace ) {
								result.push( elem );
							}
						} else if ( inplace ) {
							curLoop[i] = false;
						}
					}
				}
				return false;
			},
			ID: function( match ) {
				return match[1].replace( rBackslash, "" );
			},
			TAG: function( match, curLoop ) {
				return match[1].replace( rBackslash, "" ).toLowerCase();
			},
			CHILD: function( match ) {
				if ( match[1] === "nth" ) {
					if ( !match[2] ) {
						Sizzle.error( match[0] );
					}
					match[2] = match[2].replace(/^\+|\s*/g, '');
					var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
						match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
						!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);
					match[2] = (test[1] + (test[2] || 1)) - 0;
					match[3] = test[3] - 0;
				}
				else if ( match[2] ) {
					Sizzle.error( match[0] );
				}
				match[0] = done++;
				return match;
			},
			ATTR: function( match, curLoop, inplace, result, not, isXML ) {
				var name = match[1] = match[1].replace( rBackslash, "" );
				if ( !isXML && Expr.attrMap[name] ) {
					match[1] = Expr.attrMap[name];
				}
				match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );
				if ( match[2] === "~=" ) {
					match[4] = " " + match[4] + " ";
				}
				return match;
			},
			PSEUDO: function( match, curLoop, inplace, result, not ) {
				if ( match[1] === "not" ) {
					if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
						match[3] = Sizzle(match[3], null, null, curLoop);
					} else {
						var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
						if ( !inplace ) {
							result.push.apply( result, ret );
						}
						return false;
					}
				} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
					return true;
				}
				return match;
			},
			POS: function( match ) {
				match.unshift( true );
				return match;
			}
		},
		filters: {
			enabled: function( elem ) {
				return elem.disabled === false && elem.type !== "hidden";
			},
			disabled: function( elem ) {
				return elem.disabled === true;
			},
			checked: function( elem ) {
				return elem.checked === true;
			},
			selected: function( elem ) {
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
				return elem.selected === true;
			},
			parent: function( elem ) {
				return !!elem.firstChild;
			},
			empty: function( elem ) {
				return !elem.firstChild;
			},
			has: function( elem, i, match ) {
				return !!Sizzle( match[3], elem ).length;
			},
			header: function( elem ) {
				return (/h\d/i).test( elem.nodeName );
			},
			text: function( elem ) {
				var attr = elem.getAttribute( "type" ), type = elem.type;
				return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
			},
			radio: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
			},
			checkbox: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
			},
			file: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
			},
			password: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
			},
			submit: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && "submit" === elem.type;
			},
			image: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
			},
			reset: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && "reset" === elem.type;
			},
			button: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && "button" === elem.type || name === "button";
			},
			input: function( elem ) {
				return (/input|select|textarea|button/i).test( elem.nodeName );
			},
			focus: function( elem ) {
				return elem === elem.ownerDocument.activeElement;
			}
		},
		setFilters: {
			first: function( elem, i ) {
				return i === 0;
			},
			last: function( elem, i, match, array ) {
				return i === array.length - 1;
			},
			even: function( elem, i ) {
				return i % 2 === 0;
			},
			odd: function( elem, i ) {
				return i % 2 === 1;
			},
			lt: function( elem, i, match ) {
				return i < match[3] - 0;
			},
			gt: function( elem, i, match ) {
				return i > match[3] - 0;
			},
			nth: function( elem, i, match ) {
				return match[3] - 0 === i;
			},
			eq: function( elem, i, match ) {
				return match[3] - 0 === i;
			}
		},
		filter: {
			PSEUDO: function( elem, match, i, array ) {
				var name = match[1],
					filter = Expr.filters[ name ];
				if ( filter ) {
					return filter( elem, i, match, array );
				} else if ( name === "contains" ) {
					return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;
				} else if ( name === "not" ) {
					var not = match[3];
					for ( var j = 0, l = not.length; j < l; j++ ) {
						if ( not[j] === elem ) {
							return false;
						}
					}
					return true;
				} else {
					Sizzle.error( name );
				}
			},
			CHILD: function( elem, match ) {
				var first, last,
					doneName, parent, cache,
					count, diff,
					type = match[1],
					node = elem;
				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}
						if ( type === "first" ) {
							return true;
						}
						node = elem;
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}
						return true;
					case "nth":
						first = match[2];
						last = match[3];
						if ( first === 1 && last === 0 ) {
							return true;
						}
						doneName = match[0];
						parent = elem.parentNode;
						if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
							count = 0;
							for ( node = parent.firstChild; node; node = node.nextSibling ) {
								if ( node.nodeType === 1 ) {
									node.nodeIndex = ++count;
								}
							}
							parent[ expando ] = doneName;
						}
						diff = elem.nodeIndex - last;
						if ( first === 0 ) {
							return diff === 0;
						} else {
							return ( diff % first === 0 && diff / first >= 0 );
						}
				}
			},
			ID: function( elem, match ) {
				return elem.nodeType === 1 && elem.getAttribute("id") === match;
			},
			TAG: function( elem, match ) {
				return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
			},
			CLASS: function( elem, match ) {
				return (" " + (elem.className || elem.getAttribute("class")) + " ")
					.indexOf( match ) > -1;
			},
			ATTR: function( elem, match ) {
				var name = match[1],
					result = Sizzle.attr ?
						Sizzle.attr( elem, name ) :
						Expr.attrHandle[ name ] ?
						Expr.attrHandle[ name ]( elem ) :
						elem[ name ] != null ?
							elem[ name ] :
							elem.getAttribute( name ),
					value = result + "",
					type = match[2],
					check = match[4];
				return result == null ?
					type === "!=" :
					!type && Sizzle.attr ?
					result != null :
					type === "=" ?
					value === check :
					type === "*=" ?
					value.indexOf(check) >= 0 :
					type === "~=" ?
					(" " + value + " ").indexOf(check) >= 0 :
					!check ?
					value && result !== false :
					type === "!=" ?
					value !== check :
					type === "^=" ?
					value.indexOf(check) === 0 :
					type === "$=" ?
					value.substr(value.length - check.length) === check :
					type === "|=" ?
					value === check || value.substr(0, check.length + 1) === check + "-" :
					false;
			},
			POS: function( elem, match, i, array ) {
				var name = match[2],
					filter = Expr.setFilters[ name ];
				if ( filter ) {
					return filter( elem, i, match, array );
				}
			}
		}
	};
	var origPOS = Expr.match.POS,
		fescape = function(all, num){
			return "\\" + (num - 0 + 1);
		};
	for ( var type in Expr.match ) {
		Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
		Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
	}
	Expr.match.globalPOS = origPOS;
	var makeArray = function( array, results ) {
		array = Array.prototype.slice.call( array, 0 );
		if ( results ) {
			results.push.apply( results, array );
			return results;
		}
		return array;
	};
	try {
		Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;
	} catch( e ) {
		makeArray = function( array, results ) {
			var i = 0,
				ret = results || [];
			if ( toString.call(array) === "[object Array]" ) {
				Array.prototype.push.apply( ret, array );
			} else {
				if ( typeof array.length === "number" ) {
					for ( var l = array.length; i < l; i++ ) {
						ret.push( array[i] );
					}
				} else {
					for ( ; array[i]; i++ ) {
						ret.push( array[i] );
					}
				}
			}
			return ret;
		};
	}
	var sortOrder, siblingCheck;
	if ( document.documentElement.compareDocumentPosition ) {
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
			if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
				return a.compareDocumentPosition ? -1 : 1;
			}
			return a.compareDocumentPosition(b) & 4 ? -1 : 1;
		};
	} else {
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			} else if ( a.sourceIndex && b.sourceIndex ) {
				return a.sourceIndex - b.sourceIndex;
			}
			var al, bl,
				ap = [],
				bp = [],
				aup = a.parentNode,
				bup = b.parentNode,
				cur = aup;
			if ( aup === bup ) {
				return siblingCheck( a, b );
			} else if ( !aup ) {
				return -1;
			} else if ( !bup ) {
				return 1;
			}
			while ( cur ) {
				ap.unshift( cur );
				cur = cur.parentNode;
			}
			cur = bup;
			while ( cur ) {
				bp.unshift( cur );
				cur = cur.parentNode;
			}
			al = ap.length;
			bl = bp.length;
			for ( var i = 0; i < al && i < bl; i++ ) {
				if ( ap[i] !== bp[i] ) {
					return siblingCheck( ap[i], bp[i] );
				}
			}
			return i === al ?
				siblingCheck( a, bp[i], -1 ) :
				siblingCheck( ap[i], b, 1 );
		};
		siblingCheck = function( a, b, ret ) {
			if ( a === b ) {
				return ret;
			}
			var cur = a.nextSibling;
			while ( cur ) {
				if ( cur === b ) {
					return -1;
				}
				cur = cur.nextSibling;
			}
			return 1;
		};
	}
	(function(){
		var form = document.createElement("div"),
			id = "script" + (new Date()).getTime(),
			root = document.documentElement;
		form.innerHTML = "<a name='" + id + "'/>";
		root.insertBefore( form, root.firstChild );
		if ( document.getElementById( id ) ) {
			Expr.find.ID = function( match, context, isXML ) {
				if ( typeof context.getElementById !== "undefined" && !isXML ) {
					var m = context.getElementById(match[1]);
					return m ?
						m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
							[m] :
							undefined :
						[];
				}
			};
			Expr.filter.ID = function( elem, match ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return elem.nodeType === 1 && node && node.nodeValue === match;
			};
		}
		root.removeChild( form );
		root = form = null;
	})();
	(function(){
		var div = document.createElement("div");
		div.appendChild( document.createComment("") );
		if ( div.getElementsByTagName("*").length > 0 ) {
			Expr.find.TAG = function( match, context ) {
				var results = context.getElementsByTagName( match[1] );
				if ( match[1] === "*" ) {
					var tmp = [];
					for ( var i = 0; results[i]; i++ ) {
						if ( results[i].nodeType === 1 ) {
							tmp.push( results[i] );
						}
					}
					results = tmp;
				}
				return results;
			};
		}
		div.innerHTML = "<a href='#'></a>";
		if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
				div.firstChild.getAttribute("href") !== "#" ) {
			Expr.attrHandle.href = function( elem ) {
				return elem.getAttribute( "href", 2 );
			};
		}
		div = null;
	})();
	if ( document.querySelectorAll ) {
		(function(){
			var oldSizzle = Sizzle,
				div = document.createElement("div"),
				id = "__sizzle__";
			div.innerHTML = "<p class='TEST'></p>";
			if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
				return;
			}
			Sizzle = function( query, context, extra, seed ) {
				context = context || document;
				if ( !seed && !Sizzle.isXML(context) ) {
					var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
					if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
						if ( match[1] ) {
							return makeArray( context.getElementsByTagName( query ), extra );
						} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
							return makeArray( context.getElementsByClassName( match[2] ), extra );
						}
					}
					if ( context.nodeType === 9 ) {
						if ( query === "body" && context.body ) {
							return makeArray( [ context.body ], extra );
						} else if ( match && match[3] ) {
							var elem = context.getElementById( match[3] );
							if ( elem && elem.parentNode ) {
								if ( elem.id === match[3] ) {
									return makeArray( [ elem ], extra );
								}
							} else {
								return makeArray( [], extra );
							}
						}
						try {
							return makeArray( context.querySelectorAll(query), extra );
						} catch(qsaError) {}
					} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
						var oldContext = context,
							old = context.getAttribute( "id" ),
							nid = old || id,
							hasParent = context.parentNode,
							relativeHierarchySelector = /^\s*[+~]/.test( query );
						if ( !old ) {
							context.setAttribute( "id", nid );
						} else {
							nid = nid.replace( /'/g, "\\$&" );
						}
						if ( relativeHierarchySelector && hasParent ) {
							context = context.parentNode;
						}
						try {
							if ( !relativeHierarchySelector || hasParent ) {
								return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
							}
						} catch(pseudoError) {
						} finally {
							if ( !old ) {
								oldContext.removeAttribute( "id" );
							}
						}
					}
				}
				return oldSizzle(query, context, extra, seed);
			};
			for ( var prop in oldSizzle ) {
				Sizzle[ prop ] = oldSizzle[ prop ];
			}
			div = null;
		})();
	}
	(function(){
		var html = document.documentElement,
			matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
		if ( matches ) {
			var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
				pseudoWorks = false;
			try {
				matches.call( document.documentElement, "[test!='']:sizzle" );
			} catch( pseudoError ) {
				pseudoWorks = true;
			}
			Sizzle.matchesSelector = function( node, expr ) {
				expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
				if ( !Sizzle.isXML( node ) ) {
					try {
						if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
							var ret = matches.call( node, expr );
							if ( ret || !disconnectedMatch ||
									node.document && node.document.nodeType !== 11 ) {
								return ret;
							}
						}
					} catch(e) {}
				}
				return Sizzle(expr, null, null, [node]).length > 0;
			};
		}
	})();
	(function(){
		var div = document.createElement("div");
		div.innerHTML = "<div class='test e'></div><div class='test'></div>";
		if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
			return;
		}
		div.lastChild.className = "e";
		if ( div.getElementsByClassName("e").length === 1 ) {
			return;
		}
		Expr.order.splice(1, 0, "CLASS");
		Expr.find.CLASS = function( match, context, isXML ) {
			if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
				return context.getElementsByClassName(match[1]);
			}
		};
		div = null;
	})();
	function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
		for ( var i = 0, l = checkSet.length; i < l; i++ ) {
			var elem = checkSet[i];
			if ( elem ) {
				var match = false;
				elem = elem[dir];
				while ( elem ) {
					if ( elem[ expando ] === doneName ) {
						match = checkSet[elem.sizset];
						break;
					}
					if ( elem.nodeType === 1 && !isXML ){
						elem[ expando ] = doneName;
						elem.sizset = i;
					}
					if ( elem.nodeName.toLowerCase() === cur ) {
						match = elem;
						break;
					}
					elem = elem[dir];
				}
				checkSet[i] = match;
			}
		}
	}
	function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
		for ( var i = 0, l = checkSet.length; i < l; i++ ) {
			var elem = checkSet[i];
			if ( elem ) {
				var match = false;
				elem = elem[dir];
				while ( elem ) {
					if ( elem[ expando ] === doneName ) {
						match = checkSet[elem.sizset];
						break;
					}
					if ( elem.nodeType === 1 ) {
						if ( !isXML ) {
							elem[ expando ] = doneName;
							elem.sizset = i;
						}
						if ( typeof cur !== "string" ) {
							if ( elem === cur ) {
								match = true;
								break;
							}
						} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
							match = elem;
							break;
						}
					}
					elem = elem[dir];
				}
				checkSet[i] = match;
			}
		}
	}
	if ( document.documentElement.contains ) {
		Sizzle.contains = function( a, b ) {
			return a !== b && (a.contains ? a.contains(b) : true);
		};
	} else if ( document.documentElement.compareDocumentPosition ) {
		Sizzle.contains = function( a, b ) {
			return !!(a.compareDocumentPosition(b) & 16);
		};
	} else {
		Sizzle.contains = function() {
			return false;
		};
	}
	Sizzle.isXML = function( elem ) {
		var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	var posProcess = function( selector, context, seed ) {
		var match,
			tmpSet = [],
			later = "",
			root = context.nodeType ? [context] : context;
		while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
			later += match[0];
			selector = selector.replace( Expr.match.PSEUDO, "" );
		}
		selector = Expr.relative[selector] ? selector + "*" : selector;
		for ( var i = 0, l = root.length; i < l; i++ ) {
			Sizzle( selector, root[i], tmpSet, seed );
		}
		return Sizzle.filter( later, tmpSet );
	};
	window.Sizzle = Sizzle;
	})();
	Util.querySelector = u.qs = function(query, target) {
		var res = Sizzle(query, target);
		return res[0];
	}
	Util.querySelectorAll = u.qsa = function(query, target) {
		var res = Sizzle(query, target);
		return res;
	}
}

/*u-animation-desktop_light.js*/
this.transition = function(e, transition) {
	var duration = transition.match(/[0-9.]+[ms]+/g);
	if(duration) {
		var d = duration[0];
		e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
	}
	else {
		e.duration = false;
	}
	e.offsetHeight;
}
u.a.setOpacity = function(e, opacity) {
	if(u.explorer()) {
		if(opacity < 0.5) {
			u.as(e, "visibility", "hidden");
		}
		else {
			u.as(e, "visibility", "visible");
		}
		if(e.duration && typeof(e.transitioned) == "function") {
			e.transitioned();
		}
	}
	else if(e.duration && !this.support()) {
		e.o_start = e._opacity ? e._opacity : u.gcs(e, "opacity");
		e.o_transitions = e.duration/100;
		e.o_change = (opacity - e.o_start) / e.o_transitions;
		e.o_progress = 0;
		e.o_transitionTo = function() {
			++this.o_progress;
			var new_opacity = (Number(this.o_start) + Number(this.o_progress * this.o_change));
			u.as(this, "opacity", new_opacity);
		}
		for(var i = 0; i < e.o_transitions; i++) {
			u.t.setTimer(e, e.o_transitionTo, 100 * i);
		}
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}
	}
	else {
		e.style.opacity = opacity;
	}
	e._opacity = opacity;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}
u.a.setWidth = function(e, width) {
	if(e.duration && !this.support()) {
		e.w_start = e._width ? e._width : u.gcs(e, "width").replace("px", "");
		e.w_transitions = e.duration/100;
		e.w_change = (width - e.w_start) / e.w_transitions;
		e.w_progress = 0;
		e.w_transitionTo = function() {
			++this.w_progress;
			var new_width = (Number(this.w_start) + Number(this.w_progress * this.w_change));
			if(new_width >= 0) {
				u.as(this, "width", new_width+"px");
			}
		}
		for(var i = 0; i < e.w_transitions; i++) {
			u.t.setTimer(e, e.w_transitionTo, 100 * i);
		}
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}
	}
	else {
		var width_px = (width == "auto" ? width : width+"px");
		u.as(e, "width", width_px);
	}
	e._width = width;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}
u.a.setHeight = function(e, height) {
	if(e.duration && !this.support()) {
		e.h_start = e._height ? e._height : u.gcs(e, "height").replace("px", "");
		e.h_transitions = e.duration/100;
		e.h_change = (height - e.h_start) / e.h_transitions;
		e.h_progress = 0;
		e.h_transitionTo = function() {
			++this.h_progress;
			var new_height = (Number(this.h_start) + Number(this.h_progress * this.h_change));
			if(new_height >= 0) {
				u.as(this, "height", new_height+"px");
			}
		}
		for(var i = 0; i < e.h_transitions; i++) {
			u.t.setTimer(e, e.h_transitionTo, 100 * i);
		}
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}
	}
	else {
		var height_px = (height == "auto" ? height : height+"px");
		u.as(e, "height", height_px);
	}
	e._height = height;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}
u.a.translate = function(e, x, y) {
	var i;
	if(e.translate_offset_x == undefined) {
		e.translate_offset_x = u.relX(e);
		e.translate_offset_y = u.relY(e);
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		if(this.support()) {
			e.style[this.variant()+"Transition"] = "none";
		}
		u.as(e, "left", e.translate_offset_x+"px");
		u.as(e, "top", e.translate_offset_y+"px");
		u.as(e, "position", "absolute");
	}
	if(e.duration) {
		e.x_start = e.element_x;
		e.y_start = e.element_y;
		e.translate_transitions = e.duration/100;
		e.translate_progress = 0;
		e.x_change = (x - e.x_start) / e.translate_transitions;
		e.y_change = (y - e.y_start) / e.translate_transitions;
		e.translate_transitionTo = function(event) {
			++this.translate_progress;
			var new_x = (Number(this.x_start) + Number(this.translate_progress * this.x_change) + this.translate_offset_x);
			var new_y = (Number(this.y_start) + Number(this.translate_progress * this.y_change) + this.translate_offset_y);
			u.as(e, "left", new_x + "px");
			u.as(e, "top", new_y + "px");
			if(this.translate_progress < this.translate_transitions) {
				this.t_transition = u.t.setTimer(this, this.translate_transitionTo, 100);
			}
			else {
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		e.translate_transitionTo();
	}
	else {
		u.as(e, "left", (e.translate_offset_x + x)+"px");
		u.as(e, "top", (e.translate_offset_y + y)+"px");
	}
	e.element_x = x;
	e.element_y = y;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}

/*u-events-desktop_ie.js*/
if(document.all) {
	window.attachedEvents = new Array();
	window.eventHandler = function() {
		var element, eid, i;
		element = window.event.srcElement;
		while(element && element.nodeName != "HTML") {
			eid = u.getIJ(element, "eid");
			if(eid && window.attachedEvents[eid] && window.attachedEvents[eid][window.event.type]) {
				var i, attachedAction;
				for(i = 0; attachedAction = window.attachedEvents[eid][window.event.type][i]; i++) {
					window.event.target = element;
					element.ie_event_action = attachedAction;
					element.ie_event_action(window.event);
				}
				return;
			}
			element = element.parentNode;
		}
		if(window.attachedEvents["window"] && window.attachedEvents["window"][window.event.type]) {
			var i, attachedAction;
			for(i = 0; attachedAction = window.attachedEvents["window"][window.event.type][i]; i++) {
				window.event.target = window;
				window.ie_event_action = attachedAction;
				window.ie_event_action(window.event);
			}
			return;
		}
	}
	u.e.event_pref = "mouse";
	u.e.kill = function(event) {
		if(event) {
			event.cancelBubble = true;
			event.returnValue = false;
		}
	}
	u.e.addEvent = function(e, type, action) {
		if(e != window) {
			var eid = u.getIJ(e, "eid");
			if(!eid) {
				var eid = u.randomKey();
				u.ac(e, "eid:"+eid)
			}
		}
		else {
			eid = "window";
		}
		if(!window.attachedEvents[eid]) {
			window.attachedEvents[eid] = new Array();
		}
		if(!window.attachedEvents[eid][type]) {
			window.attachedEvents[eid][type] = new Array();
		}
		if(window.attachedEvents[eid][type].indexOf(action) == -1) {
			window.attachedEvents[eid][type][window.attachedEvents[eid][type].length] = action;
		}
		e.attachEvent("on"+type, window.eventHandler);
	}
	u.e.removeEvent = function(e, type, action) {
		if(e != window) {
			var eid = u.getIJ(e, "eid");
		}
		else {
			eid = "window";
		}
		if(eid) {
			if(window.attachedEvents[eid] && window.attachedEvents[eid][type]) {
				for(i in window.attachedEvents[eid][type]) {
					if(window.attachedEvents[eid][type][i] == action) {
						window.attachedEvents[eid][type].splice(i,1);
					}
				}
			}
		}
		e.detachEvent("on"+type, window.eventHandler);
	}
}

/*u-string-desktop_ie.js*/
if(String.prototype.trim == undefined) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}
if(Object.prototype.textContent == undefined && Object.defineProperty) {
	Object.defineProperty(Element.prototype, "textContent",
		{get: function() {
			return this.innerText;
			}
		}
	);
}
else if(Object.prototype.textContent == undefined) {
}
if(String.prototype.substr == undefined || "ABC".substr(-1,1) == "A") {
	String.prototype.substr = function(start_index, length) {
		start_index = start_index < 0 ? this.length + start_index : start_index;
		start_index = start_index < 0 ? 0 : start_index;
		length = length ? start_index + length : this.length;
		return this.substring(start_index, length);
	};
}

/*u-position-desktop_ie.js*/
if(window.pageXOffset == undefined && Object.defineProperty) {
	Object.defineProperty(window, "pageXOffset",
		{get: function() {
			return document.documentElement.scrollLeft;
			}
		}
	);
}
if(window.pageYOffset == undefined && Object.defineProperty) {
	Object.defineProperty(window, "pageYOffset",
		{get: function() {
			return document.documentElement.scrollTop;
			}
		}
	);
}

/*u-image-desktop_ie.js*/
u.i.load = function(e, src) {
	var image = new Image();
	image.e = e;
	u.addClass(e, "loading");
	image.onload = function() {
		var event = new Object();
		event.target = this;
		u.removeClass(this.e, "loading");
		if(typeof(this.e.loaded) == "function") {
			this.e.loaded(event);
		}
	}
	image.src = src;
}

/*i-page.js*/
Util.Objects["page"] = new function() {
	this.init = function(page, event) {
		var i;
		if(!page.initialized) {
			page.initialized = true;
			u.rc(page, "i:page");
			page.cN = u.qs("#content", page);
			page.cN.page = page;
			u.a.setOpacity(page, 0);
			u.a.setOpacity(page.cN, 0);
			u.a.transition(page.cN, "all .5s linaer");
			var font_loader = u.ae(document.body, "div", ({"class":"fonts"}));
			u.ae(font_loader, "div", ({"class":"font_nic"})).innerHTML = "load";
			u.ae(font_loader, "div", ({"class":"font_vag_bold"})).innerHTML = "load";
			u.ae(font_loader, "div", ({"class":"font_vag_light"})).innerHTML = "load";
			page.ready = function() {
				u.h.catchEvent(this.cN.navigate, this.cN);
				this.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.addClass(this, "ready");
					this.cN.ready();
				}
				if(u.gcs(this, "opacity") == 1 || u.firefox(4, '<=')) {
					this.transitioned();
					u.a.transition(this, "none");
					u.a.setOpacity(this, 1);
				}
				else {
					u.a.transition(this, "all .5s ease-in");
					u.a.setOpacity(this, 1);
				}
			}
			page.cN.ready = function() {
				if(this.page.className.match(/ready/) && this.className.match(/ready/)) {
					this.transitioned = function(event) {
						var scene = u.qs(".scene", this);
						if(scene && typeof(scene.displayed) == "function") {
							scene.displayed();
						}
					}
					if (u.firefox(4, '<=')) {
						this.transitioned();
						u.a.transition(this, "none");
						u.a.setOpacity(this, 1);
					}
					else {
						u.a.transition(this, "all 500ms linear");
						u.a.setOpacity(this, 1);
					}
				}
			}
			page.cN.navigate = function() {
				this.Response = function(response) {
					var content = u.qs("#content", response);
					u.setClass(this, content.className);
					this.innerHTML = content.innerHTML;
					document.title = response.head_title;
					u.init(this);
				}
				this.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.Request(this, location.hash.replace("#", ""));
				}
				u.rc(this, "ready");
				if(u.gcs(this, "opacity") == 0) {
					this.transitioned();
				}
				else {
					u.a.transition(this, "all 500ms linear");
					u.a.setOpacity(this, 0);
				}
			}
			page.cN.overlay = function(url) {
				this.Response = function(response) {
					var overlay = u.qs(".overlay", response);
					this.appendChild(overlay);
					u.init(overlay);
				}
				u.Request(this, url);
			}
			if(location.hash.length < 2) {
				location.hash = u.h.cleanHash(location.href);
				u.init(page.cN);
			}
			else if(location.hash != "#"+u.h.cleanHash(location.href.split("#")[0])) {
				page.cN.navigate();
			}
			else {
				u.init(page.cN);
			}
			page.ready();
		}
	}
}
u.e.addEvent(window, "load", function(event) {u.o.page.init(u.qs("#page"), event);})
function trackEvent(eventId) {
}

/*i-front.js*/
Util.Objects["front"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();
		}
		var bn_start = u.qs(".start", scene);
		u.link(bn_start);
		bn_start.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event40');
		}
		scene.ready();
	}
}

/*i-choose.js*/
Util.Objects["choose"] = new function() {
	this.init = function(scene) {
		var i, node;
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();
		}
		scene.displayed = function() {
			if(!u.getCookie("choose")) {
				var random_header = u.random(0, this.picker.header.nodes.length-1);
				var random_header_time = Math.abs(0.3 * (random_header - ((this.picker.header.nodes.length-1) / 2)));
				var random_body = u.random(0, this.picker.body.nodes.length-1);
				var random_body_time = Math.abs(0.3 * (random_body - ((this.picker.body.nodes.length-1) / 2)));
				var random_footer = u.random(0, this.picker.footer.nodes.length-1);
				var random_footer_time = Math.abs(0.3 * (random_footer - ((this.picker.footer.nodes.length-1) / 2)));
				if(random_header_time > random_body_time && random_header_time > random_footer_time) {
					this.picker.header.transitioned = function(event) {
						this.transitioned = null;
						this.scene.picker.reset()
					}
				}
				if(random_body_time > random_header_time && random_body_time > random_footer_time) {
					this.picker.body.transitioned = function(event) {
						this.transitioned = null;
						this.scene.picker.reset()
					}
				}
				if(random_footer_time > random_header_time && random_footer_time > random_body_time) {
					this.picker.footer.transitioned = function(event) {
						this.transitioned = null;
						this.scene.picker.reset()
					}
				}
				u.a.transition(this.picker.header, "all "+random_header_time+"s ease-in");
				u.a.translate(this.picker.header, -(random_header * this.picker.node_width), 0);
				u.a.transition(this.picker.body, "all "+random_body_time+"s ease-in");
				u.a.translate(this.picker.body, -(random_body * this.picker.node_width), 0);
				u.a.transition(this.picker.footer, "all "+random_footer_time+"s ease-in");
				u.a.translate(this.picker.footer, -(random_footer * this.picker.node_width), 0);
			}
		}
		var bn_pick = u.qs(".pick", scene);
		bn_pick.scene = scene;
		u.link(bn_pick);
		bn_pick.clicked = function(event) {
			u.saveCookie("choose", this.scene.picker.current_header.className+","+this.scene.picker.current_body.className+","+this.scene.picker.current_footer.className+"," + this.scene.picker.pickertext.innerHTML);
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event41');
		}
		var bn_logo = u.qs(".logo", scene);
		u.link(bn_logo);
		bn_logo.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_info = u.qs(".infobutton", scene);
		bn_info.page = scene.page;
		u.link(bn_info);
		bn_info.clicked = function(event) {
			this.page.cN.overlay(this.url);
		}
		scene.picker = u.qs(".picker", scene);
		scene.picker.pickertext = u.qs(".pickertext p", scene);
		scene.picker.header = u.qs(".header .costume", scene.picker);
		scene.picker.header.scene = scene;
		scene.picker.header.nodes = u.qsa("li", scene.picker.header);
		scene.picker.body = u.qs(".body .costume", scene.picker);
		scene.picker.body.scene = scene;
		scene.picker.body.nodes = u.qsa("li", scene.picker.body);
		scene.picker.footer = u.qs(".footer .costume", scene.picker);
		scene.picker.footer.scene = scene;
		scene.picker.footer.nodes = u.qsa("li", scene.picker.footer);
		scene.picker.node_width = scene.picker.header.nodes[0].offsetWidth
		scene.picker.setup = function() {
			u.a.setWidth(this.header, this.header.nodes.length * this.node_width);
			u.a.translate(this.header, 0, 0);
			for(i = 0; node = this.header.nodes[i]; i++) {
				node.style.backgroundImage = "url(img/bodyparts/h_"+node.className+".png)";
			}
			u.a.setWidth(this.body, this.body.nodes.length * this.node_width);
			u.a.translate(this.body, 0, 0);
			for(i = 0; node = this.body.nodes[i]; i++) {
				node.style.backgroundImage = "url(img/bodyparts/k_"+node.className+".png)";
			}
			u.a.setWidth(this.footer, this.footer.nodes.length * this.node_width);
			u.a.translate(this.footer, 0, 0);
			for(i = 0; node = this.footer.nodes[i]; i++) {
				node.style.backgroundImage = "url(img/bodyparts/b_"+node.className+".png)";
			}
		}
		scene.picker.setup();
		scene.picker.reset = function() {
			var i;
			u.a.transition(this.header, "none");
			u.a.transition(this.body, "none");
			u.a.transition(this.footer, "none");
			this.header.click_count = 0;
			this.body.click_count = 0;
			this.footer.click_count = 0;
			this.current_header = this.header.nodes[Math.abs(this.header.element_x/this.node_width)];
			this.current_body = this.body.nodes[Math.abs(this.body.element_x/this.node_width)];
			this.current_footer = this.footer.nodes[Math.abs(this.footer.element_x/this.node_width)];
			this.pickertext.innerHTML = this.current_header.innerHTML + " - " + this.current_body.innerHTML + " - " + this.current_footer.innerHTML
			var header_center = -(this.header.offsetWidth/2);
			var offset_count = Math.round(Math.abs((header_center - this.header.element_x) / this.node_width));
			if(this.header.element_x < header_center) {
				for(i = 0; i < offset_count; i++) {
					this.header.appendChild(this.header.nodes[0]);
					this.header.nodes = u.qsa("li", this.header);
				}
				u.a.translate(this.header, this.header.element_x + (this.node_width*offset_count), 0);
			}
			else {
				for(i = 0; i < offset_count; i++) {
					this.header.insertBefore(this.header.nodes[this.header.nodes.length-1], this.header.firstChild);
					this.header.nodes = u.qsa("li", this.header);
				}
				u.a.translate(this.header, this.header.element_x - (this.node_width*offset_count), 0);
			}
			var body_center = -(this.body.offsetWidth/2);
			var offset_count = Math.round(Math.abs((body_center - this.body.element_x) / this.node_width));
			if(this.body.element_x < body_center) {
				for(i = 0; i < offset_count; i++) {
					this.body.appendChild(this.body.nodes[0]);
					this.body.nodes = u.qsa("li", this.body);
				}
				u.a.translate(this.body, this.body.element_x + (this.node_width*offset_count), 0);
			}
			else {
				for(i = 0; i < offset_count; i++) {
					this.body.insertBefore(this.body.nodes[this.body.nodes.length-1], this.body.firstChild);
					this.body.nodes = u.qsa("li", this.body);
				}
				u.a.translate(this.body, this.body.element_x - (this.node_width*offset_count), 0);
			}
			var footer_center = -(this.footer.offsetWidth/2);
			var offset_count = Math.round(Math.abs((footer_center - this.footer.element_x) / this.node_width));
			if(this.footer.element_x < footer_center) {
				for(i = 0; i < offset_count; i++) {
					this.footer.appendChild(this.footer.nodes[0]);
					this.footer.nodes = u.qsa("li", this.footer);
				}
				u.a.translate(this.footer, this.footer.element_x + (this.node_width*offset_count), 0);
			}
			else {
				for(i = 0; i < offset_count; i++) {
					this.footer.insertBefore(this.footer.nodes[this.footer.nodes.length-1], this.footer.firstChild);
					this.footer.nodes = u.qsa("li", this.footer);
				}
				u.a.translate(this.footer, this.footer.element_x - (this.node_width*offset_count), 0);
			}
		}
		scene.picker.reset();
		if(u.getCookie("choose")) {
			var choices = u.getCookie("choose").split(",");
			if(choices.length == 4) {
				u.a.translate(scene.picker.header, -(u.qs("."+choices[0], scene.picker.header).offsetLeft), 0);
				u.a.translate(scene.picker.body, -(u.qs("."+choices[1], scene.picker.body).offsetLeft), 0);
				u.a.translate(scene.picker.footer, -(u.qs("."+choices[2], scene.picker.footer).offsetLeft), 0);
				scene.picker.reset();
			}
		}
		scene.bn_header_left = u.qs(".header.left", scene);
		scene.bn_header_left.scene = scene;
		scene.bn_header_right = u.qs(".header.right", scene);
		scene.bn_header_right.scene = scene;
		u.e.click(scene.bn_header_right);
		scene.bn_header_right.clicked = function(event) {
			this.scene.picker.header.transitioned = function(event) {
				this.transitioned = null;
				this.scene.picker.reset();
			}
			if(this.scene.picker.header.click_count < (this.scene.picker.header.nodes.length-2)/2) {
				this.scene.picker.header.click_count++;
				u.a.transition(this.scene.picker.header, "all 0.3s ease-in");
				u.a.translate(this.scene.picker.header, this.scene.picker.header.element_x - this.scene.picker.node_width, 0);
			}
		}
		u.e.click(scene.bn_header_left);
		scene.bn_header_left.clicked = function(event) {
			this.scene.picker.header.transitioned = function(event) {
				this.transitioned = null;
				this.scene.picker.reset();
			}
			if(this.scene.picker.header.click_count < (this.scene.picker.header.nodes.length-2)/2) {
				this.scene.picker.header.click_count++;
				u.a.transition(this.scene.picker.header, "all 0.3s ease-in");
				u.a.translate(this.scene.picker.header, this.scene.picker.header.element_x + this.scene.picker.node_width, 0);
			}
		}
		scene.bn_body_left = u.qs(".body.left", scene);
		scene.bn_body_left.scene = scene;
		scene.bn_body_right = u.qs(".body.right", scene);
		scene.bn_body_right.scene = scene;
		u.e.click(scene.bn_body_right);
		scene.bn_body_right.clicked = function(event) {
			this.scene.picker.body.transitioned = function(event) {
				this.transitioned = null;
				this.scene.picker.reset();
			}
			if(this.scene.picker.body.click_count < (this.scene.picker.body.nodes.length-2)/2) {
				this.scene.picker.body.click_count++;
				u.a.transition(this.scene.picker.body, "all 0.3s ease-in");
				u.a.translate(this.scene.picker.body, this.scene.picker.body.element_x - this.scene.picker.node_width, 0);
			}
		}
		u.e.click(scene.bn_body_left);
		scene.bn_body_left.clicked = function(event) {
			this.scene.picker.body.transitioned = function(event) {
				this.transitioned = null;
				u.a.transition(this, "none");
				this.scene.picker.reset();
			}
			if(this.scene.picker.body.click_count < (this.scene.picker.body.nodes.length-2)/2) {
				this.scene.picker.body.click_count++;
				u.a.transition(this.scene.picker.body, "all 0.3s ease-in");
				u.a.translate(this.scene.picker.body, this.scene.picker.body.element_x + this.scene.picker.node_width, 0);
			}
		}
		scene.bn_footer_left = u.qs(".footer.left", scene);
		scene.bn_footer_left.scene = scene;
		scene.bn_footer_right = u.qs(".footer.right", scene);
		scene.bn_footer_right.scene = scene;
		u.e.click(scene.bn_footer_right);
		scene.bn_footer_right.clicked = function(event) {
			this.scene.picker.footer.transitioned = function(event) {
				this.transitioned = null;
				u.a.transition(this, "none");
				this.scene.picker.reset();
			}
			if(this.scene.picker.footer.click_count < (this.scene.picker.footer.nodes.length-2)/2) {
				this.scene.picker.footer.click_count++;
				u.a.transition(this.scene.picker.footer, "all 0.3s ease-in");
				u.a.translate(this.scene.picker.footer, this.scene.picker.footer.element_x - this.scene.picker.node_width, 0);
			}
		}
		u.e.click(scene.bn_footer_left);
		scene.bn_footer_left.clicked = function(event) {
			this.scene.picker.footer.transitioned = function(event) {
				this.transitioned = null;
				u.a.transition(this, "none");
				this.scene.picker.reset();
			}
			if(this.scene.picker.footer.click_count < (this.scene.picker.footer.nodes.length-2)/2) {
				this.scene.picker.footer.click_count++;
				u.a.transition(this.scene.picker.footer, "all 0.3s ease-in");
				u.a.translate(this.scene.picker.footer, this.scene.picker.footer.element_x + this.scene.picker.node_width, 0);
			}
		}
		scene.ready();
	}
}

/*i-picked.js*/
Util.Objects["picked"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
		}
		var picker = u.qs(".picker", scene);
		var body_parts = u.qsa("li", picker);
		var pickertext = u.qs(".pickertext p", scene);
		var header = body_parts[0].className.replace("header ", "");
		var body = body_parts[0].className.replace("body ", "");
		var footer = body_parts[0].className.replace("footer ", "");
		if(u.getCookie("choose")) {
			var choices = u.getCookie("choose").split(",");
			if(choices.length == 4) {
				header = choices[0];
				body = choices[1];
				footer = choices[2];
				pickertext.innerHTML = choices[3];
			}
		}
		body_parts[0].style.backgroundImage = "url(img/bodyparts/h_"+header+".png)";
		body_parts[1].style.backgroundImage = "url(img/bodyparts/k_"+body+".png)";
		body_parts[2].style.backgroundImage = "url(img/bodyparts/b_"+footer+".png)";
		var bn_back = u.qs(".back", scene);
		u.link(bn_back);
		bn_back.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_logo = u.qs(".logo", scene);
		u.link(bn_logo);
		bn_logo.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_enter = u.qs(".enter", scene);
		u.link(bn_enter);
		bn_enter.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event42');
		}
		var bn_info = u.qs(".infobutton", scene);
		bn_info.page = scene.page;
		u.link(bn_info);
		bn_info.clicked = function(event) {
			this.page.cN.overlay(this.url);
		}
		var bn_tip = u.qs(".tip", scene);
		bn_tip.page = scene.page;
		u.link(bn_tip);
		bn_tip.clicked = function(event) {
			this.page.cN.overlay(this.url);
			trackEvent('event43');
		}
		var costume_lookup_array = new Array();
		costume_lookup_array["askepot"] = new Array('Askepot', 'Askepot');
		costume_lookup_array["barbapapa"] = new Array('Barbapapa', 'Barbapapa');
		costume_lookup_array["batman"] = new Array('Batman', 'Batman');
		costume_lookup_array["bokser"] = new Array('Bokser', 'Bokser');
		costume_lookup_array["brud"] = new Array('Brude', 'Brud');
		costume_lookup_array["buzz"] = new Array('Buzz Lightyear', 'Buzz Lightyear');
		costume_lookup_array["cars"] = new Array('Cars', 'Cars');
		costume_lookup_array["clone"] = new Array('Clone Trooper', 'Clone Trooper');
		costume_lookup_array["cowboy"] = new Array('Cowboy', 'Cowboy');
		costume_lookup_array["darth"] = new Array('Darth Vader', 'Darth Vader');
		costume_lookup_array["handy"] = new Array('Handy Manny', 'Handy Manny');
		costume_lookup_array["hanna"] = new Array('Hannah Montana', 'Hannah Montana');
		costume_lookup_array["hawaii"] = new Array('Hawaii', 'Hawaii');
		costume_lookup_array["heat"] = new Array('Heatblast', 'Heatblast');
		costume_lookup_array["jordbaer"] = new Array('Jordbær', 'Jordbær');
		costume_lookup_array["kanin"] = new Array('Kanin', 'Kanin');
		costume_lookup_array["klokkeblomst"] = new Array('Klokkeblomst', 'Klokkeblomst');
		costume_lookup_array["klovn"] = new Array('Klovne', 'Klovn');
		costume_lookup_array["laege"] = new Array('Læge', 'Læge');
		costume_lookup_array["loeve"] = new Array('Løve', 'Løve');
		costume_lookup_array["mickey"] = new Array('Minnie Mouse', 'Minnie Mouse');
		costume_lookup_array["ninja"] = new Array('Ninja', 'Ninja');
		costume_lookup_array["pippi"] = new Array('Pippi', 'Pippi');
		costume_lookup_array["politi"] = new Array('Politi', 'Politi');
		costume_lookup_array["prinsesse"] = new Array('Prinsesse', 'Prinsesse');
		costume_lookup_array["ridder"] = new Array('Ridder', 'Ridder');
		costume_lookup_array["samurai"] = new Array('Samurai', 'Samurai');
		costume_lookup_array["smoelf"] = new Array('Smølfe', 'Smølf');
		costume_lookup_array["snehvide"] = new Array('Snehvide', 'Snehvide');
		costume_lookup_array["spiderman"] = new Array('Spider-man', 'Spider-man');
		costume_lookup_array["sygeplejerske"] = new Array('Sygeplejerske', 'Sygeplejerske');
		costume_lookup_array["tornerose"] = new Array('Tornerose', 'Tornerose');
		costume_lookup_array["trold"] = new Array('Trolde', 'Trold');
		var fb_link = u.qs("#facebook_link");
		var fb_title = 'Jeg skal være en ' + costume_lookup_array[header][0] + '-' + costume_lookup_array[body][0] + '-' + costume_lookup_array[footer][1] + ' til fastelavn. Det er helt gakket!';
		var fb_summary = 'Du kan selv prøve at sammensætte en helt vanvittig udklædning på Fætter BR\'s hjemmeside. Du kan også deltage i konkurrencen og få chancen for at vinde 3.000 kr. til Fætter BR! Leg og deltag her.';
		var fb_url = 'http://br.dk/fastelavn';
		var fb_image = 'http://combineimages.dearapi.com/br_gakgak_fastelavn_2012/?images[]=h_' + header + '%26images[]=k_' + body + '%26images[]=b_' + footer;
		var fb_share_link = 'http://www.facebook.com/sharer.php?s=100&p[title]=' + fb_title + '&p[url]=' + fb_url + '&p[summary]=' + fb_summary + '&p[images][0]=' + fb_image;
		u.e.click(fb_link);
		fb_link.clicked = function(event) {
			trackEvent('event44');
			alert("Facebook sharing disabled");
		}
		scene.ready();
	}
}

/*i-info.js*/
Util.Objects["info"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
			u.a.transition(this, "all .5s linear");
			u.a.setOpacity(this, 1);
		}
		var bn_close = u.qs(".close", scene);
		bn_close.scene = scene;
		u.link(bn_close);
		bn_close.clicked = function(event) {
			this.scene.parentNode.transitioned = function(event) {
				this.parentNode.removeChild(this);
			}
			u.a.transition(this.scene.parentNode, "all .5s linear");
			u.a.setOpacity(this.scene.parentNode, 0);
		}
		scene.ready();
	}
}

/*i-tip.js*/
Util.Objects["tip"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
			u.a.transition(this, "all .5s linear");
			u.a.setOpacity(this, 1);
		}
		if(u.getCookie("choose")) {
			var choices = u.getCookie("choose").split(",");
			if(choices.length == 4) {
				u.qs("#bodypart_1", scene).value = "h_" + choices[0];
				u.qs("#bodypart_2", scene).value = "k_" + choices[1];
				u.qs("#bodypart_3", scene).value = "b_" + choices[2];
			}
		}
		var bn_close = u.qs(".close", scene);
		bn_close.scene = scene;
		u.link(bn_close);
		bn_close.clicked = function(event) {
			this.scene.parentNode.transitioned = function(event) {
				this.parentNode.removeChild(this);
			}
			u.a.transition(this.scene.parentNode, "all .5s linear");
			u.a.setOpacity(this.scene.parentNode, 0);
		}
		var textarea = u.qs("#message_text");
		var textarea_default_text = 'Jeg synes lige du skal se, hvad jeg gerne vil være til fastelavn. Ved godt det er helt fjollet men også ret skægt. Du kan også selv prøve at sammensætte dine egne gakkede kostumer på br.dk/fastelavn';
		textarea.value = textarea_default_text;
		u.e.click(textarea);
		textarea.clicked = function(event) {
			if (textarea.value == textarea_default_text) {
				textarea.value = "";
			}
		}
		var form = u.qs("form");
		form.onsubmit = function() {return false;}
		var bn_submit = u.qs(".submit", form);
		bn_submit._form = form;
		bn_submit.scene = scene;
		u.e.click(bn_submit);
		bn_submit.clicked = function(event) {
			this.Response = function(response) {
				if (response.type == "success") {
					this.scene.parentNode.transitioned = function() {
						this.parentNode.removeChild(this);
					}
					u.a.transition(this.scene.parentNode, "all .5s linear");
					u.a.setOpacity(this.scene.parentNode, 0);
				}
			}
			this.Response({"type":"success"});
			trackEvent('event45');
		}
		scene.ready();
	}
}
/*i-participant.js*/
Util.Objects["participant"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();
		}
		var yes_label = u.qs("#member_input_yes_label", scene);
		var no_label = u.qs("#member_input_no_label", scene);
		var yes_radio = u.qs("#member_input_yes", yes_label);
		var no_radio = u.qs("#member_input_no", no_label);
		u.e.click(yes_label);
		u.e.click(no_label);
		yes_label.clicked = function(event) {
			u.removeClass(no_label, "checked");
			u.addClass(yes_label, "checked");
			no_radio.checked = false;
			yes_radio.checked = true;
			u.saveCookie("clubbr_member", "yes");
		}
		no_label.clicked = function(event) {
			u.removeClass(yes_label, "checked");
			u.addClass(no_label, "checked");
			yes_radio.checked = false;
			no_radio.checked = true;
			u.saveCookie("clubbr_member", "no");
		}
		if(u.getCookie("choose")) {
			var choices = u.getCookie("choose").split(",");
			if(choices.length == 4) {
				u.qs("#bodypart_1", scene).value = "h_" + choices[0];
				u.qs("#bodypart_2", scene).value = "k_" + choices[1];
				u.qs("#bodypart_3", scene).value = "b_" + choices[2];
			}
		}
		var bn_back = u.qs(".back", scene);
		u.link(bn_back);
		bn_back.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_logo = u.qs(".logo", scene);
		u.link(bn_logo);
		bn_logo.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_start = u.qs(".start", scene);
		u.link(bn_start);
		bn_start.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event47');
		}
		var form = u.qs("form");
		form.onsubmit = function() {return false;}
		var bn_submit = u.qs(".submit", form);
		bn_submit._form = form;
		bn_submit.scene = scene;
		u.e.click(bn_submit);
		bn_submit.clicked = function(event) {
			this.Response = function(response) {
				if (response.type == "success") {
					this.scene.parentNode.transitioned = function(event) {
						this.parentNode.removeChild(this);
						location.href = "thanks.php";
					}
					u.a.transition(this.scene.parentNode, "all .5s linear");
					u.a.setOpacity(this.scene.parentNode, 0);
				}
				else {
					var bn_submit = u.qs("#form_error");
					bn_submit.style.display = "block";
				}
			}
			this.Response({"type":"success"});
			trackEvent('event46');
		}
		scene.ready();
	}
}
/*i-thanks.js*/
Util.Objects["thanks"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();
		}
		if (u.getCookie("clubbr_member") && u.getCookie("clubbr_member") == "no") {
			var notmember_link = u.qs("#notmember_link", scene);
			var clubbr_link = u.qs("#clubbr", scene);
			notmember_link.style.display = "block";
			clubbr_link.style.display = "block";
		}
		var bn_back = u.qs(".back", scene);
		u.link(bn_back);
		bn_back.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_logo = u.qs(".logo", scene);
		u.link(bn_logo);
		bn_logo.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_start = u.qs(".start", scene);
		u.link(bn_start);
		bn_start.clicked = function(event) {
			trackEvent('event47');
			location.hash = u.h.cleanHash(this.url);
		}
		scene.ready();
	}
}

/*i-dressgame.js*/
Util.Objects["dressgame"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.ready = function() {
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();
			scene.shuffle();
		}
		scene.picker_red = u.qs(".outfit.red .picker", scene);
		scene.picker_red.pickertext = u.qs(".outfit.red .pickertext p", scene);
		scene.picker_red.header = u.qs(".header .costume", scene.picker_red);
		scene.picker_red.header.scene = scene;
		scene.picker_red.header.nodes = u.qsa("li", scene.picker_red.header);
		scene.picker_red.body = u.qs(".body .costume", scene.picker_red);
		scene.picker_red.body.scene = scene;
		scene.picker_red.body.nodes = u.qsa("li", scene.picker_red.body);
		scene.picker_red.footer = u.qs(".footer .costume", scene.picker_red);
		scene.picker_red.footer.scene = scene;
		scene.picker_red.footer.nodes = u.qsa("li", scene.picker_red.footer);
		scene.picker_red.node_width = scene.picker_red.header.nodes[0].offsetWidth
		scene.picker_blue = u.qs(".outfit.blue .picker", scene);
		scene.picker_blue.pickertext = u.qs(".outfit.blue .pickertext p", scene);
		scene.picker_blue.header = u.qs(".header .costume", scene.picker_blue);
		scene.picker_blue.header.scene = scene;
		scene.picker_blue.header.nodes = u.qsa("li", scene.picker_blue.header);
		scene.picker_blue.body = u.qs(".body .costume", scene.picker_blue);
		scene.picker_blue.body.scene = scene;
		scene.picker_blue.body.nodes = u.qsa("li", scene.picker_blue.body);
		scene.picker_blue.footer = u.qs(".footer .costume", scene.picker_blue);
		scene.picker_blue.footer.scene = scene;
		scene.picker_blue.footer.nodes = u.qsa("li", scene.picker_blue.footer);
		scene.picker_blue.node_width = scene.picker_blue.header.nodes[0].offsetWidth
		scene.shuffle = function() {
			var i, node;
			var random_header_red = u.random(7, this.picker_red.header.nodes.length+6);
			var random_body_red = u.random(7, this.picker_red.body.nodes.length+6);
			var random_footer_red = u.random(7, this.picker_red.footer.nodes.length+6);
			var random_header_blue = u.random(7, 36);
			var random_body_blue = u.random(7, 35);
			var random_footer_blue = u.random(7, 35);
			this.picker_red.header.transitioned = null;
			this.picker_red.body.transitioned = null;
			this.picker_red.footer.transitioned = null;
			this.picker_blue.header.transitioned = null;
			this.picker_blue.body.transitioned = null;
			this.picker_blue.footer.transitioned = null;
			for(i = 0; this.picker_red.header.nodes.length < random_header_red; i++) {
				this.picker_red.header.appendChild(this.picker_red.header.nodes[i].cloneNode(true));
				this.picker_red.header.nodes = u.qsa("li", this.picker_red.header);
			}
			u.a.transition(this.picker_red.header, "none");
			u.a.setWidth(this.picker_red.header, this.picker_red.header.nodes.length * this.picker_red.node_width);
			u.a.translate(this.picker_red.header, 0, 0);
			for(i = 0; node = this.picker_red.header.nodes[i]; i++) {
				if(!node.initialized) {
					node.style.backgroundImage = "url(img/bodyparts/h_"+node.className+".png)";
					node.initialized = true;
				}
			}
			for(i = 0; this.picker_red.body.nodes.length < random_body_red; i++) {
				this.picker_red.body.appendChild(this.picker_red.body.nodes[i].cloneNode(true));
				this.picker_red.body.nodes = u.qsa("li", this.picker_red.body);
			}
			u.a.transition(this.picker_red.body, "none");
			u.a.setWidth(this.picker_red.body, this.picker_red.body.nodes.length * this.picker_red.node_width);
			u.a.translate(this.picker_red.body, 0, 0);
			for(i = 0; node = this.picker_red.body.nodes[i]; i++) {
				if(!node.initialized) {
					node.style.backgroundImage = "url(img/bodyparts/k_"+node.className+".png)";
					node.initialized = true;
				}
			}
			for(i = 0; this.picker_red.footer.nodes.length < random_footer_red; i++) {
				this.picker_red.footer.appendChild(this.picker_red.footer.nodes[i].cloneNode(true));
				this.picker_red.footer.nodes = u.qsa("li", this.picker_red.footer);
			}
			u.a.transition(this.picker_red.footer, "none");
			u.a.setWidth(this.picker_red.footer, this.picker_red.footer.nodes.length * this.picker_red.node_width);
			u.a.translate(this.picker_red.footer, 0, 0);
			for(i = 0; node = this.picker_red.footer.nodes[i]; i++) {
				if(!node.initialized) {
					node.style.backgroundImage = "url(img/bodyparts/b_"+node.className+".png)";
					node.initialized = true;
				}
			}
			for(i = 0; this.picker_blue.header.nodes.length < random_header_blue; i++) {
				this.picker_blue.header.appendChild(this.picker_blue.header.nodes[i].cloneNode(true));
				this.picker_blue.header.nodes = u.qsa("li", this.picker_blue.header);
			}
			u.a.transition(this.picker_blue.header, "none");
			u.a.setWidth(this.picker_blue.header, this.picker_blue.header.nodes.length * this.picker_blue.node_width);
			u.a.translate(this.picker_blue.header, 0, 0);
			for(i = 0; node = this.picker_blue.header.nodes[i]; i++) {
				if(!node.initialized) {
					node.style.backgroundImage = "url(img/bodyparts/h_"+node.className+".png)";
					node.initialized = true;
				}
			}
			for(i = 0; this.picker_blue.body.nodes.length < random_body_blue; i++) {
				this.picker_blue.body.appendChild(this.picker_blue.body.nodes[i].cloneNode(true));
				this.picker_blue.body.nodes = u.qsa("li", this.picker_blue.body);
			}
			u.a.transition(this.picker_blue.body, "none");
			u.a.setWidth(this.picker_blue.body, this.picker_blue.body.nodes.length * this.picker_blue.node_width);
			u.a.translate(this.picker_blue.body, 0, 0);
			for(i = 0; node = this.picker_blue.body.nodes[i]; i++) {
				if(!node.initialized) {
					node.style.backgroundImage = "url(img/bodyparts/k_"+node.className+".png)";
					node.initialized = true;
				}
			}
			for(i = 0; this.picker_blue.footer.nodes.length < random_footer_blue; i++) {
				this.picker_blue.footer.appendChild(this.picker_blue.footer.nodes[i].cloneNode(true));
				this.picker_blue.footer.nodes = u.qsa("li", this.picker_blue.footer);
			}
			u.a.transition(this.picker_blue.footer, "none");
			u.a.setWidth(this.picker_blue.footer, this.picker_blue.footer.nodes.length * this.picker_blue.node_width);
			u.a.translate(this.picker_blue.footer, 0, 0);
			for(i = 0; node = this.picker_blue.footer.nodes[i]; i++) {
				if(!node.initialized) {
					node.style.backgroundImage = "url(img/bodyparts/b_"+node.className+".png)";
					node.initialized = true;
				}
			}
			if(random_header_red > random_body_red && random_header_red > random_footer_red) {
				this.picker_red.header.transitioned = function(event) {
					this.transitioned = null;
					this.scene.picker_red.pickertext.innerHTML = this.scene.picker_red.header.nodes[random_header_red-1].innerHTML + " - " + this.scene.picker_red.body.nodes[random_body_red-1].innerHTML + " - " + this.scene.picker_red.footer.nodes[random_footer_red-1].innerHTML;
				}
			}
			else if(random_body_red > random_header_red && random_body_red > random_footer_red) {
				this.picker_red.body.transitioned = function(event) {
					this.transitioned = null;
					this.scene.picker_red.pickertext.innerHTML = this.scene.picker_red.header.nodes[random_header_red-1].innerHTML + " - " + this.scene.picker_red.body.nodes[random_body_red-1].innerHTML + " - " + this.scene.picker_red.footer.nodes[random_footer_red-1].innerHTML;
				}
			}
			else {
				this.picker_red.footer.transitioned = function(event) {
					this.transitioned = null;
					this.scene.picker_red.pickertext.innerHTML = this.scene.picker_red.header.nodes[random_header_red-1].innerHTML + " - " + this.scene.picker_red.body.nodes[random_body_red-1].innerHTML + " - " + this.scene.picker_red.footer.nodes[random_footer_red-1].innerHTML;
				}
			}
			u.a.transition(this.picker_red.header, "all "+ (random_header_red*0.15) + "s ease-in")
			u.a.translate(this.picker_red.header, -((random_header_red-1) * this.picker_red.node_width), 0);
			u.a.transition(this.picker_red.body, "all "+ (random_body_red*0.15) + "s ease-in")
			u.a.translate(this.picker_red.body, -((random_body_red-1) * this.picker_red.node_width), 0);
			u.a.transition(this.picker_red.footer, "all "+ (random_footer_red*100) + "ms ease-in")
			u.a.translate(this.picker_red.footer, -((random_footer_red-1) * this.picker_red.node_width), 0);
			if(random_header_blue > random_body_blue && random_header_blue > random_footer_blue) {
				this.picker_blue.header.transitioned = function(event) {
					this.transitioned = null;
					this.scene.picker_blue.pickertext.innerHTML = this.scene.picker_blue.header.nodes[random_header_blue-1].innerHTML + " - " + this.scene.picker_blue.body.nodes[random_body_blue-1].innerHTML + " - " + this.scene.picker_blue.footer.nodes[random_footer_blue-1].innerHTML;
				}
			}
			else if(random_body_blue > random_header_blue && random_body_blue > random_footer_blue) {
				this.picker_blue.body.transitioned = function(event) {
					this.transitioned = null;
					this.scene.picker_blue.pickertext.innerHTML = this.scene.picker_blue.header.nodes[random_header_blue-1].innerHTML + " - " + this.scene.picker_blue.body.nodes[random_body_blue-1].innerHTML + " - " + this.scene.picker_blue.footer.nodes[random_footer_blue-1].innerHTML;
				}
			}
			else {
				this.picker_blue.footer.transitioned = function(event) {
					this.transitioned = null;
					this.scene.picker_blue.pickertext.innerHTML = this.scene.picker_blue.header.nodes[random_header_blue-1].innerHTML + " - " + this.scene.picker_blue.body.nodes[random_body_blue-1].innerHTML + " - " + this.scene.picker_blue.footer.nodes[random_footer_blue-1].innerHTML;
				}
			}
			u.a.transition(this.picker_blue.header, "all "+ (random_header_blue*0.15) + "s ease-in")
			u.a.translate(this.picker_blue.header, -((random_header_blue-1) * this.picker_blue.node_width), 0);
			u.a.transition(this.picker_blue.body, "all "+ (random_body_blue*0.15) + "s ease-in")
			u.a.translate(this.picker_blue.body, -((random_body_blue-1) * this.picker_blue.node_width), 0);
			u.a.transition(this.picker_blue.footer, "all "+ (random_footer_blue*0.15) + "s ease-in")
			u.a.translate(this.picker_blue.footer, -((random_footer_blue-1) * this.picker_blue.node_width), 0);
		}
		var bn_back = u.qs(".back", scene);
		u.link(bn_back);
		bn_back.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var bn_logo = u.qs(".logo", scene);
		u.link(bn_logo);
		bn_logo.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}
		var brGame = {};
		brGame.timer = null;
		brGame.totalSteps = 11;
		brGame.currentStep = 0;
		brGame.startGameButton = u.ge("startgame", scene);
		brGame.li_elms = new Array();
		brGame.li_elms.push(u.qs("li.full", scene));
		brGame.li_elms.push(u.qs("li.threequaters", scene));
		brGame.li_elms.push(u.qs("li.half", scene));
		brGame.li_elms.push(u.qs("li.quarter", scene));
		brGame.startGame = function() {
			brGame.currentStep = 0;
			brGame.removeAllSelected();
			u.addClass(brGame.li_elms[0], "selected");
			u.removeClass(scene, "gameover");
			u.addClass(scene, "play");
			brGame.startGameButton.style.display = "none";
			brGame.timer = setInterval(brGame.doStep, 15000);
		};
		brGame.doStep = function() {
			if (brGame.currentStep < brGame.totalSteps) {
				brGame.currentStep++;
				brGame.removeAllSelected();
				u.addClass(brGame.li_elms[brGame.currentStep % brGame.li_elms.length], "selected");
			}
			else {
				clearInterval(brGame.timer);
				brGame.startGameButton.style.display = "block";
				u.removeClass(scene, "play");
				u.addClass(scene, "gameover");
				brGame.removeAllSelected();
				u.addClass(brGame.li_elms[0], "selected");
			}
		}
		brGame.removeAllSelected = function() {
			for (var i = 0; i < brGame.li_elms.length; i++) {
				u.removeClass(brGame.li_elms[i], "selected");
			}
		}
		var findcostume = u.ge("findcostume", scene);
		findcostume.scene = scene;
		findcostume.clicked = function() {
			u.addClass(scene, "play");
			this.scene.shuffle();
			trackEvent('event48');
		}
		u.e.click(findcostume);
		var startgame = u.ge("startgame", scene);
		startgame.scene = scene;
		startgame.clicked = function() {
			brGame.startGame();
			trackEvent('event49');
		}
		u.e.click(startgame);
		var playover = u.ge("playover", scene);
		playover.scene = scene;
		playover.clicked = function() {
			u.removeClass(scene, "gameover");
			u.addClass(scene, "play");
			this.scene.shuffle();
			trackEvent('event50');
		}
		u.e.click(playover);
		scene.ready();
	}
	this.testing = function() {
		alert("inilne testing");
	}
}
