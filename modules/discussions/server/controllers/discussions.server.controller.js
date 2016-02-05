'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Discussion = mongoose.model('Discussion'),
	Group = mongoose.model('Group'),
	async = require('async'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a discussion
 */
exports.create = function (req, res) {
	var discussion = new Discussion(req.body);
	discussion.public = req.body.visibility === 'public';
	// Set up the recipients
	discussion.recipient = [];
	if (req.body.recipient === 'supervisor') {
		discussion.recipient.push('supervisor');
	} else if (req.body.recipient === 'teachers') {
		discussion.recipient.push('teacher');
	}
	// Save the discussion
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
 * Answer a discussion
 */
exports.answer = function (req, res) {
	var answer = {
		user: req.user,
		date: Date.now(),
		message: req.body.answer
	};
	// Add answer to discussion
	var discussion = req.discussion;
	discussion.answers.push(answer);
	discussion.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(answer);
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
	async.waterfall([
		// Load groups if supervisor
		function (done) {
			if (req.user.roles.indexOf('admin') === -1 && req.user.roles.indexOf('teacher') === -1 && req.user.roles.indexOf('supervisor') !== -1) {
				Group.find({supervisor: req.user}).exec(function (err, groups) {
					done(err, groups);
				});
			} else {
				done(null, null);
			}
		},
		// Find list of discussions
		function (groups, done) {
			Discussion.find({}).populate('user', 'displayName').sort({created: 1}).exec(function (err, discussions) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
				var filteredDiscussions = [];
				for (var i = 0; i < discussions.length; i++) {
					// If not admin, teacher or supervisor, only select discussions by logged user
					if (req.user.roles.indexOf('admin') === -1 && req.user.roles.indexOf('teacher') === -1 && req.user.roles.indexOf('supervisor') === -1) {
						if (discussions[i].user.id === req.user.id) {
							filteredDiscussions.push(discussions[i]);
						}
					}
					// If supervisor, only select discussions targeted to the supervisor
					else if (req.user.roles.indexOf('admin') === -1 && req.user.roles.indexOf('teacher') === -1) {
						if (discussions[i].recipient.indexOf('supervisor') !== -1) {
							var found = false;
							for (var j = 0; ! found && j < groups.length; j++) {
								if (groups[j].members.indexOf(discussions[i].user._id) !== -1) {
									filteredDiscussions.push(discussions[i]);
									found = true;
								}
							}
						}
					}
					// If teacher, only select discussions targeted to the teacher
					else if (req.user.roles.indexOf('admin') === -1) {
						if (discussions[i].recipient.indexOf('teacher') !== -1) {
							filteredDiscussions.push(discussions[i]);
						}
					}
					// If admin, select all the discussions
					else if (req.user.roles.indexOf('admin') !== -1) {
						filteredDiscussions.push(discussions[i]);
					}
				}
				res.json(filteredDiscussions);
				done(err);
			});
		}
	], function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
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

	Discussion.findById(id, 'title message user created recipient answers').deepPopulate('user answers.user').exec(function (err, discussion) {
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
