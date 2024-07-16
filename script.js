// script.js
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById('status');
const moveSound = document.getElementById('move-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const leaderboardList = document.getElementById('leaderboard-list');
let players = { X: 'Player X', O: 'Player O' };
let scores = { X: 0, O: 0 };

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

function startGame() {
    players.X = player1Input.value || 'Player 1';
    players.O = player2Input.value || 'Player 2';
    currentPlayer = 'X';
    statusDisplay.innerHTML = `${players[currentPlayer]}'s turn`;
    document.getElementById('board').style.display = 'grid';
    document.querySelector('.reset-button').style.display = 'inline-block';
}

function handleMove(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].innerHTML = currentPlayer;
    moveSound.play();

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            document.querySelectorAll('.cell')[winCondition[0]].classList.add('win');
            document.querySelectorAll('.cell')[winCondition[1]].classList.add('win');
            document.querySelectorAll('.cell')[winCondition[2]].classList.add('win');
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `${players[currentPlayer]} has won!`;
        winSound.play();
        gameActive = false;
        confetti();
        updateLeaderboard();
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerHTML = `Game is a draw!`;
        drawSound.play();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `${players[currentPlayer]}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('win');
    });
    statusDisplay.innerHTML = `${players[currentPlayer]}'s turn`;
}

function updateLeaderboard() {
    scores[currentPlayer]++;
    leaderboardList.innerHTML = `
        <li>${players.X}: ${scores.X}</li>
        <li>${players.O}: ${scores.O}</li>
    `;
}

function confetti() {
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettiParticles = [];
    const colors = ['#ff6b6b', '#ffd700', '#2b2d42', '#a1ffb1'];

    for (let i = 0; i < 200; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
        });
    }

    function drawConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiParticles.forEach(particle => {
            confettiCtx.save();
            confettiCtx.translate(particle.x, particle.y);
            confettiCtx.rotate(particle.rotation * Math.PI / 180);
            confettiCtx.fillStyle = particle.color;
            confettiCtx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            confettiCtx.restore();

            particle.y += particle.speed;
            particle.rotation += particle.speed;

            if (particle.y > confettiCanvas.height) {
                particle.y = -particle.size;
                particle.x = Math.random() * confettiCanvas.width;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}
