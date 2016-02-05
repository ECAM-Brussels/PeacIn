'use strict';

// Configuring the groups module
angular.module('groups').run(['Menus', function (Menus) {
	// Add the dropdown manage groups
	Menus.addSubMenuItem('topbar', 'dashboard', {
		title: 'Groupes',
		state: 'groups.list',
		roles: ['supervisor']
	});
}]);
