'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Userjob = mongoose.model('Userjob'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a userjob
 */
exports.create = function (req, res) {
  var userjob = new Userjob(req.body);
  userjob.user = req.user;

  userjob.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userjob);
    }
  });
};

/**
 * Show the current userjob
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var userjob = req.userjob ? req.userjob.toJSON() : {};

  // Add a custom field to the Userjob, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Userjob model.
  userjob.isCurrentUserOwner = !!(req.user && userjob.user && userjob.user._id.toString() === req.user._id.toString());

  res.json(userjob);
};

/**
 * Update a userjob
 */
exports.update = function (req, res) {
  var userjob = req.userjob;
	userjob.companyName = req.body.companyName;
	userjob.title = req.body.title;
	userjob.desc = req.body.desc;
	userjob.reference = req.body.reference;
	userjob.refPhone = req.body.refPhone;
	userjob.refEmail = req.body.refEmail;
	userjob.address1 = req.body.address1;
	userjob.address2 = req.body.address2;
	userjob.city = req.body.city;
	userjob.state = req.body.state;
	userjob.country = req.body.country;
	userjob.zip = req.body.zip;
	userjob.created = Date.now();
	userjob.user = req.user;

  userjob.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userjob);
    }
  });
};

/**
 * Delete an userjob
 */
exports.delete = function (req, res) {
  var userjob = req.userjob;

  userjob.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userjob);
    }
  });
};

/**
 * List of Userjobs
 */
exports.list = function (req, res) {
  Userjob.find().sort('-created').populate('user', 'displayName').exec(function (err, userjobs) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userjobs);
    }
  });
};

/**
 * Userjob middleware
 */
exports.userjobByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Userjob is invalid'
    });
  }

  Userjob.findById(id).populate('user', 'displayName').exec(function (err, userjob) {
    if (err) {
      return next(err);
    } else if (!userjob) {
      return res.status(404).send({
        message: 'No userjob with that identifier has been found'
      });
    }
    req.userjob = userjob;
    next();
  });
};
