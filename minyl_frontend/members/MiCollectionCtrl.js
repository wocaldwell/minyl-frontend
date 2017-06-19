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
    console.log('selected release id: ', releaseId);
    ReleaseFactory.setReleaseId(releaseId);
  };

});