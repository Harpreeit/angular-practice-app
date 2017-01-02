(function () {
  'use strict';

  angular
    .module('jobs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('jobs', {
        abstract: true,
        url: '/jobs',
        template: '<ui-view/>'
      })
      .state('jobs.list', {
        url: '/jobs/list',
        templateUrl: '/modules/jobs/client/views/list-jobs.client.view.html',
        controller: 'JobsController'
//        controllerAs: 'vm',
//        data: {
//          pageTitle: 'Jobs List'
//        }
      })
      .state('jobs.view', {
        url: '/jobs/:jobId',
        templateUrl: '/modules/jobs/client/views/view-job.client.view.html',
        controller: 'JobsController'
//        controllerAs: 'vm',
//        resolve: {
//          jobResolve: getJob
//        },
//        data: {
//          pageTitle: 'Job {{ jobResolve.title }}'
//        }
      })
      .state('jobs.create', {
        url: '/create',
        templateUrl: '/modules/jobs/client/views/post-job.client.view.html',
        controller: 'JobsController'
//        controllerAs: 'vm',
//        data: {
//          pageTitle: 'Job Form'
//        }
      })
      .state('jobs.edit', {
        url: '/jobs/:jobId/edit',
        templateUrl: '/modules/jobs/client/views/edit-job.client.view.html',
        controller: 'JobsController'
//        controllerAs: 'vm',
//        data: {
//          pageTitle: 'Job Form'
//        }
      });
  }

  getJob.$inject = ['$stateParams', 'JobsService'];

  function getJob($stateParams, JobsService) {
    return JobsService.get({
      jobId: $stateParams.jobId
    }).$promise;
  }
}());
