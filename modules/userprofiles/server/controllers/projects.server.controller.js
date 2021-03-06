'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a project
 */
exports.create = function (req, res) {
  var project = new Project(req.body);
  project.user = req.user;

  project.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

/**
 * Show the current project
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var project = req.project ? req.project.toJSON() : {};

  // Add a custom field to the Project, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Project model.
  project.isCurrentUserOwner = !!(req.user && project.user && project.user._id.toString() === req.user._id.toString());

  res.json(project);
};

/**
 * Update a project
 */
exports.update = function (req, res) {
  var project = req.project;
	project.projectName = req.body.projectName;
	project.website = req.body.website;
	project.desc = req.body.desc;
	project.fileName = req.body.fileName;
	project.team = req.body.team;
	project.company = req.body.company;
	project.school = req.body.school;
	project.created = Date.now();
	project.user = req.user;

  project.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

/**
 * Delete an project
 */
exports.delete = function (req, res) {
  var project = req.project;

  project.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

/**
 * List of Projects
 */
exports.list = function (req, res) {
   var id = req.user.id.toString();
  //  console.log('this is from user job, nikck nu id aa mujab che : ',id);
  Project.find({'user' : id}).sort('-created').populate('user').exec(function (err, projects) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(projects);
    }
  });
};

/**
 * Project middleware
 */
exports.projectByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Project is invalid'
    });
  }

  Project.findById(id).populate('user').exec(function (err, project) {
    if (err) {
      return next(err);
    } else if (!project) {
      return res.status(404).send({
        message: 'No project with that identifier has been found'
      });
    }
    req.project = project;
    next();
  });
};
