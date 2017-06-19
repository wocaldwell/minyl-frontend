app.controller('WantSearchResultsController', function($scope, $http, $location, TrackFactory, ReleaseFactory) {

    $scope.requestedTrack = TrackFactory.getSearchedTrack();
    $scope.trackArtists = [];

    ReleaseFactory.getDiscogsTrackMatches($scope.requestedTrack)
    .then(function(returnedMatches){
        // console.log(returnedMatches);
        for (i=0; i<returnedMatches.length; i++) {
            $scope.trackArtists.push({'artist': returnedMatches[i].title.split(' - ')[0]});
        }
    });

    $scope.searchArtistTrackReleases = function(artist, trackTitle){
        TrackFactory.setSearchedTrackArtist(artist);
        TrackFactory.setSearchedTrack(trackTitle);
        $location.path('/addmiwants');
    }

});