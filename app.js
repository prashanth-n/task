var app = angular.module("app", ["chart.js"]);
app.controller("BarCtrl", ["$scope", "$http", "$interval", function ($scope, $http, $interval) {
    $scope.labels = [];
    $scope.data = [];
    $scope.getChartData = function () {
        $http({
            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
            method: 'GET'
        }).then(
            function (res) {
                console.log(res.data);
                $scope.plotGraph(res.data);
                
            },
            function () {
                alert("no data")
            }
            )
    }
    $scope.getChartData();
    $scope.plotGraph = function (chartData) {
        $scope.labels = [];
        $scope.data = [];
        angular.forEach(chartData, function (value, key) {        
            $scope.labels.push(value.name);
            $scope.data.push(value.price_usd)
        })
    }

    $interval($scope.getChartData, 300000);
}]);