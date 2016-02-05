'use strict';

/**
 * Module dependencies
 */
var discussionsPolicy = require('../policies/discussions.server.policy'),
	discussions = require('../controllers/discussions.server.controller');

module.exports = function (app) {
	// Discussions collection routes
	app.route('/api/discussions')
		.all(discussionsPolicy.isAllowed)
		.get(discussions.list)
		.post(discussions.create);

	// Single discussion routes
	app.route('/api/discussions/:discussionId')
		.all(discussionsPolicy.isAllowed)
		.get(discussions.read);

	app.route('/api/discussions/:discussionId/answer')
		.all(discussionsPolicy.isAllowed)
		.post(discussions.answer);

	// Finish by binding the discussion middleware
	app.param('discussionId', discussions.discussionByID);
};
