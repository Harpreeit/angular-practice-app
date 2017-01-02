'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//------------------ Jobs -----------------------------
var UserJobSchema = new Schema({
    companyName: {
			type: String,
			default: '',
			trim: true
			},           
    title: {
			type: String,
			default: '',
			trim: true
			},           
    desc: {
			type: String,
			default: '',
			trim: true
			},           
    reference: {
			type: String,
			default: '',
			trim: true
			},           
    refPhone: {
			type: Number,
			default: '',
			trim: true
			},        
    refEmail: {
			type: String,
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
	created:{
		type:Date, 
		default:Date.now
		},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
    });

	
mongoose.model('Userjob', UserJobSchema);