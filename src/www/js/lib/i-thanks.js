Util.Objects["thanks"] = new function() {
	this.init = function(scene) {

		// page reference
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;

		// content ready
		scene.ready = function() {
			// show when ready
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();
		}

		// do what ever is needed 
		
		// Show "join club" link if cookie was set to "no" by participant form
		if (u.getCookie("clubbr_member") && u.getCookie("clubbr_member") == "no") {
			var notmember_link = u.qs("#notmember_link", scene);
			var clubbr_link = u.qs("#clubbr", scene);
			notmember_link.style.display = "block";
			clubbr_link.style.display = "block";
		}
		
		// setup links
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


		// call content ready class
		scene.ready();
	}
}
