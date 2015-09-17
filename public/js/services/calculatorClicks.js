
//service to handle data persistence/managment after a click/key input
angular.module('calculatorApp').factory('CalculatorClicks', function(CalculatorMath) {

    //input is the digit that user clicked on
    //fxn takes the input and adds numbers into the result.
    //Also checks flags to
    //see if the the result needs to transformed into
    //either a percent or decimal number
    var digitWasClicked = function(calc, digit) {

        if (calc.screenReset) {
            calc.result = digit;

            //after a user enters a number, we need to
            //set flag to false;
            //will add new inputs to the right of the last digit entered
            calc.screenReset = false;
        }

        //decimal- checks to see if the user wants to convert input
        //digits into decimal numbers
        else if (calc.decimalClick) {
            if (calc.decimalClickDouble) {
                calc.result = CalculatorMath.digitNPlusOneDecimal(calc.entered2, digit)
            } //needs
            else {
                calc.decimalClickDouble = true;
                calc.result = CalculatorMath.digitfirstDecimal(calc.entered2, digit)
            }
        } else {
            //move the display val to left by base 10;
            calc.result = CalculatorMath.digitBase10(calc.result, digit);

        }
        //store the val of the number entered;
        //we will need this later to run the operator function
        calc.entered2 = calc.result;
        calc.ac = false;
        return calc;
    };

    //check see if there an operation already stored
    //if exists, show the result to the user, then accept
    //the new math operator
    var operatorWasClicked = function(calc, operator) {
        if (calc.operation) {
            ///need to come back to this
            doingTheMath(calc);
        }
        //stores the operator that the user clicked on
        calc.operation = operator;
        //store the val of the first number that the user inputted.
        calc.entered1 = calc.result;
        calc.entered2 = calc.result;
        //after a math operation is clicked/entered, user will
        //need to enter a second number to run the operation on.
        //Set the screenReset var to true so we can store/get
        //new digits that the user is clicking on.
        calc.screenReset = true;
        ///clear out the decimal click bools
        calc.decimalClick = false;
        calc.decimalClickDouble = false;
        return calc;

    };

    //Runs the given operation on 2 digit values and
    //displays the result in the view.
    var doingTheMath = function(calc) {
        if (calc.operation != null) {
            //update the view with the result from math operation on 2 numbers
            calc.result = calc.operation(calc.entered1, calc.entered2);
            //after displaying result, don't need to keep
            //track of digit keys entered
            calc.screenReset = true;

            //clear the operation that was just run
            calc.operation = null;

            //clear the decimal flags
            calc.decimalClick = false;
            calc.decimalClickDouble = false;

            //saves the current result as the first val
            //for the next operation
            calc.entered1 = calc.result;
        }
        return calc;
    };

    //called when the user clicks on the +/-, . or % buttons;
    //transforms the current result into pos/neg, decimal, or percentage
    var transformDigitWasClick = function(calc, operator) {
        calc.result = operator(calc.result);
        //store the transformed number in variable so we can
        //use it later to run the operator function
        calc.entered2 = calc.result;
        return calc;
    };

    //function called when decimal button is clicked
    var decimalWasClicked = function() {
        // $scope.decimaloperator = operator;
        calc.decimalClick = true;
        calc.result = calc.result + ".";
        return calc;
    };



    return {
        digitWasClicked: digitWasClicked,
        operatorWasClicked: operatorWasClicked,
        doingTheMath: doingTheMath,
        decimalWasClicked: decimalWasClicked,
        transformDigitWasClick: transformDigitWasClick,
        doingTheMath:doingTheMath
    };


});
