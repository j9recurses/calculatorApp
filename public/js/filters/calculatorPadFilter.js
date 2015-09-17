
//filter function to be able to slice arrays in the view
angular.module("calculatorApp").filter('slice', function() {
  return function(arr, start, end) {
      return arr.slice(start, end);
  };
});
