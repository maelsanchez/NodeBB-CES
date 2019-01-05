(function() {
	$(window).on('action:widgets.loaded', function() {
		if ($('#ces-main').length > 0) {
			Ces.init();
		}
	});
	console.log('hi');

	window.Ces = {
		init: function() {
			Ces.instances.main = Ces.base.init($('#ces-main'), {});
		},
		instances: {}
	};
})();