Util.Objects["dressgame"] = new function() {
	this.init = function(scene) {

		// page reference
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;

		// content ready
		scene.ready = function() {

			// show when ready
			u.ac(this.page.cN, "ready");
			this.page.cN.ready();
			scene.shuffle();
		}
		// do what ever is needed 


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

//		u.bug("red node width"+scene.picker_red.node_width);


		// shuffle set names
		// shuffle kortere - DONE


		scene.shuffle = function() {
			var i, node;

			var random_header_red = u.random(7, this.picker_red.header.nodes.length+6);
			var random_body_red = u.random(7, this.picker_red.body.nodes.length+6);
			var random_footer_red = u.random(7, this.picker_red.footer.nodes.length+6);
//			u.bug("random:"+random_footer_red + ":footer.length:" + this.picker_red.footer.nodes.length)

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
//				u.bug("add node" + i + ":length:" + this.picker_red.footer.nodes.length)
			}
//			u.bug("width:"+this.picker_red.footer.nodes.length +"*"+ this.picker_red.node_width + this.picker_red.footer.nodes.length * this.picker_red.node_width)
			u.a.transition(this.picker_red.footer, "none");
			u.a.setWidth(this.picker_red.footer, this.picker_red.footer.nodes.length * this.picker_red.node_width);
//			u.bug(this.picker_red.footer.offsetWidth)
			u.a.translate(this.picker_red.footer, 0, 0);
			for(i = 0; node = this.picker_red.footer.nodes[i]; i++) {
				if(!node.initialized) {
//					u.bug("load image " + i + ":" + this.picker_red.footer.nodes.length + ":" + node.className)
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

			//			this.picker_red.pickertext.innerHTML = this.picker_red.header.nodes[random_header_red-1].innerHTML + " - " + this.picker_red.body.nodes[random_body_red-1].innerHTML + " - " + this.picker_red.footer.nodes[random_footer_red-1].innerHTML;
			//			this.picker_blue.pickertext.innerHTML = this.picker_blue.header.nodes[random_header_blue-1].innerHTML + " - " + this.picker_blue.body.nodes[random_body_blue-1].innerHTML + " - " + this.picker_blue.footer.nodes[random_footer_blue-1].innerHTML;
			// this.picker_red.pickertext.innerHTML = '';
			// 			this.picker_blue.pickertext.innerHTML = '';
			
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
		
		// Game functions start
		var brGame = {};
		
		// Game vars
		brGame.timer = null;
		brGame.totalSteps = 11;
		brGame.currentStep = 0;
		brGame.startGameButton = u.ge("startgame", scene);
		
		// Game html elements
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
		// Game functions end
		
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


		// call content ready class
		scene.ready();
	}
	
	this.testing = function() {
		alert("inilne testing");
	}
}
