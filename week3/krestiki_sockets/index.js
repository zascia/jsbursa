/*responseId = data.yourId;
object = {register: responseId};
sendToSocketRegisterId = JSON.stringify(object);
w0.send(sendToSocketRegisterId);*/

var ws;
var startGameBtn;
var createGameStatusMsg;
var startGameContainer;
var mainGameContainer;
var mainGameStatusMsg;
var gameList;
var state;
var cellsContainer;
var cells;
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
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (url === gameUrls.move) {
    xhr.setRequestHeader('Game-ID', state.gameId);
    xhr.setRequestHeader('Player-ID', state.playerId);
  }
  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
}
function getXHRData(xhr) {
  'use strict';
  var type;
  var content;
  type = xhr.getResponseHeader('Content-Type');

  if (xhr.responseText ) {
    if ( type && type.match(/application\/json/) ) {
      content = JSON.parse(xhr.responseText);
    } else if (xhr.responseText.match(/side/) || xhr.responseText.match(/move/)) {
      content = JSON.parse(xhr.responseText);
    } else {
      content = xhr.responseText;
    }
  }
  console.log('xhr type = ' + type + ' content ' + content);
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


function isEmptyCell(cellItem) {
  'use strict';
  return !( cellItem.classList.contains('x') || cellItem.classList.contains('o') );
}
function responseForMove(xhr) {
  'use strict';
  var content;
  console.log('xhr = ' + xhr.responseText);
  if (xhr.status === 200) {
    cellsContainer.removeEventListener('click', makeChoice);
    content = getXHRData(xhr);
    fillMove(state.last, state.myClass);
    if (content.win) {
      makeWinner(content.win);
    } else {
      notMyMoveLogic();
    }
  } else {
    errorMove(content);
  }
}

function makeWinner(winner) {
  mainGameStatusMsg.textContent = winner;
}
function errorMove(content) {
  'use strict';
  var errMsg;
  errMsg = ( content === undefined ) ? 'Неизвестная ошибка' : content.responseText;
  mainGameStatusMsg.textContent = errMsg;
  cancelCreateGame();
}
// fill with x or o if success after click
function fillMove(index, className) {
  'use strict';
  cells[index].classList.add(className);
}
function makeChoice(e) {
  'use strict';
  var indexEl;
  var el;
  var moveObj;
  el = e.target;
  if (!isEmptyCell(el)) return false;
  indexEl = Array.prototype.indexOf.call(document.querySelectorAll('.cell'), el);
  state.last = indexEl;
  moveObj = {};
  moveObj.move = ++indexEl;
  sendAJAX('POST', gameUrls.move, JSON.stringify(moveObj), responseForMove);

}
function renderField(num) {
  'use strict';
  var i;
  var currentRow;
  var currentCell;
  // hide start game field
  cellsContainer = document.querySelector('.field');
  // clear old data
  cellsContainer.innerHTML = '';
  // save length of field
  // draw rows and cells
  // make template of row with cells
  currentRow = document.createElement('div');
  currentRow.classList.add('row');
  for ( i = 0; i < num; i++ ) {
    currentCell = document.createElement('div');
    currentCell.classList.add('cell');
    currentRow.appendChild(currentCell);
  }
  // insert template
  for ( i = 0; i < num; i++ ) {
    cellsContainer.appendChild(currentRow.cloneNode(true));
  }
  // after render logic
  cells = document.querySelectorAll('.cell');
  startGameLogic();
}
// TODO G1 + G2 + G3
function myMoveLogic() {
  'use strict';
  cellsContainer.addEventListener('click', makeChoice);
}
// EO TODO G1 + G2 + G3

// TODO H1 + H2
function getLongPoll(xhr) {
  'use strict';
  var content;
  content = getXHRData(xhr);
  if (xhr.status === 200) {
    if (content.move) {
      fillMove(--content.move, state.partnerClass);
      cellsContainer.addEventListener('click', makeChoice);
    }
    if (content.win) {
      makeWinner(content.win);
    }
    return;
  } else {
    makeLongPoll();
  }
}
function makeLongPoll() {
  'use strict';
  sendAJAX('GET', gameUrls.move, null, getLongPoll);
}
function notMyMoveLogic() {
  'use strict';
  makeLongPoll();
}
// EO TODO H1 + H2
function startGameLogic() {
  'use strict';
  mainGameStatusMsg = document.querySelector('.mainGame .status-message');
  if (state.myClass === 'x') {
    myMoveLogic();
  } else {
    notMyMoveLogic();
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
    state.myClass = content.side;
    state.partnerClass = ( state.myClass === 'x' ) ? 'o' : 'x';
    renderField(10);
    return;
  }
  if (xhr.status === 410) {
    showMessage(createGameStatusMsg, 'Ошибка старта игры: другой игрок не ответил');
    return;
  }
  showMessage(createGameStatusMsg, 'Неизвестная ошибка старта игры');
}
function startGameServerPart(playerId) {
  'use strict';
  var gameReadyUrl;
  var startGameObj;
  startGameObj = {};
  state.playerId = playerId;
  startGameBtn.disabled = true;
  showMessage(createGameStatusMsg, 'Ожидаем начала игры');
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
      console.log('default ws message in switch operator ' + message.id);
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
  showMessage(createGameStatusMsg, 'Ошибка создания игры');
  startGameBtn.disabled = false;
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
