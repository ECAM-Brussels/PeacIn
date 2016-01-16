'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Survey = mongoose.model('Survey'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Submit a survey
 */
exports.submit = function (req, res) {
	// Find the survey
	Survey.findOne({id: req.params.surveyId}, 'answers end').exec(function (err, survey) {
		if (err || ! survey) {
			return res.status(404).send({
				message: 'No survey with that identifier has been found.'
			});
		}
		// TODO: check if end deadline is not passed
		// Find if the user has already filled the survey
//		var found = survey.answers.find(function (element, index, array) {
//			return false;
//		});
//		console.log(found);
		survey.answers.push({
			user: req.user,
			answer: req.body.answer
		});
		survey.save(function (err) {
			if (err) {
				return res.status(400).send({
					message: 'Impossible de sauvegarder vos réponses à cette enquête.'
				});
			}
			res.jsonp(survey);
		});
	});
};

/**
 * Show the current survey
 */
exports.read = function (req, res) {
	res.json(req.survey);
};

/**
 * List of surveys
 */
exports.list = function (req, res) {
	Survey.find({}, 'name id').exec(function (err, surveys) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(surveys);
	});
};

/**
 * Survey middleware
 */
exports.surveyByID = function (req, res, next, id) {
	Survey.findOne({id: id}, 'answers end').exec(function (err, survey) {
		if (err) {
			return next(err);
		}
		if (! survey) {
			return res.status(404).send({
				message: 'No survey with that identifier has been found.'
			});
		}
		req.survey = survey;
		next();
	});
};
