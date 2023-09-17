const board = document.querySelector('.tic-tac-toe-board');
const messageText = document.querySelector('#message-text');
const resetButton = document.querySelector('#reset-button');
const restartBoardButton = document.querySelector('#restart-board-button');
const resetScoreButton = document.querySelector('#reset-score-button');
const scoreText = document.querySelector('#score-text');
const playerXNameInput = document.querySelector('#player-x-name');
const playerONameInput = document.querySelector('#player-o-name');
const timerOption = document.querySelector('#timer-option');
const timerX = document.querySelector('#timer-x');
const timerO = document.querySelector('#timer-o');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;
let gameActive = false; 
let timer; 
const moveTimeLimit = 15; 

function handleCellClick(index) {
    if (!gameActive) {
        messageText.textContent = 'Enter player names and click "Restart Game" to begin.';
        return;
    }

    if (boardState[index] === '') {
        boardState[index] = currentPlayer;
        renderBoard();
        if (isGameWon()) {
            gameActive = false;
            if (currentPlayer === 'X') {
                playerXScore++;
                messageText.textContent = `${playerXNameInput.value} wins!`;
            } else {
                playerOScore++;
                messageText.textContent = `${playerONameInput.value} wins!`;
            }
            scoreText.textContent = `${playerXNameInput.value}: ${playerXScore} | ${playerONameInput.value}: ${playerOScore}`;
        } else if (!boardState.includes('')) {
            gameActive = false;
            messageText.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageText.textContent = `Player ${currentPlayer}'s turn`;
            if (timerOption.checked) {
                startTimer();
            }
        }
    }
}


function isGameWon() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}


function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(handleTimerEnd, moveTimeLimit * 1000);
}


function handleTimerEnd() {
    if (gameActive) {
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageText.textContent = `Player ${currentPlayer}'s turn (Time's up!)`;
        
        if (currentPlayer === 'X') {
            playerOScore++;
            messageText.textContent = `${playerONameInput.value} wins! (Player X took too long)`;
        } else {
            playerXScore++;
            messageText.textContent = `${playerXNameInput.value} wins! (Player O took too long)`;
        }
        gameActive = false;
        scoreText.textContent = `${playerXNameInput.value}: ${playerXScore} | ${playerONameInput.value}: ${playerOScore}`;
    }
}


function resetGame() {
    if (!playerXNameInput.value || !playerONameInput.value) {
        messageText.textContent = 'Please enter both player names.';
        return;
    }

    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    clearTimeout(timer); // Clear any existing timers
    renderBoard();
    messageText.textContent = `Player ${currentPlayer}'s turn`;
    if (timerOption.checked) {
        startTimer();
    }
}


function resetScoreAndNames() {
    playerXNameInput.value = '';
    playerONameInput.value = '';
    playerXScore = 0;
    playerOScore = 0;
    scoreText.textContent = `${playerXNameInput.value}: 0 | ${playerONameInput.value}: 0`;
    resetGame();
}

function restartBoard() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    clearTimeout(timer); 
    renderBoard();
    messageText.textContent = `Player ${currentPlayer}'s turn`;
    if (timerOption.checked) {
        startTimer();
    }
}

resetButton.addEventListener('click', resetGame);
resetScoreButton.addEventListener('click', resetScoreAndNames);
restartBoardButton.addEventListener('click', restartBoard);


function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < boardState.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('tic-tac-toe-cell');
        cell.textContent = boardState[i];
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}


renderBoard();
if (timerOption.checked) {
    startTimer();
}
