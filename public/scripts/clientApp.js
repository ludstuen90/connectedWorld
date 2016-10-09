var socket = io();
var IOT = angular.module('IOT', []);


//This controller contains the information necessary to manipulate the main display.
IOT.controller('baseController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
  $scope.viewer = "greeting";

// The functionbelow obtains the current time.
   $scope.startTime = function() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = $scope.checkTime(m);
      s = $scope.checkTime(s);
      $scope.time =
      h + ":" + m + ":" + s;
      var t = $timeout(function(){
        $scope.startTime();
      }, 500);
  };

  //This checks to see what time of day it is. Note - that because the
  // time is displayed in 24 hour format, the system is easily able to detect
  // whether it is morning, evening or night using a simple for loop.
  $scope.checkTime= function(i) {
      if (i < 10) {i = "0" + i;}
      return i;
  };

  $scope.startTime();

  //When the system starts, it displays "Good XXXX, NAME". This function adjusts
  // the statement to indicate morning, afternoon, evening or night.

  $scope.adjustGreeting = function() {
    $scope.greeting = $scope.time.charAt(0);
    if ($scope.time.charAt(1) == ":") {
      console.log("Short time");
      $scope.greeting = "morning";
    } else {
      $scope.slice = $scope.time.slice(0,2);
      if ($scope.slice < 17) {
        $scope.greeting = "afternoon";
      } else if ($scope.slice < 21) {
        $scope.greeting = "evening";
      } else {
        $scope.greeting = "night";
      }
      console.log($scope.slice);

      console.log("Long time");
    }
  };

  $scope.adjustGreeting();


// Obtain local weather conditions
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
//Obtain forecast data
        $http({
          method: 'GET',
          url: 'http://api.wunderground.com/api/ff82541ce72353e5/forecast10day/q/MN/Minneapolis.json'
        }).then(function(response){
          $scope.forecastArray = response.data.forecast.simpleforecast.forecastday;
          // console.log('forecast data', response.data);
          // console.log($scope.forecastArray);
        });
  });

  //The display is updated via a socket.io message broadcast from the mobile device.
  // This function adjusts the display according to which Socket.IO message comes across from
// the mobile device.

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

//This controller captures information on the mobile device. IE: This is the
// controller from where messages to change the display are broadcast.

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
