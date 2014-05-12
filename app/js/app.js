'use strict';


// Declare app level module which depends on filters, and services
angular.module('WebGl', [
  'ngRoute',
  'WebGl.filters',
  'WebGl.services',
  'WebGl.directives',
  'WebGl.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/lesson0', {templateUrl: 'partials/lession0.html', controller: 'GeneralController'});
  $routeProvider.when('/lesson1', {templateUrl: 'partials/lession1.html', controller: 'GeneralController'});
  $routeProvider.when('/lesson2', {templateUrl: 'partials/lession2.html', controller: 'GeneralController'});
  $routeProvider.when('/lesson3', {templateUrl: 'partials/lession3.html', controller: 'GeneralController'});
  $routeProvider.when('/lesson4', {templateUrl: 'partials/lession4.html', controller: 'GeneralController'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
