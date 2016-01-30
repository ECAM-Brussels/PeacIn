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

	// Single meeting routes
	app.route('/api/meetings/:meetingId')
		.get(meetings.read);

	// Finish by binding the meeting middleware
	app.param('meetingId', meetings.meetingByID);
};
