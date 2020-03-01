(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home',{
      url: '/',
      template: '<h3>We have all the options in the world!!</h3>'
    })

    .state('categories',{
      url: '/categories',
      templateUrl: 'categoriesCtrl.html',
      controller: 'categoriesController as catctrl',
      resolve: {
        categories: ['MenuDataService',function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('items',{
      url: '/items/{shortName}',
      templateUrl: 'itemsCtrl.html',
      controller: 'itemsController as itctrl',
      params: {
        shortName: null,
      },
      resolve: {
        items: ['$stateParams','MenuDataService',function ($stateParams,MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.shortName);
        }]
      }
    });
  }
})();
