(function () {
  'use strict';

  angular
    .module('jobs')
    .controller('JobsController', JobsController);

  JobsController.$inject = ['$scope', '$stateParams', 'Authentication', 'JobsService', '$location', 'UsersService'];

  function JobsController($scope, $stateParams, Authentication, JobsService, $location, UsersService) {
    var vm = this;

    $scope.job = JobsService.query();
    $scope.authentication = Authentication;
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
    
	$scope.jobs = JobsService.query();				
	$scope.newJob = { jobTitle: '', position: '', email1: '', phone1: '', moduleName: '', category: '', img1: '', taskDuration: '', jobDescription: '', skills: '', startDate: '', 
		resp: '', features: '',	require: '', communication: '', completion: '', finProd: '', payment: '', subCont: '', views: '', status: '', link:'', companyName: '', 
		state: '', city: '', zipcode: '', country: '', payRate: '', score: '', ratings: ''};
		
	
	$scope.create = function(){
        if (!Authentication.user) {
            $state.go('home');
        }
//		$scope.newJob.posted_by = $rootScope.current_user;
		$scope.newJob.posted_at = Date.now();
		//secretly calls the restful api from the server
		JobsService.save($scope.newJob, function(){
			$scope.jobs = JobsService.query();	
            //Clear form fields
			$scope.newJob = { jobTitle: '', position: '', email1: '', phone1: '', moduleName: '',  category: '', img1: '', taskDuration: '', jobDescription: '', skills: '', startDate: '', 
			resp: '', features: '', require: '', communication: '', completion: '', finProd: '', payment: '', subCont: '', views: '', status: '', link:'', companyName: '', 
			state: '', city: '', zipcode: '', country: '', payRate: '', score: '', ratings: ''};
		});
	};	
		
    	// Remove existing Job
		$scope.remove = function(job) {
            if (!Authentication.user) {
                $state.go('home');
            }
			if ( job ) {
				job.$remove();

				for (var i in $scope.jobs) {
					if ($scope.jobs [i] === job) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};
            
		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;
			job.user = job.user._id;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
        
		// Find a list of Jobs
		$scope.find = function() {
			JobsService.query(function loadedJobs(jobs) {
				jobs.forEach(user);
				$scope.jobs = jobs;
			});
		};
                
		// Find existing Job
		$scope.findOne = function() {
			$scope.job = JobsService.get({
				jobId: $stateParams.jobId
			});
		};

		// Search for a job
		$scope.jobSearch = function(job) {
			$location.path('/jobs/');
		};
        
        //Apply for a Job
        $scope.jobApply = function(user){
            
        }
        
	//callback for ng-click Post Talent
	$scope.postTask = function() {
		$location.path('/jobposts');
	};	
    
    $scope.created_at = "created_at";
    
  }
}());
