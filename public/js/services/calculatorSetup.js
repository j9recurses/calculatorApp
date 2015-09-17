//Service to generate calc app data
angular.module('calculatorApp').factory('CalculatorSetup', function(CalculatorMath) {

    var mathStuff = function(clkfxns) {
        digits = generateDigits(10).sort();
        digitStrings = generateDigits(10).map(String).sort();
        mathStuff = {}
        mathStuff.operatorStrings = ["÷", "x", "+", "-", "%", "+/-"];
        mathStuff.digits = digits;
        mathStuff.digitStrings = digitStrings;

        mathStuff.operatorsButton = [{
            label: "AC",
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
            description: 'Add Button -> 2+2=4',
            callback: function() {
                clkfxns.operatorclx(CalculatorMath.add);
            }
        }, {
            label: "-",
            operation: CalculatorMath.subtract,
            combo: 'shift+-',
            description: 'Minus Button -> 2-2=0',
            callback: function() {
                clkfxns.operatorclx(CalculatorMath.subtract);
            }
        }, {
            label: "x",
            operation: CalculatorMath.multiply,
            combo: 'shift+8',
            description: 'Multiply Button 2x2=4',
            callback: function() {
            ///console.log("in side multiply")
            ///button not totally working right
            ///not surpressing the 8....
            clkfxns.operatorclx(CalculatorMath.multiply);
            }
        }, {
            label: "÷",
            operation: CalculatorMath.divide,
            combo: 'shift+/',
            description: 'Divide Button -> 2÷2=1',
            callback: function() {

                clkfxns.operatorclx(CalculatorMath.divide);
            }
        }, {
            label: "%",
            operation: CalculatorMath.percentage,
            combo: 'shift+5',
            description: 'Divide Button -> 2x2=4',
            callback: function() {
                clkfxns.transclx(CalculatorMath.percentage);
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
            combo: 'shift+.',
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
        }];

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

});
