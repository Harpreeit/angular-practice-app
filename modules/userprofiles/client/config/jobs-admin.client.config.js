(function () {
  'use strict';

  // Configuring the Userprofiles Admin module
  angular
    .module('userprofiles.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Userprofiles',
      state: 'admin.userprofiles.list'
    });
  }
}());
