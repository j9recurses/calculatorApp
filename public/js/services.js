// Factory method to return math functions
angular.module('calculatorApp').factory('CalculatorMathFactory', function() {
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
        return a / b;
    };
    var percentage = function(a) {
        return a / 100;
    };
    var posNeg = function(a) {
        console.log("in here");
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
}).factory('CalculatorSetupFactory', function() {
    //creates the hash to store key codes.
    var KbKpDigitKeys = function(digitCodeStart, digitCodeEnd, digitClicked_fxn) {
        var kbKeys = [];
        var val = 0;
        for (var kc = 48; kc < 58; kc++) {
            kbKeys.push({
                code: kc,
                val: val,
                optfxn: digitClicked_fxn
            });
            val++;
        }
        return kbKeys;
    };

    //makes the digits hash that contains digits labels and vals
    var digits = function() {
        digits = [];
        for (i = 1; i < 10; i++) {
            digits.push({
                label: i.toString(),
                value: i
            });
        }
        digits.push({
            label: "0",
            value: 0
        });
        return digits;
    };
    //makes the ac clear button
    var ac = function() {
        var ac = {
            label: "AC",
            value: true
        };
        return ac;
    };


    //number tranform functions
    var operatorContainer = function(a1, a2) {
        var operatorContainer = []
        for (i = 0; i < a1.length; i++) {
            operatorContainer.push({
                label: a1[i],
                operation: a2[i]
            });
        }
        return operatorContainer;
    };


    var transformKeys = function(a1, a2) {
        var transformKeys = []
        for (i = 0; i < a1.length; i++) {
            transformKeys.push({
                code: a1[i],
                optfxn: a2[i]
            });
        }
        return transformKeys;
    };

    return {
        KbKpDigitKeys: KbKpDigitKeys,
        digits: digits,
        ac: ac,
        operatorContainer: operatorContainer,
        transformKeys: transformKeys
    };

});
