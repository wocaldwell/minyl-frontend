app.factory("TrackFactory", function($window, $q, $http, apiUrl, DiscogsCredentials, RootFactory) {

    trackTitle = '';

    let getUserReleasesWithTrack = function(trackTitle) {
        return $http({
            url: `${apiUrl}/searchtrack/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "POST",
            data: {
                "trackTitle": trackTitle
            }
        })
    };

    let setSearchedTrack = function(searchedTitle) {
        trackTitle = searchedTitle;
    }

    let getSearchedTrack = function() {
        return trackTitle;
    }

    return {
        getUserReleasesWithTrack,
        setSearchedTrack,
        getSearchedTrack
    }


});