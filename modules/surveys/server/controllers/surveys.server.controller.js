'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Survey = mongoose.model('Survey'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Submit a survey
 */
exports.submit = function (req, res) {
	res.send('OK');
};

/**
 * Show the current survey
 */
exports.read = function (req, res) {
	res.json(req.survey);
};

/**
 * Survey middleware
 */
exports.surveyByID = function (req, res, next, id) {
	if (! mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Survey is invalid'
		});
	}

	Survey.findById(id).exec(function (err, survey) {
		if (err) {
			return next(err);
		}
		if (! survey) {
			return res.status(404).send({
				message: 'No survey with that identifier has been found'
			});
		}
		req.survey = survey;
		next();
	});
};