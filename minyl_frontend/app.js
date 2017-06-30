// Create main Angular module
var app = angular.module('MinylClient', ['ngRoute', 'angular.filter'])
            .constant('apiUrl', "https://api.www.williamocaldwell.com");


angular.module('MinylClient').config(
[
  '$interpolateProvider',
  '$routeProvider',
  function($interpolateProvider, $routeProvider) {

    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');

    $routeProvider
      .when('/', {
        controller: 'SplashController',
        templateUrl: 'minyl_frontend/general/splash.html'
      })
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
      .when('/micollection', {
        controller: 'MiCollectionController',
        templateUrl: 'minyl_frontend/members/micollection.html'
      })
      .when('/miwants', {
        controller: 'MiWantsController',
        templateUrl: 'minyl_frontend/members/miwants.html'
      })
      .when('/addform', {
        controller: 'AddFormController',
        templateUrl: 'minyl_frontend/members/addform.html'
      })
      .when('/addresults', {
        controller: 'AddResultsController',
        templateUrl: 'minyl_frontend/members/addresults.html'
      })
      .when('/searchresults', {
        controller: 'SearchResultsController',
        templateUrl: 'minyl_frontend/members/searchresults.html'
      })
      .when('/noresults', {
        controller: 'NoResultsController',
        templateUrl: 'minyl_frontend/members/noresults.html'
      })
      .when('/wantsearchresults', {
        controller: 'WantSearchResultsController',
        templateUrl: 'minyl_frontend/members/wantsearchresults.html'
      })
      .when('/addmiwants', {
        controller: 'AddMiWantsController',
        templateUrl: 'minyl_frontend/members/addmiwants.html'
      })
      .when('/releasedetails', {
        controller: 'ReleaseDetailsController',
        templateUrl: 'minyl_frontend/members/releasedetails.html'
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
        console.log("I'm trying to get the api root. . .", secure_token)
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
