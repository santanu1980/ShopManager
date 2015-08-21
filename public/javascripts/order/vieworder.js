var order = angular.module('vieworder', []);

order.controller('viewordercontroller', function ($scope, $http, $window){

    
    $http.get('/viewalloders').
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
        // when the response is available
            if(data)
                $scope.Orders = data;
        console.log(data);

    }).
      error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        console.log("error");
    });
    console.log("santanu");

    $scope.cancelOrder = function (id) {
        var path = '/deleteorder/' + id;
        var input = [];
        input.id = id;
        $http.delete(path, input).success(function (response) {
            console.log("success"); // Getting Success Response in Callback
            $scope.Orders = response;
        }).
            error(function (response) {
            console.log("Santanu :error"); // Getting Error Response in Callback
        });
    }
    


});