// Create main Angular module
var app = angular.module('MinylClient', ['ngRoute'])
            .constant('apiUrl', "http://localhost:8000");


angular.module('MinylClient').config(
[
  '$interpolateProvider',
  '$routeProvider',
  function($interpolateProvider, $routeProvider) {

    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');

    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'minyl_frontend/auth/login.html'
      })
      .when('/register', {
        controller: 'RegisterController',
        templateUrl: 'minyl_frontend/auth/register.html'
      })
      .when('/home', {
        controller: 'HomeController',
        templateUrl: 'minyl_frontend/members/home.html'
      })
  }
]);

angular.module('MinylClient').factory('RootFactory', [
  "$http",
  "apiUrl",
  ($http, apiUrl) => {
    let secure_token = null;

    return {
      getApiRoot () {
        return $http({
          url: apiUrl,
          headers: {
            'Authorization': "Token " + secure_token
          }
        }).then(res => res.data)
      },
      setToken (token) {
        secure_token = token
      },
      getToken () {
        return secure_token;
      }
    }
  }
]);