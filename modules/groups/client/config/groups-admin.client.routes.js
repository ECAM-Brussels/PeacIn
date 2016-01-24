'use strict';

// Setting up route
angular.module('groups').config(['$stateProvider', function ($stateProvider) {
	$stateProvider
	.state('admin.groups', {
		abstract: true,
		url: '/groups',
		template: '<ui-view/>'
	})
	.state('admin.groups.list', {
		url: '',
		templateUrl: 'modules/groups/client/views/admin/list-groups.client.view.html',
		controller: 'GroupListController',
		data: {
			roles: ['admin', 'teacher']
		}
	})
	.state('admin.groups.create', {
		url: '/create',
		templateUrl: 'modules/groups/client/views/admin/create-group.client.view.html',
		data: {
			roles: ['admin']
		}
	})
	.state('admin.groups.edit', {
		url: '/:groupId/edit',
		templateUrl: 'modules/groups/client/views/admin/edit-group.client.view.html',
		data: {
			roles: ['admin']
		}
	});
}]);
