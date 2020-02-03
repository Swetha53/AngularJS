(function () {
  'use strict';

  angular.module('LunchCheck',[])

  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.text = "";

    $scope.count = function () {
      $scope.text = Message(items.split(',').length);
    };

    function Message(var n) {
      if (n==0){
        text = 'Please enter data first';
      }
      else if (n<3) {
        text = "Enjoy!";
      }
      else {
        text = "Too much!";
      }
      return text;
    };
  }
})();
