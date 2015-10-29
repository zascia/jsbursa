/**
 * Created by ashu on 29-Oct-15.
 */
var MyAngular = (function() {

  var _directives = [];

  return {
      directive: function(name, fn) {
        _directives[name].push(fn);
      },

      $compile: function domTreeWalk(node, scope) {
        // test for node el
        if (node && node.nodeType === 1) {
          // the first child node
          var child = node.firstElementChild;
          while (child) {
            // work with elem
            console.log('elem', child.tagName);
            // recursively walk through the elements
            domTreeWalk(child, scope);
            // go to the next node
            child = child.nextElementSibling;
          }
        }
      }

  };

})();

