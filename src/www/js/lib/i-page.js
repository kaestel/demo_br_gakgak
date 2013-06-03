Util.Objects["page"] = new function() {
	this.init = function(page, event) {
		var i;



		// var s = "";
		// for(x in event) {
		// 	s += x + "=" + event[x] + "<br>";
		// }
		// 
		// u.bug("init"+ event.type)
		// u.bug("s:"+s)

		if(!page.initialized) {
			page.initialized = true;
			u.rc(page, "i:page");

//			u.bug("init")

			page.cN = u.qs("#content", page);
			page.cN.page = page;

			u.a.setOpacity(page, 0);
			u.a.setOpacity(page.cN, 0);

			// set general transition for content (set after default hiding)
			u.a.transition(page.cN, "all .5s linaer");


			// force font load
			var font_loader = u.ae(document.body, "div", ({"class":"fonts"}));
	//		u.a.setOpacity(font_loader, 0);
			u.ae(font_loader, "div", ({"class":"font_nic"})).innerHTML = "load";
			u.ae(font_loader, "div", ({"class":"font_vag_bold"})).innerHTML = "load";
			u.ae(font_loader, "div", ({"class":"font_vag_light"})).innerHTML = "load";


			// page is ready, fade in
			page.ready = function() {
//				u.bug("page: ready")

				// enable hash change navigation detection
				u.h.catchEvent(this.cN.navigate, this.cN);

				this.transitioned = function() {
//					u.bug("page: transitioned")
					this.transitioned = null;
					u.a.transition(this, "none");

					// page is ready
					u.addClass(this, "ready");

					// in case content loads faster than page, call content ready controller
					this.cN.ready();
				}

//				u.bug("op:" + u.gcs(this, "opacity"))
				// fade page up
				// if opacity should already be 1, go straight to next step
				if(u.gcs(this, "opacity") == 1 || u.firefox(4, '<=')) {
//					u.bug("page: quick transition");
					this.transitioned();
					u.a.transition(this, "none");
					u.a.setOpacity(this, 1);
				}
				// start fade up transition
				else {
//					u.bug("page: slow transition:" + this.id);
					u.a.transition(this, "all .5s ease-in");
					u.a.setOpacity(this, 1);
				}
			}

			// content state controller
			page.cN.ready = function() {
	//			u.bug("content: ready");

				// if all is good and ready to go - wait for page initialization to be finished
				if(this.page.className.match(/ready/) && this.className.match(/ready/)) {
	//				u.bug("content: fade up");

					this.transitioned = function(event) {
						var scene = u.qs(".scene", this);
						if(scene && typeof(scene.displayed) == "function") {
							scene.displayed();
						}
	//					u.bug("content: transitioned")
						// callback to scene - maybe it needs to be built after slide-in
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


			// navigation - uses HASH to identify selected node
			page.cN.navigate = function() {
	//			u.bug("navigate")

				// TODO: check parameters, and only redirect if update reflects navigation item?
				// TODO: possibly only do navigation update if first parameter changes


				// handle oad-response when returned after load and fade back in
				this.Response = function(response) {
	//				u.bug("navigate: response")

					// set body class
					var content = u.qs("#content", response);
					u.setClass(this, content.className);

					// replace content
					this.innerHTML = content.innerHTML;


					// set title
					document.title = response.head_title;

					// init content - will callback to ready, when done
					u.init(this);
				}

				// capture transition event and load new content, when fadeout is done
				this.transitioned = function(event) {
	//				u.bug("navigate: request: " + location.hash.replace("#", ""))
					this.transitioned = null;

					// Firefox prefers if I reset transition - otherwise fadeup flickers
					u.a.transition(this, "none");

					// hide content, while changing scenes
	//				u.a.setOpacity(this, 0)

					// request new content
					u.Request(this, location.hash.replace("#", ""));
				}

				// content is no longer ready
				u.rc(this, "ready");

				// if element is already faded out
				if(u.gcs(this, "opacity") == 0) {
	//				u.bug("navigate: quick transition");
					this.transitioned();
				}
				// start fade out transition
				else {
	//				u.bug("navigate: fade out")

					u.a.transition(this, "all 500ms linear");
					u.a.setOpacity(this, 0);
				}

			}

			page.cN.overlay = function(url) {

				this.Response = function(response) {
	//				u.bug("navigate: response")

					// set body class
	//				var overlay = u.ae(this, "div", ({"class":"overlay"}));

					var overlay = u.qs(".overlay", response);
	//				u.ac(overlay, content.className);

					// replace content
	//				overlay.innerHTML = content.innerHTML;
					this.appendChild(overlay);

					// init content - will callback to ready, when done
					u.init(overlay);
				}

				u.Request(this, url);

			}


			// start initialization process - all required setup must be complete before this step
			// set default hash
			if(location.hash.length < 2) {
				location.hash = u.h.cleanHash(location.href);
				u.init(page.cN);
			}
			// if different hash and url, load content
			else if(location.hash != "#"+u.h.cleanHash(location.href.split("#")[0])) {
				page.cN.navigate();
			}
			// init existing content
			else {
				u.init(page.cN);
			}

			// call page ready
			page.ready();
			
		}


	}
}

u.e.addEvent(window, "load", function(event) {u.o.page.init(u.qs("#page"), event);})
//window.onload = function() {u.o.page.init(u.qs("#page"));}

function trackEvent(eventId) {
	//alert("Tracked event: " + eventId);
}
