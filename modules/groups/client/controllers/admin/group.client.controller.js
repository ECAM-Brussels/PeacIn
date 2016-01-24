'use strict';

angular.module('groups').controller('GroupsController', ['$scope', '$state', '$stateParams', '$http', 'Authentication', 'Groups', function ($scope, $state, $stateParams, $http, Authentication, Groups) {
	$scope.authentication = Authentication;
	$scope.supervisorsList = [];

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
		group.$update(function() {
			$state.go('groups.view', {
				groupId: group._id
			});
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find existing group
	$scope.findOne = function() {
		$scope.group = Groups.get({
			groupId: $stateParams.groupId
		});
	};

	// Load list of supervisors
	$scope.initGroupForm = function() {
		$http.get('/api/users').success(function(data, status, headers, config) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].roles.indexOf('supervisor') !== -1) {
					$scope.supervisorsList.push(data[i]);
				}
			}
		});
	}
}]);
