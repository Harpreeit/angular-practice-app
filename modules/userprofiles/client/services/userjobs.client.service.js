(function () {
  'use strict';

  angular
    .module('userjobs.services')
    .factory('UserjobsService', UserjobsService);

  UserjobsService.$inject = ['$resource', '$log'];

  function UserjobsService($resource, $log) {
    var Userjob = $resource('/api/userjobs/:userjobId', {
      userjobId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Userjob.prototype, {
      createOrUpdate: function () {
        var userjob = this;
        return createOrUpdate(userjob);
      }
    });

    return Userjob;

    function createOrUpdate(userjob) {
      if (userjob._id) {
        return userjob.$update(onSuccess, onError);
      } else {
        return userjob.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(userjob) {
        // Any required internal processing from inside the service, goes here.
	    console.log(userjob);
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
