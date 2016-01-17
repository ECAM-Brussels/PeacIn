'use strict';

/**
 * Module dependencies
 */
var logsPolicy = require('../policies/logs.server.policy'),
	logs = require('../controllers/logs.server.controller');

module.exports = function (app) {
	// Logs collection routes
	app.route('/api/logs')
		.all(logsPolicy.isAllowed)
		.post(logs.create);
};
