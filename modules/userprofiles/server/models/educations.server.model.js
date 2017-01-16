'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

		
//------------------ Education -----------------------------
	var EducationSchema = new Schema({
        schoolName : {
			type: String,
			default: '',
			trim: true
			},           
        degree: {
			type: String,
			default: '',
			trim: true
			},           
        major: {
			type: String,
			default: '',
			trim: true
			},           
        city: {
			type: String,
			default: '',
			trim: true
			},           
        state: {
			type: String,
			default: '',
			trim: true
			},           
        country: {
			type: String,
			default: '',
			trim: true
			},           
        zip : {
			type: Number,
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
  

mongoose.model('Education', EducationSchema);
  
