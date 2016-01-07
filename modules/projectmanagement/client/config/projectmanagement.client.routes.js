'use strict';

// Setting up route
angular.module('projectmanagement').config(['$stateProvider', function ($stateProvider) {
	// Surveys state routing
	$stateProvider
	.state('projectmanagement', {
		abstract: true,
		url: '/projectmanagement',
		template: '<ui-view/>'
	})
	.state('projectmanagement.teamwork', {
		url: '/teamwork',
		templateUrl: 'modules/projectmanagement/client/views/team-work.client.view.html'
	})
	.state('projectmanagement.writtencommunication', {
		url: '/writtencommunication',
		templateUrl: 'modules/projectmanagement/client/views/written-communication.client.view.html'
	})
	.state('projectmanagement.oralcommunication', {
		url: '/oralcommunication',
		templateUrl: 'modules/projectmanagement/client/views/oral-communication.client.view.html'
	});
}]);