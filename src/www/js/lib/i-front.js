Util.Objects["front"] = new function() {
	this.init = function(scene) {

//		u.bug("init front")

		// page reference
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;

		// content ready
		scene.ready = function() {
//			u.bug("scene is ready")

			// show when ready
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();

//			this.initiated = true;
		}

		// do what ever is needed 

		var bn_start = u.qs(".start", scene);
		u.link(bn_start);
		bn_start.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event40');
		}

		// call content ready class
		scene.ready();
	}
}
