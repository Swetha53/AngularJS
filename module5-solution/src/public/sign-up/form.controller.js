(function () {
"use strict";

angular.module('public')
.controller('FormController', FormController);

FormController.$inject = ['MenuService','menuItems','formService'];
function FormController(MenuService,menuItems,formService) {
  var $ctrl = this;
  var shortName = [];
  for(var i=0;i<menuItems.menu_items.length;i++)
  {
    shortName.push(menuItems.menu_items[i].short_name);
  }

  $ctrl.validate = function () {
    if($ctrl.user != undefined && $ctrl.user.favorite != undefined)
    {
      var favorite = $ctrl.user.favorite.toLower();
      if(shortName.indexOf(favorite) != -1)
      {
        $ctrl.invalid = false;
      }
      else {
        $ctrl.invalid = true;
      }
    }
    else {
      $ctrl.invalid = true;
    }
  }

  $ctrl.submit = function() {
  MenuService.getShortName($ctrl.user.favorite).then(function(result) {
    $ctrl.invalid = false;
    $ctrl.user.favoriteDish = result;
    formService.setUser($ctrl.user);
    $ctrl.register = true;
  }, function(error) {
    $ctrl.invalid = true;
    $ctrl.register = false;
  });
}
}


})();
