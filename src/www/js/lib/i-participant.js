Util.Objects["participant"] = new function() {
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
			
		// Gerts how-tos:
		// 
		// u.qs(".class", scene);
		// 
		// u.qsa(".class", scene);
		// 
		// var new_div = u.ae(scene, "div", ({"class":"whatever", "style":"width=200px"}))
		// var new_div = u.ie(scene, "div", ({"class":"whatever", "style":"width=200px"}))
		// 
		// u.e.click(new_div);
		// new_div.clicked = function(event) {
		//}

		if(u.getCookie("choose")) {
			var choices = u.getCookie("choose").split(",");

			if(choices.length == 4) {
				u.qs("#bodypart_1", scene).value = "h_" + choices[0];
				u.qs("#bodypart_2", scene).value = "k_" + choices[1];
				u.qs("#bodypart_3", scene).value = "b_" + choices[2];
			}
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
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event47');
		}


		// SETUP TIP A FRIEND AJAX HERE
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
					//alert("error: " + response.message);
				}
			
			}
			this.Response({"type":"success"});

			//u.Request(this, this._form.action, u.f.getParams(this._form, "string"), 'script');
			trackEvent('event46');
		}
		
		// call content ready class
		scene.ready();
	}
}