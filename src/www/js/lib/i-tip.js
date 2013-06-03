Util.Objects["tip"] = new function() {
	this.init = function(scene) {

		// page reference
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;

		// content ready
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
		
		// Default text in textarea
		var textarea = u.qs("#message_text");
		var textarea_default_text = 'Jeg synes lige du skal se, hvad jeg gerne vil være til fastelavn. Ved godt det er helt fjollet men også ret skægt. Du kan også selv prøve at sammensætte dine egne gakkede kostumer på br.dk/fastelavn';
		textarea.value = textarea_default_text;
		u.e.click(textarea);
		textarea.clicked = function(event) {
			if (textarea.value == textarea_default_text) {
				textarea.value = "";
			}
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
					this.scene.parentNode.transitioned = function() {
						this.parentNode.removeChild(this);
					}
					u.a.transition(this.scene.parentNode, "all .5s linear");
					u.a.setOpacity(this.scene.parentNode, 0);
				}
				// else {
				// 					alert("error: " + response.message);
				// 				}

			}
			this.Response({"type":"success"});
			//u.Request(this, this._form.action, u.f.getParams(this._form, "string"), 'script');
			
			trackEvent('event45');
		}
		
		// call content ready class
		scene.ready();
	}
}