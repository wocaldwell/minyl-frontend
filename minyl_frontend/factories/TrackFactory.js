app.factory("TrackFactory", function($window, $q, $http, apiUrl, RootFactory) {

    // create variables to store user input
    let trackTitle = '',
        trackArtist = '';


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
    };

    let getSearchedTrack = function() {
        return trackTitle;
    };

    let setSearchedTrackArtist = function(artistName) {
        trackArtist = artistName;
    };

    let getSearchedTrackArtist = function() {
        return trackArtist;
    };

    return {
        getUserReleasesWithTrack,
        setSearchedTrack,
        getSearchedTrack,
        setSearchedTrackArtist,
        getSearchedTrackArtist
    }


});