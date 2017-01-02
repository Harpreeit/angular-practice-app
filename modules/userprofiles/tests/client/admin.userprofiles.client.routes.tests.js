﻿(function () {
  'use strict';

  describe('Jobs Route Tests', function () {
    // Initialize global variables
    var $scope,
      JobsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _JobsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      JobsService = _JobsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.jobs');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/jobs');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('admin.jobs.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/jobs/client/views/admin/list-jobs.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          JobsAdminController,
          mockJob;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.jobs.create');
          $templateCache.put('/modules/jobs/client/views/admin/form-job.client.view.html', '');

          // Create mock job
          mockJob = new JobsService();

          // Initialize Controller
          JobsAdminController = $controller('JobsAdminController as vm', {
            $scope: $scope,
            jobResolve: mockJob
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.jobResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/jobs/create');
        }));

        it('should attach an job to the controller scope', function () {
          expect($scope.vm.job._id).toBe(mockJob._id);
          expect($scope.vm.job._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/jobs/client/views/admin/form-job.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          JobsAdminController,
          mockJob;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.jobs.edit');
          $templateCache.put('/modules/jobs/client/views/admin/form-job.client.view.html', '');

          // Create mock job
          mockJob = new JobsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Job about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          JobsAdminController = $controller('JobsAdminController as vm', {
            $scope: $scope,
            jobResolve: mockJob
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:jobId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.jobResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            jobId: 1
          })).toEqual('/admin/jobs/1/edit');
        }));

        it('should attach an job to the controller scope', function () {
          expect($scope.vm.job._id).toBe(mockJob._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/jobs/client/views/admin/form-job.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
