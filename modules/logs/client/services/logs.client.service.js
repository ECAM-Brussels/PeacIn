'use strict';

// Group service used for communicating with the logs REST endpoint
angular.module('logs').factory('Logs', ['$resource', function ($resource) {
	return $resource('api/logs/:logId', {
		logId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);
