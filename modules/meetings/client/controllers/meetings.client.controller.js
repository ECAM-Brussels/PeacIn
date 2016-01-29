'use strict';

// Meetings controller
angular.module('surveys').controller('MeetingsController', ['$scope', '$stateParams', '$http', 'Authentication', 'Meetings', function ($scope, $stateParams, $http, Authentication, Meetings) {
	$scope.authentication = Authentication;

	$scope.find = function() {
		$scope.meetings = Meetings.query();
	};
}]);
