'use strict';

// Surveys controller
angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', function ($scope, $stateParams, $location, Authentication) {
	$scope.authentication = Authentication;

	$scope.submit = function() {
		// Check scores for every question
		$scope.error = {};
		var valid = true;
		for (var i = 0; i < 10; i++) {
			var sum = 0;
			for (var j = 0; j < 6; j++) {
				if (this.answers && this.answers[i] && this.answers[i][j]) {
					sum += this.answers[i][j];
				}
			}
			if (sum !== 20) {
				$scope.error[i] = 'Vous n\'avez pas attribué les 20 points pour cette question.';
				valid = false;
			}
		}
		// If data is valid, save to server
		if (valid) {
			// ...
		}
	};
}]);