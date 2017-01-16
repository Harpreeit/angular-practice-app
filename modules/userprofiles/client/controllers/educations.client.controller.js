(function () {
  'use strict';

  angular
    .module('educations')
    .controller('EducationsController', EducationsController);

  EducationsController.$inject = ['$scope', '$stateParams', 'Authentication', 'EducationsService', '$location', 'UsersService', '$state'];

  function EducationsController($scope, $stateParams, Authentication, EducationsService, $location, UsersService, $state) {
    var vm = this;

    $scope.education = EducationsService.query();
    $scope.authentication = Authentication;
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
    
	$scope.educations = EducationsService.query();				
	$scope.newEducation = { schoolName: '', degree: '', major: '', city: '', state: '', country: '', zip: ''};
		
	
	$scope.create = function(){
        if (!Authentication.user) {
            $state.go('home');
        }
//		$scope.newEducation.posted_by = $rootScope.current_user;
		$scope.newEducation.posted_at = Date.now();
		//secretly calls the restful api from the server
		EducationsService.save($scope.newEducation, function(){
			$scope.educations = EducationsService.query();	
            //Clear form fields
			$scope.newEducation = { schoolName: '', degree: '', major: '', city: '', state: '', country: '', zip: ''};
					$location.path('userprofiles/settingview');
		});
	};	
		
    	// Remove existing Education
		$scope.remove = function(education) {
            if (!Authentication.user) {
                $state.go('home');
            }
			if ( education ) {
				education.$remove();

				for (var i in $scope.educations) {
					if ($scope.educations [i] === education) {
						$scope.educations.splice(i, 1);
					}
				}
			} else {
				$scope.education.$remove(function() {
					$location.path('userprofiles/settingview');
				});
			}
		};
            
		// Update existing Education
		$scope.update = function() {
			var education = $scope.education;
		//	education.user = education.user._id;

			education.$update(function() {
				$location.path('userprofiles/settingview');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
        
		// Find a list of Educations
		$scope.find = function() {
			EducationsService.query(function loadedEducations(educations) {
				educations.forEach(user);
				$scope.educations = educations;
			});
		};
                
		// Find existing Education
		$scope.findOne = function() {
			$scope.education = EducationsService.get({
				educationId: $stateParams.educationId
			});
		};

		// Search for a education
		$scope.educationSearch = function(education) {
			$location.path('educations/' + education._id);
		};

    
  }
}());
