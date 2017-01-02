(function () {
  'use strict';

  angular
    .module('userprofiles.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.userprofiles', {
        abstract: true,
        url: '/userprofiles',
        template: '<ui-view/>'
      })
      .state('admin.userprofiles.create', {
        url: '/create',
        templateUrl: '/modules/userprofiles/client/views/admin/form-userprofile.client.view.html',
        controller: 'UserprofilesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          userprofileResolve: newUserprofile
        }
      })
      .state('admin.userprofiles.edit', {
        url: '/:userprofileId/edit',
        templateUrl: '/modules/userprofiles/client/views/admin/form-userprofile.client.view.html',
        controller: 'UserprofilesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          userprofileResolve: getUserprofile
        }
      });
  }

  getUserprofile.$inject = ['$stateParams', 'UserprofilesService'];

  function getUserprofile($stateParams, UserprofilesService) {
    return UserprofilesService.get({
      userprofileId: $stateParams.userprofileId
    }).$promise;
  }

  newUserprofile.$inject = ['UserprofilesService'];

  function newUserprofile(UserprofilesService) {
    return new UserprofilesService();
  }
}());
