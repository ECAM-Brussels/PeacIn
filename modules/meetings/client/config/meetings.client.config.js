'use strict';

// Configuring the meetings module
angular.module('meetings').run(['Menus', function (Menus) {
	// Add the dropdown meetings
	Menus.addSubMenuItem('topbar', 'dashboard', {
		title: 'Réunions',
		state: 'meetings.list',
		roles: ['supervisor', 'student']
	});
}]);
