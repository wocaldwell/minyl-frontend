app.controller('ReleaseDetailsController', function($scope, $http, $location, ReleaseFactory) {

    let releaseId = ReleaseFactory.getReleaseId();

    $scope.getReleaseDetails = ReleaseFactory.getReleaseDetailsFromApi(releaseId)
    .then(function(returnedReleaseDetails){
        $scope.releaseDetails = returnedReleaseDetails.data;
        if ($scope.releaseDetails.own_id === 0) {
            $scope.releaseStatus = 'want';
        } if ($scope.releaseDetails.own_id === 1) {
            $scope.releaseStatus = 'own';
        };
    });

    $scope.removeUserRelease = function(releaseId){
        ReleaseFactory.deleteUserRelease(releaseId)
        .then(function(){
            if($scope.releaseDetails.own_id === 0) {
                $location.path('/miwants');
            } if ($scope.releaseDetails.own_id === 1) {
                $location.path('/micollection');
            }
        });
    };

});