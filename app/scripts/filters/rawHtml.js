angular.module('glossaryApp')
  .filter('rawHtml', ['$sce', function($sce){
  'use strict';

  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);
