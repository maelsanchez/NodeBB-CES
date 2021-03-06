"use strict";

(function(Ces) {
	var allActions = [];
	
	var Actions = function(sbInstance) {
		var action;
		allActions.forEach(function(actObj) {
			action = new actObj.obj(sbInstance);
			action.register();

			this[actObj.name] = action;
		}, this);
	};
	
	Ces.actions = {
		init: function(sbInstance) {
			return new Actions(sbInstance);
		},
		register: function(name, obj) {
			allActions.push({
				name: name,
				obj: obj
			});
		}
	};
	
})(window.Ces);