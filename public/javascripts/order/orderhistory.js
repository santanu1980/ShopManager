var orderhistory = angular.module('orderhistory', []);

orderhistory.controller('orderhistorycontroller', function ($scope, $http) {
    
    $http.get('/historyoders').
        success(function (data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        if (data)
            $scope.Orders = data;
        console.log(data);

    }).
      error(function (data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("error");
    });
    console.log("santanu");

});