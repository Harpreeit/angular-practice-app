(function () {
  'use strict';

  angular
    .module('achievements')
    .controller('AchievementsController', AchievementsController);

  AchievementsController.$inject = ['$scope', '$stateParams', 'Authentication', 'AchievementsService', '$location', 'UsersService', '$state'];

  function AchievementsController($scope, $stateParams, Authentication, AchievementsService, $location, UsersService, $state) {
    var vm = this;

    $scope.achievement = AchievementsService.query();
    $scope.authentication = Authentication;
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
	$scope.achievements = AchievementsService.query();				
	$scope.newAchievement = { achievementName: '', title: '', award: '', desc: '', reference: ''};
		
	
	$scope.create = function(){
        if (!Authentication.user) {
            $state.go('home');
        }
//		$scope.newAchievement.posted_by = $rootScope.current_user;
		$scope.newAchievement.posted_at = Date.now();
		//secretly calls the restful api from the server
		AchievementsService.save($scope.newAchievement, function(){
			$scope.achievements = AchievementsService.query();	
            //Clear form fields
			$scope.newAchievement = { achievementName: '', title: '', award: '', desc: '', reference: ''};
            $location.path('userprofiles/settingview');
		});
	};	
		
    	// Remove existing Achievement
		$scope.remove = function(achievement) {
            if (!Authentication.user) {
                $state.go('home');
            }
			if ( achievement ) {
				achievement.$remove();

				for (var i in $scope.achievements) {
					if ($scope.achievements [i] === achievement) {
						$scope.achievements.splice(i, 1);
					}
				}
			} else {
				$scope.achievement.$remove(function() {
					$location.path('userprofiles/settingview');
				});
			}
		};
            
		// Update existing Achievement
		$scope.update = function() {
            if (!Authentication.user) {
                $state.go('home');
            }
			var achievement = $scope.achievement;
			achievement.user = achievement.user._id;

			achievement.$update(function() {
				$location.path('userprofiles/settingview');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
        
		// Find a list of Achievements
		$scope.find = function() {
			AchievementsService.query(function loadedAchievements(achievements) {
				achievements.forEach(user);
				$scope.achievements = achievements;
			});
		};
                
		// Find existing Achievement
		$scope.findOne = function() {
			$scope.achievement = AchievementsService.get({
				achievementId: $stateParams.achievementId
			});
		};

		// Search for a achievement
		$scope.achievementSearch = function(achievement) {
			$location.path('achievements/' + achievement._id);
		};

    
  }
}());
