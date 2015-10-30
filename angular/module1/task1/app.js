/**
 * Created by ashu on 30-Oct-15.
 */

requirejs.config({
  baseUrl: 'js',
  paths: {
    MyAngular: '../js/modules/moduleAng'
  }
});

define(['require', 'domReady'], function(require, domReady) {
  domReady(function() {
    require(['./main'], function(app) {
      //app.initialize();
    });
  });
});
