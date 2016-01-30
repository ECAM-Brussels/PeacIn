'use strict';

// Meetings controller
angular.module('surveys').controller('MeetingsController', ['$scope', '$state', '$stateParams', '$http', 'Authentication', 'Meetings', 'Groups', function ($scope, $state, $stateParams, $http, Authentication, Meetings, Groups) {
	$scope.authentication = Authentication;

	// Create a new meeting
	$scope.create = function (isValid) {
		$scope.error = null;

		if (! isValid) {
			$scope.$broadcast('show-errors-check-validity', 'meetingForm');
			return false;
		}

		// Create a new Meetings object
		var meeting = new Meetings({
			name: this.name,
			date: this.date,
			group: this.group
		});

		// Redirect after save
		meeting.$save(function (response) {
			$state.go('meetings.view', {
				meetingId: response._id
			});

			// Clear form fields
			$scope.name = '';
			$scope.date = '';
			$scope.group = null;
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find all meetings
	$scope.find = function() {
		$scope.meetings = Meetings.query();
	};

	// Find all groups
	$scope.findGroups = function() {
		Groups.query(function (data) {
			$scope.groups = data;
		});
	};
}]);
