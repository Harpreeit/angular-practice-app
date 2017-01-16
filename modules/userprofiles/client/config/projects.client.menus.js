(function () {
  'use strict';

  angular
    .module('projects')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Projects',
      state: 'projects',
      type: 'dropdown',
      roles: ['*']
    }, '/projects(/create?');
    	
    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'projects', {	
      title: 'View Projects',
      state: 'projects.list',
      roles: ['*']
	}, 'projects');	
    
  }
}());
    