var IOT = angular.module('IOT', []);
// var socket = io();


IOT.controller('baseController', ['$scope', '$http', function($scope, $http){
  console.log('hello, world!');



$http({
  method: 'GET',
  url: 'http://api.wunderground.com/api/ff82541ce72353e5/conditions/q/MN/Minneapolis.json'
}).then(function(response){
  console.log(response.data.current_observation.feelslike_f);
  $scope.currentObservations = response.data.current_observation;
  $scope.feelsLikeF = $scope.currentObservations.feelslike_f;
  $scope.weather = $scope.currentObservations.weather;
  $scope.lastUpdated = $scope.currentObservations.observation_time;
  console.log($scope.currentObservations);
}).then(function(){

  $http({
    method: 'GET',
    url: 'http://api.wunderground.com/api/ff82541ce72353e5/forecast10day/q/MN/Minneapolis.json'
  }).then(function(response){
    $scope.forecastArray = response.data.forecast.simpleforecast.forecastday;

    console.log('forecast data', response.data);
    console.log($scope.forecastArray);
  });

  });



}]);
