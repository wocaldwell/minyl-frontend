app.controller('SearchResultsController', function($scope, $http, $location, TrackFactory) {

    let searchedTrack = TrackFactory.getSearchedTrack();

    TrackFactory.getUserReleasesWithTrack(searchedTrack)
    .then(function(returnedReleases){
        let releasesArray = returnedReleases.data;
        if (releasesArray.length === 1) {
            $location.path('/noresults');
        } else {
            $scope.searchedTrack =  releasesArray[0],
            $scope.releases = releasesArray.slice(1);
        };
    });


});