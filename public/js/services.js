
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
        var digitfirstDecimal = function(a,b){
          return a + (b/10);
        };
        var digitNPlusOneDecimal = function(a, b){
            console.log(a.toString().split(".")[0]);
            console.log(a.toString().split(".")[1]);
            before =  a.toString().split(".")[0];
            after =   a.toString().split(".")[1];
            after =   after +b ;
            return parseFloat(before + "." + after);
        };

       var digitBase10 = function(a, b){
          return a * 10 + b;
        };

        return {
          add: add, subtract :subtract , multiply:multiply, divide:divide,
          percentage:percentage, posNeg:posNeg, digitfirstDecimal: digitfirstDecimal,
          digitNPlusOneDecimal: digitNPlusOneDecimal,digitBase10:digitBase10
        };
});

