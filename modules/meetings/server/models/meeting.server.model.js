'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	deepPopulate = require('mongoose-deep-populate')(mongoose),
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
		type: Date,
		required: 'Date cannot be blank.'
	},
	group: {
		type: Schema.ObjectId,
		ref: 'Group',
		required: 'Group cannot be blank.'
	},
	report: {
		type: {
			text: {
				type: String,
				trim: true
			},
			userfeedbacks: {
				type: [{
					user: {
						type: Schema.ObjectId,
						ref: 'User'
					},
					attended: {
						type: Boolean,
						default: false
					},
					note: {
						q1: {
							type: Boolean,
							default: false
						},
						q2: {
							type: Boolean,
							defaukt: false
						},
						q3: {
							type: String,
							enum: ['++', '+', '-', '--'],
							default: '--'
						},
					},
					remark: {
						type: String,
						default: '',
						trim: true
					}
				}],
				default: []
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	}
});
MeetingSchema.plugin(deepPopulate, {
	populate: {
		'supervisor': {select: 'displayname'},
		'group': {select: 'name members'},
		'group.members': {select: 'displayName'}
	}
});

mongoose.model('Meeting', MeetingSchema);
