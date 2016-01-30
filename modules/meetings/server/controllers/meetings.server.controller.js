'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Meeting = mongoose.model('Meeting'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a meeting
 */
exports.create = function (req, res) {
	var meeting = new Meeting(req.body);
	meeting.supervisor = req.user;
	meeting.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(meeting);
	});
};

/**
 * List of meetings
 */
exports.list = function (req, res) {
	var options = {};
	// If not admin or teacher, only select meetings by logged user
	if (req.user.roles.indexOf('admin') === -1 && req.user.roles.indexOf('teacher') === -1) {
		options = {supervisor: req.user};
	}
	// Find list of meetings
	Meeting.find(options).populate('group', 'name').sort({date: 1}).exec(function (err, meetings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(meetings);
	});
};
