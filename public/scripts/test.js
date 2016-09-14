var socket = io();
var IOT = angular.module('IOT', []);

IOT.controller('baseController', ['$scope', '$http', function($scope, $http){
  $scope.variable = [];

  $scope.clickMe = function(){
    var tweet = {user: "Lukas", text: "Blue Banana"};
    $scope.variable= [];
    socket.emit("tweet", tweet);
  };

  socket.on("tweet", function(tweet){
    $scope.variable= [];
    $scope.variable.push(tweet.text);
    console.log("from server - tweet from", tweet.user);
    console.log("contents", tweet.text);

    if ($scope.variable == "Blue Banana") {
      $scope.hash = "malamute";
    } else if ($scope.variable == "Red Banana") {
      $scope.hash = "parrot";
    } else {
      $scope.hash = "";
    }
    $scope.$apply();
  });









}]);
