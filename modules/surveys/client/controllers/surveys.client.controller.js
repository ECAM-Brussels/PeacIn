'use strict';

// Surveys controller
angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', function ($scope, $stateParams, $location, Authentication) {
	$scope.authentication = Authentication;

	$scope.submit = function() {
		console.log('OK');
	};
}]);