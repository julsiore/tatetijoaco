const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.querySelector('.reset-button');

let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const humanPlayer = 'X';
const computerPlayer = 'O';

// Función principal al hacer clic
function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = Array.from(cells).indexOf(clickedCell);

    if (board[cellIndex] !== '' || !gameActive) return;

    makeMove(cellIndex, humanPlayer);

    if (gameActive) {
        // Pequeña pausa antes de que la máquina juegue
        setTimeout(() => {
            computerMove();
        }, 300);
    }
}

// Hacer un movimiento
function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    checkWinner(player);
}

// IA simple: elige celda vacía al azar
function computerMove() {
    let emptyCells = [];
    board.forEach((cell, idx) => {
        if (cell === '') emptyCells.push(idx);
    });

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, computerPlayer);
}

// Revisar ganador
function checkWinner(player) {
    let roundWon = false;
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Sea cual sea el resultado, Joaco, siempre serás mi campeón y te ganaste una cita conmigo`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.textContent = '¡Empate! Intentá una vez más, Joaco...';
        gameActive = false;
    }
}

// Reiniciar juego
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
