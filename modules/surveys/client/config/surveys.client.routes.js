'use strict';

// Setting up route
angular.module('surveys').config(['$stateProvider', function ($stateProvider) {
	// Surveys state routing
	$stateProvider
	.state('surveys', {
		abstract: true,
		url: '/surveys',
		template: '<ui-view/>'
	})
	.state('surveys.list', {
		url: '',
		templateUrl: 'modules/surveys/client/views/list-surveys.client.view.html'
	})
	.state('surveys.view', {
		url: '/:surveyId',
		templateUrl: 'modules/surveys/client/views/survey-personality.client.view.html'
	});
}]);