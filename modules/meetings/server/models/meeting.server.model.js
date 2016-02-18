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
	location: {
		type: String,
		required: 'Location cannot be blank.'
	},
	group: {
		type: Schema.ObjectId,
		ref: 'Group',
		required: 'Group cannot be blank.'
	},
	report: {
		type: new Schema({
			text: {
				type: String,
				trim: true
			},
			userfeedbacks: {
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
				}, {
					id: false,
					_id: false
				})],
				default: []
			},
			date: {
				type: Date,
				default: Date.now
			}
		}, {
			id: false,
			_id: false
		})
	}
});
MeetingSchema.plugin(deepPopulate, {
	populate: {
		'supervisor': {select: 'displayName'},
		'group': {select: 'name members supervisor'},
		'group.supervisor': {select: 'displayName'},
		'group.members': {select: 'displayName'},
		'report.userfeedbacks.user': {select: 'displayName'}
	}
});

mongoose.model('Meeting', MeetingSchema);
