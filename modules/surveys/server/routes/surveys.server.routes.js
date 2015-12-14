'use strict';

/**
 * Module dependencies.
 */
var surveysPolicy = require('../policies/surveys.server.policy'),
	surveys = require('../controllers/surveys.server.controller');

module.exports = function (app) {
	// Surveys collection routes
	app.route('/api/surveys')
		.all(surveysPolicy.isAllowed)
		.post(surveys.submit);

	// Single survey routes
	app.route('/api/surveys')
		.all(surveysPolicy.isAllowed)
		.get(surveys.findAnswer);
	app.route('/api/surveys/:answerId')
		.all(surveysPolicy.isAllowed)
		.get(surveys.read);

	// Finish by binding the survey middleware
	app.param('answerId', surveys.surveyByID);
};