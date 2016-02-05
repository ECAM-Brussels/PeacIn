'use strict';

// Configuring the discussions module
angular.module('discussions').run(['Menus', function (Menus) {
	// Add the dropdown discussions
	Menus.addSubMenuItem('topbar', 'dashboard', {
		title: 'Discussions',
		state: 'discussions.list',
		roles: ['admin', 'teacher', 'supervisor', 'student']
	});
}]);
