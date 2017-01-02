(function () {
  'use strict';

  angular
    .module('jobs')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Jobs',
      state: 'jobs',
      type: 'dropdown',
      roles: ['*']
    }, '/jobs(/create?');

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'jobs', {
      title: 'List Jobs',
      state: 'jobs.list',
      roles: ['*']
	}, 'jobs');
	
    // Add the dropdown view item
    menuService.addSubMenuItem('topbar', 'jobs', {	
      title: 'Job Form',
      state: 'jobs.create'
	}, 'jobs/create');
  }
}());
