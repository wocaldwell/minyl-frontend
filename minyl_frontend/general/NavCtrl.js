app.controller('NavController', function($scope, $http, $location, RootFactory) {

    let sessionToken = null;

    $scope.checkIfLoggedIn = function(link){
        sessionToken = RootFactory.getToken();
        if (sessionToken === null) {
            $location.path('/login');
        } else {
            $location.path(link);
        };
    };

    $scope.changeUserStatus = function(){
        sessionToken = RootFactory.getToken();
        if (sessionToken !== null) {
            sessionToken = null;
            RootFactory.setToken(sessionToken);
            $location.path('/');
        } else {
            $location.path('/login');
        };
    };
});
