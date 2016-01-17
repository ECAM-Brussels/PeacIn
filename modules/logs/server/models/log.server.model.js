'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Log schema
 */
var LogSchema = new Schema({
	type: {
		type: String,
		enum: ['generic', 'projectmanagement']
	},
	date: {
		type: Date,
		default: Date.now,
		required: 'Date cannot be blank.'
	},
	message: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'User cannot be blank.'
	}
});

mongoose.model('Log', LogSchema);
