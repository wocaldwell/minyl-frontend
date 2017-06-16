app.controller('AddResultsController', function($scope, $http, $location, RootFactory, apiUrl, ReleaseFactory) {

    let search = ReleaseFactory.getSearchTerms()

    ReleaseFactory.getDiscogsMatches(search.searchArtist, search.searchRelease)
    .then(function(returnedMatches) {
        console.log("the matches are:", returnedMatches);
        $scope.searchMatches = returnedMatches;
    })

    $scope.addRelease = function(match) {
        let selected_release = match

        ReleaseFactory.getDiscogsFullResource(selected_release.resource_url)
        .then(function(returnedResource) {
            return $http({
                url: `${apiUrl}/artist/`,
                headers: {
                    'Authorization': "Token " + RootFactory.getToken()
                },
                method: "POST",
                data: {
                    "name": returnedResource.artists[0].name
                }
            })
        })

        return $http({
            url: `${apiUrl}/release/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "title": selected_release.title.split(' - ')[1],
                "year": selected_release.year,
                "catalog_number": selected_release.catno,
                "image": selected_release.thumb,
                "release_type": search.searchType
            }
        }).then(function(returned_data){
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
