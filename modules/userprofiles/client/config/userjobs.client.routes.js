(function () {
  'use strict';

  angular
    .module('userjobs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('userjobs', {
        abstract: true,
        url: '/userjobs',
        template: '<ui-view/>'
      })
      .state('userjobs.view', {
        url: '/userjobs/:userjobId',
        templateUrl: '/modules/userprofiles/client/views/userjobs/view-userjob.client.view.html',
        controller: 'UserjobsController'
      })
      .state('userjobs.list', {
        url: '/userjobs/list',
        templateUrl: '/modules/userprofiles/client/views/userjobs/list-userjob.client.view.html',
        controller: 'UserjobsController'
      })
      .state('userjobs.create', {
        url: '/create',
        templateUrl: '/modules/userprofiles/client/views/userjobs/create-userjob.client.view.html',
        controller: 'UserjobsController'
//        controllerAs: 'vm',
      })
      .state('userjobs.edit', {
        url: '/userjobs/:userjobId/edit',
        templateUrl: '/modules/userprofiles/client/views/userjobs/edit-userjob.client.view.html',
        controller: 'UserjobsController',
      });
      
  }
  
  getUserjob.$inject = ['$stateParams', 'UserjobsService'];

  function getUserjob($stateParams, UserjobsService) {
    return UserjobsService.get({
      userjobId: $stateParams.userjobId
    }).$promise;
  }

  }());