app.controller('MiWantsController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {

  $scope.releases = []

  function getMiWants() {
    return $http({
      url: `${apiUrl}/miwants/`,
      headers: {
        'Authorization': "Token " + RootFactory.getToken()
      }
    })
  };

  getMiWants()
  .then(function(returnedCollection){
    $scope.miWantsReleases = returnedCollection.data;
  });

  $scope.changeWantToOwn = function(release_id){
    return $http({
      url: `${apiUrl}/updateuserrelease/`,
      headers: {
        'Authorization': "Token " + RootFactory.getToken()
      },
      method: "POST",
      data: {
        'release_id': release_id
      }
    })
    .then(function(){
      $location.path('/micollection');
    });
  };

  $scope.setReleaseId = function(releaseId){
    ReleaseFactory.setReleaseId(releaseId);
  };

  $scope.removeUserRelease = function(releaseId){
    ReleaseFactory.deleteUserRelease(releaseId);
    $location.path('/home');
  };

});