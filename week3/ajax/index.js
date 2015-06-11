// Ваш код будет здесь
// xhr.readyState == 4
// xhr.responseText?
function sendAJAX(method, url) {
  'use strict';
  var xhr;
  var elem;
  var type;
  var content;
  elem = document.querySelector('.' + method.toLowerCase());
  xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.addEventListener('readystatechange', function() {
    if ( xhr.readyState === 4 && xhr.status === 200) {
      type = xhr.getResponseHeader('Content-Type');
      console.log(type);
      if (xhr.responseText ) {
        content = ( type === 'application/json' ) ? JSON.parse(xhr.responseText).status : xhr.responseText;
        if ( content === 'ok' ) elem.classList.add('ok');
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
