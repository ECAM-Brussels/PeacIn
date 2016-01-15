'use strict';

// Configuring the Surveys module
angular.module('surveys').run(['Menus', function (Menus) {
	// Add the dropdown surveys
	Menus.addSubMenuItem('topbar', 'dashboard', {
		title: 'Enquêtes',
		state: 'surveys.list'
	});
}]);