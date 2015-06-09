var options = {};
var state = {};
var cells;
function stateInit() {
  'use strict';
  state = {
    game: [],
    fieldNum: '',
    started: '',
    next: 'x'
  };
  checkGame();
}
function isCurrentGame() {
  'use strict';
  var data = localStorage.getItem('game');
  if (data) {
    state = JSON.parse(data);
    return true;
  }
  return false;
}
function startOptions() {
  'use strict';
  options.createField = document.querySelector('.generateField');
  options.startNewGameBtn = document.querySelector('.startNewGame');
  options.startGameContainer = document.querySelector('.startGame');
  options.mainGameContainer = document.querySelector('.mainGame');
  options.field = document.querySelector('.field');
  options.winnerMessage = document.querySelector('.winner-message');
  options.errorMessage = 'Вы ввели некорректное число';
  options.minNum = 5;
  options.maxNum = 15;
  options.mainGameContainer.style.display = 'none';
  stateInit();
}
function showHideError(hide) {
  'use strict';
  var errorMsgDiv = document.querySelector('.error-message');
  if (hide) {
    errorMsgDiv.innerHTML = '';
    return true;
  }
  errorMsgDiv.innerHTML = options.errorMessage;
  return false;
}
function isLegalNumber(num) {
  'use strict';
  var numInt;
  if ( (parseInt( num ) !== parseFloat( num ) ) ) return showHideError();
  numInt = parseInt( num );
  if ( isNaN(numInt) || !isFinite(numInt) || numInt > options.maxNum || numInt < options.minNum ) return showHideError();
  return showHideError(true);
}
function renderField(num) {
  'use strict';
  var i;
  var currentRow;
  var currentCell;
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
  if ( state.started !== false ) {
    state.started = true;
    options.field.addEventListener('click', makeChoice);
  } else {
    showWinMessage();
  }
  options.field = document.querySelector('.field');
  cells = document.querySelectorAll('.cell');
}
function newField() {
  'use strict';
  var num = document.querySelector('.count').value;
  if ( isLegalNumber(num) ) {
    options.createField.removeEventListener('click', newField);
    renderField(parseInt(num));
  }
}
function fillOldMoves() {
  'use strict';
  // state has been filled from localStorage data
  var oldMoves = state.game;
  var i;
  var cellIndex;
  var cellClass;
  for ( i = 0; i < oldMoves.length; i++ ) {
    cellIndex = oldMoves[i].index;
    cellClass = oldMoves[i].sign;
    // create querySelectorAll collection of cells and restore moves
    cells[cellIndex].classList.add(cellClass);
  }
}
function checkGame() {
  'use strict';
  var num;
  if ( isCurrentGame() ) {
    num = state.fieldNum;
    renderField(num);
    fillOldMoves();
  }
}
function showWinMessage() {
  'use strict';
  var lastCellIndex = state.game.length - 1;
  var winner = state.game[lastCellIndex].sign;
  options.winnerMessage.innerHTML = (winner === 'x') ? 'Крестик победил' : 'Нолик победил';
}
function isEmptyCell(cellItem) {
  'use strict';
  return !( cellItem.classList.contains('x') || cellItem.classList.contains('o') );
}
function finishGame() {
  'use strict';
  options.field.removeEventListener('click', makeChoice);
  showWinMessage();
}
function saveChoice(el, sign) {
  'use strict';
  var indexEl = Array.prototype.indexOf.call(document.querySelectorAll('.cell'), el);
  var currentChoice = {
    index: indexEl,
    sign: sign
  }
  state.game.push(currentChoice);
  state.next = (state.next === 'x') ? 'o' : 'x';
  localStorage.setItem('game', JSON.stringify(state));
}
function makeChoice(e) {
  'use strict';
  var el = e.target;
  if (!isEmptyCell(el)) return false;

  if (state.next === 'x') el.classList.add('x');
  else el.classList.add('o');

  if ( getWinner() ) {
    state.started = false;
    saveChoice(el, state.next);
    finishGame();
  } else {
    saveChoice(el, state.next);
  }
}
// when click to start new game
function startNewGame() {
  'use strict';
  options.winnerMessage.innerHTML = '';
  options.mainGameContainer.style.display = 'none';
  options.startGameContainer.style.display = 'block';
  localStorage.removeItem('game');
  stateInit();
  options.createField.addEventListener('click', newField);
}
window.addEventListener('load', function namedFunc() {
  'use strict';
  startOptions();
  options.createField.addEventListener('click', newField);
  options.startNewGameBtn.addEventListener('click', startNewGame);
});