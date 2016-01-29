'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Meeting Schema
 */
var MeetingSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		trim: true,
		required: 'Name cannot be blank.'
	},
	supervisor: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'Supervisor cannot be blank.'
	},
	date: {
		type: String,
		trim: true,
		required: 'Date cannot be blank.'
	},
	group: {
		type: Schema.ObjectId,
		ref: 'Group',
		required: 'Group cannot be blank.'
	},
	feedback: {
		type: [new Schema({
			user: {
				type: Schema.ObjectId,
				ref: 'User'
			},
			attended: {
				type: Boolean,
				default: false
			},
			note: {
				type: String,
				default: '0',
				trim: true
			},
			remark: {
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

mongoose.model('Meeting', MeetingSchema);
