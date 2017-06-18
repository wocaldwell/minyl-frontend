app.controller('HomeController', function($scope, $http, $location, TrackFactory) {

    $scope.trackName = 'Barbarism Begins At Home';

    $scope.searchForTrack = function() {
        console.log('$scope.trackName in searchForTrack', $scope.trackName)
        TrackFactory.setSearchedTrack($scope.trackName);
        $location.path('/searchresults');
    };

});