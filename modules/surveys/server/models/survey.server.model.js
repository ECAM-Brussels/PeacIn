'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Survey Schema
 */
var SurveySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	id: {
		type: String,
		default: '',
		trim: true,
		required: 'Id cannot be blank'
	},
	answer: {
		type: String,
		default: '',
		trim: true,
		required: 'Answer cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Survey', SurveySchema);