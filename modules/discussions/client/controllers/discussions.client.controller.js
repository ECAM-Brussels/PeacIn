'use strict';

// Discussions controller
angular.module('discussions').controller('DiscussionsController', ['$scope', '$state', '$stateParams', '$http', 'Authentication', 'Discussions', function ($scope, $state, $stateParams, $http, Authentication, Discussions) {
	$scope.authentication = Authentication;

	// Create a new discussion
	$scope.create = function (isValid) {
		$scope.error = null;

		if (! isValid) {
			$scope.$broadcast('show-errors-check-validity', 'discussionForm');
			return false;
		}

		// Create a new Discussions object
		var discussion = new Discussions({
			title: this.title,
			visibility: this.visibility,
			recipient: this.recipient,
			message: this.message
		});

		// Redirect after save
		discussion.$save(function (response) {
			$state.go('discussions.view', {
				discussionId: discussion._id
			});

			// Clear form fields
			$scope.title = '';
			$scope.visibility = '';
			$scope.recipient = '';
			$scope.message = '';
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Post an answer to a discussion
	$scope.answer = function (isValid) {
		$scope.error = null;

		if (! isValid) {
			$scope.$broadcast('show-errors-check-validity', 'answerForm');
			return false;
		}

		$http.post('/api/discussions/' + $stateParams.discussionId + '/answer', {'answer': this.message}).then(function (response) {
			$scope.discussion.answers.push(response.data);
			// Clear form field
			$scope.message = '';
			$('#message').val('');
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find all discussions
	$scope.find = function() {
		$scope.discussions = Discussions.query();
	};

	// Find one discussion
	$scope.findOne = function() {
		$scope.discussion = Discussions.get({
			discussionId: $stateParams.discussionId
		});
	};

	// Build an array of consecutive integers from 0 to n - 1
	$scope.getNumber = function (n) {
		var tab = [];
		for (var i = 0; i < n; i++) {
			tab.push(i);
		}
		return tab;
	};

	// Format recipient in a user-friendly way
	$scope.formatRecipient = function (recipient) {
		switch (recipient) {
			case 'teacher': return 'Équipe PI'
			case 'supervisor': return 'Superviseur'
			case 'group': return 'Groupe'
		}
	};
}]);
