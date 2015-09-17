
///factory service to handle calc's internal state
angular.module('calculatorApp').factory('CalculatorDuties', function() {

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

});
