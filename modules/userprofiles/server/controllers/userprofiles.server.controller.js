'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Userprofile = mongoose.model('Userprofile'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a userprofile
 */
exports.create = function (req, res) {
  var userprofile = new Userprofile(req.body);
  userprofile.user = req.user;

  userprofile.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofile);
    }
  });
};

/**
 * Show the current userprofile
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var userprofile = req.userprofile ? req.userprofile.toJSON() : {};

  // Add a custom field to the Userprofile, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Userprofile model.
  userprofile.isCurrentUserOwner = !!(req.user && userprofile.user && userprofile.user._id.toString() === req.user._id.toString());

  res.json(userprofile);
};

/**
 * Update a userprofile
 */
exports.update = function (req, res) {
  var userprofile = req.userprofile;
	userprofile.firstName = req.user.firstName;
    userprofile.lastName = req.user.lastName;
    userprofile.category = req.body.category;
    userprofile.email1 = req.user.email;
    userprofile.email2 = req.body.email2;
	userprofile.mobilePhone = req.body.mobilePhone;
    userprofile.workPhone = req.body.workPhone;
    userprofile.address1 = req.body.address1;
    userprofile.address2 = req.body.address2;
    userprofile.city = req.body.city;
    userprofile.state = req.body.state;
    userprofile.country = req.body.country;
    userprofile.zip = req.body.zip;
	userprofile.followers = req.body.followers; 
	userprofile.views = req.body.views; 
	userprofile.ratings = req.body.ratings;
	userprofile.score = req.body.score;   
	userprofile.payRate = req.body.payRate;
	userprofile.status = req.body.status; 
	userprofile.tasks = req.body.tasks;
	userprofile.tasksComp = req.body.tasksComp;
	userprofile.tasksIncomp = req.body.tasksIncomp;						
	userprofile.message = req.body.messsage;					
	userprofile.comments = req.body.comments;					
	userprofile.notification = req.body.notification;    	    
	userprofile.created = Date.now();
//	userprofile.company = req.company;
	userprofile.project = req.project;
	userprofile.userjob = req.userjob;
	userprofile.skill = req.skill;
	userprofile.achievement = req.achievement;
	userprofile.education = req.education;
	userprofile.user = req.user;

  userprofile.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofile);
    }
  });
};

/**
 * Delete an userprofile
 */
exports.delete = function (req, res) {
  var userprofile = req.userprofile;

  userprofile.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofile);
    }
  });
};

/**
 * List of Userprofiles
 */
exports.list = function (req, res) {
  Userprofile.find().sort('-created').populate('user', 'displayName').exec(function (err, userprofiles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofiles);
    }
  });
};

/**
 * Userprofile middleware
 */
exports.userprofileByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Userprofile is invalid'
    });
  }

  Userprofile.findById(id).populate('user', 'displayName').exec(function (err, userprofile) {
    if (err) {
      return next(err);
    } else if (!userprofile) {
      return res.status(404).send({
        message: 'No userprofile with that identifier has been found'
      });
    }
    req.userprofile = userprofile;
    next();
  });
};
