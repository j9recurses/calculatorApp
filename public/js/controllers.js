angular.module('calculatorApp')
    .controller('calculatorController', ['$scope', 'CalculatorFactory' , function($scope, CalculatorFactory) {

      //result val is constantly updated with operations and digit input;
      //is bound to the view and its value appears in the main calculator screen
      $scope.result = 0;
      $scope.entered1 = 0;  //first digit entered
      $scope.entered2 = 0;  //second digit entered
      $scope.operator = null //set the operator to empty; will trigger the doTheMath
                            //function when its not null to run the math operations

      $screenReset = true; //stores screen state; tells us whether or not
                          //we should store/register digits that a user is
                          //inputting

      $scope.ac = {label: "AC", value: true}

      $scope.digits = [
        {label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3},
        {label: "4", value: 4}, {label: "5", value: 5}, {label: "6", value: 6},
        {label: "7", value: 7}, {label: "8", value: 8}, {label: "9", value: 9},
        {label: "0", value: 0}
      ];

      //get the calc operator functions from the calculator factory service
      $scope.operators = [
        {label: "÷", operation: CalculatorFactory.divide }, {label: "x", operation: CalculatorFactory.multiply },
        {label: "+", operation: CalculatorFactory.add }, {label: "-", operation: CalculatorFactory.subtract  }
      ];

      //get the digit transform functions from the calculator factory service

      $scope.equals ={ label: "="};
      $scope.numTransforms = [
        {label: "%", operation: CalculatorFactory.percentage },
        {label: "+/-", operation: CalculatorFactory.posNeg },
        {label:".", operation: CalculatorFactory. makeDecimal}
      ];

      //function to reset the screen/the result val
      $scope.clearAll = function (digit) {
        $scope.result = 0;
      }

      //function to handle digit clicks;
      $scope.digitClicked = function (digit) {
        //controllers whether or not we will store
        //digits that a user is clicking on
        if ( $scope.screenReset) {
          $scope.result = digit;
          //after a user enters a number, we need to
          ///we set the screenReset val to false so
          ///that we know that there are numbers in the display
          $scope.screenReset  = false;
        }
        else {
          //We need to make room  in the display
          //for the nth/last digit entered.
          //So we can move the n-1 digit entered over to the left
          //by scaling the current display value by base 10
          //and then adding the second digit entered.
          //also need to save digit of the second item entered for
          //the math operation fxn
          $scope.result = $scope.result * 10 + digit;
        }
          //store the val of the number entered;
          //we will need this later to run the operator function
          $scope.entered2 = $scope.result
      };

      //called when a user clicks +,-, x, / buttons
      $scope.operatorClicked = function (operator) {

        //stores the operator function that the user
        //clicked on; will actually run the operation
        //when the user clicks on the equals= button
        $scope.operation = operator;

        //store the val of the first number that the user inputted.
        $scope.entered1 = $scope.result;
        $scope.entered2 = $scope.result;
        //after a math operation is clicked/entered, user will
        //need to enter a second number to run the operation on.
        //Set the screenReset var to true so we can store/get
        //new digits that user is clicking on.
        $scope.screenReset = true;
      };

      //called when the user clicks equals button. Runs the operation and
      //displays the result in the view.
      $scope.doTheMath = function () {
        if($scope.operation != null) {

          //update the view with the result from math operation on 2 numbers
          $scope.result = $scope.operation($scope.entered1, $scope.entered2);
          //after displaying result,
          $scope.screenReset = true;
          $scope.entered1 = $scope.result;
        }
      };

      //called when the user clicks on the +/-, . or % buttons;
      //transforms the current result into pos/neg, decimal, or percentage
      $scope.transformNum =  function (operator) {
          $scope.result =  operator($scope.result);
          //store the transformed number in variable so we can
          //use it later to run the operator function
          $scope.entered2 = $scope.result;
      };

  }]);



