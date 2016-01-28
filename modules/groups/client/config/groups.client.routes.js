'use strict';

// Setting up route
angular.module('groups').config(['$stateProvider', function ($stateProvider) {
	$stateProvider
	.state('groups', {
		abstract: true,
		url: '/groups',
		template: '<ui-view/>'
	})
	.state('groups.list', {
		url: '',
		templateUrl: 'modules/groups/client/views/list-groups.client.view.html',
		controller: 'GroupListController',
		data: {
			roles: ['supervisor']
		}
	})
	.state('groups.view', {
		url: '/:groupId',
		templateUrl: 'modules/groups/client/views/view-group.client.view.html',
		data: {
			roles: ['admin', 'teacher', 'supervisor']
		}
	});
}]);
