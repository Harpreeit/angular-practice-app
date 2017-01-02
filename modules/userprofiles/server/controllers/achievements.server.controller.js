'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Achievement = mongoose.model('Achievement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a achievement
 */
exports.create = function (req, res) {
  var achievement = new Achievement(req.body);
  achievement.user = req.user;

  achievement.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(achievement);
    }
  });
};

/**
 * Show the current achievement
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var achievement = req.achievement ? req.achievement.toJSON() : {};

  // Add a custom field to the Achievement, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Achievement model.
  achievement.isCurrentUserOwner = !!(req.user && achievement.user && achievement.user._id.toString() === req.user._id.toString());

  res.json(achievement);
};

/**
 * Update a achievement
 */
exports.update = function (req, res) {
  var achievement = req.achievement;
	achievement.achievementName = req.body.achievementName;
	achievement.title = req.body.title;
	achievement.award = req.body.award;
	achievement.desc = req.body.desc;
	achievement.reference = req.body.reference;
	achievement.created = Date.now();
	achievement.user = req.user;

  achievement.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(achievement);
    }
  });
};

/**
 * Delete an achievement
 */
exports.delete = function (req, res) {
  var achievement = req.achievement;

  achievement.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(achievement);
    }
  });
};

/**
 * List of Achievements
 */
exports.list = function (req, res) {
  Achievement.find().sort('-created').populate('user', 'displayName').exec(function (err, achievements) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(achievements);
    }
  });
};

/**
 * Achievement middleware
 */
exports.achievementByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Achievement is invalid'
    });
  }

  Achievement.findById(id).populate('user', 'displayName').exec(function (err, achievement) {
    if (err) {
      return next(err);
    } else if (!achievement) {
      return res.status(404).send({
        message: 'No achievement with that identifier has been found'
      });
    }
    req.achievement = achievement;
    next();
  });
};
