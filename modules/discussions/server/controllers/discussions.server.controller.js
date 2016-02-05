'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Discussion = mongoose.model('Discussion'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a discussion
 */
exports.create = function (req, res) {
	var discussion = new Discussion(req.body);
	discussion.public = req.body.visibility === 'public';
	discussion.recipient = ['teacher'];
	if (req.body.recipient === 'supervisor') {
		discussion.recipient.push('supervisor');
	}
	discussion.user = req.user;
	discussion.save(function (err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(discussion);
	});
};

/**
 * Show the current discussion
 */
exports.read = function (req, res) {
	res.json(req.discussion);
};

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

/**
 * Discussion middleware
 */
exports.discussionByID = function (req, res, next, id) {
	if (! mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Discussion is invalid.'
		});
	}

	Discussion.findById(id, 'title message user created answers').populate('user', 'displayName').exec(function (err, discussion) {
		if (err) {
			return next(err);
		}
		if (! discussion) {
			return res.status(404).send({
				message: 'No discussion with that identifier has been found.'
			});
		}
	    req.discussion = discussion;
		next();
	});
};
