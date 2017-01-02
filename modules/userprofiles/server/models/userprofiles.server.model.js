'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//------------------ Users -----------------------------
    var UserprofileSchema = new Schema({
        firstName: {
            type: String,
            default: '',
            trim: true
          },
        lastName: {
            type: String,
            default: '',
            trim: true
          },
        category:  {
            type: String,
            default: '',
            trim: true
          },
        email1: {
            type: String,
            default: '',
            trim: true
          },
		email2: {
            type: String,
            default: '',
            trim: true
          },
        mobilePhone: {
            type: Number,
            default: '',
            trim: true
          },
		workPhone: {
            type: Number,
            default: '',
            trim: true
          },
		address1: {
            type: String,
            default: '',
            trim: true
          },
        address2: {
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
        zip: {
            type: Number,
            default: '',
            trim: true
          },
		followers: {
            type: Number,
            default: '',
            trim: true
          },
		views: {
            type: Number,
            default: '',
            trim: true
          },
		ratings: {
            type: Number,
            default: '',
            trim: true
          },
		score: {
            type: Number,
            default: '',
            trim: true
          },
		payRate: {
            type: Number,
            default: '',
            trim: true
          },
		status: {
            type: String,
            default: '',
            trim: true
          },		//active/inactive
		tasks: {
            type: Number,
            default: '',
            trim: true
          },
		tasksComp: {
            type: Number,
            default: '',
            trim: true
          },
		tasksIncomp: {
            type: Number,
            default: '',
            trim: true
          },
        messages:  {
            type: String,
            default: '',
            trim: true
          },
        comments:  {
            type: String,
            default: '',
            trim: true
          },
        notification:  {
            type: String,
            default: '',
            trim: true
          },
		created:{
            type:Date, 
            default:Date.now
            },
//        company: {
//            type: Schema.ObjectId,
//            ref: 'Company'
//        },
        project: {
            type: Schema.ObjectId,
            ref: 'Project'
        },
        userjob: {
            type: Schema.ObjectId,
            ref: 'Userjob'
        },
        skill: {
            type: Schema.ObjectId,
            ref: 'Skill'
        },
        achievement: {
            type: Schema.ObjectId,
            ref: 'Achievement'
        },
        education: {
            type: Schema.ObjectId,
            ref: 'Education'
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    });


mongoose.model('Userprofile', UserprofileSchema);
