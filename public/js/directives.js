//use a directive to capture the key input
angular.module('calculatorApp').directive('keyTrap', function(){
 return function( scope, elem ) {
    //bind keydown events to a given elem
    elem.bind('keydown', function( event ) {
      scope.$broadcast('keydown', { code: event.keyCode } );
    });
  };
});



// This directive binds keydown events to elements;
// when it hears a keydown event, it broadcasts a variable code,
// which contains the key code/val that was recorded on the keydown event.
// The variable code is broacasted in throught out the scope that directive
// is applied to.
