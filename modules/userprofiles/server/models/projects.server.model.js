'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

	
//------------------ Projects -----------------------------		
	var ProjectSchema = new Schema({
        projectName: {
			type: String,
			default: '',
			trim: true
			},           
        website: {
			type: String,
			default: '',
			trim: true
			},           
        desc: {
			type: String,
			default: '',
			trim: true
			},           
        fileName: {
			type: String,
			default: '',
			trim: true
			},           
        team: {
			type: String,
			default: '',
			trim: true
			},           
        company: {
			type: String,
			default: '',
			trim: true
			},           
        school: {
			type: String,
			default: '',
			trim: true
			},           
		created:{
			type:Date, 
			default:Date.now
			},
		user: {
			type: Schema.ObjectId,
			ref: 'User'
			}
    });


mongoose.model('Project', ProjectSchema);
