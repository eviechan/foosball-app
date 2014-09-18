'use strict';

angular.module('foosballApp')
  .controller('LeaderboardCtrl', function ($scope, FoosballConfigService) {
    FoosballConfigService.getRankings().then(function(data){
  		$scope.rankings = data;
  	});
  });
