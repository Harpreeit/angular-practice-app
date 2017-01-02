(function () {
  'use strict';

  angular
    .module('userprofiles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'User Profile',
      state: 'userprofiles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown view userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {
      title: 'View Profile',
      state: 'userprofiles.settingview',
	}, '/userprofiles/settingview');
	
    // Add the dropdown view userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {
      title: 'Personal Information',
      state: 'userprofiles.create',
	}, '/userprofiles');
	
    // Add the dropdown view userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {
      title: 'Search Talent',
      state: 'userprofiles.list',
	}, '/userprofiles/list');
    
    // Add the dropdown view userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {
      title: 'Profile',
      state: 'userprofiles.view',
	}, '/userprofiles/:userprofileId');
/*	
    // Add the dropdown create userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Profile Form',
      state: 'userprofiles.create'
	}, '/userprofiles/create');	

    // Add the dropdown list userjobs
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Job Experience',
      state: 'userjobs.list'
	}, 'userjobs');	
    
    // Add the dropdown create userjobs
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Job Experience Form',
      state: 'userjobs.create'
	}, '/create');	
    
    // Add the dropdown list educations
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Education',
      state: 'educations.list'
	}, 'educations');
   	
    // Add the dropdown create educations
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Education Form',
      state: 'educations.create'
	}, '/create');
   	
    // Add the dropdown list skills
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Skills',
      state: 'skills.list'
	}, 'skills');	
    	
    // Add the dropdown create skills
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Add Skills',
      state: 'skills.create'
	}, '/create');	
    	
    // Add the dropdown list achievements
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Achievements',
      state: 'achievements.list'
	}, 'achievements');	
    	
    // Add the dropdown create achievements
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Achievements Form',
      state: 'achievements.create'
	}, '/create');	
    	
    // Add the dropdown list projects
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Projects',
      state: 'projects.list'
	}, 'projects')
    
    // Add the dropdown create projects
    menuService.addSubMenuItem('topbar', 'userprofiles', {	
      title: 'Add Projects',
      state: 'projects.create'
	}, '/create');	
*/
  }
}());
