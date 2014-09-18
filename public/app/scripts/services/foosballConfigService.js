'use strict';

angular.module('foosballApp')
  .factory('FoosballConfigService', function ($http, $q) {

    // Public API here
    return {
      getResults: function() {
        var deferred = $q.defer();
        $http.get('/results').success(function(data){
          deferred.resolve(data);
        }).error(function(data, status){
          deferred.reject('[FoosballConfigService.getResults()]: Cannot retrieve game results successfully through /results, status: ' + status);
        });
        return deferred.promise;
      },
      getRankings: function(){
        var deferred = $q.defer();
        $http.get('/rankings').success(function(data){
          deferred.resolve(data);
        }).error(function(data, status){
          deferred.reject('[FoosballConfigService.getRankings()]: Cannot retrieve rankings successfully through /rankings, status: ' + status);
        });
        return deferred.promise;
      },
      addResult: function(result){
        var deferred = $q.defer();
        $http.post('/results/add', result).success(function(data){
          deferred.resolve(data);
        }).error(function(data, status){
          deferred.reject('[FoosballConfigService.addResult()]: Cannot save result through /results/add, status: ' + status);
        });
        return deferred.promise;
      },
      updateResult: function(result){
        var deferred = $q.defer();
        $http.put('/results/update', result).success(function(data){
          deferred.resolve(data);
        }).error(function(data, status){
          deferred.reject('[FoosballConfigService.updateResult()]: Cannot update result through /results/update, status: ' + status);
        });
        return deferred.promise;
      }
    };
  });
