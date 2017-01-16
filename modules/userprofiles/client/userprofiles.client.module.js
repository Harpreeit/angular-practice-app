(function (app) {
  'use strict';

  app.registerModule('userprofiles', ['core'], ['users']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('userprofiles.admin', ['core.admin']);
  app.registerModule('userprofiles.admin.routes', ['core.admin.routes']);
  app.registerModule('userprofiles.services', ['users.services']);
  app.registerModule('userprofiles.routes', ['ui.router', 'core.routes', 'userprofiles.services', 'users.routes']);
    
  app.registerModule('userjobs', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('userjobs.services');
  app.registerModule('userjobs.routes', ['ui.router', 'core.routes', 'userjobs.services']);
  
  app.registerModule('educations', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('educations.services');
  app.registerModule('educations.routes', ['ui.router', 'core.routes', 'educations.services']);
  
  app.registerModule('skills', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('skills.services');
  app.registerModule('skills.routes', ['ui.router', 'core.routes', 'skills.services']);
  
  app.registerModule('achievements', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('achievements.services');
  app.registerModule('achievements.routes', ['ui.router', 'core.routes', 'achievements.services']);
  
  app.registerModule('projects', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('projects.services');
  app.registerModule('projects.routes', ['ui.router', 'core.routes', 'projects.services']);
}(ApplicationConfiguration));
