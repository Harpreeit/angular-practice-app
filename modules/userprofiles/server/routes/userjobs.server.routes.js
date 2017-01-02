'use strict';

/**
 * Module dependencies
 */
var userjobsPolicy = require('../policies/userjobs.server.policy'),
  userjobs = require('../controllers/userjobs.server.controller');

module.exports = function (app) {
  // Userjobs collection routes
  app.route('/api/userjobs').all(userjobsPolicy.isAllowed)
    .get(userjobs.list)
    .post(userjobs.create);

  // Single userjob routes
  app.route('/api/userjobs/:userjobId').all(userjobsPolicy.isAllowed)
    .get(userjobs.read)
    .put(userjobs.update)
    .delete(userjobs.delete);

  // Finish by binding the userjob middleware
  app.param('userjobId', userjobs.userjobByID);
};
