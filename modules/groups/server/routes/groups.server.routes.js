'use strict';

/**
 * Module dependencies
 */
var groups = require('../controllers/groups.server.controller');

module.exports = function (app) {
	// Groups collection routes
	app.route('/api/groups')
		.get(groups.list)
		.post(groups.create);

	// Single article routes
	app.route('/api/groups/:groupId')
		.get(groups.read)
		.put(groups.update);

	// Finish by binding the group middleware
	app.param('groupId', groups.groupByID);
};
