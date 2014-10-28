'use strict';

/* global angular */

var glossaryApp = angular.module('glossaryApp', []);

glossaryApp.controller('GlossaryCtrl', function($scope, $http){

  $http.jsonp('https://script.google.com/macros/s/AKfycbxTSor3m5TaU1dYEpoltOsFwatsr64Ap1YLLL-qzhvw_TKGyyJc/exec?callback=JSON_CALLBACK')
  .success(function (results){
    $scope.terms = results.map(function(row){
      return {
        name: row[0],
        explanation: row[1],
        description: row[2]
      };
    });
  }).error(function(err){
    console.log('oops', err);
  });
});

glossaryApp.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);

glossaryApp.filter('linkify', function(){
  return function (inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">link</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
  };
});
