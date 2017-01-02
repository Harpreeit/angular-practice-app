'use strict';

/**
 * Module dependencies
 */
var achievementsPolicy = require('../policies/achievements.server.policy'),
  achievements = require('../controllers/achievements.server.controller');
//var users = require('../modules/users/server/controllers/users/users.authentication.server.controller');

module.exports = function (app) {
  // Achievements collection routes
  app.route('/api/achievements').all(achievementsPolicy.isAllowed)
    .get(achievements.list)
    .post(achievements.create);

  // Single achievement routes
  app.route('/api/achievements/:achievementId').all(achievementsPolicy.isAllowed)
    .get(achievements.read)
    .put(achievements.update)
    .delete(achievements.delete);

  // Finish by binding the achievement middleware
  app.param('achievementId', achievements.achievementByID);
};
