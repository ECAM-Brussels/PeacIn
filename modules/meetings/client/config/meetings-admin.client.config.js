'use strict';

// Configuring the meetings module
angular.module('meetings').run(['Menus', function (Menus) {
	// Add the dropdown meetings
	Menus.addSubMenuItem('topbar', 'admin', {
		title: 'Réunions',
		state: 'meetings.list',
		roles: ['admin', 'teacher']
	});
}]);
