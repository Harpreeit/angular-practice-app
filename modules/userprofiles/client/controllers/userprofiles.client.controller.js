(function () {
  'use strict';

  angular
    .module('userprofiles')
    .controller('UserprofilesController', UserprofilesController);

  UserprofilesController.$inject = ['$scope', '$stateParams', 'Authentication', 'UserprofilesService', '$location', 'UsersService', '$state', '$http', '$rootScope'];

  function UserprofilesController($scope, $stateParams, Authentication, UserprofilesService, $location, UsersService, $state, $http, $rootScope) {
    var vm = this;

    $scope.userprofile = UserprofilesService.query();
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    $scope.ram = "";
    //$scope.harry = function(){
    //    console.log(req.user);
    //}
//    $rootScope.user = $cookies.getObject('user');    
    
    $http.get('/api/users/me') 
      .then(function(result) {
        $scope.ram = result.data._id;
        $scope.current_displayName = result.data.displayName;
        $scope.current_email = result.data.email;
        $scope.current_profileImageURL = result.data.profileImageURL;
        $scope.current_firstName = result.data.firstName;
        $scope.current_lastName = result.data.lastName;
        $scope.current_username = result.data.username;
        //console.log('Your id is', userId);
        // Do whatever you need to do with the userId here.
    });    
/*  
    $http.get('/api/userprofiles/:userprofileId') 
      .then(function(result) {
        $scope.current_category = result.data.category;
        $scope.current_mobilePhone = result.data.mobilePhone;
        $scope.current_workPhone = result.data.workPhone;
        $scope.current_address1 = result.data.address1;
        $scope.current_address2 = result.data.address2;
        $scope.current_city = result.data.city;
        $scope.current_state = result.data.state;
        $scope.current_country = result.data.country;
        $scope.current_zip = result.data.zip;
        // Do whatever you need to do with the userId here.
    });*/ 
   // var currentUser = JSON.stringify(user);
    //userprofiles.run(function($rootScope){
     // $rootScope.currentUser = currentUser;
    //});
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
    
	$scope.userprofiles = UserprofilesService.query();				
	$scope.newUserprofile = { firstName: '', lastName: '', email1: '', userSkills:'', email2: '', category: '', mobilePhone: '', workPhone: '', address1: '', address2: '', city: '', state: '', country: '', zip: ''};
			
	$scope.create = function(){
//		$scope.newUserprofile.posted_by = $rootScope.current_user;
		$scope.newUserprofile.posted_at = Date.now();
		//secretly calls the restful api from the server
		UserprofilesService.save($scope.newUserprofile, function(){
			$scope.userprofiles = UserprofilesService.query();	
            //Clear form fields
			$scope.newUserprofile = { firstName: '', lastName: '', email1: '', userSkills: '', email2: '', category: '', mobilePhone: '', workPhone: '', address1: '', address2: '', city: '', state: '', country: '', zip: ''};
				$location.path('userprofiles/setting');
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
					$location.path('userprofiles/setting');
				});
			}
		};
            
		// Update existing Userprofile
		$scope.update = function() {
            if (!Authentication.user) {
                $state.go('userprofiles');
            }
			var userprofile = $scope.userprofile;
			userprofile.user = userprofile.user._id;

			userprofile.$update(function() {
				$location.path('userprofiles/setting');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
                
		// Find a list of Userprofiles
		$scope.find = function() {
			var userprofile = $scope.userprofile;
			userprofile.user = userprofile.user._id;
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
                console.log('userprofile');
		};
       /**
		$scope.findOne = function() {
            var userprofile = [];
            angular.forEach(userprofile, function(element) {
              userprofile.push(element);
            });
        };
        **/ 
        

		// Search for a userprofile
		$scope.userprofileSearch = function(userprofile) {
			$location.path('userprofiles/' + userprofile._id);
		};

    
  }
}());
