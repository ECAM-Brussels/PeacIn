'use strict';

// Configuring the ProjectManagement module
angular.module('projectmanagement').run(['Menus', function (Menus) {
	// Add the projectmanagement dropdown item
	Menus.addMenuItem('topbar', {
		title: 'Gestion de projet',
		state: 'projectmanagement',
		type: 'dropdown',
		roles: ['student']
	});

	// Add the dropdown team work
	Menus.addSubMenuItem('topbar', 'projectmanagement', {
		title: 'Travail d\'équipe',
		state: 'projectmanagement.teamwork'
	});

	// Add the dropdown written communication
	Menus.addSubMenuItem('topbar', 'projectmanagement', {
		title: 'Communication écrite',
		state: 'projectmanagement.writtencommunication'
	});

	// Add the dropdown oral communication
	Menus.addSubMenuItem('topbar', 'projectmanagement', {
		title: 'Communication orale',
		state: 'projectmanagement.oralcommunication'
	});
}]);