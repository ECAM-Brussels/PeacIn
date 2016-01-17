'use strict';

// ProjectManagement controller
angular.module('projectmanagement').controller('ProjectManagementController', ['$scope', '$http', 'Authentication', 'Logs', function ($scope, $http, Authentication, Logs) {
	$scope.authentication = Authentication;

	$scope.addlog = function(type, message) {
		// Create a new Logs object
		var log = new Logs({
			type: type,
			message: message
		});
		log.$save();
	};
}]);
