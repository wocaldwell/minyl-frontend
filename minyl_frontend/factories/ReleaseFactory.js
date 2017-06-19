app.factory("ReleaseFactory", function($window, $q, $http, apiUrl, DiscogsCredentials, RootFactory) {

    let searchParams = {},
        artistId,
        releaseId;

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

    let postTracksToApi = function(tracklist, artistId) {
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
    };

    let postReleaseToApi = function(selectedRelease, releaseDetails, type) {
        console.log('selectedRelease in postReleaseToApi: ', selectedRelease.label[0])
        return $http({
            url: `${apiUrl}/release/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "title": releaseDetails.data.title,
                "year": releaseDetails.data.year,
                "label": selectedRelease.label[0],
                "catalog_number": selectedRelease.catno,
                "image": selectedRelease.thumb,
                "release_type": type
            }
        })
    };

    let postUserReleaseToApi = function(release, own) {
        return $http({
            url: `${apiUrl}/userrelease/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "release_id": release.release_id,
                "own": own
            }
        })
    };

    let postTrackReleaseToApi = function(tracksIds, release) {
        return $http({
            url: `${apiUrl}/trackrelease/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "release_id": release.release_id,
                "tracksIds": tracksIds
            }
        })
    };

    let getDiscogsTrackMatches = function(track) {
        return $q(function(resolve, reject) {
            $http.get(`https://api.discogs.com/database/search?track=${track}&format=vinyl&key=${DiscogsCredentials.key}&secret=${DiscogsCredentials.secret}&page=1&per_page=100`)
            .then(function(returnedMatrix) {
                let matchesWithTrack = returnedMatrix.data.results;
                console.log('releases with that track are: ', matchesWithTrack)
                resolve(matchesWithTrack);
            })
            .catch (function(error) {
                reject(error);
            });
        });
    };

    let getDiscogsArtistTrackMatches = function(artist, track) {
        return $q(function(resolve, reject) {
            $http.get(`https://api.discogs.com/database/search?artist=${artist}&track=${track}&format=vinyl&key=${DiscogsCredentials.key}&secret=${DiscogsCredentials.secret}&page=2&per_page=75`)
            .then(function(returnedMatrix) {
                let matchesWithTrack = returnedMatrix.data.results;
                console.log('releases with that track are: ', matchesWithTrack)
                resolve(matchesWithTrack);
            })
            .catch (function(error) {
                reject(error);
            });
        });
    };

    let setReleaseId = function(selectedReleaseId) {
        releaseId = selectedReleaseId;
    };

    let getReleaseId = function() {
        return releaseId;
    };

    let getReleaseDetailsFromApi = function(selectedReleaseId) {
        return $http({
            url: `${apiUrl}/releasedetails/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "release_id": selectedReleaseId
            }
        })
    };

    let deleteUserRelease = function(selectedRelease) {
        return $http({
            url: `${apiUrl}/deleteuserrelease/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "DELETE",
            data: {
                "release_id": selectedRelease
            }
        })
    }

    return {
        setSearchTerms,
        getSearchTerms,
        getDiscogsMatches,
        getDiscogsFullResource,
        postReleaseArtistToApi,
        postTracksToApi,
        postReleaseToApi,
        postUserReleaseToApi,
        postTrackReleaseToApi,
        getDiscogsTrackMatches,
        getDiscogsArtistTrackMatches,
        setReleaseId,
        getReleaseId,
        getReleaseDetailsFromApi,
        deleteUserRelease
    };

});