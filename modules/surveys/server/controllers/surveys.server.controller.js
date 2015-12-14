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
exports.submit = function(req, res) {
	var survey = new Survey(req.body);
	survey.user = req.user;
	survey.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: 'Impossible de sauvegarder vos réponses à cette enquête.'
			});
		}
		res.jsonp(survey);
	});
};

/**
 * Show the current survey
 */
exports.read = function(req, res) {
	res.json(req.survey);
};

/*
 * Find answer to a survey
 */
exports.findAnswer = function(req, res) {
	var surveyId = req.query.surveyId;
	Survey.find({'id': surveyId, 'user': req.user}).exec(function(err, answers) {
		if (err) {
			return 'Impossible to find a survey';
		}
		res.jsonp(answers);
	});
};

/**
 * Survey middleware
 */
exports.surveyByID = function(req, res, next, id) {
	if (! mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Survey is invalid'
		});
	}

	Survey.findById(id).exec(function(err, survey) {
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