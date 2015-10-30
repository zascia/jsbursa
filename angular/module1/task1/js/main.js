/**
 * Created by ashu on 29-Oct-15.
 */
define (function (require) {
  var MyAngular = require('MyAngular');

  MyAngular.directive('module', function(el) { console.log('module works', el); });
  MyAngular.directive('click', function(el) { console.log('click works', el); });
  MyAngular.$compile(document.body);

});

