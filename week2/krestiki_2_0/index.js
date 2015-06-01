var options = {};
var state = {
  game: [],
  started: false,
  next: 'x'
};
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
  options.field = document.querySelector('.field');
  options.winnerMessage = document.querySelector('.winner-message');
  options.errorMessage = 'Вы ввели некорректное число';
  options.minNum = 5;
  options.maxNum = 15;
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
  var startGameField = document.querySelector('.startGame');
  var cellsContainer = document.querySelector('.field');
  startGameField.style.display = 'none';
  // show battle field
  var mainGame = document.querySelector('.mainGame');
  mainGame.style.display = 'block';
  // save length of field
  state.game.push(num);
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
    var startGame = document.querySelector('.startGame');
    startGame.style.display = 'none';
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
function makeChoice(e) {
  var el = e.target;
  var winner;
  if (!isEmptyCell(el)) return false;

  if (state.next === 'x') el.classList.add('x');
  else el.classList.add('o');
  state.next = (state.next === 'x') ? 'o' : 'x';

  winner = getWinner();
  if (winner) finishGame(winner);
}

window.addEventListener('load', function () {
  'use strict';
  startOptions();
  checkGame();
  options.createField.addEventListener('click', newField);
});