'use strict';

// Meetings service used for communicating with the users REST endpoint
angular.module('meetings').factory('Meetings', ['$resource', function ($resource) {
	return $resource('api/meetings/:meetingId', {
		meetingId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);
