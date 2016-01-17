'use strict';

// Setting up route
angular.module('projectmanagement').config(['$stateProvider', function ($stateProvider) {
	// Surveys state routing
	$stateProvider
	.state('projectmanagement', {
		abstract: true,
		url: '/projectmanagement',
		template: '<ui-view/>',
		data: {
			roles: ['teacher', 'student']
		}
	})
	.state('projectmanagement.list', {
		url: '',
		templateUrl: 'modules/projectmanagement/client/views/list-projectmanagement.client.view.html'
	})
	.state('projectmanagement.teamwork', {
		url: '/teamwork',
		templateUrl: 'modules/projectmanagement/client/views/team-work.client.view.html'
	})
	.state('projectmanagement.innovation', {
		url: '/innovation',
		templateUrl: 'modules/projectmanagement/client/views/innovation.client.view.html'
	})
	.state('projectmanagement.writtencommunication', {
		url: '/writtencommunication',
		templateUrl: 'modules/projectmanagement/client/views/written-communication.client.view.html'
	})
	.state('projectmanagement.oralcommunication', {
		url: '/oralcommunication',
		templateUrl: 'modules/projectmanagement/client/views/oral-communication.client.view.html'
	})
	.state('projectmanagement.planning', {
		url: '/planning',
		templateUrl: 'modules/projectmanagement/client/views/planning.client.view.html'
	})
	.state('projectmanagement.tools', {
		url: '/tools',
		templateUrl: 'modules/projectmanagement/client/views/tools.client.view.html'
	})
	.state('projectmanagement.tools.mindmap', {
		url: '/mindmap',
		templateUrl: 'modules/projectmanagement/client/views/tools-mindmap.client.view.html'
	})
	.state('projectmanagement.tools.doodle', {
		url: '/doodle',
		templateUrl: 'modules/projectmanagement/client/views/tools-doodle.client.view.html'
	})
	.state('projectmanagement.tools.dropbox', {
		url: '/dropbox',
		templateUrl: 'modules/projectmanagement/client/views/tools-dropbox.client.view.html'
	})
	.state('projectmanagement.tools.drive', {
		url: '/drive',
		templateUrl: 'modules/projectmanagement/client/views/tools-drive.client.view.html'
	})
	.state('projectmanagement.tools.trello', {
		url: '/trello',
		templateUrl: 'modules/projectmanagement/client/views/tools-trello.client.view.html'
	});
}]);