'use strict';

// Configuring the Surveys module
angular.module('surveys').run(['Menus', function (Menus) {
	// Add the surveys dropdown item
	Menus.addMenuItem('topbar', {
		title: 'Enquêtes',
		state: 'surveys',
		type: 'dropdown',
		roles: ['user', 'student']
	});

	// Add the dropdown personality test
	Menus.addSubMenuItem('topbar', 'surveys', {
		title: 'Likeship test',
		state: 'surveys.personality'
	});
}]);