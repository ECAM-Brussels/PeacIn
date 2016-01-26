'use strict';

angular.module('groups').controller('GroupsController', ['$scope', '$state', '$stateParams', '$http', 'Authentication', 'Groups', function ($scope, $state, $stateParams, $http, Authentication, Groups) {
	$scope.authentication = Authentication;
	
	// Create a new group
	$scope.create = function (isValid) {
		$scope.error = null;

		if (! isValid) {
			$scope.$broadcast('show-errors-check-validity', 'groupForm');
			return false;
		}

		// Create a new Groups object
		var group = new Groups({
			name: this.name
		});

		// Redirect after save
		group.$save(function (response) {
			$state.go('groups.view', {
				groupId: response._id
			});

			// Clear form fields
			$scope.name = '';
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Update a group
	$scope.update = function (isValid) {
		if (! isValid) {
			$scope.$broadcast('show-errors-check-validity', 'groupForm');
			return false;
		}

		var group = $scope.group;
		group.members = [];
		for (var i = 0; i < $scope.students.length; i++) {
			if ($scope.students[i]) {
				group.members.push($scope.studentsList[i]);
			}
		}
		group.$update(function() {
			$state.go('groups.view', {
				groupId: group._id
			});
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find existing group
	var isMember = function (user) {
		return $scope.group.members.length > 0 && undefined !== $scope.group.members.find(function (element, index, array) {
			return user._id === element._id;
		});
	};
	$scope.findOne = function (loadUsers) {
		$scope.group = Groups.get({
			groupId: $stateParams.groupId
		}, function() {
			// Load list of supervisors and students
			if (loadUsers) {
				$scope.supervisorsList = [];
				$scope.studentsList = [];
				$scope.students = [];
				$http.get('/api/users').success(function(data, status, headers, config) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].roles.indexOf('supervisor') !== -1) {
							$scope.supervisorsList.push(data[i]);
						}
						if (data[i].roles.indexOf('student') !== -1) {
							$scope.studentsList.push(data[i]);
							$scope.students.push(isMember(data[i]));
						}
					}
				});
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
