// Ваш код будет здесь
// xhr.readyState == 4
// xhr.responseText?
function sendAJAX(method, url) {
  'use strict';
  var xhr;
  var elem;
  elem = document.querySelector('.' + method.toLowerCase());
  xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.addEventListener('readystatechange', function() {
    if ( xhr.readyState === 4 ) {
      if (xhr.responseText && JSON.parse(xhr.responseText).status === 'ok') {
        elem.classList.add('ok');
      }
    }
    else elem.classList.add('failed');
    console.log(elem);
  });
  xhr.send();
}
function init() {
  'use strict';
  var methods;
  var url;
  var i;
  methods = ['GET', 'POST', 'WEIRD'];
  url = 'https://cors-test.appspot.com/test';
  for ( i = 0; i < methods.length; i++ ) {
    sendAJAX(methods[i], url);
  }
}

document.addEventListener('DOMContentLoaded', function someName() {
  'use strict';
  init();
});
