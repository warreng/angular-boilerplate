(function() {

  'use strict';

  var CoreCtrl = function CoreCtrl() {

    console.log('hello there');

  };

  angular.module('core').controller('CoreCtrl', [CoreCtrl]);

})();