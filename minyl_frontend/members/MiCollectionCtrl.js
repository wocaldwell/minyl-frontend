app.controller('MiCollectionController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {

  $scope.releases = []

  function getMiCollection() {
    return $http({
      url: `${apiUrl}/micollection/`,
      headers: {
        'Authorization': "Token " + RootFactory.getToken()
      }
    })
  };

  getMiCollection()
  .then(function(returnedCollection){
    $scope.releases = returnedCollection.data;
  });

  $scope.setReleaseId = function(releaseId){
    ReleaseFactory.setReleaseId(releaseId);
    $location.path('/releasedetails');
  };

});