
// Factory method to return math functions
angular.module('calculatorApp').factory('CalculatorFactory', function(){
        var add = function(a,b){
            return a + b;
        };
        var subtract  = function(a,b){
            return a - b;
        };
        var multiply =  function(a,b){
            return a * b;
        };
        var divide =  function(a,b) {
          return a / b;
        };
        var percentage = function(a){
          return  a /100;
        };
        var posNeg = function( a ){
          if(a > 0) {
            return -a;
          }
          else{
            return a* -1;
          }

        };
        var makeDecimal = function(a, b){
           return (a.toFixed(1) + percentage(b));
        };
        return {
          add: add, subtract :subtract , multiply:multiply, divide:divide,
          percentage:percentage, posNeg:posNeg, makeDecimal: makeDecimal
        };
});

