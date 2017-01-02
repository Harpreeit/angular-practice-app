'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a job
 */
exports.create = function (req, res) {
  var job = new Job(req.body);
  job.user = req.user;

  job.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(job);
    }
  });
};

/**
 * Show the current job
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var job = req.job ? req.job.toJSON() : {};

  // Add a custom field to the Job, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Job model.
  job.isCurrentUserOwner = !!(req.user && job.user && job.user._id.toString() === req.user._id.toString());

  res.json(job);
};

/**
 * Update a job
 */
exports.update = function (req, res) {
  var job = req.job;
	job.jobTitle = req.body.jobTitle;
	job.position = req.body.position;
	job.email1 = req.body.email1;
	job.phone1 = req.body.phone1;
	job.moduleName = req.body.moduleName;
	job.category = req.body.category;
	job.img1 = req.body.img1;
	job.taskDuration = req.body.taskDuration;
	job.jobDescription = req.body.jobDescription;
	job.skills = req.body.skills; 
	job.startDate = req.body.startDate;	
	job.resp = req.body.resp;		//responsibilities
	job.features = req.body.features;
	job.require = req.body.require;	//requirements
	job.communication = req.body.communication; 		//communication
	job.completion = req.body.completion; //completion
	job.finProd = req.body.finProd;	//final product
	job.payment = req.body.payment;
	job.subCont = req.body.subCont;	//subcontracting	
	job.views = req.body.views; 
	job.status = req.body.status;		
	job.link = req.body.link; 
	job.companyName = req.body.companyName;
	job.state = req.body.state;
	job.city = req.body.city;
	job.zipcode = req.body.zipcode;
	job.payRate = req.body.payRate;
	job.score = req.body.score;
	job.ratings = req.body.ratings;   
	job.posted_by = req.user.username;
	job.creator = req.user._id;
	job.company = req.company;
	job.user = req.user;

  job.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(job);
    }
  });
};

/**
 * Delete an job
 */
exports.delete = function (req, res) {
  var job = req.job;

  job.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(job);
    }
  });
};

/**
 * List of Jobs
 */
exports.list = function (req, res) {
  Job.find().sort('-created').populate('user', 'displayName').exec(function (err, jobs) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(jobs);
    }
  });
};

/**
 * Job middleware
 */
exports.jobByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Job is invalid'
    });
  }

  Job.findById(id).populate('user', 'displayName').exec(function (err, job) {
    if (err) {
      return next(err);
    } else if (!job) {
      return res.status(404).send({
        message: 'No job with that identifier has been found'
      });
    }
    req.job = job;
    next();
  });
};
