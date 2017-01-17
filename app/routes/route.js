app.config(function($routeProvider, $locationProvider){

    $routeProvider

    .when('/', {
        templateUrl : 'app/views/home.html',
        controller     : 'HomeCtrl as vm',
    })

    .otherwise ({ redirectTo: '/' });
});


app.config(['$routeProvider', '$sceDelegateProvider',
        function ($routeProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

}]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

}]);