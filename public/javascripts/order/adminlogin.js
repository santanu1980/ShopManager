var order = angular.module('login', []);

order.controller('logincontroller', function ($scope, $http, $window) {
    $scope.login = function () {
        var login = {
            adminname   : $scope.txtUserName,
            adminpasswd : $scope.txtPassword,
        };
        var Jneworder = JSON.stringify(login);
        console.log(login);
        $http.post('/adminlogin', login).success(function (response) {
            console.log("success"); // Getting Success Response in Callback
            $scope.txtstatus = response.status;
            if(response.status == "Ok")
                $window.location.href = '/index';
            
        }).
            error(function (response) {
            console.log("Santanu :error"); // Getting Error Response in Callback
        });
    }
});
