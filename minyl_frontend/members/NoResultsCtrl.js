app.controller('NoResultsController', function($scope, $http, $location, TrackFactory) {

    $scope.searchedTrack = TrackFactory.getSearchedTrack();

});