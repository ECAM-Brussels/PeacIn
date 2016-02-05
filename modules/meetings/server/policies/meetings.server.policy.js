'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke meetings permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin', 'supervisor'],
		allows: [{
			resources: '/api/meetings',
			permissions: '*'
		}, {
			resources: '/api/meetings/:meetingId',
			permissions: '*'
		}]
	}, {
		roles: ['teacher'],
		allows: [{
			resources: '/api/meetings',
			permissions: ['get']
		}, {
			resources: '/api/meetings/:meetingId',
			permissions: ['get']
		}]
	}, {
		roles: ['student'],
		allows: [{
			resources: '/api/meetings',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check if meetings policy allows
 */
exports.isAllowed = function (req, res, next) {
	var roles = (req.user) ? req.user.roles : [];

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
		if (err) {
			// An authorization error occurred
			return res.status(500).send('Unexpected authorization error');
		}
		if (isAllowed) {
			// Access granted! Invoke next middleware
			return next();
		}
		return res.status(403).json({
			message: 'User is not authorized'
		});
	});
};
