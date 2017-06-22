app.controller('HomeController', function($scope, $http, $location, TrackFactory, AuthFactory) {

    AuthFactory.getEnvKeysFromAPI()
    .then(function(returnedVars){
        let keys = returnedVars.data;
        AuthFactory.setDiscogsCredentials(keys);
    });

    $scope.trackName = '';

    $scope.searchForTrack = function() {
        TrackFactory.setSearchedTrack($scope.trackName);
        $location.path('/searchresults');
    };

});