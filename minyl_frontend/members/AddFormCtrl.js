app.controller('AddFormController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {
  $scope.search = {
    artist: 'Pinback',
    release: 'Information Retrieved',
    type: '1'
  };

  $scope.findMatches = function() {
    ReleaseFactory.setSearchTerms($scope.search.artist, $scope.search.release, $scope.search.type);

    $location.path('/addresults');
  };
});