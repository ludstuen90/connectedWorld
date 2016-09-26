var socket = io();
var IOT = angular.module('IOT', []);

IOT.controller('baseController', ['$scope', '$http', function($scope, $http){
  $scope.viewer = "greeting";

  $scope.hi = "washing machine"

$http({
  method: 'GET',
  url: 'http://api.wunderground.com/api/ff82541ce72353e5/conditions/q/MN/Minneapolis.json'
}).then(function(response){
  // console.log(response.data.current_observation.feelslike_f);
  $scope.currentObservations = response.data.current_observation;
  $scope.feelsLikeF = $scope.currentObservations.feelslike_f;
  $scope.weather = $scope.currentObservations.weather;
  $scope.lastUpdated = $scope.currentObservations.observation_time;
  // console.log($scope.currentObservations);
}).then(function(){

        $http({
          method: 'GET',
          url: 'http://api.wunderground.com/api/ff82541ce72353e5/forecast10day/q/MN/Minneapolis.json'
        }).then(function(response){
          $scope.forecastArray = response.data.forecast.simpleforecast.forecastday;
          // console.log('forecast data', response.data);
          // console.log($scope.forecastArray);
        });
  });

  socket.on("tweet", function(tweet){
    $scope.variable= [];
    $scope.variable.push(tweet.text);
    console.log("from server - tweet from", tweet.user);
    console.log("contents", tweet.text);

    if ($scope.variable == "Photos") {
      $scope.viewer = "photos";
    } else if ($scope.variable == "Weather") {
      $scope.viewer = "weather";
    } else if ($scope.variable =="Calendar") {
      $scope.viewer="calendar";
    }else {
      $scope.hash = "";
    }
    $scope.$apply();
  });

}]);

IOT.controller('secondController', ['$scope', '$http', function($scope, $http){
  $scope.variable = [];

  $scope.photos = function(){
    var tweet = {user: "Lukas", text: "Photos"};
    $scope.variable= [];
    socket.emit("tweet", tweet);
  };

  $scope.weather = function(){
    var tweet = {user: "Lukas", text: "Weather"};
    socket.emit("tweet", tweet);
  };

  $scope.calendar = function(){
    var tweet = {user: "Lukas", text: "Calendar"};
    socket.emit("tweet", tweet);
  };

  socket.on("tweet", function(tweet){
    $scope.variable= [];
    $scope.variable.push(tweet.text);
    console.log("from server - tweet from", tweet.user);
    console.log("contents", tweet.text);
    $scope.$apply();
  });

}]);
