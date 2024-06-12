/**
 * Reference: https://codesandbox.io/p/sandbox/tic-tac-toedynamic-yirkd
 */

let player1 = 'X';
let player2 = 'O';
let turn = 0;
let reset = 0;
let dimension = 6; // boardSize
let winLine = 3; // hoanggbao: line to win
let board;

document.getElementById('play_again').disabled = true;
document.getElementById('rst').disabled = true;
document.getElementById('play_again').style.opacity = String(0.5);
document.getElementById('rst').style.opacity = String(0.5);

function rst() {
    window.location.reload();
}

function play_again() {
    board = new Array(dimension)
        .fill('')
        .map(() => new Array(dimension).fill(''));
    initGame();
    turn = 0;
    reset = 0;
    document.getElementById('play_again').disabled = true;
    document.getElementById('rst').disabled = true;
    document.getElementById('play_again').style.opacity = 0.5;
    document.getElementById('rst').style.opacity = 0.5;
    var rm = document.getElementById('field');
    while (rm.firstChild) {
        rm.removeChild(rm.firstChild);
    }
    initGame();
}

function start() {
    //alert(player1+" "+player2);
    document.getElementById('bottom').classList.remove('hide');
    document.getElementById('st').setAttribute('disabled', true);
    document.getElementById('st').style.opacity = 0.5;
    board = new Array(dimension)
        .fill('')
        .map(() => new Array(dimension).fill(''));
    initGame();
}

/**
 * Check win
 * @description dynamically check win with dynamic boardSize and line to win
 * @param {*} row position row of this move
 * @param {*} col position column of this move
 * @param {*} board board array with 2x2 matrix
 * @returns { true } if win
 * @author: hoanggbao
 * Date Modified: 12:04 - 12.06.24
 * TODO: Need Improve
 */

function rowChecked(row) {
    let cnt = 0;
    let ch = 'X';

    for (let i = 0; i < dimension; ++i) {
        if (board[row][i] === '') {
            cnt = 0;
        } else if (ch === board[row][i]) {
            cnt++;
            if (cnt === winLine) {
                return true;
            }
        } else {
            cnt = 1;
            ch = board[row][i];
        }
    }

    return false;
}

function colChecked(col) {
    let cnt = 0;
    let ch = 'X';

    for (let i = 0; i < dimension; ++i) {
        if (board[i][col] === '') {
            cnt = 0;
        } else if (ch === board[i][col]) {
            cnt++;
            if (cnt === winLine) {
                return true;
            }
        } else {
            cnt = 1;
            ch = board[i][col];
        }
    }

    return false;
}

function diagonal1Checked(row, col) {
    let cnt = 0;
    let ch = 'X';

    for (let k = Math.max(-row, -col); k <= Math.min(dimension - row - 1, dimension - col - 1); ++k) {
        if (board[row + k][col + k] === '') {
            cnt = 0;
        } else if (ch === board[row + k][col + k]) {
            cnt++;
            if (cnt === winLine) {
                return true;
            }
        } else {
            cnt = 1;
            ch = board[row + k][col + k];
        }
    }

    return false;
}

function diagonal2Checked(row, col) {
    let cnt = 0;
    let ch = 'X';

    for (let k = Math.max(-row, -dimension + col + 1); k <= Math.min(dimension - row - 1, col); ++k) {
        if (board[row + k][col - k] === '') {
            cnt = 0;
        } else if (ch === board[row + k][col - k]) {
            cnt++;
            if (cnt === winLine) {
                return true;
            }
        } else {
            cnt = 1;
            ch = board[row + k][col - k];
        }
    }

    return false;
}

function checkWin(row, col) {
    return rowChecked(row) || colChecked(col) || diagonal1Checked(row, col) || diagonal2Checked(row, col);
}

function handleReset() {
    reset = 1;
    document.getElementById('play_again').disabled = false;
    document.getElementById('rst').disabled = false;
    document.getElementById('play_again').style.opacity = 1;
    document.getElementById('rst').style.opacity = 1;
}

const handleClick = (cell, i, j) => {
    const el = cell;
    if (reset === 1 || el.innerHTML !== '') {
        return;
    }

    board[i][j] = turn % 2 === 0 ? 'X' : 'O';
    el.innerHTML = board[i][j];

    if (checkWin(i, j)) { // hoanggbao: new condition
        if (turn % 2 === 0) alert(player1 + ' is winner'); else alert(player2 + ' is winner');
        handleReset();
        return;
    }
    turn++;
    document.getElementById('info').innerHTML = turn % 2 === 0 ? player1 + " turn's" : player2 + " turn's";

    if (turn === dimension * dimension && reset === 0) {
        alert('Game is drawn');
        handleReset();
    }
};

function initGame() {
    let gameContainer = document.getElementById('field');
    for (let i = 0; i < dimension; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < dimension; j++) {
            let cell = document.createElement('div');
            cell.addEventListener('click', (event) => handleClick(cell, i, j));
            cell.className = 'cell';
            row.appendChild(cell);
        }
        gameContainer.appendChild(row);
    }
}