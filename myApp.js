var app = angular.module('myApp', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngSanitize'])
			.run(function($rootScope, $http){
				$rootScope.authenticated = false;
				$rootScope.current_user = '';
				
				$rootScope.signout = function(){
					$http.get('/auth/signout');
					$rootScope.authenticated = false;
					$rootScope.current_user = '';
				};
			});
      
/* Routing */
app.config(function($routeProvider){
	$routeProvider
		//timeline articles
		.when('/job',{
			templateUrl:'job-detail.html',
			controller:'jobsController'
		})
		//user jobs
		.when('/jobs',{
			templateUrl:'jobs.html',
			controller:'jobsController'
		})
		//user jobs
		.when('/jobpost',{
			templateUrl:'jobpost.html',
			controller:'jobsController'
		})
		//user login
		.when('/login',{
			templateUrl:'login.html',
			controller:'authController'
		})
		//user register
		.when('/register', {
			templateUrl:'register.html',
			controller:'authController'
		})
		//Redirect to login
        .otherwise({
           redirectTo: '/login'
        });
});

// Jobs Service
app.factory('jobsService', function($resource){
	return $resource('/api/jobs/:id', {id: '@id'}, {
		query: { method: 'GET', params: {id: '@id'}, isArray: true },
		save : { method: 'POST'},
    put:  { method: 'PUT', params: {id: '@id'}},
		delete: { method: 'DELETE', params: {id: '@id'}}
	});
});
	
// JobPost Service	
app.factory('JobPost', function($http){	
		return {
			get: function() {
				return $http.get('/api/jobs');
			},
			query: function(id){
				return $http.get('/api/jobs/' + id);
			},
			create: function(jobData){
				return $http.post('/api/jobs', jobData);
			},
			delete: function(id) {
				return $http.delete('/api/jobs/' + id);
			}
		}
});
	
//Jobs Controller
app.controller('jobsController', function($scope, jobsService, JobPost, $rootScope, $location, $resource, $http){
	//gets all the resources from the /api/jobs/:id
	$scope.jobs = jobsService.query();								
	$scope.newJob = {jobTitle: '', position: '', email1: '', phone1: '', moduleName: '', category: '', img1: '', taskDuration: '', jobDescription: '', skills: '', startDate: '', 
		resp: '', features: '',	require: '', communication: '', completion: '', finProd: '', payment: '', subCont: '', views: '', status: '', link:'', /* companyId: '', userId: '',
			*/ companyName: '', state: '', city: '', zipcode: '', country: '', payRate: '', score: '', ratings: '',  posted_at: '', posted_by: '', creator: '', updated_at: ''};

	$scope.job = function(){
		$scope.newJob.posted_by = $rootScope.current_user;
		$scope.newJob.posted_at = Date.now();
		//secretly calls the restful api from the server
		jobsService.save($scope.newJob, function(){
			$scope.jobs = jobsService.query();								
			$scope.newJob = {jobTitle: '', position: '', email1: '', phone1: '', moduleName: '',  category: '', img1: '', taskDuration: '', jobDescription: '', skills: '', startDate: '', 
			resp: '', features: '', require: '', communication: '', completion: '', finProd: '', payment: '', subCont: '', views: '', status: '', link:'', /* companyId: '', userId: '',
			*/ companyName: '', state: '', city: '', zipcode: '', country: '', payRate: '', score: '', ratings: '',  posted_at: '', posted_by: '', creator: '', updated_at: ''};
		});
	};

	$scope.deleteJob = function(job){

		jobsService.delete(id, function(){
			$scope.jobs = jobsService.query();
			});
		};
		
	$scope.deleteTask = function(id){
		JobPost.delete(id)
				.success(function(data) {
					$scope.jobs = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
	};

/*		
		$scope.toggleEdit = function(index){
      $scope.jobs[index].edit = !$scope.jobs[index].edit;
    };
	    $scope.saveJob = function(index){
      $http.put('/api/jobs/' + $scope.jobs[index]._id, $scope.jobs[index])
      .success(function(){
        $scope.jobs[index].edit = false;
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
    };
*/
//--------------------------- Apply -------------------------------
    $scope.showtask = function(){
		$http.get('/api/jobs', $scope.newJob).success(function(data){
			if(data.state == 'success'){
				$scope.jobId = data.newJob._id;
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
	
	$scope.viewtask = function(id){
		var promise = $http.get('/api/jobs/' +id);
	$scope.jobs = [];	     
	$scope.arrFromJobs = Object.keys(jobs).map(function(key) {
		return jobs[key];
	});
		var derivedPromise = promise.then(function onfulFilled(response) {
						var data = response.data;
                        $scope.arrFromJobs = data;
						console.log(data);
						return data;
						$location.path('/jobpost');
                });
				console.log(derivedPromise);
				return derivedPromise;
	};
		
	$scope.viewPost = function(id){
		jobsService.query(function(data){
			$scope.jobData = data;
			console.log(data);
		//	$location.path('/jobpost');
		});
	};
		
	$scope.viewjob = function(){
		var url = '/api/jobs/:id';
			$http.get('url').then(function(data) {
				$scope.jobApply = data.data;
				console.log(data);
				return data;
			}, 
			function (err) {
                console.log("error: ", err);
            });
	};

//	$scope.jobList = [];
	$scope.apply = function(job){
		$location.path('/jobpost');
	};
	
	$scope.applyJob = function(job){
		jobsService.query({id: job._id}, function(jobs, data){
			$scope.jobs = jobs.data;
		});
	};
	$scope.reloadListJobs = function(){
		JobPost.listJobs().then(function(response, data){
			$scope.jobs = response.jobs;
		});
	};	
	$scope.applyTitle = function(job){
		return jobsService.get({id: job._Id}, function(data){
			return data;	
			});
	}; 
});  
  
  //------------------------------------------ User Authentication --------------------------------------------------

app.controller('authController', function($scope, $rootScope, $http, $location){
  $scope.user = {firstName: '', lastName: '', email: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login',$scope.user).success(function(data){
		if(data.state == 'success'){
			$rootScope.authenticated = true;
			$rootScope.current_email = data.user.email;
			$location.path('/');
		}
		else{
			$scope.error_message = data.message;
		}
	});
  };

  $scope.register = function(){
    $http.post('/auth/signup',$scope.user).success(function(data){
		if(data.state == 'success'){
			$rootScope.authenticated = true;
			$rootScope.current_email = data.user.email;
			$location.path('/');
		}
		else{
			$scope.error_message = data.message;
		}
	});
  };
});
