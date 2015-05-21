//Ваш код будет здесь
function startNewGame() {
  var winnerMessage = document.querySelector('.winner-message');
    winnerMessage.innerHTML = '';
    var cellsX = document.querySelectorAll('.cell.x');
  var cellsO = document.querySelectorAll('.cell.o');
    clearClassNames(cellsX, 'x');
    clearClassNames(cellsO, 'o');


};

function clearClassNames(collection, className) {
    for (var i = 0; i < collection.length; i++) {
        var elClassList = collection[i].classList;
        elClassList.remove(className);
    }
}

function makeChoice(e) {
    var el = e.target;
    el.classList.add('x');
};

function init() {
    var startBtn = document.querySelector('.startNewGame');
    var field = document.querySelector('.field');
    startBtn.addEventListener('click', startNewGame);
    field.addEventListener('click', makeChoice);
};

document.addEventListener('DOMContentLoaded', init);