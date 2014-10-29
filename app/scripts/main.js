/* global angular, appCacheNanny*/
var glossaryApp = angular.module('glossaryApp', ['ngStorage', function () {
  'use strict';

  // If we're not in our dev environment, start appCache
  if(window.location.port !== '9000'){
    appCacheNanny.start();
    appCacheNanny.on('updateready', function() {
      location.reload(true);
    });
  }
}]);

glossaryApp.service('glossaryData', ['$http', '$q', '$localStorage', function ($http, $q, $localStorage) {
  'use strict';

  var fresh = $http.jsonp('https://script.google.com/macros/s/AKfycbxTSor3m5TaU1dYEpoltOsFwatsr64Ap1YLLL-qzhvw_TKGyyJc/exec?callback=JSON_CALLBACK');

  var promise;
  if($localStorage.rawResponse){
    promise = $q.when($localStorage.rawResponse);
  } else {
    promise = fresh;
  }

  fresh.then(function(response) {
    $localStorage.rawResponse = response;
  });

  return function () {
    return promise.then(function (response) {
      return response.data.map(function(row){
        return {
          name: row[0],
          explanation: row[1],
          description: row[2]
        };
      });
    });
  };

}]);

glossaryApp.controller('GlossaryCtrl', ['$scope', '$http', 'glossaryData', function($scope, $http, glossaryData){
  'use strict';

  glossaryData().then(
    function (results){
      $scope.terms = results;
    }, function(err){
      console.log('oops', err);
    }
  );
}]);
