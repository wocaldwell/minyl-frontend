app.factory("ReleaseFactory", function($window, $q, $http, apiUrl, DiscogsCredentials, RootFactory) {

    let searchParams = {},
        artistId;

    let setSearchTerms = function(artist, release, type) {
        searchParams = {
            "searchArtist": artist,
            "searchRelease": release,
            "searchType": parseInt(type)
        };
    };

    let getSearchTerms = function() {
        return searchParams;
    };

    let getDiscogsMatches = function(artist, release) {
        return $q(function(resolve, reject) {
            $http.get(`https://api.discogs.com/database/search?artist=${artist}&release_title=${release}&format=vinyl&key=${DiscogsCredentials.key}&secret=${DiscogsCredentials.secret}`)
            .then(function(returnedMatrix) {
                let matchesObject = returnedMatrix.data.results;
                resolve(matchesObject);
            })
            .catch (function(error) {
                reject(error);
            });
        });
    };

    let getDiscogsFullResource = function(resource_url) {
        return $http.get(resource_url);
    };

    let postReleaseArtistToApi = function(discogsFullResource) {
        return $http({
            url: `${apiUrl}/artist/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "name": discogsFullResource.artists[0].name
            }
        })
    };

    let postReleaseTracksToApi = function(tracklist, artistId) {
        return $http({
            url: `${apiUrl}/track/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "artist_id": artistId,
                "tracklist": tracklist
            }
        })
    }

    return {
        setSearchTerms,
        getSearchTerms,
        getDiscogsMatches,
        getDiscogsFullResource,
        postReleaseArtistToApi,
        postReleaseTracksToApi
    };

});