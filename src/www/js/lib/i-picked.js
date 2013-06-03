Util.Objects["picked"] = new function() {
	this.init = function(scene) {

		// page reference
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;

		// content ready
		scene.ready = function() {
//			u.bug("inner content ready")
			// check sub elements
//			if(u.qsa(".ready", this).length != u.qsa("li", this).length || this.initiated) {
//				return;
//			}
			// all ready - go
//			else {
//				u.bug("content is ready")

				// show when ready
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();

//				this.initiated = true;
//			}
		}

		// do what ever is needed 


		// show costume
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
		var bn_enter = u.qs(".enter", scene);
		u.link(bn_enter);
		bn_enter.clicked = function(event) {
			location.hash = u.h.cleanHash(this.url);
			trackEvent('event42');
		}

		// overlays
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
		
		// Set facebook link
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
			//window.open(fb_share_link);
		}
		
		// call content ready class
		scene.ready();
	}
}
