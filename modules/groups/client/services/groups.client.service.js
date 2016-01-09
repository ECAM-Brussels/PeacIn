'use strict';

// Group service used for communicating with the users REST endpoint
angular.module('groups').factory('Groups', ['$resource', function ($resource) {
	return $resource('api/groups', {}, {
		update: {
			method: 'PUT'
		}
	});
}]);
