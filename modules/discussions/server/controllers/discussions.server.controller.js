'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Discussion = mongoose.model('Discussion'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of discussions
 */
exports.list = function (req, res) {
	// Find list of discussions
	Discussion.find({}).sort({created: 1}).exec(function (err, discussions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(discussions);
	});
};
