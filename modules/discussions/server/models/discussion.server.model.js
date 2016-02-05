'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Discussion Schema
 */
var DiscussionSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'User cannot be blank.'
	},
	title: {
		type: String,
		trim: true,
		required: 'Title cannot be blank.'
	},
	message: {
		type: String,
		trim: true,
		required: 'Message cannot be blank.'
	},
	recipient: {
		type: [{
			type: String,
			enum: ['teacher', 'supervisor', 'group']
		}],
		default: []
	},
	public: {
		type: Boolean,
		default: false
	},
	answers: {
		type: [new Schema({
			user: {
				type: Schema.ObjectId,
				ref: 'User',
				required: true
			},
			date: {
				type: Date,
				default: Date.now
			},
			message: {
				type: String,
				trim: true,
				required: true
			}
		}, {
			id: false,
			_id: false
		})],
		default: []
	}
});

mongoose.model('Discussion', DiscussionSchema);
