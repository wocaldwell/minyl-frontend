
app.controller('MiCollectionController', function($scope, $http, $location, RootFactory, apiUrl) {

  $scope.releases = []
  console.log('releases begin', $scope.releases);

  function getMiCollection() {
    return $http({
      url: `${apiUrl}/micollection/`,
      headers: {
        'Authorization': "Token " + RootFactory.getToken()
      }
    })
    .then(function(returnedCollection){
      console.log('returned data:', returnedCollection)
      $scope.releases = returnedCollection.data;
      console.log('releases are', $scope.releases);
      for (release in $scope.releases) {
        if ($scope.releases[release].release_type === 1) {
          $scope.releases[release].release_type = "LP";
        }
      }
    });
  };

  getMiCollection();
});