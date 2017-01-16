(function () {
  'use strict';

  angular
    .module('projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$scope', '$stateParams', 'Authentication', 'ProjectsService', '$location', 'UsersService', '$state'];

  function ProjectsController($scope, $stateParams, Authentication, ProjectsService, $location, UsersService, $state) {
    var vm = this;

    $scope.project = ProjectsService.query();
    $scope.authentication = Authentication;
//    $scope.user = UsersService.query();
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.offset = 0;
    
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};
    
	$scope.projects = ProjectsService.query();				
	$scope.newProject = { projectName: '', website: '', desc: '', fileName: '', team: '', company: '', school: ''};
		
	
	$scope.create = function(){
        if (!Authentication.user) {
            $state.go('home');
        }
//		$scope.newProject.posted_by = $rootScope.current_user;
		$scope.newProject.created = Date.now();
		//secretly calls the restful api from the server
		ProjectsService.save($scope.newProject, function(){
			$scope.projects = ProjectsService.query();	
            //Clear form fields
			$scope.newProject = { projectName: '', website: '', desc: '', fileName: '', team: '', company: '', school: ''};
					$location.path('userprofiles/settingview');
		});
	};	
		
    	// Remove existing Project
		$scope.remove = function(project) {
            if (!Authentication.user) {
                $state.go('home');
            }
			if ( project ) {
				project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
					$location.path('userprofiles/settingview');
				});
			}
		};
            
		// Update existing Project
		$scope.update = function() {
			var project = $scope.project;
			project.user = project.user._id;

			project.$update(function() {
				$location.path('userprofiles/settingview');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};    
        
		// Find a list of Projects
		$scope.find = function() {
			ProjectsService.query(function loadedProjects(projects) {
				projects.forEach(user);
				$scope.projects = projects;
			});
		};
                
		// Find existing Project
		$scope.findOne = function() {
			$scope.project = ProjectsService.get({
				projectId: $stateParams.projectId
			});
		};

		// Search for a project
		$scope.projectSearch = function(project) {
			$location.path('projects/' + project._id);
		};

    
  }
}());
