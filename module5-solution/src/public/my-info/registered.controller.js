(function () {
"use strict";

angular.module('public')
.controller('myInfoController', myInfoController);

myInfoController.$inject = ['formService', 'ApiPath'];

function myInfoController(formService, ApiPath) {
  var $ctrl = this;
  $ctrl.user = formService.getUser();
  $ctrl.basePath = ApiPath;
}

})();
