'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	members: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
	supervisor: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Group', GroupSchema);
