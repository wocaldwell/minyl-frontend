// angular.module('MinylClient').controller('MiCollectionController', [
//   '$scope',
//   '$http',
//   '$location',
//   'RootFactory',
//   'apiUrl',
// function($scope, $http, $location, RootFactory, apiUrl) {

//   $scope.releases = []

//   $http({
//     url: `${apiUrl}/micollection`,
//     headers: {
//       'Authorization': "Token " + RootFactory.getToken()
//     }
//   })
//   .then(
//     console.log('releases start', $scope.releases),
//     res => $scope.releases = res.data.results,
//     err => console.log

//   )
//   .then(console.log('releases are', $scope.releases))
// }]);

app.controller('MiCollectionController', function($scope, $http, $location, RootFactory, apiUrl) {

  $scope.releases = []
  console.log('releases begin', $scope.releases);

  function getMiCollection() {
    return $http({
      url: `${apiUrl}/micollection`,
    headers: {
      'Authorization': "Token " + RootFactory.getToken()
    }
    })
    .then(function(returnedCollection){
      console.log('returned data:', returnedCollection)
      $scope.releases = returnedCollection.data;
      console.log('releases are', $scope.releases);
      console.log('releases length', $scope.releases.length);
    });
  };

  getMiCollection();
});