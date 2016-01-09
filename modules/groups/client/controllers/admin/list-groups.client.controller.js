'use strict';

angular.module('groups').controller('GroupListController', ['$scope', 'Groups', function ($scope, Groups) {
	Groups.query(function (data) {
		$scope.groups = data;
	});
}]);
