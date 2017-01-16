'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Education = mongoose.model('Education'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a education
 */
exports.create = function (req, res) {
  var education = new Education(req.body);
  education.user = req.user;

  education.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(education);
    }
  });
};

/**
 * Show the current education
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var education = req.education ? req.education.toJSON() : {};

  // Add a custom field to the Education, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Education model.
  education.isCurrentUserOwner = !!(req.user && education.user && education.user._id.toString() === req.user._id.toString());

  res.json(education);
};

/**
 * Update a education
 */
exports.update = function (req, res) {
  var education = req.education;
	
	education.schoolName = req.body.schoolName;
	education.degree = req.body.degree;
	education.major = req.body.major;
	education.city = req.body.city;
	education.state = req.body.state;
	education.country = req.body.country;
	education.zip = req.body.zip;
	education.created = Date.now();
	education.user = req.user;

  education.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(education);
    }
  });
};

/**
 * Delete an education
 */
exports.delete = function (req, res) {
  var education = req.education;

  education.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(education);
    }
  });
};

/**
 * List of Educations
 */
exports.list = function (req, res) {
   var id = req.user.id.toString();
   // console.log('this is from user job, nikck nu id aa mujab che : ',id);
  Education.find({'user': id}).sort('-created').populate('user').exec(function (err, educations) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(educations);
    }
  });
};

/**
 * Education middleware
 */
exports.educationByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Education is invalid'
    });
  }

  Education.findById(id).populate('user').exec(function (err, education) {
    if (err) {
      return next(err);
    } else if (!education) {
      return res.status(404).send({
        message: 'No education with that identifier has been found'
      });
    }
    req.education = education;
    next();
  });
};
