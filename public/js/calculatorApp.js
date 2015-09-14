// Set up main routes in app and inject 3rd party libs/dependencies

angular.module('calculatorApp', [ 'ngRoute', 'ui.bootstrap',  'ngSanitize', 'ngResource'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/calculator'
            })
            .when('/calculator', {
                templateUrl: 'views/calculator.html',
                controller: 'calculatorController'
            })
             .when('/code_explained', {
                templateUrl: 'views/approach.html',
                controller: 'approachController'
            })
        .otherwise({
            redirectTo: '/'
        });

    }]);
