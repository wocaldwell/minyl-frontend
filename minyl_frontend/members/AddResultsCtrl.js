app.controller('AddResultsController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {

    let search = ReleaseFactory.getSearchTerms()

    if(search.barcode) {
        ReleaseFactory.getDiscogsBarcodeMatches(search.barcode)
        .then(function(returnedMatches) {
            $scope.searchMatches = returnedMatches;
        });
    } else {
        ReleaseFactory.getDiscogsMatches(search.searchArtist, search.searchRelease)
        .then(function(returnedMatches) {
            $scope.searchMatches = returnedMatches;
        });
    }

    $scope.addRelease = function(match) {
        let selectedRelease = match;

        ReleaseFactory.getDiscogsFullResource(selectedRelease.resource_url)
        .then(function(returnedResource){
            $scope.resourceCall = returnedResource;
            let fullResource = returnedResource.data;
            console.log(fullResource)
            return ReleaseFactory.postReleaseArtistToApi(fullResource)
        })
        .then(function(returnedArtist){
            let tracklist = []
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
            $scope.tracksIds = returnedTracksIds.data;
            // let releaseType = search.searchType;
            return ReleaseFactory.postReleaseToApi(selectedRelease, $scope.resourceCall)
        })
        .then(function(returnedRelease){
            $scope.release = returnedRelease.data;
            let ownProperty = 1;
            return ReleaseFactory.postUserReleaseToApi($scope.release, ownProperty)
        })
        .then(function(returnedUserId){
            return ReleaseFactory.postTrackReleaseToApi($scope.tracksIds, $scope.release)
        })
        .then(function(blah){
            $location.path('/micollection');
        });
    }
});
