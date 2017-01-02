(function () {
  'use strict';

  angular
    .module('skills.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('skills', {
        abstract: true,
        url: '/skills',
        template: '<ui-view/>'
      })
      .state('skills.view', {
        url: '/skills/:skillId',
        templateUrl: '/modules/userprofiles/client/views/skills/view-skill.client.view.html',
        controller: 'SkillsController'
      })
      .state('skills.list', {
        url: '/skills/list',
        templateUrl: '/modules/userprofiles/client/views/skills/list-skill.client.view.html',
        controller: 'SkillsController'
      })
      .state('skills.create', {
        url: '/create',
        templateUrl: '/modules/userprofiles/client/views/skills/create-skill.client.view.html',
        controller: 'SkillsController'
//        controllerAs: 'vm',
      })
      .state('skills.edit', {
        url: '/skills/:skillId/edit',
        templateUrl: '/modules/userprofiles/client/views/skills/edit-skill.client.view.html',
        controller: 'SkillsController',
      });
  }
      
  getSkill.$inject = ['$stateParams', 'SkillsService'];

  function getSkill($stateParams, SkillsService) {
    return SkillsService.get({
      skillId: $stateParams.skillId
    }).$promise;
  }
  
}());