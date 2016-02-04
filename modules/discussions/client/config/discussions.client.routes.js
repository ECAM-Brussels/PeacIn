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
			roles: ['teacher', 'supervisor', 'student']
		}
	});
}]);
