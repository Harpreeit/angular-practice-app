(function () {
  'use strict';

  angular
    .module('jobs')
    .controller('JobsPostController', JobsPostController);

  JobsPostController.$inject = ['$scope', 'Authentication' , 'JobsService'];

  function JobsPostController($scope, Authentication, JobsService, $location) {

//    vm.authentication = Authentication;

	$scope.jobs = JobsService.query();				
	$scope.newJob = {jobTitle: '', position: '', email1: '', phone1: '', moduleName: '', category: '', img1: '', taskDuration: '', jobDescription: '', skills: '', startDate: '', 
		resp: '', features: '',	require: '', communication: '', completion: '', finProd: '', payment: '', subCont: '', views: '', status: '', link:'', companyName: '', 
		state: '', city: '', zipcode: '', country: '', payRate: '', score: '', ratings: '',  posted_at: '', posted_by: '', creator: '', updated_at: ''};
		
	
	$scope.job = function(){
		$scope.newJob.posted_by = $rootScope.current_user;
		$scope.newJob.posted_at = Date.now();
		//secretly calls the restful api from the server
		JobsService.save($scope.newJob, function(){
			$scope.jobs = JobsService.query();	
            //Clear form fields
			$scope.newJob = {jobTitle: '', position: '', email1: '', phone1: '', moduleName: '',  category: '', img1: '', taskDuration: '', jobDescription: '', skills: '', startDate: '', 
			resp: '', features: '', require: '', communication: '', completion: '', finProd: '', payment: '', subCont: '', views: '', status: '', link:'', companyName: '', 
			state: '', city: '', zipcode: '', country: '', payRate: '', score: '', ratings: '',  posted_at: '', posted_by: '', creator: '', updated_at: ''};
		});
	};	
		
	//callback for ng-click Post Talent
	$scope.postTask = function() {
		$location.path('/jobposts');
	};	
  }
}());
