app.controller('AddBarcodeController', function($scope, ReleaseFactory) {

    // object that holds user search inputs
    $("#the-file-input").change(function() {
        // will log a FileList object, view gifs below
        console.log(this.files);
        let barcodeImage = URL.createObjectURL(this.files[0]);
        Quagga.decodeSingle({
            decoder: {
                readers: ["upc_reader", "upc_e_reader"] // List of active readers
            },
            locate: true, // try to locate the barcode in the image
            patchSize: "x-large",
            src: barcodeImage // or 'data:image/jpg;base64,' + data
        }, function(result){
            if(result.codeResult) {
                console.log("result", result.codeResult.code);
            } else {
                console.log(result);
                console.log("not detected");
            }
        });
    });
});