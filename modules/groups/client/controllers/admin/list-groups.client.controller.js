'use strict';

angular.module('groups').controller('GroupListController', ['$scope', 'Groups', 'Authentication', function ($scope, Groups, Authentication) {
	$scope.authentication = Authentication;

	Groups.query(function (data) {
		$scope.groups = data;
	});
}]);
