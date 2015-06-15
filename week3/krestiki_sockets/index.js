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
  if (data) {
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (url === gameUrls.move) {
      xhr.setRequestHeader('Game-ID', state.gameId);
      xhr.setRequestHeader('Player-ID', state.playerId);
    }
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
    if ( type && type.match(/application\/json/) ) {
      content = JSON.parse(xhr.responseText);
    } else if (xhr.responseText.match(/side/)) {
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
    fillMove(state.last);
    if (content.win) {
      makeWinner(content.win);
    }
  } else {
    errorMove(content.message);
  }
}
//
function makeWinner(winner) {
  mainGameStatusMsg.textContent = winner;
}
function errorMove(errorMsg) {
  'use strict';
  mainGameStatusMsg.textContent = errorMsg || '??????????? ??????';
  cancelCreateGame();
}
// fill with x or o if success after click
function fillMove(index) {
  'use strict';
  cells[index].classList.add(state.myClass);
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

  // ? ?????? ?????? 200 ?? G1 ????????? ??????????????? ??????? ???? ????? ?? ??????, ?? ??????? ????????. ???? ? ?????? ??????? ?????????? ???? win (????? ????????? ???????? 'x' ???? 'o') - ??????? ? .status-message ?????????, ??????? ????? ? ???? win. ???? ???????? ???-??.
  // ? ?????? ??????? ??????? G1 ??????? ????????? ? .status-message ???? ?????????? ???? message ??????, ????, ???? ?????? ??? - ????? "??????????? ??????". ?????????? ?????????? ????? ??????, ????????? ? ????? ????? ?????? newGame
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
function notMyMoveLogic() {
  'use strict';
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
    renderField(10);
    return;
  }
  if (xhr.status === 410) {
    showMessage(createGameStatusMsg, '?????? ?????? ????: ?????? ????? ?? ???????');
    return;
  }
  showMessage(createGameStatusMsg, '??????????? ?????? ?????? ????');
}
function startGameServerPart(playerId) {
  'use strict';
  var gameReadyUrl;
  var startGameObj;
  startGameObj = {};
  state.playerId = playerId;
  startGameBtn.disabled = true;
  showMessage(createGameStatusMsg, '??????? ?????? ????');
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
  showMessage(createGameStatusMsg, '?????? ???????? ????');
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