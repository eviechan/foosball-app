'use strict';

angular.module('foosballApp')
  .controller('GameListCtrl', function ($scope, $rootScope, FoosballConfigService) {
  	$scope.noEdit = true;
		$scope.player1 = {}, $scope.player2 = {}, $scope.score1 = {}, $scope.score2 = {};

    FoosballConfigService.getResults().then(function(data){
			$scope.results = data;
			/*for (var i in $scope.results){
				$scope.player1[i] = {}, $scope.player2[i] = {}, $scope.score1[i] = {}, $scope.score2[i] = {};
			}*/
		});

    $scope.updateResult = function(id, key) {
    	$scope.submitted = true;

  		var result = {
    		_id: id,
    		player1: $scope.player1[key],
    		player2: $scope.player2[key],
    		score1: $scope.score1[key],
    		score2: $scope.score2[key],
    		winner: (parseInt($scope.score1[key]) === parseInt($scope.score2[key])) ? 'NONE' : ((parseInt($scope.score1[key]) > parseInt($scope.score2[key])) ? $scope.player1[key] : $scope.player2[key])
    	};

    	console.log(JSON.stringify(result));

    	FoosballConfigService.updateResult(result).then(function(data){
    		//data updated, reload view
    		$rootScope.itemTemplate = 'views/includes/leaderboard.html';
    	});

    }

  });
