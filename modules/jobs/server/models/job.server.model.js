'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({

  jobTitle: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  position: {
    type: String,
    default: '',
    trim: true
  },
  email1: String,
  phone1: Number,
  moduleName: {
    type: String,
    default: '',
    trim: true
  },
  category: String,
  img1: {
	  data:Buffer,
	  contentType:String 
  },
  taskDuration: {
	  type:Number
  },
  jobDescription: {
    type:String,
    default: '',
    trim: true
  },
  skills: {
    type:String,
    default: '',
    trim: true
  },
  startDate: {type:Date},	
  resp: {
    type: String,
	default: '',
	trim: true
  },		               //responsibilities
  features: {
    type: String,
    default: '',
    trim: true
  },
  require: {
    type: String,
    default: '',
    trim: true
  },	                      //requirements
  communication: {
    type: String,
    default: '',
    trim: true
  },                 		//communication
  completion: {
    type: String,
    default: '',
    trim: true
  },                        //completion
  finProd: {
    type: String,
    default: '',
    trim: true
  },                        	//final product
  payment: {
    type: String,
    default: '',
    trim: true
  },
  subCont: String,	//subcontracting
  views: Number,
  status: String,		//active,inactive,complete,incomplete
  link : String,	
  companyName: {
	type: String
  },
  state: String,
  city: String,
  zipcode: Number,
  country: String,
  payRate: Number,
  score: Number,
  ratings: Number,	
  posted_at: {
	type: Date, 
	default: Date.now
  },
  posted_by: {
	type: String
  },
  creator: {
	type: Schema.Types.ObjectId,
	ref: 'User'
  },
  updated_at: {
	type: Date, 
	default: Date.now
  },			
  company: {
	type: Schema.ObjectId, 
	ref: 'Company'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Job', JobSchema);
