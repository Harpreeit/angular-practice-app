'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

	
//------------------ Achievements -----------------------------
	var AchievementSchema = new Schema({
        achievementName : {
			type: String,
			default: '',
			trim: true
			},           
        title : {
			type: String,
			default: '',
			trim: true
			},           
        award : {
			type: String,
			default: '',
			trim: true
			},           
        desc : {
			type: String,
			default: '',
			trim: true
			},
        reference: {
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
	
  

mongoose.model('Achievement', AchievementSchema);
  
