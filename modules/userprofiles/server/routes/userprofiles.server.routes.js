'use strict';

/**
 * Module dependencies
 */
var userprofilesPolicy = require('../policies/userprofiles.server.policy'),
  userprofiles = require('../controllers/userprofiles.server.controller');

module.exports = function (app) {
  // Userprofiles collection routes
  app.route('/api/userprofiles').all(userprofilesPolicy.isAllowed)
    .get(userprofiles.list)
    .post(userprofiles.create);

  // Single userprofile routes
  app.route('/api/userprofiles/:userprofileId').all(userprofilesPolicy.isAllowed)
    .get(userprofiles.read)
    .put(userprofiles.update)
    .delete(userprofiles.delete);

  // Finish by binding the userprofile middleware
  app.param('userprofileId', userprofiles.userprofileByID);
};
