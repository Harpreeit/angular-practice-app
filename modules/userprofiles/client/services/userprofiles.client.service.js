(function () {
  'use strict';

  angular
    .module('userprofiles.services')
    .factory('UserprofilesService', UserprofilesService);

  UserprofilesService.$inject = ['$resource', '$log'];

  function UserprofilesService($resource, $log) {
    var Userprofile = $resource('/api/userprofiles/:userprofileId', {
      userprofileId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Userprofile.prototype, {
      createOrUpdate: function () {
        var userprofile = this;
        return createOrUpdate(userprofile);
      },
      requestViewProfile: function (userprofile){
          return this.viewProfile(userprofile).$promise;
      }
    });

    return Userprofile;

    function createOrUpdate(userprofile) {
      if (userprofile._id) {
        return userprofile.$update(onSuccess, onError);
      } else {
        return userprofile.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(userprofile) {
        // Any required internal processing from inside the service, goes here.
	    console.log(userprofile);
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }
    
    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
