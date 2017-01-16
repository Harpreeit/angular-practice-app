'use strict';

/**
 * Module dependencies
 */
var educationsPolicy = require('../policies/educations.server.policy'),
  educations = require('../controllers/educations.server.controller');

module.exports = function (app) {
  // Educations collection routes
  app.route('/api/educations').all(educationsPolicy.isAllowed)
    .get(educations.list)
    .post(educations.create);

  // Single education routes
  app.route('/api/educations/:educationId').all(educationsPolicy.isAllowed)
    .get(educations.read)
    .put(educations.update)
    .delete(educations.delete);

  // Finish by binding the education middleware
  app.param('educationId', educations.educationByID);
};
