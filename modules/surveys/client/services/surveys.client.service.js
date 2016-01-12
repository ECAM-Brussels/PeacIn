'use strict';

// Surveys service used for communicating with the surveys REST endpoints
angular.module('surveys').factory('Surveys', ['$resource', function($resource) {
	return $resource('api/surveys/:surveyId', {
		surveyId: ''
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);