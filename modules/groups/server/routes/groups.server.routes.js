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
};
