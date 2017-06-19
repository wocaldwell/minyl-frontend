app.controller('AddResultsController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {

    let search = ReleaseFactory.getSearchTerms()

    ReleaseFactory.getDiscogsMatches(search.searchArtist, search.searchRelease)
    .then(function(returnedMatches) {
        // console.log("the matches are:", returnedMatches);
        $scope.searchMatches = returnedMatches;
    })

    $scope.addRelease = function(match) {
        let selectedRelease = match;
        console.log('selectedRelease is ', selectedRelease);

        ReleaseFactory.getDiscogsFullResource(selectedRelease.resource_url)
        .then(function(returnedResource){
            $scope.resourceCall = returnedResource;
            console.log('$scope.resourceCall', $scope.resourceCall)
            let fullResource = returnedResource.data;
            // console.log('the resource is ', fullResource);
            return ReleaseFactory.postReleaseArtistToApi(fullResource)
        })
        .then(function(returnedArtist){
            let tracklist = []
            // console.log('the artist is', returnedArtist)
            let resourceTracks = $scope.resourceCall.data.tracklist
            for (var i=0; i<resourceTracks.length; i++) {
                tracklist.push({
                    "title": resourceTracks[i].title,
                    "position": resourceTracks[i].position
                });
            }
            $scope.resourceTracks = resourceTracks;
            return ReleaseFactory.postTracksToApi(tracklist, returnedArtist.data.artist_id)
        })
        .then(function(returnedTracksIds){
            // console.log('the stuff is: ', returnedTracksIds);
            $scope.tracksIds = returnedTracksIds.data;
            let releaseType = search.searchType;
            return ReleaseFactory.postReleaseToApi(selectedRelease, $scope.resourceCall, releaseType)
        })
        .then(function(returnedRelease){
            // console.log('returnedRelease', returnedRelease);
            $scope.release = returnedRelease.data;
            let ownProperty = 1;
            console.log('$scope.release ', $scope.release);
            return ReleaseFactory.postUserReleaseToApi($scope.release, ownProperty)
        })
        .then(function(returnedUserId){
            // console.log(returnedUserId)
            return ReleaseFactory.postTrackReleaseToApi($scope.tracksIds, $scope.release)
        });
    }
});
