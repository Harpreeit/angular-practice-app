(function () {
  'use strict';

  angular
    .module('userprofiles')
    .controller('UserprofilesController', UserprofilesController);

  UserprofilesController.$inject = ['$scope', '$stateParams', 'Authentication', 'UserprofilesService', '$location', 'UsersService', '$state'];

  function UserprofilesController($scope, $stateParams, Authentication, UserprofilesService, $location, UsersService, $state) {
    var vm = this;

    $scope.userprofile = UserprofilesService.query();
    vm.authentication = Authentication;
    vm.user = Authentication.user;
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
    
	$scope.userprofiles = UserprofilesService.query();				
	$scope.newUserprofile = { category: '', mobilePhone: '', workPhone: '', address1: '', address2: '', city: '', state: '', country: '', zip: ''};
		
	
	$scope.create = function(){
        if (!Authentication.user) {
            $state.go('home');
        }
//		$scope.newUserprofile.posted_by = $rootScope.current_user;
		$scope.newUserprofile.posted_at = Date.now();
		//secretly calls the restful api from the server
		UserprofilesService.save($scope.newUserprofile, function(){
			$scope.userprofiles = UserprofilesService.query();	
            //Clear form fields
			$scope.newUserprofile = { category: '', mobilePhone: '', workPhone: '', address1: '', address2: '', city: '', state: '', country: '', zip: ''};
				$location.path('userprofiles/settingview');
		});
	};	
		
    	// Remove existing Userprofile
		$scope.remove = function(userprofile) {
            if (!Authentication.user) {
                $state.go('home');
            }
			if ( userprofile ) {
				userprofile.$remove();

				for (var i in $scope.userprofiles) {
					if ($scope.userprofiles [i] === userprofile) {
						$scope.userprofiles.splice(i, 1);
					}
				}
			} else {
				$scope.userprofile.$remove(function() {
					$location.path('userprofiles/settingview');
				});
			}
		};
            
		// Update existing Userprofile
		$scope.update = function() {
            if (!Authentication.user) {
                $state.go('userprofiles');
            }
			var userprofile = $scope.userprofile;
		//	userprofile.user = userprofile.user._id;

			userprofile.$update(function() {
				$location.path('userprofiles/settingview');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
        
		// Find a list of Userprofiles
		$scope.find = function() {
			UserprofilesService.query(function loadedUserprofiles(userprofiles) {
				userprofiles.forEach(user);
				$scope.userprofiles = userprofiles;
			});
		};
                
		// Find existing Userprofile
		$scope.findOne = function() {
			$scope.userprofile = UserprofilesService.get({
				userprofileId: $stateParams.userprofileId
			});
		};

		// Search for a userprofile
		$scope.userprofileSearch = function(userprofile) {
			$location.path('userprofiles/' + userprofile._id);
		};

    
  }
}());
