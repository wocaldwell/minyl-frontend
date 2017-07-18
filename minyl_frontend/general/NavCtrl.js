app.controller('NavController', function($scope, $http, $location, apiURL, RootFactory) {

    let sessionToken = null;

    // redirect link to login page if user not logged in
    $scope.checkIfLoggedIn = function(link){
        sessionToken = RootFactory.getToken();
        if (sessionToken === null) {
            $location.path('/login');
        } else {
            $location.path(link);
        };
    };

    // hide nav elements based on page
    $scope.isActive = function() {
        if ('/' === $location.path() || '/register' === $location.path() || '/login' === $location.path()) {
            return true;
        } else {
            return false;
        };
    };

    // post demo user credentials to database for demo login
    $scope.demoLogin = function() {
        $http({
            url: `${apiUrl}/api-token-auth/`,
            method: "POST",
            data: {
              "username": "demo_user",
              "password": "1234567"
            }
        })
        .then(res => {
            RootFactory.setToken(res.data.token);
            if (res.data.token !== "") {
                $location.path('/home');
            }
        },
            console.error
        );
    };

    $scope.logout = function(){
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
