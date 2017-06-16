app.factory("ReleaseFactory", function($window, $q, $http, DiscogsCredentials) {

    let searchParams = {};

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
        return $q(function(resolve, reject) {
            $http.get(resource_url)
            .then(function(resourceObject) {
                let fullResource = resourceObject.data;
                console.log('the resource is ', fullResource);
                resolve(fullResource);
            })
            .catch (function(error) {
                reject(error);
            });
        });
    };

    return {
        setSearchTerms,
        getSearchTerms,
        getDiscogsMatches,
        getDiscogsFullResource
    };

});