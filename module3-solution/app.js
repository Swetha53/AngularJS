(function () {
  'use strict'

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItem',FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    narrow.found = MenuSearchService.getItem();

    narrow.search = function () {
      if(narrow.searchTerm===""){
        MenuSearchService.deleteAll();
      }
      else {
        MenuSearchService.getMatchedMenuItem(narrow.searchTerm)
        .then(function (response) {
          narrow.found = response;
        });
      }
    }

    narrow.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItem.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'narrowDir',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var narrowDir = this;

    narrowDir.isEmpty = function () {
      if(narrowDir.found.length===0)
      return true;
      return false;
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
    var foundItem = [];

     service.getMatchedMenuItem = function (searchTerm) {
       foundItem.splice(0,foundItem.length);
       if(searchTerm==="")
       return foundItem;
       return $http({
         method: "GET",
         url: " https://davids-restaurant.herokuapp.com/menu_items.json"
       }).then(function (response) {
         var allItem = response.data.menu_items;
         foundItem.splice(0,foundItem.length);
         for(var i=0;i<allItem.length;i++)
         {
           if(allItem[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
           foundItem.push(allItem[i]);
         }
         return foundItem;
       });
     };

     service.removeItem = function (itemIndex) {
       foundItem.splice(itemIndex,1);
     };

     service.getItem = function () {
       return foundItem;
     };

     service.deleteAll = function () {
       foundItem.splice(0,foundItem.length);
     }
  }
})();
