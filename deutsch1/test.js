/**
 * Created by ashu on 04-Sep-15.
 */

var SmavaTestManager = (function ($){
    var TestManager;
    // debugger;
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
        // debugger;
        if(!(this instanceof TheTestManager)){
            return new TheTestManager();
        }

        this.init(cfg);

    };


    function managerPrototype() {
        this.name = 'TestManager';


    };

    managerPrototype.prototype.init = function(cfg) {
        console.log(this);
        return name;
    }


    TheTestManager.prototype = Object.create(managerPrototype.prototype);
    TheTestManager.prototype.constructor = TheTestManager;

    return TestManager;

}(jQuery));

var mgr = new SmavaTestManager();

console.dir(mgr);
console.log (mgr.init());
