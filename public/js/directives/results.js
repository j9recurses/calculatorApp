///directive to handle the resizing of numbers
///as user enters digits the amt of numbers in the
///view increases so we want to resize the result in the view.
angular.module('calculatorApp').directive('results', function() {
    return {
        'scope': false,
        'link': function(scope, element, attrs) { //watch the result, change the font size as
            //the result gets bigger in the view
            var fontsize = 50;
            var newsize;
            var paddingbottom = 6;
            var newpaddingbottom;
            var paddingtop = 1;
            var newpaddingtop;

            ///watcher function to change on result;
            scope.$watch(
                // This function returns the value being watched. It is called for each turn of the $digest loop
                function() {
                    return  scope.result;
                },
                // This is the change listener, called when the value returned from the above function changes
                function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        var resultlen = scope.result.toString().length;
                        console.log(resultlen);
                        if (resultlen < 10) {
                            newsize = 50;
                            newpaddingbottom = 5;
                            paddingtop = 0;
                        } else {
                            newsize = fontsize -1;
                            if (newsize < 3) {
                                newsize = 5;
                            }
                            fontsize = newsize;
                            newpaddingbottom = paddingbottom - 0.5;
                            paddingbottom = newpaddingbottom;
                            if (newpaddingbottom < 0) {
                                newpaddingtop = paddingtop + 0.05;
                                paddingtop = newpaddingtop;
                            }

                        }
                        // Only increment the counter if the value changed
                        scope.style = function() {
                            return {
                                "font-size": newsize + 'px',
                                "padding-bottom": newpaddingbottom + '%',
                                "padding-top": newpaddingtop + "%"
                            };
                        }
                    }
                }
            );

        }
    };
});
