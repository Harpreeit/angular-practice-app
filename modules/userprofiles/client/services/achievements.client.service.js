(function () {
  'use strict';

  angular
    .module('achievements.services')
    .factory('AchievementsService', AchievementsService);

  AchievementsService.$inject = ['$resource', '$log'];

  function AchievementsService($resource, $log) {
    var Achievement = $resource('/api/achievements/:achievementId', {
      achievementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Achievement.prototype, {
      createOrUpdate: function () {
        var achievement = this;
        return createOrUpdate(achievement);
      }
    });

    return Achievement;

    function createOrUpdate(achievement) {
      if (achievement._id) {
        return achievement.$update(onSuccess, onError);
      } else {
        return achievement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(achievement) {
        // Any required internal processing from inside the service, goes here.
	    console.log(achievement);
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
