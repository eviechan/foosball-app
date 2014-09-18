'use strict';

angular.module('foosballApp')
  .controller('IndexCtrl', function ($rootScope, $scope, FoosballConfigService) {

  	// make the call out to retrieve list of results
  	$scope.getRankings = function(){
  		$rootScope.itemTemplate='views/includes/leaderboard.html';
  	};

  	$scope.addGame = function(){
  		// create result object here
  		$rootScope.itemTemplate='views/includes/addgame.html';
  		
  	};

  	$scope.getResults = function(){
  		$rootScope.itemTemplate='views/includes/gamelist.html';
  	};

  });
