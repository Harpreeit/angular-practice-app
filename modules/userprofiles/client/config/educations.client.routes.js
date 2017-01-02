(function () {
  'use strict';

  angular
    .module('educations.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('educations', {
        abstract: true,
        url: '/educations',
        template: '<ui-view/>'
      })
      .state('educations.view', {
        url: '/educations/:educationId',
        templateUrl: '/modules/userprofiles/client/views/educations/view-education.client.view.html',
        controller: 'EducationsController'
      })
      .state('educations.list', {
        url: '/educations/list',
        templateUrl: '/modules/userprofiles/client/views/educations/list-education.client.view.html',
        controller: 'EducationsController'
      })
      .state('educations.create', {
        url: '/create',
        templateUrl: '/modules/userprofiles/client/views/educations/create-education.client.view.html',
        controller: 'EducationsController'
//        controllerAs: 'vm',
      })
      .state('educations.edit', {
        url: '/educations/:educationId/edit',
        templateUrl: '/modules/userprofiles/client/views/educations/edit-education.client.view.html',
        controller: 'EducationsController',
      });
  }
     
  getEducation.$inject = ['$stateParams', 'EducationsService'];

  function getEducation($stateParams, EducationsService) {
    return EducationsService.get({
      educationId: $stateParams.educationId
    }).$promise;
  }
  
}());