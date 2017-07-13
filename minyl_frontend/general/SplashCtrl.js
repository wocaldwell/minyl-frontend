app.controller('SplashController', function($scope, $http, $location, apiUrl) {

    function getAllQuotes() {
        return $http({
            url: `${apiUrl}/quotes/`
        })
    };

    function selectRandomQuote(quoteArray) {
        let quoteObject = quoteArray[Math.floor(Math.random() * quoteArray.length)];
        return quoteObject;
    };

    getAllQuotes()
    .then(function(returnedCollection){
        let allQuotes = returnedCollection.data;
        return allQuotes;
    }).then(function(returnedArray){
        let randomQuote = selectRandomQuote(returnedArray);
        $scope.displayQuote = randomQuote.quote;
        $scope.displayAuthor = randomQuote.author.split(',')[0];
        return randomQuote;
    });
});