const boardElement = document.getElementById('board');
const solveBtn = document.getElementById('solve-btn');

const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function renderBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i][j] !== 0) {
                cell.textContent = board[i][j];
                cell.classList.add('fixed');
            }
            boardElement.appendChild(cell);
        }
    }
}

function solve() {
    const emptyCell = findEmptyCell();
    if (!emptyCell) {
        return true; // Solved
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValid(num, row, col)) {
            board[row][col] = num;
            if (solve()) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }

    return false; // No solution
}

function findEmptyCell() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}

function isValid(num, row, col) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    let index = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = cells[index];
            if (!cell.classList.contains('fixed')) {
                cell.textContent = board[i][j];
            }
            index++;
        }
    }
}

solveBtn.addEventListener('click', () => {
    if (solve()) {
        updateBoard();
    } else {
        alert('No solution found!');
    }
});

renderBoard();
