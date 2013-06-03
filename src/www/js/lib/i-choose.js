Util.Objects["choose"] = new function() {
	this.init = function(scene) {
		var i, node;

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

		// setup links
		var bn_pick = u.qs(".pick", scene);
		bn_pick.scene = scene;
		u.link(bn_pick);
		bn_pick.clicked = function(event) {
//			u.bug(this.scene.picker.current_header.className +":"+ this.scene.picker.current_body.className +":"+ this.scene.picker.current_footer.className)
			u.saveCookie("choose", this.scene.picker.current_header.className+","+this.scene.picker.current_body.className+","+this.scene.picker.current_footer.className+"," + this.scene.picker.pickertext.innerHTML);
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event41');
		}
		
		var bn_logo = u.qs(".logo", scene);
		u.link(bn_logo);
		bn_logo.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
		}

		// overlays
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

			// reset click counter on reset
			this.header.click_count = 0;
			this.body.click_count = 0;
			this.footer.click_count = 0;

			this.current_header = this.header.nodes[Math.abs(this.header.element_x/this.node_width)];
			this.current_body = this.body.nodes[Math.abs(this.body.element_x/this.node_width)];
			this.current_footer = this.footer.nodes[Math.abs(this.footer.element_x/this.node_width)];

			this.pickertext.innerHTML = this.current_header.innerHTML + " - " + this.current_body.innerHTML + " - " + this.current_footer.innerHTML

			// TODO: probably a faster way to get first and last element, which doesnøt require updating nodes all the time

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

		// set if cookie is available
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
			// only execute in untransitioned clicks within scope - to avoid carousel running out of elements
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


		// call content ready class
		scene.ready();

	}
}
