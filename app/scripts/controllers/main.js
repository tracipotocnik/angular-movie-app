'use strict';

/**
 * @ngdoc function
 * @name movieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the movieApp
 */
angular.module('movieApp')
  .controller('MainCtrl', function ($scope, $http, $mdDialog, usSpinnerService) {


      $scope.sortType = 'title';
      $scope.sortTypes = [
          {displayName: 'Title', fieldName: 'title'},
          {displayName: 'Year', fieldName: 'year'},
          {displayName: 'Critic Score', fieldName: 'ratings.critics_score'},
          {displayName: 'User Score', fieldName: 'ratings.audience_score'}
      ];
      $scope.mpaaRating = null;
      $scope.mpaaRatings = [
          {displayName: 'Show All', fieldName: null},
          {displayName: 'G', fieldName: 'G'},
          {displayName: 'PG', fieldName: 'PG'},
          {displayName: 'PG-13', fieldName: 'PG-13'},
          {displayName: 'R', fieldName: 'R'},
          {displayName: 'NC-17', fieldName: 'NC-17'},
          {displayName: 'Unrated', fieldName: 'Unrated'}
      ];
      $scope.sortAsc = true;

      $scope.moviePosterThumb = function(movie) {
          if(movie.posters.original !== 'http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif') {
              return movie.posters.original;
          }
      };

      $scope.filterResults = function(movie) {
          if($scope.mpaaRating && movie.mpaa_rating !== $scope.mpaaRating) {
              return false;
          }
          return true;
      };

      $scope.startSpin = function() {
          usSpinnerService.spin('spinner');
      };

      $scope.stopSpin = function() {
          usSpinnerService.stop('spinner');
      };

      $scope.sortingActive = false;

      $scope.getResults = function(){
          if(!$scope.sortingActive) {
              $scope.startSpin();
          }
          $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json', {
              params: {
                  apikey: 'c3w3vf94me65rgk68qps7ekb',
                  callback: 'JSON_CALLBACK',
                  q: $scope.search,
                  page_limit: 50
              }
          })
            .success(function (data) {
                if(!$scope.sortingActive) {
                    $scope.stopSpin();
                }
                $scope.results = data.movies;
                $scope.sortingActive = false;
            });
      };
      $scope.showCustomGreeting = function($event, movie) {
          $mdDialog.show({
              targetEvent: $event,
              templateUrl: 'views/movie-modal.html',
              controller: 'GreetingController',
              locals: { movie: movie }
          });
      };
  })
  .controller('GreetingController', function GreetingController($scope, $mdDialog, movie) {
      $scope.movie = movie;
      $scope.closeDialog = function() {
          // Easily hides most recent dialog shown...
          // no specific instance reference is needed.
          $mdDialog.hide();
      };
      $scope.moviePosterLg = function(movie) {
          var posterUrl = movie.posters.original;
          if(posterUrl !== 'http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif') {
              var posterShortUrl = posterUrl.substring(posterUrl.indexOf('movie'));
              return 'http://content6.flixster.com/' + posterShortUrl;
          }
      };
  });