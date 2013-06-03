Util.Form = u.f = new function() {

	this.getParams = function(form, type) {
		var i, input, select, textarea, param;
		var params = new Array();
	
		var inputs = u.qsa("input", form);
		var selects = u.qsa("select", form)
		var textareas = u.qsa("textarea", form)

		for(i = 0; input = inputs[i]; i++) {
			if((input.type == "checkbox" || input.type == "radio")) {
				if(input.checked) {
					params[input.name] = input.value;
				}
			}
			else if(!input.type.match(/button|submit/i)) {
				params[input.name] = input.value;
			}
		}

		for(i = 0; select = selects[i]; i++) {
			params[select.name] = select.options[select.selectedIndex].value;
		}

		for(i = 0; textarea = textareas[i]; i++) {
			params[textarea.name] = textarea.value;
		}

		if(type == "string") {
			var string = "";
			for(param in params) {
				string += param + "=" + encodeURIComponent(params[param]) + "&";
			}
			return string;
		}

		return params;

	}

}
