'use strict';
/* globals $, app, socket */

define('admin/plugins/ces', ['settings'], function(Settings) {
	var wrapper;

	var ACP = {};

	ACP.init = function() {
		wrapper = $('.ces-settings');

		Settings.sync('ces', wrapper);

		$('#save').on('click', function() {
			save();
		});

		prepareButtons();
	};

	function save() {
		Settings.persist('ces', wrapper, function() {
			socket.emit('admin.plugins.ces.sync');
		});
	}

	function prepareButtons() {
		$('#ces-remove-deleted-button').off('click').on('click', function(e) {
			bootbox.confirm('Are you sure you wish to remove all shouts marked as deleted from the database?', function(confirm) {
				if (confirm) {
					socket.emit('plugins.ces.removeAll', {'which':'deleted'}, function(err, result) {
						if(err) {
							return app.alertError(err.message);
						} else {
							return app.alertSuccess('Successfully removed all shouts marked as deleted from the database');
						}
					});
				}
			});
		});

		$('#ces-remove-all-button').off('click').on('click', function(e) {
			bootbox.confirm('Are you sure you wish to remove all shouts from the database?', function(confirm) {
				if (confirm) {
					socket.emit('plugins.ces.removeAll', {'which':'all'}, function(err, result) {
						if(err) {
							return app.alertError(err.message);
						} else {
							return app.alertSuccess('Successfully removed all shouts from the database');
						}
					});
				}
			});
		});
	}

	return ACP;
});