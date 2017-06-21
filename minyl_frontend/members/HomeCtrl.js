app.controller('HomeController', function($scope, $http, $location, TrackFactory, AuthFactory) {

    AuthFactory.getEnvKeysFromAPI()
    .then(function(returnedVars){
        let keys = returnedVars.data;
        console.log('the envs are here!', keys);
        AuthFactory.setDiscogsCredentials(keys);
    });

    $scope.trackName = 'Worst Trip';

    $scope.searchForTrack = function() {
        console.log('$scope.trackName in searchForTrack', $scope.trackName)
        TrackFactory.setSearchedTrack($scope.trackName);
        $location.path('/searchresults');
    };

});