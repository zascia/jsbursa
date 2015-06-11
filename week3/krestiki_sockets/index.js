var ws;
function sendData(data) {
  ws.send(data);
}
function handleError(event) {
  'use strict';
  var error;
  error = event.message;
  console.log('Connection reported error ' + error);
}
function handleMessage(event) {
  'use strict';
  var message;
  message = event.data;
  console.log('Message has been sent ' + message);
}
function handleClose(event) {
  'use strict';
  if (event.wasClean) {
    console.log('Connection closed clean');
  } else {
    console.log('Connection interrupted');
  }
  console.log('Connection terminated with code ' + event.code + ' and reason ' + event.reason);
}
function webSocketControl(url) {
  'use strict';
  ws = new WebSocket(url);
  ws.onopen = function() {
    console.log('Connection started');
  };
  ws.onmessage = function(event) {
    handleMessage(event);
  };
  ws.onerror = function(eventt) {
    handleError(err);
  };
  ws.onclose = function(event) {
    handleClose(event);
  };
}
function init() {
  'use strict';
  var url;
  url = gameUrls.list;
  webSocketControl(url);
}
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  init();
});
