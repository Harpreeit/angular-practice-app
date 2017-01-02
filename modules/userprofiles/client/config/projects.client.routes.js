(function () {
  'use strict';

  angular
    .module('projects.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('projects', {
        abstract: true,
        url: '/projects',
        template: '<ui-view/>'
      })
      .state('projects.view', {
        url: '/projects/:projectId',
        templateUrl: '/modules/userprofiles/client/views/projects/view-project.client.view.html',
        controller: 'ProjectsController'
      })
      .state('projects.list', {
        url: '/projects/list',
        templateUrl: '/modules/userprofiles/client/views/projects/list-project.client.view.html',
        controller: 'ProjectsController'
      })
      .state('projects.create', {
        url: '/create',
        templateUrl: '/modules/userprofiles/client/views/projects/create-project.client.view.html',
        controller: 'ProjectsController'
      })
      .state('projects.edit', {
        url: '/projects/:projectId/edit',
        templateUrl: '/modules/userprofiles/client/views/projects/edit-project.client.view.html',
        controller: 'ProjectsController',
      });
  }
      
  getProject.$inject = ['$stateParams', 'ProjectsService'];

  function getProject($stateParams, ProjectsService) {
    return ProjectsService.get({
      projectId: $stateParams.projectId
    }).$promise;
  }
  
}());