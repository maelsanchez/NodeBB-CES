"use strict";

(function(Ces) {
	var Settings = function(sbInstance) {
		this.register = function() {
			sbInstance.dom.container
				.off('click', '.ces-settings-menu a')
				.on('click', '.ces-settings-menu a', handle);
		};

		function handle() {
			var el = $(this),
				key = el.data('ces-setting'),
				statusEl = el.find('span'),
				status = statusEl.hasClass('fa-check');

			if (status) {
				statusEl.removeClass('fa-check').addClass('fa-times');
				status = 0;
			} else {
				statusEl.removeClass('fa-times').addClass('fa-check');
				status = 1;
			}

			sbInstance.settings.set(key, status);

			return false;
		}
	};

	Ces.actions.register('settings', Settings);
})(window.Ces);