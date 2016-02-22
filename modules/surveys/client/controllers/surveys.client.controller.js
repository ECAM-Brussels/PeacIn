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

	var isValidSociogram = function (answers) {
		$scope.error = {};
		var result = true;
		for (var i = 0; i < $scope.groups.length; i++) {
			var group = $scope.groups[i];
			$scope.error[group._id] = '';
			var prefs = [];
			for (var j = 0; j < group.members.length; j++) {
				var member = group.members[j];
				if (member._id !== $scope.authentication.user._id) {
					if (! (group._id in answers) || ! (member._id in answers[group._id])) {
						$scope.error[group._id] = 'Il manque des relations de préférence.';
						result = false;
						break;
					}
					if (answers[group._id] && answers[group._id][member._id]) {
						if (! answers[group._id][member._id][0]) {
							$scope.error[group._id] = 'Il manque des relations de préférence.';
							result = false;
							break;
						}
						if (answers[group._id][member._id][0] && answers[group._id][member._id][0] === '+') {
							if (! answers[group._id][member._id][1]) {
								$scope.error[group._id] = 'Il manque un ordre de préférence.';
								result = false;
								break;
							}
							prefs.push(answers[group._id][member._id][1]);
						}
					}
				}
			}
			var sorted = prefs.sort();
			for (var k = 0; k < sorted.length; k++) {
				if (sorted[k] !== k + 1) {
					$scope.error[group._id] = 'L\'ordre de préférence renseigné n\'est pas valide.';
					result = false;
					break;
				}
			}
		}
		return result;
	};
	$scope.submitSociogram = function() {
		if (isValidSociogram(this.answers)) {
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
		$scope.groups = null;
		$scope.survey = Surveys.get({
			surveyId: $stateParams.surveyId
		}, function() {
			$scope.answer = $scope.survey.answers.find(function (element, index, array) {
				return element.user === $scope.authentication.user._id;
			});
			$http.get('/api/users/groups').then(function (response) {
				$scope.groups = response.data;
			}, function (response) {
				// ...
			});
		});
	};
}]);
