'use strict';

/**
 * Module dependencies
 */
var surveysPolicy = require('../policies/surveys.server.policy'),
	surveys = require('../controllers/surveys.server.controller');

module.exports = function (app) {
	// Single survey routes
	app.route('/api/surveys/:surveyId')
		.all(surveysPolicy.isAllowed)
		.get(surveys.read)
		.post(surveys.submit);

	// Finish by binding the survey middleware
	app.param('surveyId', surveys.surveyByID);
};