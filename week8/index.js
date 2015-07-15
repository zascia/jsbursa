/**
 * Created by ashu on 15-Jul-15.
 */

module.exports = {
  asyncTest: function(cb) {
    setTimeout(function(){
      cb('Kotik');
    }, 5000);
  },
  getName: function(name) {
    return 'Hello ' + name;
  }
}
