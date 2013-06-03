// Fallback specific animation handler
// tries to mimic transitions by using timeouts

// set opacity of element
u.a.setOpacity = function(e, opacity) {
//	if(e.className == "article") {
//		u.bug("set opacity:" + (e.id ? e.id : e.className) + ":" + opacity);
//	}

	// duration and transition not supported
	if(e.duration && !this.support()) {

		// TODO: gcs(opacity) probably does NOT work in IE 8 - test and implement solution
//		u.bug("gcs-opacity:" + u.gcs(e, "opacity"));
//		u.bug("IE:" + u.gcs(e, "filter"))

		e.o_start = e._opacity ? e._opacity : u.gcs(e, "opacity");
		e.o_transitions = e.duration/50;
//		u.bug(e.o_transitions + ":" + opacity + ":" + e.o_start)
		e.o_change = (opacity - e.o_start) / e.o_transitions;
		e.o_progress = 0;

//		u.bug("duration ("+(e.id ? e.id : e.className)+"):" + e.duration + ":from:" + e.start_opacity + ":to:" + opacity + ":" + e.transitions + ":" + e.change_pr_transition);

		e.o_transitionTo = function() {
			++this.o_progress;

			var new_opacity = (Number(this.o_start) + Number(this.o_progress * this.o_change));


//			if(this.className == "article") {
//				u.bug("new opacity:" + (e.id ? e.id : e.className) + ":" + new_opacity + ":" + Number(this.o_start) + "+"+ this.o_progress +"*"+ this.o_change);
//			}

			// CSS
			u.as(this, "opacity", new_opacity);
			// IE 8
			this.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (new_opacity*100) + ')';
		}

		for(var i = 0; i < e.o_transitions; i++) {
			u.t.setTimer(e, e.o_transitionTo, 50 * i);
		}

		// callback to transition end handler
		// set it initially with full duration instead of calling on last "frame"
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}
		

	}
	// no transition or transitions supported by browser
	else {
		
		e.style.opacity = opacity;
		e.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (opacity*100) + ')';
	}

	e._opacity = opacity;
	e.transition_timestamp = new Date().getTime();

	// update dom
	e.offsetHeight;
}

u.a.setWidth = function(e, width) {


	// duration and transition not supported
	if(e.duration && !this.support()) {


		// set up transition values
		e.w_start = e._width ? e._width : u.gcs(e, "width");
		e.w_transitions = e.duration/50;
		e.w_change = (width - e.w_start) / e.w_transitions;

		e.w_progress = 0;

		// transition handler
		e.w_transitionTo = function() {
			++this.h_progress;

			var new_width = (Number(this.w_start) + Number(this.w_progress * this.w_change));

			// CSS
			u.as(this, "width", new_width+"px");
		}

		// set transition timers
		for(var i = 0; i < e.w_transitions; i++) {
			u.t.setTimer(e, e.w_transitionTo, 50 * i);
		}

		// callback to transition end handler
		// set it initially with full duration instead of calling on last "frame"
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}


	}
	else {
		var width_px = (width == "auto" ? width : width+"px");
//		width += width == "auto" ? "" : "px";
		u.as(e, "width", width_px);
	}

	e._width = width;
	e.transition_timestamp = new Date().getTime();

	// update dom
	e.offsetHeight;
}

u.a.setHeight = function(e, height) {

	// duration and transition not supported
	if(e.duration && !this.support()) {

//		u.bug(e._height)
		// set up transition values
		e.h_start = e._height ? e._height : u.gcs(e, "height");
		e.h_transitions = e.duration/50;
		e.h_change = (height - e.h_start) / e.h_transitions;

//		u.bug("set height:" + e.h_transitions + ":" + height + ":" + e.h_start)

		e.h_progress = 0;

		// transition handler
		e.h_transitionTo = function() {
			++this.h_progress;

			var new_height = (Number(this.h_start) + Number(this.h_progress * this.h_change));

//			u.bug("new height:" + (this.id ? this.id : this.className) + ":" + new_height + ":" + Number(this.h_start) + "+"+ this.h_progress +"*"+ this.h_change);

			// CSS
			u.as(this, "height", new_height+"px");
		}

		// set transition timers
		for(var i = 0; i < e.h_transitions; i++) {
			u.t.setTimer(e, e.h_transitionTo, 50 * i);
		}

		// callback to transition end handler
		// set it initially with full duration instead of calling on last "frame"
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}

	}
	// no duration or transition support
	else {
		var height_px = (height == "auto" ? height : height+"px");
		u.as(e, "height", height_px);
//		e.style.height = height;
	}


	e._height = height;
	e.transition_timestamp = new Date().getTime();

	// update dom
	e.offsetHeight;
}


/**
*
*/

u.a.translate = function(e, x, y) {
	var i;

//	u.bug("translate desktop_light:" + (e.id ? e.id : e.className) + ":" + x + "x" + y);

	// first translation?
	if(e.t_offset_x == undefined) {
		
		// first get element offset to first relative parent
		e.t_offset_x = u.relX(e);
		e.t_offset_y = u.relY(e);

		// set internal coordinate value
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;


		// safe guard if device has transitions - to avoid double transitions
		if(this.support()) {
			// set transition to "none" directly, and keep duration value
			e.style[this.variant()+"Transition"] = "none";
		}

		// set new absolute coordinates
		u.as(e, "left", e.t_offset_x+"px");
		u.as(e, "top", e.t_offset_y+"px");

		// set position absolute
		u.as(e, "position", "absolute");

//		u.bug("init translate:" + e.t_offset_x + ":" + e.element_x + "::" + e.t_offset_y + ":" + e.element_y)
	}

	// possibly only run if x != element_x || y != element_y
	if(e.duration) {


		// calculate transition
		e.x_start = e.element_x;
		e.y_start = e.element_y;
		e.t_transitions = e.duration/25;
		e.t_progress = 0;
		e.x_change = (x - e.x_start) / e.t_transitions;
		e.y_change = (y - e.y_start) / e.t_transitions;

//		u.bug("x_change:" + e.x_change);
//		u.bug("y_change:" + e.y_change);




		e.t_transitionTo = function() {
			++this.t_progress;

			var new_x = (Number(this.x_start) + Number(this.t_progress * this.x_change) + this.t_offset_x);
			var new_y = (Number(this.y_start) + Number(this.t_progress * this.y_change) + this.t_offset_y);

//			u.bug("transition move:" + (new_x) + "::" + (new_y))

			u.as(e, "left", new_x + "px");
			u.as(e, "top", new_y + "px");
		}



		for(i = 0; i < e.t_transitions; i++) {
			u.t.setTimer(e, e.t_transitionTo, 25 * i);
		}

		// callback to transition end handler
		// set it initially with full duration instead of calling on last "frame"
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}

	}
	else {

//		u.bug("direct move or support:" + (e.t_offset_x + x) + "::" + (e.t_offset_y + y))

		u.as(e, "left", (e.t_offset_x + x)+"px");
		u.as(e, "top", (e.t_offset_y + y)+"px");

	}

	
	// remember value for cross method compability
	e.element_x = x;
	e.element_y = y;
	e.transition_timestamp = new Date().getTime();

	// update dom
	e.offsetHeight;

}


