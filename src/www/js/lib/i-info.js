Util.Objects["info"] = new function() {
	this.init = function(scene) {

		// page reference
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;

		// content ready
		scene.ready = function() {
			u.a.transition(this, "all .5s linear");
			u.a.setOpacity(this, 1);
		}

		// do what ever is needed 
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




		// call content ready class
		scene.ready();
	}
}
