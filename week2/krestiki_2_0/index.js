var options = {};
var state = {
  game: [],
  started: false
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
  //hide start game field
  var startGameField = document.querySelector('.startGame');
  var cellsContainer = document.querySelector('.field');
  startGameField.style.display = 'none';
  //show battle field
  var mainGame = document.querySelector('.mainGame');
  mainGame.style.display = 'block';
  //save length of field
  state.game.push(num);
  //draw rows and cells
  //make template of row with cells
  var currentRow = document.createElement('div');
  currentRow.classList.add('row');
  for ( i = 0; i < num; i++ ) {
    var currentCell = document.createElement('div');
    currentCell.classList.add('cell');
    currentRow.appendChild(currentCell);
  }
  //insert template
  for ( i = 0; i < num; i++ ) {
    cellsContainer.appendChild(currentRow.cloneNode(true));
  }
  //flag
  state.started = true;
}
function generateField() {
  var num = parseInt( document.querySelector('.count').value );
  if ( isLegalNumber(num) ) {
    options.createField.removeEventListener('click', generateField);
    renderField(num);
  }
}
function checkGame() {
  if ( isCurrentGame() ) {
    var startGame = document.querySelector('.startGame');
    startGame.style.display = 'none';
  }
}
window.addEventListener('load', function () {
  'use strict';
  startOptions();
  checkGame();
  options.createField.addEventListener('click', generateField);
});