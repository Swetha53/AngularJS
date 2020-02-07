(function () {
  'use strict';

  angular.module('LunchCheck',[])

  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope','$filter'];
  function LunchCheckController($scope,$filter) {
    $scope.items = "";
    $scope.text = " ";
    $scope.color= "#000000";

    $scope.count = function () {
      var n = $scope.items.split(',').length;
      Message(n);
    };

    function Message(n) {
      if ($scope.items==""){
        $scope.text = "Please enter data first";
      }
      else if (n<=3) {
        $scope.text = "Enjoy!";
        $scope.color = "#7FFF00";
      }
      else {
        $scope.text = "Too much!";
        $scope.color = "#FF0000";
      }
    }
  }
})();
