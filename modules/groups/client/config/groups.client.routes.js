'use strict';

// Setting up route
angular.module('groups').config(['$stateProvider', function ($stateProvider) {
	// Surveys state routing
	$stateProvider
	.state('admin.groups', {
		url: '/groups',
		templateUrl: 'modules/groups/client/views/admin/list-groups.client.view.html'
	});
}]);