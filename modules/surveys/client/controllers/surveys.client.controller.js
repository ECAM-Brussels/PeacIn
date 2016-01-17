'use strict';

// Surveys controller
angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$http', 'Authentication', 'Surveys', function ($scope, $stateParams, $http, Authentication, Surveys) {
	$scope.authentication = Authentication;

	var isValid = function (answers) {
		$scope.error = {};
		var valid = true;
		for (var i = 0; i < 10; i++) {
			var sum = 0;
			for (var j = 0; j < 6; j++) {
				if (answers && answers[i] && answers[i][j]) {
					sum += answers[i][j];
				}
			}
			if (sum !== 20) {
				$scope.error[i] = 'Vous n\'avez pas attribué un total de 20 points pour cette question.';
				valid = false;
			}
		}
	};
	$scope.submit = function() {
		// Check scores for every question
		// If data is valid, save to server
		if (isValid(this.answers)) {
			$http.post('/api/surveys/' + $stateParams.surveyId, {'answer': JSON.stringify(this.answers)}).then(function (response) {
				$scope.success = 'Vos réponses ont bien été enregistrées.';
			}, function (response) {
				$scope.generror = response.data.message;
			});
		}
	};

	$scope.find = function() {
		$scope.surveys = Surveys.query();
	};

	$scope.findOne = function() {
		$scope.answer = null;
		$scope.survey = Surveys.get({
			surveyId: $stateParams.surveyId
		}, function() {
			$scope.answer = $scope.survey.answers.find(function (element, index, array) {
				return element.user === $scope.authentication.user._id;
			});
		});
	};
}]);
