var payment = angular.module('payment', []);

payment.controller('paymentcontroller', function ($scope, $http, $window) {
    
    $scope.OrderStatus = [{ "type" : "Not Delivered" }, { "type" : "Delivered" }];
    
    $scope.PaymentStatus = [{ type : "Pending" }, { type : "Done" }];
    console.log($scope.txtPaymentStatus);

    $http.get('/viewalloders').
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
    
    $scope.payment = function (id) {
        var path = '/updateorder/' + id;

        var paymentdetails = {
            id            : id,
            orderstatus   : "Deliveded",
            paymentstatus : "Done",
        };

        $http.put(path, paymentdetails).success(function (response) {
            console.log("success"); // Getting Success Response in Callback

            $scope.Orders = response;
        }).
            error(function (response) {
            console.log("Santanu :error"); // Getting Error Response in Callback
        });
    }
    


});