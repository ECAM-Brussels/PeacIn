'use strict';

angular.module('groups').controller('GroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groups', function ($scope, $stateParams, $location, Authentication, Groups) {
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
			$location.path('groups/' + response._id);

			// Clear form fields
			$scope.name = '';
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
}]);
