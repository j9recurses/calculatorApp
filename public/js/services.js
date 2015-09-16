// Factory method to return math functions
angular.module('calculatorApp').factory('CalculatorMath', function() {
    var add = function(a, b) {
        return a + b;
    };
    var subtract = function(a, b) {
        return a - b;
    };
    var multiply = function(a, b) {
        return a * b;
    };
    var divide = function(a, b) {
        if (b == 0) {
            return "Not a Number";
        }
        return a / b;
    };
    var percentage = function(a) {
        return a / 100;
    };
    var posNeg = function(a) {
        if (a > 0) {
            return -a;
        } else {
            return a * -1;
        }
    };
    var digitfirstDecimal = function(a, b) {
        return a + (b / 10);
    };

    var digitNPlusOneDecimal = function(a, b) {
        before = a.toString().split(".")[0];
        after = a.toString().split(".")[1];
        after = after + b;
        return parseFloat(before + "." + after);
    };

    var digitBase10 = function(a, b) {
        return a * 10 + b;
    };

    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        percentage: percentage,
        posNeg: posNeg,
        digitfirstDecimal: digitfirstDecimal,
        digitNPlusOneDecimal: digitNPlusOneDecimal,
        digitBase10: digitBase10
    };
}).factory('CalculatorSetup', function(CalculatorMath) {

    var mathStuff = function(clkfxns) {
        digits = generateDigits(10).sort();
        digitStrings = generateDigits(10).map(String).sort();
        mathStuff = {}
        mathStuff.operatorStrings = ["÷", "x", "+", "-", "%", "+/-"];
        mathStuff.digits = digits;
        mathStuff.digitStrings = digitStrings;
        mathStuff.operators = [
            CalculatorMath.divide,
            CalculatorMath.multiply,
            CalculatorMath.add,
            CalculatorMath.subtract,
            CalculatorMath.percentage,
            CalculatorMath.posNeg
        ];

        mathStuff.operatorsButton = [{
                label:"AC",
                operation: [true],
                combo: 'shift+c',
                description: 'AC Button-> Clears the screen',
                callback: function() {
                    clkfxns.acclx();
                }
            }, {
                label: "+",
                operation: CalculatorMath.add,
                combo: "shift+=",
                combo2: "ctrl+=",
                description: 'Add Button -> 2+2=4',
                callback: function() {
                    clkfxns.operatorclx(CalculatorMath.add);
                }
            }, {
                label: "-",
                operation: CalculatorMath.subtract,
                combo: "shift-",
                description: 'Minus Button -> 2-2=0',
                callback: function() {
                    clkfxns.operatorclx(CalculatorMath.subtract);
                }
            }, {
                label: "x",
                operation: CalculatorMath.multiply,
                combo: "shift+8",
                combo2: "ctrl+8",
                description: 'Multiply Button -> 2x2=4',
                callback: function() {
                    clkfxns.operatorclx(CalculatorMath.multiply);
                }
            }, {
                label: "÷",
                operation: CalculatorMath.divide,
                combo: "shift+/",
                description: 'Divide Button -> 2÷2=1',
                callback: function() {

                    clkfxns.operatorclx(CalculatorMath.divide);
                }
            }, {
                label: "%",
                operation: CalculatorMath.percentage,
                combo: "shift+5",
                combo2: "ctrl+5",
                description: 'Divide Button -> 2x2=4',
                callback: function() {

                    clkfxns.operatorclx(CalculatorMath.percentage);
                }
            }, {
                label: "+/-",
                operation: CalculatorMath.posNeg,
                combo: "~",
                description: 'Positive Negative Button -2 becomes 2',
                callback: function() {

                    clkfxns.transclx(CalculatorMath.posNeg);
                }
            }, {
                combo: ".",
                description: 'Decimal Place Button-> 2 becomes 2.0',
                callback: function() {

                    clkfxns.decimalclx();
                }
            }, {

                combo: "enter",
                description: 'Equals button -> runs the operators on n, n+2 numbers entered ',
                callback: function() {

                    clkfxns.equalsclx();
                }
            }
        ];

        //Polymorphic container to create the model digits data objects on start up.
        function calcContainer(a1, a2, key1, key2, key3, a3) {
            var key3 = key3 || 0;
            var a3 = a3 || 0;
            var calcContainer = []
            for (i = 0; i < a1.length; i++) {
                var calcContainerHash = {};
                calcContainerHash[key1] = a1[i];
                calcContainerHash[key2] = a2[i];
                if (key3 != 0) {
                    calcContainerHash[key3] = a3;
                }
                calcContainer.push(calcContainerHash);
            }
            return calcContainer;
        };
        mathStuff.digitsButton = calcContainer(mathStuff.digitStrings, mathStuff.digits, "label", "value");
        mathStuff.digitkeyboardKeys = calcContainer(mathStuff.digitStrings, mathStuff.digits, "kb", "digit", "optfxn", clkfxns.digitclx);

        return mathStuff;
    };

    var generateDigits = function(nDigits) {
        return Array.apply(null, {
            length: nDigits
        }).map(Number.call, Number);
    };


    return {
        generateDigits: generateDigits,
        mathStuff: mathStuff
    };

}).factory('CalculatorDuties', function() {

    //init, setter and getter functions for the calc
    var intializeCalc = function() {
        calc = {};
        //result val is constantly updated with operations and digit input;
        //is bound to the view and its value appears in the main calculator screen
        calc.results = 0
        calc.entered1 = 0; //first digit entered
        calc.entered2 = 0; //second digit entered
        calc.operator = null; //set the operator to empty; will trigger the doTheMath

        //flag for checking the screen state screen; tells us whether or not
        ///we should add the digits that user is entering to the right of the
        ///digit entered. Will need to clear the screen after operations and equals functions
        calc.screenReset = true;
        calc.decimalClick = false; //use to record if a decimal click has occured.
        calc.ac = true;
        //used to determine if a user entered a decimal number
        //that has more than one decimal places
        calc.decimalClickDouble = false;
        return calc
    };

    //function to reset the screen and calc result
    var clearAll = function(calc) {
        calc.result = 0;
        calc.screenReset = true;
        calc.entered1 = 0;
        calc.entered2 = 0;
        calc.operator = null;
        calc.decimalClick = false;
        calc.decimalClickDouble = false;
        calc.operation = null
        calc.ac = true;
        return calc
    };

    return {
        clearAll: clearAll,
        intializeCalc: intializeCalc

    };

}).factory('CalcClicks', function(CalculatorMath) {

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
