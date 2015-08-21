var order = angular.module('order', []);

order.controller('ordercontroller', function ($scope, $http){
	
	$scope.createOrder = function() {
		var neworder = {
        custname  : $scope.txtUserName,
        custemail : $scope.txtEmail,
        ordertype : "Chalbhaja",
        noorder   : $scope.txtnumber,
        orderdate : new Date()		  
	  };
        var Jneworder = JSON.stringify(neworder);
        console.log(neworder);
	  $http.post('/createorder', neworder).success(function(response) {
                console.log("success"); // Getting Success Response in Callback
                //$window.alert("Order created successfully");
                //$dialogs.notify('Order created successfully...');
                $scope.txtUserName = "";
                $scope.txtEmail = "";
                $scope.txtnumber = "";
            }).
            error(function(response) {
                console.log("Santanu :error"); // Getting Error Response in Callback
            });
	}
});