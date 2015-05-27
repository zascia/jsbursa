// Ваш код будет здесь
'use strict';
var options = {};

function clearClassNames(collection, className) {
  var i;
  var elClassList;
  for ( i = 0; i < collection.length; i++) {
    elClassList = collection[i].classList;
    elClassList.remove(className);
  }
}
function isEmptyCell(cellItem) {
  return !( cellItem.classList.contains('x') || cellItem.classList.contains('o') );
}
function makeChoice(e) {
  var el = e.target;
  var winner;
  if (!isEmptyCell(el)) return false;

  if (options.choice === 'x') el.classList.add('x');
  else el.classList.add('o');
  options.choice = (options.choice === 'x') ? 'o' : 'x';

  winner = getWinner();
  if (winner) finishGame(winner);
}
function finishGame(winner) {
  var winnerText = (winner === 'x') ? 'Крестик победил' : 'Нолик победил';
  options.winnerMessage.innerHTML = winnerText;
  options.field.removeEventListener('click', makeChoice);
}
function startNewGame() {
  var cellsX = document.querySelectorAll('.cell.x');
  var cellsO = document.querySelectorAll('.cell.o');
  options.choice = 'x';
  options.winnerMessage.innerHTML = '';
  clearClassNames(cellsX, 'x');
  clearClassNames(cellsO, 'o');
  options.field.addEventListener('click', makeChoice);
}

function init() {
  options.choice = 'x';
  options.winnerMessage = document.querySelector('.winner-message');
  options.field = document.querySelector('.field');
  options.startBtn = document.querySelector('.startNewGame');

  options.startBtn.addEventListener('click', startNewGame);
}

document.addEventListener('DOMContentLoaded', init);

