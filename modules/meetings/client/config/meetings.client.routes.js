'use strict';

// Setting up route
angular.module('meetings').config(['$stateProvider', function ($stateProvider) {
	$stateProvider
	.state('meetings', {
		abstract: true,
		url: '/meetings',
		template: '<ui-view/>'
	})
	.state('meetings.list', {
		url: '',
		templateUrl: 'modules/meetings/client/views/list-meetings.client.view.html',
		data: {
			roles: ['admin', 'teacher', 'supervisor', 'student']
		}
	})
	.state('meetings.create', {
		url: '/create',
		templateUrl: 'modules/meetings/client/views/create-meeting.client.view.html',
		data: {
			roles: ['supervisor']
		}
	})
	.state('meetings.edit', {
		url: '/:meetingId/edit',
		templateUrl: 'modules/meetings/client/views/edit-meeting.client.view.html',
		data: {
			roles: ['supervisor']
		}
	})
	.state('meetings.report', {
		url: '/:meetingId/report',
		templateUrl: 'modules/meetings/client/views/write-report.client.view.html',
		data: {
			roles: ['supervisor']
		}
	})
	.state('meetings.view', {
		url: '/:meetingId',
		templateUrl: 'modules/meetings/client/views/view-meeting.client.view.html',
		data: {
			roles: ['admin', 'teacher', 'supervisor']
		}
	});
}]);
