'use strict';

// Discussions controller
angular.module('discussions').controller('DiscussionsController', ['$scope', '$state', '$stateParams', '$http', 'Authentication', 'Discussions', function ($scope, $state, $stateParams, $http, Authentication, Discussions) {
	$scope.authentication = Authentication;

	// Find all discussions
	$scope.find = function() {
		$scope.discussions = Discussions.query();
	};
}]);
