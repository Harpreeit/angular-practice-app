(function () {
  'use strict';

  angular
    .module('userjobs')
    .controller('UserjobsController', UserjobsController);

  UserjobsController.$inject = ['$scope', '$stateParams', 'Authentication', 'UserjobsService', '$location', 'UsersService', '$state'];

  function UserjobsController($scope, $stateParams, Authentication, UserjobsService, $location, UsersService, $state) {
    var vm = this;

    $scope.userjob = UserjobsService.query();
    $scope.authentication = Authentication;
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
    
	$scope.userjobs = UserjobsService.query();				
	$scope.newUserjob = { companyName: '', title: '', desc: '', reference: '', refPhone: '', refEmail: '', address1: '', address2: '', city: '', state: '', country: '', zip: ''};
		
	
	$scope.create = function(){
//		$scope.newUserjob.posted_by = $rootScope.current_user;
		$scope.newUserjob.posted_at = Date.now();
		//secretly calls the restful api from the server
		UserjobsService.save($scope.newUserjob, function(){
			$scope.userjobs = UserjobsService.query();	
            //Clear form fields
			$scope.newUserjob = { companyName: '', title: '', desc: '', reference: '', refPhone: '', refEmail: '', address1: '', address2: '', city: '', state: '', country: '', zip: ''};
		});
	};	
		
    	// Remove existing Userjob
		$scope.remove = function(userjob) {
			if ( userjob ) {
				userjob.$remove();

				for (var i in $scope.userjobs) {
					if ($scope.userjobs [i] === userjob) {
						$scope.userjobs.splice(i, 1);
					}
				}
			} else {
				$scope.userjob.$remove(function() {
					$location.path('userprofiles/settingview');
				});
			}
		};
            
		// Update existing Userjob
		$scope.update = function() {
			var userjob = $scope.userjob;
		//	userjob.user = userjob.user._id;
        
			userjob.$update(function() {
				$location.path('userprofiles/settingview');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
        
		// Find a list of Userjobs
		$scope.find = function() {
			UserjobsService.query(function loadedUserjobs(userjobs) {
				userjobs.forEach(user);
				$scope.userjobs = userjobs;
			});
		};
                
		// Find existing Userjob
		$scope.findOne = function() {
			$scope.userjob = UserjobsService.get({
				userjobId: $stateParams.userjobId
			});
		};

		// Search for a userjob
		$scope.userjobSearch = function(userjob) {
			$location.path('userjobs/' + userjob._id);
		};

    
  }
}());
