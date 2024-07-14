// script.js
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');
const addPlayerButton = document.getElementById('add-player-btn');
const startGameButton = document.getElementById('start-game-btn');
const playerNameInput = document.getElementById('player-name');
const playerList = document.getElementById('player-list');
const player1Select = document.getElementById('player1-select');
const player2Select = document.getElementById('player2-select');
const playerRegistration = document.getElementById('player-registration');
const playerSelection = document.getElementById('player-selection');
const gameContainer = document.getElementById('game-container');

let players = [];
let currentPlayerIndex = 0;
let currentPlayer;
let gameActive = false;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessage = () => `Player ${players[currentPlayerIndex].name} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${players[currentPlayerIndex].name}'s turn`;

function addPlayer() {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        const playerId = Date.now().toString();
        const player = { id: playerId, name: playerName };
        players.push(player);

        const listItem = document.createElement('li');
        listItem.textContent = playerName;
        playerList.appendChild(listItem);

        const option1 = document.createElement('option');
        option1.value = playerId;
        option1.textContent = playerName;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = playerId;
        option2.textContent = playerName;
        player2Select.appendChild(option2);

        playerNameInput.value = '';
    }
}

function startGame() {
    const player1Id = player1Select.value;
    const player2Id = player2Select.value;

    if (player1Id && player2Id && player1Id !== player2Id) {
        currentPlayerIndex = 0;
        currentPlayer = players.find(player => player.id === player1Id);
        const player2 = players.find(player => player.id === player2Id);
        players = [currentPlayer, player2];

        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerHTML = currentPlayerTurn();
        cells.forEach(cell => cell.innerHTML = '');
        gameContainer.style.display = 'block';
        playerRegistration.style.display = 'none';
        playerSelection.style.display = 'none';
    } else {
        alert('Please select two different players.');
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayerIndex === 0 ? 'X' : 'O';
    clickedCell.innerHTML = gameState[clickedCellIndex];
}

function handlePlayerChange() {
    currentPlayerIndex = 1 - currentPlayerIndex;
    currentPlayer = players[currentPlayerIndex];
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayerIndex = 0;
    currentPlayer = players[currentPlayerIndex];
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => cell.innerHTML = '');
}

addPlayerButton.addEventListener('click', addPlayer);
startGameButton.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
