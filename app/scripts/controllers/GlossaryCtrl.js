angular.module('glossaryApp')
  .controller('GlossaryCtrl', ['$scope', '$http', 'glossaryData', function ($scope, $http, glossaryData) {
    'use strict';

    glossaryData().then(
      function (results) {
        $scope.terms = results;
      }, function (err) {
        console.log('oops', err);
      }
    );
  }]);
