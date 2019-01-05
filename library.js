"use strict";
/* globals require, module */

var	NodeBB = require('./lib/nodebb'),
	Config = require('./lib/config'),
	Sockets = require('./lib/sockets'),
	Commands = require('./lib/commands'),
	/*Upload = require('./lib/upload'),*/
	Controllers = require('./lib/controllers'),

	path = require('path'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    mv = require('mv'),
    async = require('async'),
    nconf = require.main.require('nconf'),

	app,

	Shoutbox = {};

Shoutbox.init = {};
Shoutbox.widget = {};
Shoutbox.settings = {};

Shoutbox.init.load = function(params, callback) {
	/*function renderGlobal(req, res, next) {
		Config.getTemplateData(function(data) {
			res.render(Config.plugin.id, data);
		});
	}

	function renderAdmin(req, res, next) {
		Config.getTemplateData(function(data) {
			res.render('admin/plugins/' + Config.plugin.id, data);
		});
	}*/

	var router = params.router,
		hostMiddleware = params.middleware,
		multiparty = require.main.require('connect-multiparty')();/*,
		hostControllers = params.controllers;*/

	router.get('/' + Config.plugin.id, hostMiddleware.buildHeader, Controllers.renderGlobal);
	router.get('/api/' + Config.plugin.id, Controllers.renderGlobal);

	router.get('/admin/plugins/' + Config.plugin.id, hostMiddleware.admin.buildHeader, Controllers.renderAdmin);
	router.get('/api/admin/plugins/' + Config.plugin.id, Controllers.renderAdmin);
	//AOM agregamos el router para el subidor de replays
	router.post('/plugins/nodebb-plugin-shoutbox/upload', multiparty, hostMiddleware.validateFiles, hostMiddleware.applyCSRF, Controllers.upload);

	NodeBB.SocketPlugins[Config.plugin.id] = Sockets.events;
	NodeBB.SocketAdmin[Config.plugin.id] = Config.adminSockets;

	app = params.app;

	// Create "replays/aom" subfolder into upload_path
	//mkdirp(path.join(nconf.get('upload_path'), 'replays/aom'), callback);

	Config.init(callback);
};

Shoutbox.init.addGlobalNavigation = function(header, callback) {
	if (Config.global.get('toggles.headerLink')) {
		header.navigation.push({
			class: '',
			iconClass: 'fa fa-fw ' + Config.plugin.icon,
			route: '/' + Config.plugin.id,
			text: Config.plugin.name
		});
	}

	callback(null, header);
};

Shoutbox.init.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/' + Config.plugin.id,
		icon: Config.plugin.icon,
		name: Config.plugin.name
	});

	callback(null, header);
};

Shoutbox.init.getSounds = function(sounds, callback) {
	sounds.push(__dirname + '/public/sounds/shoutbox-notification.mp3');
	sounds.push(__dirname + '/public/sounds/shoutbox-wobble.mp3');
	sounds.push(__dirname + '/public/sounds/shoutbox-cena.mp3');
	callback(null, sounds);
};

Shoutbox.widget.define = function(widgets, callback) {
	widgets.push({
		name: Config.plugin.name,
		widget: Config.plugin.id,
		description: Config.plugin.description,
		content: ''
	});

	callback(null, widgets);
};

Shoutbox.widget.render = function(widget, callback) {
	//Remove any container
	widget.data.container = '';

	Config.user.get({ uid: widget.uid, settings: {} }, function(err, result) {
		Config.getTemplateData(function(data) {

			data.hiddenStyle = '';
			if (!err && result && result.settings && parseInt(result.settings['shoutbox:toggles:hide'], 10) == 1) {
				data.hiddenStyle = 'display: none;';
			}

			app.render('shoutbox/panel', data, callback);
		});
	});
};

Shoutbox.settings.addUserSettings = function(settings, callback) {
	app.render('shoutbox/user/settings', { settings: settings.settings }, function(err, html) {
		settings.customSettings.push({
			title: Config.plugin.name,
			content: html
		});

		callback(null, settings);
	});
};

Shoutbox.settings.getUserSettings = function(data, callback) {
	Config.user.get(data, callback);
};

Shoutbox.settings.saveUserSettings = function(data) {
	Config.user.save(data);
};

Shoutbox.processUpload = function(payload, callback) {
	var id = path.basename(payload.path),
		uploadPath = path.join(nconf.get('upload_path'), 'audio-embed', id);

	async.waterfall([
		async.apply(mv, payload.path, uploadPath)
	], function(err) {
		if (err) {
			return callback(err);
		}

		callback(null, {
			id: id
		});
	});

};

module.exports = Shoutbox;
