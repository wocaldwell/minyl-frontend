angular.module('MinylClient').controller('LoginController', [
  '$scope',
  '$http',
  '$location',
  'RootFactory',
  'apiUrl',
function($scope, $http, $location, RootFactory, apiUrl) {

  $scope.user = {
    username: 'wocaldwell',
    password: '1234567'
  };

  $scope.login = function() {
      $http({
        url: `${apiUrl}/api-token-auth/`,
        method: "POST",
        data: {
          "username": $scope.user.username,
          "password": $scope.user.password
        }
      }).then(
        res => {
          RootFactory.setToken(res.data.token);
          // if (res.data.token !== "") {
          //   $http({
          //     url: `${apiUrl}/login/`,
          //     method: "POST",
          //     data: {
          //       "username": $scope.user.username,
          //       "password": $scope.user.password
          //     }
          //   });
          //   $location.path('/home');
          // }
        },
        console.error
      );
  };

}]);





