'use strict';

// Discussions service used for communicating with the users REST endpoint
angular.module('discussions').factory('Discussions', ['$resource', function ($resource) {
	return $resource('api/discussions/:discussionId', {
		discussionId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);
