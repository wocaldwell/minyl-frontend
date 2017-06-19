app.controller('MiWantsController', function($scope, $http, $location, RootFactory, apiUrl) {

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
    console.log('miWants: ', $scope.miWantsReleases);
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
  }

});