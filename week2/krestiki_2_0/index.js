var options = {};
var state = {};
function stateInit() {
  state = {
    game: [],
    fieldNum: '',
    started: false,
    next: 'x'
  };
}
function isCurrentGame() {
  var data = localStorage.getItem('game');
  if (data) {
    state.game = JSON.parse(data);
    return true;
  }
  return false;
}
function startOptions() {
  options.createField = document.querySelector('.generateField');
  options.startNewGameBtn = document.querySelector('.startNewGame');
  options.startGameContainer = document.querySelector('.startGame');
  options.mainGameContainer = document.querySelector('.mainGame');
  options.field = document.querySelector('.field');
  options.winnerMessage = document.querySelector('.winner-message');
  options.errorMessage = 'Вы ввели некорректное число';
  options.minNum = 5;
  options.maxNum = 15;
  stateInit();
}

function isLegalNumber(num) {
  if ( isNaN(num) || !isFinite(num) || num > options.maxNum || num < options.minNum ) return showHideError();
  return showHideError(true);
}
function showHideError(hide) {
  var errorMsgDiv = document.querySelector('.error-message');
  if (hide) {
    errorMsgDiv.innerHTML = '';
    return true;
  }
  errorMsgDiv.innerHTML = options.errorMessage;
  return false;
}
function renderField(num) {
  var i;
  // hide start game field
  var cellsContainer = document.querySelector('.field');
  options.startGameContainer.style.display = 'none';
  // show battle field
  // clear old data
  cellsContainer.innerHTML = '';
  options.mainGameContainer.style.display = 'block';
  // save length of field
  state.fieldNum = num;
  // draw rows and cells
  // make template of row with cells
  var currentRow = document.createElement('div');
  currentRow.classList.add('row');
  for ( i = 0; i < num; i++ ) {
    var currentCell = document.createElement('div');
    currentCell.classList.add('cell');
    currentRow.appendChild(currentCell);
  }
  // insert template
  for ( i = 0; i < num; i++ ) {
    cellsContainer.appendChild(currentRow.cloneNode(true));
  }
  // TODO --> move to separate function
  // after render logic
  state.started = true;
  options.field = document.querySelector('.field');
  options.field.addEventListener('click', makeChoice);

  cells = document.querySelectorAll('.cell');
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = i;
  }
}
function newField() {
  var num = parseInt( document.querySelector('.count').value );
  if ( isLegalNumber(num) ) {
    options.createField.removeEventListener('click', newField);
    renderField(num);
  }
}
function checkGame() {
  if ( isCurrentGame() ) {
    options.startGameContainer.style.display = 'none';
  }
}

function isEmptyCell(cellItem) {
  return !( cellItem.classList.contains('x') || cellItem.classList.contains('o') );
}
function finishGame(winner) {
  var winnerText = (winner === 'x') ? 'Крестик победил' : 'Нолик победил';
  options.winnerMessage.innerHTML = winnerText;
  options.field.removeEventListener('click', makeChoice);
  state.started = false;
}
function saveChoice(el, sign) {
  var indexEl = Array.prototype.indexOf.call(document.querySelectorAll('.cell'), el);
  var currentChoice = {
    index: indexEl,
    sign: sign
  }
  state.game.push(currentChoice);
  localStorage.setItem('game', JSON.stringify(state));
  console.log(state.game);
}
function makeChoice(e) {
  var el = e.target;
  var winner;
  if (!isEmptyCell(el)) return false;

  if (state.next === 'x') el.classList.add('x');
  else el.classList.add('o');
  saveChoice(el, state.next);
  state.next = (state.next === 'x') ? 'o' : 'x';

  winner = getWinner();
  if (winner) finishGame(winner);
}

//when click to start new game
function startNewGame() {
  options.winnerMessage.innerHTML = '';
  options.mainGameContainer.style.display = 'none';
  options.startGameContainer.style.display = 'block';
  stateInit();
  options.createField.addEventListener('click', newField);
}

window.addEventListener('load', function () {
  'use strict';
  startOptions();
  //checkGame();  check in localStorage existing data for saved games
  options.createField.addEventListener('click', newField);
  options.startNewGameBtn.addEventListener('click', startNewGame);
});