(function () {
  "use strict";

  angular.module('public')
  .service('formService',formService);

  function formService() {
    var service = this;
    var user;

    service.setUser = function(user) {
      service.user = user;
    }

    service.getUser = function(){
      return service.user;
    }
  }
})();
