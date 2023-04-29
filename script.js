Window.addEventListener('DOMContentLoaded', () => {
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYER0_WON = 'PLAYER0_WON';
const TIE = 'TIE';

/*
Indexes within the board
[1][2][3]
[4][5][6]
[7][8][9]
*/

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function handleResultValidation() {
    let roundDown = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if( a === b && b === c) {
            break;
        }
    }
    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYER0_WON);
        isGameActive = false;
        return;
    }
    if (!board.includes(''))
    announce(TIE);
}

const announce = (type) => {
    switch(type){
        case PLAYER0_WON:
            announcer.innerHTML = 'Player <span class="player0">0</span> Won';
            break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
            case TIE:
            announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
};
const updateBoard = (index) => {
    board[index] = currentPlayer;
}

const changePlayer = () => {
playerDisplay.classList.remove(`player${currentPlayer}`);
currentPlayer = currentPlayer === 'X' ? '0' : 'X';
playerDisplay.innerText = currentPlayer;
playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}


tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

resetButton.addEventListener('click', resetBoard);
});