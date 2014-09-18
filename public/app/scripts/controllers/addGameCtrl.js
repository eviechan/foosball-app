'use strict';

angular.module('foosballApp')
  .controller('AddGameCtrl', function ($scope, FoosballConfigService) {

  	$scope.submitAddGame = function(){
  		$scope.submitted = true;

  		if (!$scope.addGameForm.$invalid){
	  		var result = {
	  			player1: $scope.player1,
	  			player2: $scope.player2,
	  			score1: $scope.score1,
	  			score2: $scope.score2
	  		};

	  		FoosballConfigService.addResult(result).then(function(data){
	  			$rootScope.itemTemplate = 'views/includes/leaderboard.html';
	  		});
	  	}
	  }

  });
