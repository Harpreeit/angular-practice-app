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
      roles: ['user']
    });

    // Add the dropdown view userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {
      title: 'My Profile',
      state: 'userprofiles.setting',
	});
	
    // Add the dropdown view userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {
      title: 'Personal Information',
      state: 'userprofiles.create',
	});
	
    // Add the dropdown view userprofiles
    menuService.addSubMenuItem('topbar', 'userprofiles', {
      title: 'Search Talent',
      state: 'userprofiles.userlist',
	});

  }
}());
