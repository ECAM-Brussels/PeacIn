'use strict';

/**
 * Module dependencies
 */
var meetings = require('../controllers/meetings.server.controller');

module.exports = function (app) {
	// Meetings collection routes
	app.route('/api/meetings')
		.get(meetings.list)
		.post(meetings.create);
};
