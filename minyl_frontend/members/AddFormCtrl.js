app.controller('AddFormController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {
  $scope.search = {
    artist: 'The Smiths',
    release: 'Hatful of Hollow',
    type: '1'
  };

  $scope.findMatches = function() {
    ReleaseFactory.setSearchTerms($scope.search.artist, $scope.search.release, $scope.search.type);

    $location.path('/addresults');
  };
});