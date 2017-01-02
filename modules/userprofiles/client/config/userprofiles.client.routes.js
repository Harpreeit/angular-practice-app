(function () {
  'use strict';

  angular
    .module('userprofiles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('userprofiles', {
        abstract: true,
        url: '/userprofiles',
        template: '<ui-view>',
      })
//      .state('userprofiles.list', {
//        url: '/userprofiles/list',
//        templateUrl: '/modules/userprofiles/client/views/list-userprofile.client.view.html',
//        controller: 'UserprofilesController'
//      })
      .state('userprofiles.list', {
        url: '/userprofiles/list',
        templateUrl: '/modules/userprofiles/client/views/userlist-userprofile.client.view.html',
        controller: 'UserprofilesController'
      })
      .state('userprofiles.view', {
        url: '/userprofiles/:userprofileId',
        templateUrl: '/modules/userprofiles/client/views/view-userprofile.client.view.html',
        controller: 'UserprofilesController'
      })
      .state('userprofiles.create', {
        url: '/create',
        templateUrl: '/modules/userprofiles/client/views/create-userprofile.client.view.html',
        controller: 'UserprofilesController'
//        controllerAs: 'vm',
//        data: {
//          pageTitle: 'Userprofile Form'
//        }
      })
      .state('userprofiles.edit', {
        url: '/userprofiles/:userprofileId/edit',
        templateUrl: '/modules/userprofiles/client/views/edit-userprofile.client.view.html',
        controller: 'UserprofilesController'
      })
      .state('userprofiles.setting', {
        url: '/setting',
        templateUrl: '/modules/userprofiles/client/views/settings.client.view.html',
        controller: 'UserprofilesController',
      })
      .state('userprofiles.settingview', {
        url: '/settingview',
        templateUrl: '/modules/userprofiles/client/views/settings-view.client.view.html',
        controller: 'UserprofilesController',
      });
  }

  getUserprofile.$inject = ['$stateParams', 'UserprofilesService'];

  function getUserprofile($stateParams, UserprofilesService) {
    return UserprofilesService.get({
      userprofileId: $stateParams.userprofileId
    }).$promise;
  }
  
}());
