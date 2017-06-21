app.factory("AuthFactory", function($window, $q, $http, apiUrl, RootFactory) {

    let discogsCredentials = {}

    let getEnvKeysFromAPI = function() {
        return $http({
            url: `${apiUrl}/envkeys/`,
            headers: {
                'Authorization': "Token " + RootFactory.getToken()
            },
            method: "GET"
        })
    }

    let setDiscogsCredentials = function(creds) {
        discogsCredentials["key"] = creds.key;
        discogsCredentials["secret"] = creds.secret;
        console.log('cred are:', discogsCredentials)
    }

    let getDiscogsCredentials = function(creds) {
        return discogsCredentials
    }

    return {
        getEnvKeysFromAPI,
        setDiscogsCredentials,
        getDiscogsCredentials,
        discogsCredentials
    }
});