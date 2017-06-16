app.controller('AddResultsController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {

    let search = ReleaseFactory.getSearchTerms()

    ReleaseFactory.getDiscogsMatches(search.searchArtist, search.searchRelease)
    .then(function(returnedMatches) {
        // console.log("the matches are:", returnedMatches);
        $scope.searchMatches = returnedMatches;
    })

    $scope.addRelease = function(match) {
        let selectedRelease = match;

        ReleaseFactory.getDiscogsFullResource(selectedRelease.resource_url)
        .then(function(returnedResource){
            $scope.resourceCall = returnedResource;
            let fullResource = returnedResource.data;
            // console.log('the resource is ', fullResource);
            return ReleaseFactory.postReleaseArtistToApi(fullResource)
        })
        .then(function(returnedArtist){
            let tracklist = []
            // console.log('the artist is', returnedArtist)
            let resourceTracks = $scope.resourceCall.data.tracklist
            // console.log('the track object getResourceTracks ', resourceTracks);
            for (var i=0; i<resourceTracks.length; i++) {
                tracklist.push({"title": resourceTracks[i].title});
            }
            // console.log('the track list is ', tracklist)
            return ReleaseFactory.postReleaseTracksToApi(tracklist, returnedArtist.data.artist_id)
        });

        return $http({
            url: `${apiUrl}/release/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "title": selectedRelease.title.split(' - ')[1],
                "year": selectedRelease.year,
                "catalog_number": selectedRelease.catno,
                "image": selectedRelease.thumb,
                "release_type": search.searchType
            }
        })
        .then(function(returned_data){
            console.log('release shoud be added', returned_data)
            return $http({
                url: `${apiUrl}/userrelease/`,
                headers: {
                    'Authorization': "Token " + RootFactory.getToken()
                },
                method: "POST",
                data: {
                    "release_id": returned_data.data.release_id,
                    "own": 1
                }
                // $location.path('/micollection');
            })
       })
    }
});
