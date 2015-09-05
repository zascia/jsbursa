 /**
 * Created by ashu on 04-Sep-15.
 */

var SmavaTestManager = (function ($){
    var TestManager;
     var TheTestManager;
    // debugger;
    (function ($) {
        var instance;

        TestManager = function(cfg) {
            if (instance) {
                return instance
            }

            instance = new TheTestManager(cfg);
            //console.dir(instance);
            return instance;
        }
    }(jQuery));



    TheTestManager = function (cfg) {
        // debugger;
        if(!(this instanceof TheTestManager)){
            return new TheTestManager();
        }

        //this.init(cfg);

    };


    function managerPrototype() {

        this.name = 'TestManager';
        this.init = function() {
            return this.name;
        }

    }


    TheTestManager.prototype = new managerPrototype();

    return TestManager;
     //return TheTestManager;

}(jQuery));

var mgr = new SmavaTestManager();

console.dir(mgr);
console.log (mgr.init());
