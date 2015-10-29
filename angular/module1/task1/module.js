/**
 * Created by ashu on 29-Oct-15.
 */
var MyAngular = (function() {

  var _directives = [];

  return {
      directive: function(name, fn) {
        _directives[name] = fn;
      },

      $compile: function domTreeWalk(node, scope) {
        var scope = scope || this;
        // test for node el
        if (node && node.nodeType === 1) {
          // the first child node
          var child = node.firstElementChild;
          while (child) {
            // work with elem
            for (var key in _directives) {
              if (child.hasAttribute(key)) {
                _directives[key].call(scope, child);
              }
            }
            // recursively walk through the elements
            domTreeWalk(child, scope);
            // go to the next node
            child = child.nextElementSibling;
          }
        }
      }

  };

})();

