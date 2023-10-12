const currentScores = [document.getElementById('current-0'), document.getElementById('current-1')];
const totalScores = [document.getElementById('score-0'), document.getElementById('score-1')];
const diceImg = document.getElementById('dice');

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');

const playerNames = [document.getElementById('name-0'), document.getElementById('name-1')];
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

let scores, currentScore, activePlayer, playGame;

const initGame = function() {
    for (let i = 0; i < totalScores.length; i++) {
        currentScores[i].textContent = 0;
        totalScores[i].textContent = 0;
    }
    diceImg.classList.add("hidden");

    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playGame = true;

    diceImg.classList.add('hidden');
    player0.classList.remove('winner');
    player1.classList.remove('winner');
    player0.classList.add('active');
    player1.classList.remove('active');

    for (let i = 0; i < playerNames.length; i++) {
        playerNames[i].textContent = "Player " + (i + 1);
    }
}

initGame();

const switchPlayer = function() {
    currentScore = 0;
    currentScores[activePlayer].textContent = currentScore;
    activePlayer = 1 - activePlayer;
    player0.classList.toggle("active");
    player1.classList.toggle("active");
}

btnRoll.addEventListener("click", function() {
    if (playGame) {
        diceImg.classList.remove("hidden");

        const dice = Math.floor(Math.random() * 6) + 1;
        diceImg.src = `img/dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            currentScores[activePlayer].textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function() {
    if (playGame) {
        scores[activePlayer] += currentScore;
        totalScores[activePlayer].textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playGame = false;
            playerNames[activePlayer].textContent = "Winner!";
            document.querySelector('.player-' + activePlayer).classList.add("winner");
            diceImg.classList.add("hidden");
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', initGame);
