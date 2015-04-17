'use strict';

/**
 * @ngdoc overview
 * @name movieApp
 * @description
 * # movieApp
 *
 * Main module of the application.
 */
angular
  .module('movieApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ngMaterial',
      'ngMdIcons',
      'angularSpinner'
  ])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });