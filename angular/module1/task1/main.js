/**
 * Created by ashu on 29-Oct-15.
 */
window.addEventListener('DOMContentLoaded', function() {
  MyAngular.directive('module', function(el){console.log('module works', el);});
  MyAngular.directive('click', function(el){console.log('click works', el);});
  MyAngular.$compile(document.body);
});
