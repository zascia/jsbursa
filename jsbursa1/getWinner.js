function getWinner() {
    var cellsD = document.querySelectorAll('.cell');
    var cells = [[], [], []];
    var i;
    for (i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var el = cellsD[i * 3 + j];
            if (el.classList.contains('x')) {
                cells[i][j] = 'x';
            }
            if (el.classList.contains('o')) {
                cells[i][j] = 'o';
            }

        }
    }

    if (
        ((cells[0][0] === cells[1][1]) && (cells[1][1] === cells[2][2])) ||
        ((cells[2][0] === cells[1][1]) && (cells[1][1] === cells[0][2]))
    ) {
        return cells[1][1];
    }

    for (i = 0 ; i < 2; i++) {
        if ((cells[0][i] === cells[1][i]) && (cells[1][i] === cells[2][i])) {
            return cells[0][i];
        }
        if ((cells[i][0] === cells[i][1]) && (cells[i][1] === cells[i][2])) {
            return cells[i][0];
        }
    }
}