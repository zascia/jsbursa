var options = {};
var state = {
  game: []
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
  if ( isNaN(num) || !isFinite(num) ) return showError();
  if ( num > options.maxNum || num < options.minNum ) return showError();
  return true;
}
function showError() {
  var errorMsgDiv = document.querySelector('.error-message');
  errorMsgDiv.innerHTML = options.errorMessage;
  return false;
}
function generateField() {
  var num = parseInt( document.querySelector('.count').value );
  if ( isLegalNumber(num) ) {
    options.createField.removeEventListener('click', generateField);
  }
}
function checkGame() {
  if ( isCurrentGame() ) {
    var startGame = document.querySelector('.startGame');
    startGame.style.display = 'none';
  }
  alert('No current game');
}
window.addEventListener('load', function () {
  'use strict';
  startOptions();
  checkGame();
  options.createField.addEventListener('click', generateField);
});