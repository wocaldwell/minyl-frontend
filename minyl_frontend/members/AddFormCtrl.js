app.controller('AddFormController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {
  $scope.search = {
    artist: 'The Smiths',
    release: 'Meat is Murder',
    type: '1'
  };

  $scope.findMatches = function() {
    ReleaseFactory.setSearchTerms($scope.search.artist, $scope.search.release, $scope.search.type);

    $location.path('/addresults');
  };
});