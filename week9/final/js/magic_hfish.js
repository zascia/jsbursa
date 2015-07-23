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
applyFunction(bla)
