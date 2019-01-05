"use strict";
/*global socket*/

(function(Ces) {

	var Messages = {
		getShouts: 'plugins.ces.get',
		sendShout: 'plugins.ces.send',
		removeShout : 'plugins.ces.remove',
		editShout: 'plugins.ces.edit',
		notifyStartTyping: 'plugins.ces.startTyping',
		notifyStopTyping: 'plugins.ces.stopTyping',
		getOriginalShout: 'plugins.ces.getPlain',
		saveSettings: 'plugins.ces.saveSetting',
		getSettings: 'plugins.ces.getSettings',
		getUsers: 'user.loadMore',
		getUserStatus: 'user.checkStatus'
	};

	var Events = {
		onUserStatusChange: 'event:user_status_change',
		onReceive: 'event:ces.receive',
		onDelete: 'event:ces.delete',
		onEdit: 'event:ces.edit',
		onStartTyping: 'event:ces.startTyping',
		onStopTyping: 'event:ces.stopTyping'
	};

	var Handlers = {
		defaultSocketHandler: function(message) {
			var self = this;
			this.message = message;

			return function (data, callback) {
				if (typeof data === 'function') {
					callback = data;
					data = null;
				}

				socket.emit(self.message, data, callback);
			};
		}
	};

	var Sockets = function(sbInstance) {
		this.sb = sbInstance;

		this.messages = Messages;
		this.events = Events;
		// TODO: move this into its own file?
		this.handlers = {
			onReceive: function(data) {
				sbInstance.addShouts(data);

				if (parseInt(data[0].fromuid, 10) !== app.user.uid) {
					sbInstance.utils.notify(data[0]);
				}
			},
			onDelete: function(data) {
				var shout = $('[data-sid="' + data.sid + '"]'),
					uid = shout.data('uid'),

					prevUser = shout.prev('[data-uid].ces-user'),
					prevUserUid = parseInt(prevUser.data('uid'), 10),

					nextShout = shout.next('[data-uid].ces-shout'),
					nextShoutUid = parseInt(nextShout.data('uid'), 10),

					prevUserIsSelf = prevUser.length > 0 && prevUserUid === parseInt(uid, 10),
					nextShoutIsSelf = nextShout.length > 0 && nextShoutUid === parseInt(uid, 10);

				if (shout.length > 0) {
					shout.remove();
				}

				if (prevUserIsSelf && !nextShoutIsSelf) {
					prevUser.prev('.ces-avatar').remove();
					prevUser.remove();

					var lastShout = sbInstance.dom.shoutsContainer.find('[data-sid]:last');
					if (lastShout.length > 0) {
						sbInstance.vars.lastUid = parseInt(lastShout.data('uid'), 10);
						sbInstance.vars.lastSid = parseInt(lastShout.data('sid'), 10);
					} else {
						sbInstance.vars.lastUid = -1;
						sbInstance.vars.lastSid = -1;
					}
				}

				if (parseInt(data.sid, 10) === parseInt(sbInstance.vars.editing, 10)) {
					sbInstance.actions.edit.finish();
				}
			},
			onEdit: function(data) {
				$('[data-sid="' + data[0].sid + '"] .ces-shout-text')
					.html(data[0].content).addClass('ces-shout-edited');
			},
			onUserStatusChange: function(data) {
				sbInstance.updateUserStatus(data.uid, data.status);
			},
			onStartTyping: function(data) {
				$('[data-uid="' + data.uid + '"].ces-avatar').addClass('isTyping');
			},
			onStopTyping: function(data) {
				$('[data-uid="' + data.uid + '"].ces-avatar').removeClass('isTyping');
			}
		};

		for (var e in this.events) {
			if (this.events.hasOwnProperty(e)) {
				this.registerEvent(this.events[e], this.handlers[e]);
			}
		}

		for (var m in this.messages) {
			if (this.messages.hasOwnProperty(m)) {
				this.registerMessage(m, this.messages[m]);
			}
		}
	};

	Sockets.prototype.registerMessage = function(handle, message) {
		if (!this.hasOwnProperty(handle)) {
			this[handle] = new Handlers.defaultSocketHandler(message);
		}
	};

	Sockets.prototype.registerEvent = function(event, handler) {
		socket.on(event, handler);
	};

	Ces.sockets = {
		init: function(instance) {
			return new Sockets(instance);
		}
	};

})(window.Ces);