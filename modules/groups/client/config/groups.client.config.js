'use strict';

// Configuring the Groups module
angular.module('groups').run(['Menus', function (Menus) {
	// Add the dropdown manage groups
	Menus.addSubMenuItem('topbar', 'admin', {
		title: 'Groupes',
		state: 'admin.groups',
		roles: ['admin']
	});
}]);