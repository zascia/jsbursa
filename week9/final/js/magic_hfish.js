/**
 * Created by zascia on 23.07.2015.
 */

// swecond
var index = 0;
function counter() {
  index++;
  if (index === fns.length){
    cb.call(this, cb)
  }
}

function applyFunction(index) {
  if (index < fns.length){
    fns[index].call(this, counter);
    applyFunction(index + 1)
  }
}
applyFunction(bla);

// second fish
function sequence(fns, cb) {
  var count = 0;
  function repeat(i) {
    if (i === fns.length) {
      cb();
    } else {
      fns[i](function(){
        i++;
        repeat(i);
      });
    }
  }
  repeat(count)
}

function parallel(fns, cb) {
  var count = 0;
  var i = 0;
  fns.map(function (element) {
    count++;
    element(function (){
      if (i === count - 1) {
        cb();
      } else {
        i++;
      }
    });
  });
}

// Nikitas fish
function sequence(fns, cb) {

  function createFunction(index) {
    if (index < fns.length){
      return fns[index].bind(this,createFunction(index + 1))
    }
    return cb
  }
  createFunction(0)();
}
function parallel(fns, cb) {
  var result = [];
  var i;
  for (i = 0; i < fns.length; i++) {
    (function(index) {
      fns[index](function() {
        if (result.indexOf(index) === -1) {
          result.push(index);
        }
        if (result.length === fns.length) {
          cb();
        }
      });
    })(i);
  }
}