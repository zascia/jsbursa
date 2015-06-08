var options = {};
var state = {};
var cells;
function stateInit() {
  state = {
    game: [],
    fieldNum: '',
    started: '',
    next: 'x'
  };
  checkGame();
}
function isCurrentGame() {
  var data = localStorage.getItem('game');
  if (data) {
    state = JSON.parse(data);
    console.log('storage exists ', state);
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
  if ( state.started !== false ) {
    state.started = true;
    options.field.addEventListener('click', makeChoice);
  } else {
    showWinMessage();
  }
  options.field = document.querySelector('.field');


  cells = document.querySelectorAll('.cell');

  <!-- TODO: remove later -->
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
function fillOldMoves() {
  // state has been filled from localStorage data
  var oldMoves = state.game;
  var i, cellIndex, cellClass;
  for ( i = 0; i < oldMoves.length; i++ ) {
    cellIndex = oldMoves[i].index;
    cellClass = oldMoves[i].sign;
    // create querySelectorAll collection of cells and restore moves
    cells[cellIndex].classList.add(cellClass);
  }
}
function checkGame() {
  if ( isCurrentGame() ) {
    var num = state.fieldNum;
    renderField(num);
    fillOldMoves();
  }
}

function isEmptyCell(cellItem) {
  return !( cellItem.classList.contains('x') || cellItem.classList.contains('o') );
}
function finishGame() {
  options.field.removeEventListener('click', makeChoice);

  showWinMessage();
}
function showWinMessage() {
  var lastCellIndex = state.game.length - 1;
  var winner = state.game[lastCellIndex].sign;
  var winnerText = (winner === 'x') ? 'Крестик победил' : 'Нолик победил';
  options.winnerMessage.innerHTML = winnerText;
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

  winner = getWinner();
  if (winner) {
    state.started = false;
    saveChoice(el, state.next);
    finishGame();
  }
  state.next = (state.next === 'x') ? 'o' : 'x';
}

//when click to start new game
function startNewGame() {
  options.winnerMessage.innerHTML = '';
  options.mainGameContainer.style.display = 'none';
  options.startGameContainer.style.display = 'block';
  localStorage.removeItem('game');
  stateInit();
  options.createField.addEventListener('click', newField);
}

window.addEventListener('load', function () {
  'use strict';
  startOptions();
  options.createField.addEventListener('click', newField);
  options.startNewGameBtn.addEventListener('click', startNewGame);
});