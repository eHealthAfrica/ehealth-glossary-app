angular.module('glossaryApp')
  .service('glossaryData', ['$http', '$q', '$localStorage', function ($http, $q, $localStorage) {
    'use strict';

    var SOURCE_URL = 'https://script.google.com/macros/s/AKfycbxoNbcYsh_4Eg7ZyoaVUPrQgyOeMpa_iKi_dtWKgYVH6ANctNPS/exec?callback=JSON_CALLBACK';
    var fresh = $http.jsonp(SOURCE_URL);

    var promise;
    if ($localStorage[SOURCE_URL]) {
      promise = $q.when($localStorage[SOURCE_URL]);
    } else {
      promise = fresh;
    }

    fresh.then(function (response) {
      $localStorage[SOURCE_URL] = response;
    });

    return function () {
      return promise.then(function (response) {
        return response.data.map(function (row) {
          return {
            name: row[0],
            explanation: row[1],
            type: row[2],
            description: row[3],
            synonyms: row[4]
          };
        });
      });
    };

  }]);
