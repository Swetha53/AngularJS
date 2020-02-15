(function () {
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var list1 = this;

    list1.toBuy = ShoppingListCheckOffService.getToBuyItem();

    list1.buyItemName = "";
    list1.buyItemQuantity = "";

    list1.addItem = function () {
      ShoppingListCheckOffService.addItem(list1.buyItemName, list1.buyItemQuantity);
    };

    list1.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list2 = this;

    list2.bought = ShoppingListCheckOffService.getBoughtItem();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuy = [{name:"Cookies",quantity:"10 bags"},{name:"Cheese",quantity:"2 packets"},
    {name:"Milk",quantity:"3 bottles"},{name:"Instant Noodles",quantity:"4 packets"},
  {name:"Bread",quantity:"2 packets"}];
    var bought = [];

    service.addItem = function (buyItemName,buyItemQuantity) {
      var item = {
        name: buyItemName,
        quantity: buyItemQuantity
      };
      toBuy.push(item);
    };

    service.removeItem = function (itemIndex) {
      bought.push(toBuy[itemIndex]);
      toBuy.splice(itemIndex,1);
    };

    service.getToBuyItem = function () {
      return toBuy;
    };

    service.getBoughtItem = function () {
      return bought;
    };
  }

})();
