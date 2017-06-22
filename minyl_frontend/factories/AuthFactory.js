app.factory("AuthFactory", function($window, $q, $http, apiUrl, RootFactory) {

    // local object that will store the returned credentials
    let discogsCredentials = {}

    // requesting the credentials from the api
    let getEnvKeysFromAPI = function() {
        return $http({
            url: `${apiUrl}/envkeys/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "GET"
        })
    }

    // set the credentials for use by the application
    let setDiscogsCredentials = function(creds) {
        discogsCredentials["key"] = creds.key;
        discogsCredentials["secret"] = creds.secret;
    }

    return {
        getEnvKeysFromAPI,
        setDiscogsCredentials,
        discogsCredentials
    }
});