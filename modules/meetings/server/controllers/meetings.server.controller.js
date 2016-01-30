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
	meeting.report = null;
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
 * Update a meeting
 */
exports.update = function (req, res) {
	var meeting = req.meeting;
	if (meeting.report !== null) {
		return res.status(400).send({
			message: 'Un rapport a déjà été rédigé.'
		});
	}
	meeting.report = req.body.report;
	meeting.report.date = Date.now();
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
 * Show the current meeting
 */
exports.read = function (req, res) {
	res.json(req.meeting);
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

/**
 * Meering middleware
 */
exports.meetingByID = function (req, res, next, id) {
	if (! mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Meeting is invalid.'
		});
	}

	Meeting.findById(id, 'name date group report').deepPopulate('group group.members report.userfeedbacks.user').exec(function (err, meeting) {
		if (err) {
			return next(err);
		}
		if (! meeting) {
			return res.status(404).send({
				message: 'No meeting with that identifier has been found.'
			});
		}
	    req.meeting = meeting;
		next();
	});
};
