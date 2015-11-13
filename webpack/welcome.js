/**
 * Created by ashu on 10-Nov-15.
 */
'use strict';

module.exports = function(message) {

  // from Define plugin we get the value
  if (NODE_ENV == 'development') {
    var t = 1;
    console.log(t);
  }

  alert(`Welcome ${message}`);
};