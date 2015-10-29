/**
 * Created by zascia on 05.09.2015.
 */
var SmavaTestManager = (function ($){
  var TestManager;

  (function ($) {
    var instance;

    TestManager = function(cfg) {
      if (instance) {
        return instance
      }

      instance = new TheTestManager(cfg);

      return {
        init : instance.init
      };
    }
  }(jQuery));

  TheTestManager = function (cfg) {
    if(!(this instanceof TheTestManager)){
      return new TheTestManager();
    }
    this.init(cfg);
  };

  var managerPrototype = {
    name: 'TestManager',
    init: function (cfg) {
      return name;
    }
  };

  TheTestManager.prototype = managerPrototype;
  return TestManager;
}(jQuery));

var mgr = new SmavaTestManager();

console.log (mgr.init());
