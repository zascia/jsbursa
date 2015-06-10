// Ваш код будет здесь
// http://en.wikipedia.org/w/api.php?action=parse&page=title&prop=text&section=0&format=json&callback=func
// title from input
// func to create for jsonp

// first step POST: url open headers send addeventlistener
// then websocket: open work with message (add and remove) --> look at this at Network tab

var JSONPQuery;
var textContainer;
function jsonpCallback(data) {
  'use strict';
  var text;
  textContainer.innerHTML = '';
  console.log('data');
  text = (data.parse ) ? data.parse.text['*'] : 'undefined';
  textContainer.innerHTML = text;
}
function trimString(str) {
  'use strict';
  return str.replace(/^\s+|\s+$/gm, '');
}
function sendJSONPQuery(queryString) {
  'use strict';
  var script;
  script = document.createElement('script');
  script.src = queryString;
  document.head.appendChild(script);
}
function makeJSONPQuery() {
  'use strict';
  var title;
  var queryString;
  title = document.querySelector('input').value;
  if (trimString(title) === '') {
    console.log('empty string');
    return false;
  }
  queryString = JSONPQuery.replace(/title/, title);
  sendJSONPQuery(queryString);
}
function init() {
  'use strict';
  var btn;
  JSONPQuery = 'http://en.wikipedia.org/w/api.php?action=parse&page=title&prop=text&section=0&format=json&callback=jsonpCallback';
  textContainer = document.querySelector('#content');
  btn = document.querySelector('button');
  btn.addEventListener('click', makeJSONPQuery);
}

document.addEventListener('DOMContentLoaded', function someName() {
  init();
});