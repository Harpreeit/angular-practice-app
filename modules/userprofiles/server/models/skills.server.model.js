'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

	
//------------------ Skills -----------------------------	
	var SkillSchema = new Schema({
        skills: [String],
		created:{
			type:Date, 
			default:Date.now
			},
		user: {
			type: Schema.ObjectId,
			ref: 'User'
			}
    });


mongoose.model('Skill', SkillSchema);
