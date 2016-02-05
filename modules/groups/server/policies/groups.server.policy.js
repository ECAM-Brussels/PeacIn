'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke groups permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin'],
		allows: [{
			resources: '/api/groups',
			permissions: '*'
		}, {
			resources: '/api/groups/:groupId',
			permissions: '*'
		}]
	}, {
		roles: ['teacher', 'supervisor'],
		allows: [{
			resources: '/api/groups',
			permissions: ['get']
		}, {
			resources: '/api/groups/:groupId',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check if discussions policy allows
 */
exports.isAllowed = function (req, res, next) {
	var roles = (req.user) ? req.user.roles : [];

	// Supervisor can only access detailed information about their groups
	if (req.group && req.user && roles.indexOf('admin') === -1 && roles.indexOf('teacher') === -1 && roles.indexOf('supervisor') !== -1) {
		if (req.group.supervisor && req.group.supervisor.id !== req.user.id) {
			return res.status(403).json({
				message: 'User is not authorized'
			});
		}
	}

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
