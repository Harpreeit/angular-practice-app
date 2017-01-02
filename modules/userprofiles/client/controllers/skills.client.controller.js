(function () {
  'use strict';

  angular
    .module('skills')
    .controller('SkillsController', SkillsController);

  SkillsController.$inject = ['$scope', '$stateParams', 'Authentication', 'SkillsService', '$location', 'UsersService', '$state'];

  function SkillsController($scope, $stateParams, Authentication, SkillsService, $location, UsersService, $state) {
    var vm = this;

    $scope.skill = SkillsService.query();
    $scope.authentication = Authentication;
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
    
	$scope.skills = SkillsService.query();	
	$scope.newSkill = { skills: ''};
		
	
	$scope.create = function(){
//		$scope.newSkill.posted_by = $rootScope.current_user;
		$scope.newSkill.posted_at = Date.now();
		//secretly calls the restful api from the server
		SkillsService.save($scope.newSkill, function(){
			$scope.skills = SkillsService.query();	
            //Clear form fields
			$scope.newSkill = { skills: ''};
				$location.path('userprofiles/settingview');
		});
	};	
		
    	// Remove existing Skill
		$scope.remove = function(skill) {
            if (!Authentication.user) {
                $state.go('home');
            }
			if ( skill ) {
				skill.$remove();

				for (var i in $scope.skills) {
					if ($scope.skills [i] === skill) {
						$scope.skills.splice(i, 1);
					}
				}
			} else {
				$scope.skill.$remove(function() {
					$location.path('userprofiles/settingview');
				});
			}
		};
            
		// Update existing Skill
		$scope.update = function() {
			var skill = $scope.skill;
			skill.user = skill.user._id;

			skill.$update(function() {
				$location.path('userprofiles/settingview');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
        
		// Find a list of Skills
		$scope.find = function() {
			SkillsService.query(function loadedSkills(skills) {
				skills.forEach(user);
				$scope.skills = skills;
			});
        skills.toString();			
		};
                
		// Find existing Skill
		$scope.findOne = function() {
			$scope.skill = SkillsService.get({
				skillId: $stateParams.skillId
			});
		};

		// Search for a skill
		$scope.skillSearch = function(skill) {
			$location.path('skills/' + skill._id);
		};

        $scope.increment = function(item){
            item.count += 1;
        };
    
  }
  
}());
