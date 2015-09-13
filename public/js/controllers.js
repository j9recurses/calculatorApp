angular.module('calculatorApp')
    .controller('calculatorController', ['$scope', function($scope) {

      $scope.result = 0;  //current value on screen/double binding will update
      $scope.digits = [
        {label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3},
        {label: "4", value: 4}, {label: "5", value: 5}, {label: "6", value: 6},
        {label: "7", value: 7}, {label: "8", value: 8}, {label: "9", value: 9},
        {label: "0", value: 0},
      ];
      $scope.operators = [
        {label: "÷", value: "÷"}, {label: "x", value: "x"},
        {label: "+", value: "+"}, {label: "-", value: "-"},
        {label: "=", value: "="}, {label: "+/-", value: "+/-"},
        {label: "%", value: "%"}, {label:".", value:"."}
      ];


      ///will change from AC to C on keypress or click
      $scope.ac = "AC"



  }]);



