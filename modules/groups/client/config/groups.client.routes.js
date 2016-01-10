'use strict';

// Setting up route
angular.module('groups').config(['$stateProvider', function ($stateProvider) {
	$stateProvider
	.state('groups', {
		abstract: true,
		url: '/groups',
		template: '<ui-view/>'
	})
	.state('groups.view', {
		url: '/:groupId',
		templateUrl: 'modules/groups/client/views/view-group.client.view.html',
		data: {
			roles: ['admin']
		}
	});
}]);
