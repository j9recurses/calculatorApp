angular.module('calculatorApp')
    .controller('calculatorController', ['$scope', 'CalculatorMathFactory', 'CalculatorSetupFactory', function($scope, CalculatorMathFactory, CalculatorSetupFactory) {

        //result val is constantly updated with operations and digit input;
        //is bound to the view and its value appears in the main calculator screen
        $scope.result = 0;
        $scope.entered1 = 0; //first digit entered
        $scope.entered2 = 0; //second digit entered
        $scope.operator = null //set the operator to empty; will trigger the doTheMath
            //function when its not null to run the math operations

        //a flag for clearing the output screen; tells us whether or not
        //we should store/register digits that a user is inputting into the keypad
        $scope.screenReset = true;

        $scope.decimalClick = false; //use to record if a decimal click has occured.

        //used to determine if a user entered a decimal number
        //that has more than one decimal places
        $scope.decimalClickDouble = false;

        //ac/clear button that clears screen on click
        $scope.ac = CalculatorSetupFactory.ac();

        //setup the digits
        $scope.digits = CalculatorSetupFactory.digits();
        //for(var i in $scope.digits){console.log($scope.digits[i]);}

        //get the calc operator functions from the calculator factory service
        $scope.operators = CalculatorSetupFactory.operatorContainer (
                                            ["÷", "x", "+", "-"],
                                            [CalculatorMathFactory.divide,
                                            CalculatorMathFactory.multiply,
                                            CalculatorMathFactory.add,
                                             CalculatorMathFactory.subtract]
          );


        //setup t the digit transform functions %, +/-, . from the calculator factory service
         $scope.numTransforms = CalculatorSetupFactory.operatorContainer( ["%", "+/-"], [CalculatorMathFactory.percentage, CalculatorMathFactory.posNeg ])

         console.log($scope.numTransforms);
         //dot and equal symbols for the view
         $scope.dot = ".";
         $scope.eq = "="

        //function to reset the screen and calculator
        $scope.clearAll = function(digit) {
            $scope.result = 0;
            $scope.screenReset = true;
            $scope.entered1 = 0;
            $scope.entered2 = 0;
            $scope.operator = null;
            $scope.decimalClick = false;
            $scope.decimalClickDouble = false;
        }

        //function to handle digit clicks;
        $scope.digitClicked = function(digit) {
            //controllers whether or not we will store
            //digits that a user is clicking on
            if ($scope.screenReset) {
                $scope.result = digit;
                //after a user enters a number, we need to
                ///we set the screenReset val to false so
                ///that we know that there are numbers in the display
                $scope.screenReset = false;
            }

            //run decimal conversion after 2 numbers have
            //been inputed and decimal button click event
            else if ($scope.decimalClick) {
                if ($scope.decimalClickDouble) {
                    //after 1 decimal place dit has been entered
                    //need to divide the result by base
                    //10 every time a decimal digit is entered
                    //($scope.entered2 / 10) + digit;
                    $scope.result = CalculatorMathFactory.digitNPlusOneDecimal($scope.entered2, digit)
                } else {
                    $scope.decimalClickDouble = true;
                    $scope.result = CalculatorMathFactory.digitfirstDecimal($scope.entered2, digit)
                        //$scope.entered2 + (digit/10);
                }
            } else {
                //We need to make room  in the display
                //for the nth/last digit entered. ie "1" "2" "3"
                //button clicks = the number 1,2,3
                //So we can move the n-1 digit entered over to the left
                //by scaling the current display value by base 10
                //and then adding the second digit entered.
                //also need to save digit of the second item entered for
                //the math operation fxn
                $scope.result = CalculatorMathFactory.digitBase10($scope.result, digit);

            }
            //store the val of the number entered;
            //we will need this later to run the operator function
            $scope.entered2 = $scope.result;
        };

        //called when a user clicks +,-, x, / buttons
        $scope.operatorClicked = function(operator) {
            //check see if there an operation already stored
            //if exists, show the result to the user, then accept
            //the new math operator
            if ($scope.operation) {
                $scope.doTheMath();
            }
            //stores the operator that the user clicked on
            $scope.operation = operator;
            //store the val of the first number that the user inputted.
            $scope.entered1 = $scope.result;
            $scope.entered2 = $scope.result;
            //after a math operation is clicked/entered, user will
            //need to enter a second number to run the operation on.
            //Set the screenReset var to true so we can store/get
            //new digits that the user is clicking on.
            $scope.screenReset = true;
            ///clear out the decimal click bools
            $scope.decimalClick = false;
            $scope.decimalClickDouble = false;
        };


        //Runs the given operation on 2 digit values and
        //displays the result in the view.
        $scope.doTheMath = function doTheMath() {
            if ($scope.operation != null) {
                //update the view with the result from math operation on 2 numbers
                $scope.result = $scope.operation($scope.entered1, $scope.entered2);
                //after displaying result, don't need to keep
                //track of digit keys entered
                $scope.screenReset = true;

                //clear the operation that was just run
                $scope.operation = null;

                //clear the decimal flags
                $scope.decimalClick = false;
                $scope.decimalClickDouble = false;

                //saves the current result as the first val
                //for the next operation
                $scope.entered1 = $scope.result;
            }
        };

        //called when the user clicks on the +/-, . or % buttons;
        //transforms the current result into pos/neg, decimal, or percentage
        $scope.transformNum = function(operator) {
            $scope.result = operator($scope.result);
            //store the transformed number in variable so we can
            //use it later to run the operator function
            $scope.entered2 = $scope.result;
        };

        //function called when decimal button is clicked
        $scope.decimalClicked = function() {
            // $scope.decimaloperator = operator;
            $scope.decimalClick = true;
            $scope.result = $scope.result + ".";
        };


       //create a on listener thats listening for
       //key press events. When it hears
       //a key press look up the valuse of the keys
       //in a dictionary, and then run the appropriate
       //function based on the key pressed.
        $scope.keycode = "in here"
        $scope.$on('keydown', function(msg, obj) {
            // $scope.code = obj.code;
            $scope.keycode = obj.code;
            for (i = 0; i < $scope.kbKeys.length; i++) {
                if ($scope.kbKeys[i].code ==  $scope.keycode) {
                    console.log("in here");
                    console.log($scope.kbKeys[i].val);
                    $scope.kbKeys[i].optfxn($scope.kbKeys[i].val);
                    $scope.$apply();
                }
            }
        });

      //make the keyboard keys
        $scope.kbKeys = CalculatorSetupFactory.KbKpDigitKeys(48, 58, $scope.digitClicked);
        //make the keypad keys
        //$scope.kpKeys = CalculatorSetupFactory.KbKpDigitKeys(96, 106, $scope.digitClicked);





    }]);
