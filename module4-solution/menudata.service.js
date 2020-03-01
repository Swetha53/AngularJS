(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService',MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log("Inside getAllCategories"+error);
      });
    };

      service.getItemsForCategory = function (shortName) {
      return  $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="),
      params: {
        category: shortName
      }
      }).then(function (response) {
        console.log(response.data.menu_items);
        return response.data.menu_items;
      }).catch(function (error) {
        console.log("Inside getItemForCategory"+error);
      });
    };
  }
})();
