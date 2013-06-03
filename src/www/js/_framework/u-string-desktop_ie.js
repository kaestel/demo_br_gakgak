// no trim in IE8
if(String.prototype.trim == undefined) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}

// no textContent in IE8
if(Object.prototype.textContent == undefined && Object.defineProperty) {
	Object.defineProperty(Element.prototype, "textContent",
		{get: function() {
			return this.innerText;
			}
		}
	);
}
// IE 7
else if(Object.prototype.textContent == undefined) {
//	Object.prototype.__getter__ = function() {
//		return this.innerText;
//	}
}


