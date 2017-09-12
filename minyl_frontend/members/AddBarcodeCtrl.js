app.controller('AddBarcodeController', function($scope, ReleaseFactory) {

    // object that holds user search inputs
    $("#the-file-input").change(function() {
        // will log a FileList object, view gifs below
        console.log(this.files);
    });
});