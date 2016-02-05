'use strict';

/**
 * Module dependencies
 */
var groupsPolicy = require('../policies/groups.server.policy'),
	groups = require('../controllers/groups.server.controller');

module.exports = function (app) {
	// Groups collection routes
	app.route('/api/groups')
		.all(groupsPolicy.isAllowed)
		.get(groups.list)
		.post(groups.create);

	// Single article routes
	app.route('/api/groups/:groupId')
		.all(groupsPolicy.isAllowed)
		.get(groups.read)
		.put(groups.update);

	// Finish by binding the group middleware
	app.param('groupId', groups.groupByID);
};
