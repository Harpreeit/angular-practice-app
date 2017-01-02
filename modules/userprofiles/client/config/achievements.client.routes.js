(function () {
  'use strict';

  angular
    .module('achievements.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('achievements', {
        abstract: true,
        url: '/achievements',
        template: '<ui-view/>'
      })
      .state('achievements.view', {
        url: '/achievements/:achievementId',
        templateUrl: '/modules/userprofiles/client/views/achievements/view-achievement.client.view.html',
        controller: 'AchievementsController'
      })
      .state('achievements.list', {
        url: '/achievements/list',
        templateUrl: '/modules/userprofiles/client/views/achievements/list-achievement.client.view.html',
        controller: 'AchievementsController'
      })
      .state('achievements.create', {
        url: '/create',
        templateUrl: '/modules/userprofiles/client/views/achievements/create-achievement.client.view.html',
        controller: 'AchievementsController'
      })
      .state('achievements.edit', {
        url: '/achievements/:achievementId/edit',
        templateUrl: '/modules/userprofiles/client/views/achievements/edit-achievement.client.view.html',
        controller: 'AchievementsController',
      });
  }
    
  getAchievement.$inject = ['$stateParams', 'AchievementsService'];

  function getAchievement($stateParams, AchievementsService) {
    return AchievementsService.get({
      achievementId: $stateParams.achievementId
    }).$promise;
  }
  
}());