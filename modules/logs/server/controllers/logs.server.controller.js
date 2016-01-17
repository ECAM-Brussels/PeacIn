'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Log = mongoose.model('Log'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a log
 */
exports.create = function (req, res) {
	var log = new Log(req.body);
	log.user = req.user;
	// Save the log entry
	log.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(log);
	});
};
