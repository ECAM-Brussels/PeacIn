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
		.get(discussions.list);
};
