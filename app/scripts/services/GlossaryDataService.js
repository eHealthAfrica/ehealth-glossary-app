angular.module('glossaryApp')
  .service('glossaryData', ['$http', '$q', '$localStorage', function ($http, $q, $localStorage) {
    'use strict';

    var fresh = $http.jsonp('https://script.google.com/macros/s/AKfycbxoNbcYsh_4Eg7ZyoaVUPrQgyOeMpa_iKi_dtWKgYVH6ANctNPS/exec?callback=JSON_CALLBACK');

    var promise;
    if ($localStorage.rawResponse) {
      promise = $q.when($localStorage.rawResponse);
    } else {
      promise = fresh;
    }

    fresh.then(function (response) {
      $localStorage.rawResponse = response;
    });

    return function () {
      return promise.then(function (response) {
        return response.data.map(function (row) {
          return {
            name: row[0],
            explanation: row[1],
            description: row[2]
          };
        });
      });
    };

  }]);
