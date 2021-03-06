angular.module('MinylClient').controller('RegisterController', [
  '$scope',
  '$http',
  '$location',
  'RootFactory',
  'apiUrl',
function($scope, $http, $location, RootFactory, apiUrl) {

// make a user instance
  $scope.user = {
    email: "me@internet.com",
    username: "",
    password: ""
  };

// post user the entered credentials to database
  $scope.register = function() {
      $http({
        url: `${apiUrl}/register/`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "username": $scope.user.username,
          "password": $scope.user.password,
          "email": $scope.user.email
        }
      }).then(
        res => {
          RootFactory.setToken(res.data.token);
          if (res.data.token !== "") {
            $location.path('/home');
          }
        },
        console.error
      );
  };

}]);





