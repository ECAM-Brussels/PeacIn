'use strict';

// Setting up route
angular.module('discussions').config(['$stateProvider', function ($stateProvider) {
	$stateProvider
	.state('discussions', {
		abstract: true,
		url: '/discussions',
		template: '<ui-view/>'
	})
	.state('discussions.list', {
		url: '',
		templateUrl: 'modules/discussions/client/views/list-discussions.client.view.html',
		data: {
			roles: ['admin', 'teacher', 'supervisor', 'student']
		}
	})
	.state('discussions.create', {
		url: '/create',
		templateUrl: 'modules/discussions/client/views/create-discussion.client.view.html',
		data: {
			roles: ['student']
		}
	})
	.state('discussions.view', {
		url: '/:discussionId',
		templateUrl: 'modules/discussions/client/views/view-discussion.client.view.html',
		data: {
			roles: ['admin', 'teacher', 'supervisor', 'student']
		}
	});
}]);
