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
 * Update a group
 */
exports.update = function (req, res) {
	var group = req.group;
	group.name = req.body.name;
	group.supervisor = req.body.supervisor !== '' ? req.body.supervisor : null;
	group.members = req.body.members;
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
 * Show the current group
 */
exports.read = function (req, res) {
	res.json(req.group);
};

/**
 * List of groups
 */
exports.list = function (req, res) {
	var options = {};
	// If not admin or teacher, only select groups supervised by logged user
	if (req.user.roles.indexOf('admin') === -1 && req.user.roles.indexOf('teacher') === -1) {
		options = {supervisor: req.user};
	}
	// Find list of groups
	Group.find(options).exec(function (err, groups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(groups);
	});
};

/**
 * Group middleware
 */
exports.groupByID = function (req, res, next, id) {
	if (! mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Group is invalid.'
		});
	}

	Group.findById(id, 'name supervisor members').populate('supervisor', 'displayName').populate('members', 'firstName lastName').exec(function (err, group) {
		if (err) {
			return next(err);
		}
		if (! group) {
			return res.status(404).send({
				message: 'No group with that identifier has been found.'
			});
		}
	    req.group = group;
		next();
	});
};
