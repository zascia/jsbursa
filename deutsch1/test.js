 /**
 * Created by ashu on 04-Sep-15.
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
            return instance;
        }
    }(jQuery));



    TheTestManager = function (cfg) {
        if(!(this instanceof TheTestManager)){
            return new TheTestManager();
        }

        this.init(cfg);

    };


    function managerPrototype() {

        this.name = 'TestManager';
        this.init = function() {
            return this.name;
        }

    }


    TheTestManager.prototype = new managerPrototype();

    return TestManager;

}(jQuery));

var mgr = new SmavaTestManager();

console.log (mgr.init());


/*


 Q1: Assume that your company needs to provide possibility for users to download files using browser, files are static and don’t change often, they are always modified and updated by developer or other person having similar qualifications. How would you implement such a feature?

 A1: I would use CDN for statics


------------------------------------------


 Q2.1: What is printed in the console and why? Please assume that jQuery is loaded without conflicts beforehand.
 In console the empty string is printed as the 'name' variable is unaccessible in such implementation.
 To invoke a function as a constructor one should use 'new FunctionName()' operator. In that case its context would be new object instance and there also would appear possibility to add properties through the 'prototype' and also use 'this' properly. because 'this' depends on context of invocation.
 Also instance.init in IIFE for 'var TestManager' returned not the proper object but it's method and it couldn't reach the 'name' value

 ------------------------------------------


 Q2.2: How to adjust the code so that "TestManager" is printed to the console?
- return instance instead of instance.init;

- managerPrototype should transform from object notation to function and then use
TheTestManager.prototype = new managerPrototype();


 ------------------------------------------
 */