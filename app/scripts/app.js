/* global angular, appCacheNanny*/
angular.module('glossaryApp', ['ngStorage'])
  .run(function () {
    'use strict';

    // If we're not in our dev environment, start appCache
    if (window.location.port !== '9000') {
      appCacheNanny.start();
      appCacheNanny.on('updateready', function () {
        location.reload(true);
      });
    }
  });
