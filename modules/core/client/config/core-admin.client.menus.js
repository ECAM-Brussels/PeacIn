'use strict';

angular.module('core.admin').run(['Menus', function (Menus) {
	Menus.addMenuItem('topbar', {
		title: 'Gestion',
		state: 'admin',
		type: 'dropdown',
		roles: ['admin', 'teacher']
	});

	Menus.addMenuItem('topbar', {
		title: 'Tableau de bord',
		state: 'dashboard',
		type: 'dropdown',
		roles: ['user']
	});
}]);
