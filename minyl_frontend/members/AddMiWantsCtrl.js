app.controller('AddMiWantsController', function($scope, $http, $location, TrackFactory, ReleaseFactory) {

    // get searched artist
    let miWantsArtist = TrackFactory.getSearchedTrackArtist();
    // get searched track
    let miWantsTrack = TrackFactory.getSearchedTrack();


    ReleaseFactory.getDiscogsArtistTrackMatches(miWantsArtist, miWantsTrack)
    .then(function(returnedMatches) {
        $scope.searchMatches = returnedMatches;
    })

    $scope.addMiWantsRelease = function(match) {
        let selectedRelease = match;

        ReleaseFactory.getDiscogsFullResource(selectedRelease.resource_url)
        .then(function(returnedResource){
            $scope.resourceCall = returnedResource;
            let fullResource = returnedResource.data;
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
            let releaseType = $scope.resourceCall.data.formats[0].descriptions[0];
            if (releaseType === 'LP'){
                releaseType = 1;
            } if (releaseType === '7"'){
                releaseType = 2;
            } if (releaseType === '10"'){
                releaseType = 3;
            } if (releaseType === '12"'){
                releaseType = 4;
            }
            return ReleaseFactory.postReleaseToApi(selectedRelease, $scope.resourceCall, releaseType)
        })
        .then(function(returnedRelease){
            $scope.release = returnedRelease.data;
            let ownProperty = 0;
            return ReleaseFactory.postUserReleaseToApi($scope.release, ownProperty)
        })
        .then(function(returnedUserId){
            return ReleaseFactory.postTrackReleaseToApi($scope.tracksIds, $scope.release)
        })
        .then(function(blah){
            $location.path('/miwants');
        });
    }

});