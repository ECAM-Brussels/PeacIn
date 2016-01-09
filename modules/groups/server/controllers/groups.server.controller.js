'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Group = mongoose.model('Group'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a group
 */
exports.create = function (req, res) {
	var group = new Group(req.body);
	group.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(group);
	});
};

/**
 * List of groups
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
