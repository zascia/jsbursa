(function() {
  var Dispatcher = new function () {
    var listeners = [];
    var instance;

    function Dispatcher() {
      if (!instance) {
        instance = this;
      } else {
        return instance;
      }

      Dispatcher.prototype.on = function addHandler(eventName, fn) {
        if (!listeners[eventName]) {
          listeners[eventName] = [];
        }
        listeners[eventName].push(fn);
      };

      Dispatcher.prototype.fire = function fireHandlers(eventName, data) {
        if (listeners[eventName]) {
          listeners[eventName].forEach(function (handler) {
            handler(data);
          });
        }
      };
    }

    return Dispatcher;
  };

  window.Dispatcher = Dispatcher;
})();
