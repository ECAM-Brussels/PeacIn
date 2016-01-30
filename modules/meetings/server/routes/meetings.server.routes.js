'use strict';

/**
 * Module dependencies
 */
var meetingsPolicy = require('../policies/meetings.server.policy'),
	meetings = require('../controllers/meetings.server.controller');

module.exports = function (app) {
	// Meetings collection routes
	app.route('/api/meetings')
		.all(meetingsPolicy.isAllowed)
		.get(meetings.list)
		.post(meetings.create);

	// Single meeting routes
	app.route('/api/meetings/:meetingId')
		.all(meetingsPolicy.isAllowed)
		.get(meetings.read);

	// Finish by binding the meeting middleware
	app.param('meetingId', meetings.meetingByID);
};
