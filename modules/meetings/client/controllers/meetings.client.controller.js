'use strict';

// Meetings controller
angular.module('meetings').controller('MeetingsController', ['$scope', '$state', '$stateParams', '$http', 'Authentication', 'Meetings', 'Groups', function ($scope, $state, $stateParams, $http, Authentication, Meetings, Groups) {
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
			location: this.location,
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
			$scope.location = '';
			$scope.date = '';
			$scope.group = null;
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Save the report of a meeting
	$scope.update = function (isValid) {
		if (! isValid) {
			$scope.$broadcast('show-errors-check-validity', 'reportForm');
			return false;
		}

		var meeting = $scope.meeting;
		if ($scope.report) {
			meeting.report = $scope.report;
		}
		meeting.$update(function() {
			$state.go('meetings.view', {
				meetingId: meeting._id
			});
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find all meetings
	$scope.find = function() {
		$scope.nextmeeting = null;
		$scope.meetings = Meetings.query(function() {
			for (var i = 0; i < $scope.meetings.length; i++) {
				if (moment().isBefore(moment($scope.meetings[i].date))) {
					$scope.nextmeeting = $scope.meetings[i].date;
					return;
				}
			}
		});
	};

	// Find all groups
	$scope.findGroups = function() {
		Groups.query(function (data) {
			$scope.groups = data;
		});
	};

	// Find one meeting
	$scope.findOne = function (initReport) {
		$scope.meeting = Meetings.get({
			meetingId: $stateParams.meetingId
		}, function() {
			// Initialise report data
			if (initReport) {
				$scope.report = {
					text: '',
					userfeedbacks: []
				};
				var members = $scope.meeting.group.members;
				for (var i = 0; i < members.length; i++) {
					$scope.report.userfeedbacks.push({
						user: members[i]._id,
						attended: false,
						note: {q1: false, q2: false, q3: '--'},
						remark: ''
					});
				}
			}
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
}]);
