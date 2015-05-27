//Ваш код будет здесь
function startNewGame() {
    options.choice = 'x';
    options.winnerMessage.innerHTML = '';
    var cellsX = document.querySelectorAll('.cell.x');
    var cellsO = document.querySelectorAll('.cell.o');
    clearClassNames(cellsX, 'x');
    clearClassNames(cellsO, 'o');

    options.field.addEventListener('click', makeChoice);

};

function clearClassNames(collection, className) {
    for (var i = 0; i < collection.length; i++) {
        var elClassList = collection[i].classList;
        elClassList.remove(className);
    }
};

function isEmptyCell(cellItem) {
    return !( cellItem.classList.contains('x') || cellItem.classList.contains('o') );
};

function makeChoice(e) {
    var el = e.target;
    if ( !isEmptyCell(el) ) return false;

    if (options.choice == 'x') el.classList.add('x');
    else el.classList.add('o');
    options.choice = (options.choice == 'x') ? 'o' : 'x';

    var winner = getWinner();
    if (winner) finishGame(winner);

};

function finishGame(winner) {
    var winnerText = (winner == 'x') ? 'Крестик победил' : 'Нолик победил';
    options.winnerMessage.innerHTML = winnerText;
    options.field.removeEventListener('click', makeChoice);
}

function init() {
    options.choice = 'x';
    options.winnerMessage = document.querySelector('.winner-message');
    options.field = document.querySelector('.field');
    options.startBtn = document.querySelector('.startNewGame');

    options.startBtn.addEventListener('click', startNewGame);
};

var options = {}

document.addEventListener('DOMContentLoaded', init);