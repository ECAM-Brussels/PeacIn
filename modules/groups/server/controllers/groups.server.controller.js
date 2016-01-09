'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Group = mongoose.model('Group'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of Groups
 */
exports.list = function (req, res) {
	Group.find({}).exec(function (err, groups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(groups);
	});
};
