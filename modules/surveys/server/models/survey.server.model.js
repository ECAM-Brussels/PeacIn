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
	id: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		required: 'Id cannot be blank.'
	},
	end: {
		type: Date,
		default: null
	},
	answers: {
		type: [new Schema({
			user: {
				type: Schema.ObjectId,
				ref: 'User'
			},
			submitted: {
				type: Date,
				default: Date.now
			},
			answer: {
				type: String,
				default: '',
				trim: true
			}
		}, {
			id: false,
			_id: false
		})],
		default: []
	}
});

mongoose.model('Survey', SurveySchema);
