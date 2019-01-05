"use strict";

(function(Ces) {
	var Bug = function(sbInstance) {
		this.register = function() {
			sbInstance.dom.container.find('.ces-button-bug').off('click').on('click', function() {
				window.open('https://github.com/maelsanchez/NodeBB-CES/issues/new', '_blank').focus();
			});
		};
	};

	Ces.actions.register('bug', Bug);
})(window.Ces);