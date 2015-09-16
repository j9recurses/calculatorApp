angular.module('calculatorApp')
    .controller('calculatorController', ['$scope', 'CalculatorMath', 'CalculatorSetup', 'CalculatorDuties', 'CalcClicks',  'hotkeys', function($scope, CalculatorMath, CalculatorSetup, CalculatorDuties, CalcClicks, hotkeys) {


        $scope.result = 0; //stores the result and displays result to user in the view

        //button to clear the screen and the result
        ////ac/clear button that clears screen on click
        $scope.clearAll = function() {
            calc = CalculatorDuties.clearAll(calc);
            $scope.result = calc.result;
        };

        //function to handle digit clicks;
        //input is the digit that user clicked on
        //updates the result on screen
        $scope.digitClicked = function(digit) {
            calc = CalcClicks.digitWasClicked(calc, digit);
            $scope.result = calc.result;
        };

        //called when a user clicks +,-, x, / buttons
        //Runs the math function and updates the result on screen
        $scope.operatorClicked = function(operator) {
            calc = CalcClicks.operatorWasClicked(calc, operator);
            $scope.result = calc.result;
        };

        //the user clicks on equals
        $scope.doTheMath = function() {
            calc = CalcClicks.doingTheMath(calc);
            $scope.result = calc.result;
        };

        //called when the user clicks on the +/-, . or % buttons;
        //transforms the current result into pos/neg, decimal, or percentage
        $scope.transformDigitClick = function(operator) {
            calc = CalcClicks.transformDigitWasClick(calc, operator)
            $scope.result = calc.result;
        };

        //function called when decimal button is clicked
        $scope.decimalClicked = function() {
            calc = CalcClicks.decimalWasClicked(calc);
            $scope.result = calc.result;
        };

        //pass the button functions to the setup functions
        //so we can use them later
        var mathStuff = CalculatorSetup.mathStuff({
            digitclx: $scope.digitClicked,
            operatorclx: $scope.operatorClicked,
            transclx: $scope.transformDigitClick,
            acclx: $scope.clearAll,
            decimalclx: $scope.decimalClicked,
            equalsclx: $scope.doTheMath
        });

        var calc = CalculatorDuties.intializeCalc(); //intializes a calc obj
        ///generates the data and logical structure
        /// to build out the calculator views
        function buildViewsAndDataForViews(clxfxns) {

            //setup the digits hash, with the digit clicked function
            $scope.digits = mathStuff.digitsButton;

            //get the calc operator functions from the calculator factory service
            $scope.operators = mathStuff.operatorsButton;

            $scope.digitKeyBoardKeys = mathStuff.digitkeyboardKeys;
        };
        buildViewsAndDataForViews();

        //create a on listener thats listening for
        //key press events. When it hears
        //a key press look up the valuse of the keys
        //in a dictionary, and then run the appropriate
        //function based on the key pressed.
        $scope.$on('keydown keypress', function(msg, keyobj) {
            for (i = 0; i < $scope.digitKeyBoardKeys.length; i++) {
                if ($scope.digitKeyBoardKeys[i].kb === (keyobj.key)) {
                    $scope.digitKeyBoardKeys[i].optfxn($scope.digitKeyBoardKeys[i].digit);
                    $scope.$apply();
                }
            }
        });


        //build out the operator keys (ie % is actual shift+5 or
        //  or + is + is actual shift =  keys) Ssing the
        //hot keys library to pick up the key combos because
        //dont have time to write code that would look for key combos
        for (i = 0; i < $scope.operators.length; i++) {
            hotkeys.add({
                combo: $scope.operators[i].combo,
                description: $scope.operators[i].description,
                callback: $scope.operators[i].callback
            });
        }
    }]);
