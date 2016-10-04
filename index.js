var app = angular.module('indexApp', []);
app.controller('indexCtrl',['$scope','$filter','$http','$interval',
                            function($scope, $filter, $http, $interval) {   
        window.location="displayShips.jsp";             
}]);
