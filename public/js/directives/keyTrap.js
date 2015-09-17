// This directive binds keydown events to elements;
// when it hears a keydown event, it broadcasts the key code of the
// key that pressed down on.

//use a directive to capture the key input
angular.module('calculatorApp').directive('keyTrap', function() {
    return function(scope, elem) {
        //bind keydown events to a given elem
        elem.bind('keydown keypress', function(event) {
            scope.$broadcast('keydown keypress', {
                kevent: event,
                code: event.keyCode,
                key: String.fromCharCode(event.which)
            });
            event.preventDefault();
        });
    };
});
