app.controller('ReleaseDetailsController', function($scope, $http, $location, ReleaseFactory) {

    let releaseId = ReleaseFactory.getReleaseId();

    $scope.getReleaseDetails = ReleaseFactory.getReleaseDetailsFromApi(releaseId)
    .then(function(returnedReleaseDetails){
        $scope.releaseDetails = returnedReleaseDetails.data;
        console.log('release detail)s: ',$scope.releaseDetails);
        if ($scope.releaseDetails.own_id === 0) {
            $scope.releaseStatus = 'want';
        } if ($scope.releaseDetails.own_id === 1) {
            $scope.releaseStatus = 'own';
        };
    });

    $scope.removeUserRelease = function(releaseId){
        ReleaseFactory.deleteUserRelease(releaseId);
    };

});