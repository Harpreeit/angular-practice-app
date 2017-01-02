(function () {
  'use strict';

  angular
    .module('educations.services')
    .factory('EducationsService', EducationsService);

  EducationsService.$inject = ['$resource', '$log'];

  function EducationsService($resource, $log) {
    var Education = $resource('/api/educations/:educationId', {
      educationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Education.prototype, {
      createOrUpdate: function () {
        var education = this;
        return createOrUpdate(education);
      }
    });

    return Education;

    function createOrUpdate(education) {
      if (education._id) {
        return education.$update(onSuccess, onError);
      } else {
        return education.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(education) {
        // Any required internal processing from inside the service, goes here.
	    console.log(education);
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
