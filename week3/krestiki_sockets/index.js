/*responseId = data.yourId;
object = {register: responseId};
sendToSocketRegisterId = JSON.stringify(object);
w0.send(sendToSocketRegisterId);*/

var ws;
var startGameBtn;
var createGameStatusMsg;
var startGameContainer;
var mainGameContainer;
var gameList;
var state;
state = {};
function sendAJAX(method, url, data, callback) {
  'use strict';
  var xhr;
  xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.addEventListener('readystatechange', function() {
    if ( xhr.readyState === 4 ) {
      callback.call(null, xhr);
    }
  });
  if (data) {
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
  }
  else xhr.send();
}
function getXHRData(xhr) {
  'use strict';
  var type;
  var content;
  type = xhr.getResponseHeader('Content-Type');
  console.log('xhr type = ' + type);
  if (xhr.responseText ) {
    if ( type.match(/application\/json/) ) {
      content = JSON.parse(xhr.responseText);
    } else {
      content = xhr.responseText;
    }
  }
  return content;
}
function sendWebsocketData(data) {
  'use strict';
  console.log('ws data ' + data);
  ws.send(data);
}
function showMessage(elem, msg) {
  'use strict';
  elem.textContent = msg;
}
function handleError(event) {
  'use strict';
  var error;
  error = event.message;
  console.log('Connection reported error ' + error);
  cancelCreateGame();
}
function addGameToList(id) {
  'use strict';
  var gameItem;
  if (id) {
    gameItem = document.createElement('LI');
    gameItem.textContent = id;
    gameItem.id = id;
    gameList.appendChild(gameItem);
  }
}
function removeGameFromList(id) {
  'use strict';
  var gameItem;
  if (id) {
    gameItem = document.getElementById(id);
    gameList.removeChild(gameItem);
  }
}
function startGameClientSide(xhr) {
  'use strict';
  var content;
  content = getXHRData(xhr);
  if (xhr.status === 200 && content.side) {
    console.log('get side ' + content.side + ' from server');
    startGameContainer.style.display = 'none';
    mainGameContainer.style.display = 'block';
    return;
  }
  if (xhr.status === 410) {
    showMessage(createGameStatusMsg, '������ ������ ����: ������ ����� �� �������');
    return;
  }
  showMessage(createGameStatusMsg, '����������� ������ ������ ����');
}
function startGameServerPart(playerId) {
  'use strict';
  var gameReadyUrl;
  var startGameObj;
  startGameObj = {};
  state.playerId = playerId;
  startGameBtn.disabled = true;
  showMessage(createGameStatusMsg, '������� ������ ����');
  gameReadyUrl = gameUrls.gameReady;
  startGameObj.player = playerId;
  startGameObj.game = state.gameId;
  sendAJAX('POST', gameReadyUrl, JSON.stringify(startGameObj), startGameClientSide);
}
function handleMessage(event) {
  'use strict';
  var message;
  var action;
  message = JSON.parse(event.data);
  action = message.action;
  switch (action) {
    case 'add':
      addGameToList(message.id);
      break;
    case 'startGame':
      startGameServerPart(message.id);
      break;
    case 'remove':
      removeGameFromList(message.id);
      break;
    default:
      break;
  }
  // console.log('Message has been sent ' + event.data);
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
  ws.onerror = function(event) {
    handleError(event);
  };
  ws.onclose = function(event) {
    handleClose(event);
  };
}
function cancelCreateGame() {
  'use strict';
  startGameBtn.disabled = false;
  showMessage(createGameStatusMsg, '������ �������� ����');
}
function registerGameOnServer(xhr) {
  'use strict';
  var content;
  var registerObj;
  registerObj = {};
  content = getXHRData(xhr);
  if (xhr.status === 200 && content.yourId) {
    registerObj.register = state.gameId = content.yourId;
    sendWebsocketData(JSON.stringify(registerObj));
  } else {
    cancelCreateGame();
  }
}
function createGame() {
  'use strict';
  startGameBtn.disabled = true;
  sendAJAX('POST', gameUrls.newGame, null, registerGameOnServer);
}

function init() {
  'use strict';
  var url;
  url = gameUrls.list;
  webSocketControl(url);
  startGameContainer = document.querySelector('.startGame');
  mainGameContainer = document.querySelector('.mainGame');
  gameList = document.querySelector('.existing-games');
  startGameBtn = document.querySelector('.createGame');
  createGameStatusMsg = document.querySelector('.startGame .status-message');
  startGameBtn.addEventListener('click', createGame);
  gameList.addEventListener('click', function(event) {
    console.log('clicked ' + event.target);
    var registerObj;
    registerObj = {};
    registerObj.register = state.gameId = event.target.id;
    sendWebsocketData(JSON.stringify(registerObj));
  });
}
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  init();
});
