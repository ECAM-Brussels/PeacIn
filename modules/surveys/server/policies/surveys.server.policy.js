'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Surveys Permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin'],
		allows: [{
			resources: '/api/surveys',
			permissions: '*'
		}, {
			resources: '/api/surveys/:surveyId',
			permissions: '*'
		}]
	}, {
		roles: ['user'],
		allows: [{
			resources: '/api/surveys',
			permissions: ['get', 'post']
		}, {
			resources: '/api/surveys/:surveyId',
			permissions: ['get', 'post']
		}]
	}]);
};

/**
 * Check If Surveys Policy Allows
 */
exports.isAllowed = function (req, res, next) {
	var roles = (req.user) ? req.user.roles : [];

	// If a survey is being processed and the current user created it then allow any manipulation
	if (req.article && req.user && req.article.user.id === req.user.id) {
		return next();
	}

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
		if (err) {
			// An authorization error occurred.
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