const cardsData = [
    { emoji: "🤝", text: "Coopération" },
    { emoji: "🤝", text: "Coopération" },

    { emoji: "🏙️", text: "Grand Paris Sud" },
    { emoji: "🏙️", text: "Grand Paris Sud" },

    { emoji: "🌍", text: "Ouverture internationale" },
    { emoji: "🌍", text: "Ouverture internationale" },

    { emoji: "🏃", text: "Sport-Santé" },
    { emoji: "🏃", text: "Sport-Santé" },

    { emoji: "🇸🇳", text: "Sénégal" },
    { emoji: "🇸🇳", text: "Sénégal" },

    { emoji: "🇫🇷", text: "France" },
    { emoji: "🇫🇷", text: "France" }
];

const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const victoryModal = document.getElementById("victoryModal");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedPairs = 0;

let seconds = 0;
let timer = null;
let gameStarted = false;

// Mélange des cartes
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Démarrer le chronomètre
function startTimer() {

    timer = setInterval(() => {

        seconds++;

        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");

        timerDisplay.textContent = `${min}:${sec}`;

    }, 1000);

}

// Création des cartes
function createBoard() {

    board.innerHTML = "";

    const shuffled = shuffle([...cardsData]);

    shuffled.forEach(item => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.dataset.emoji = item.emoji;
        card.dataset.text = item.text;

        card.innerHTML = `
            <div class="front">?</div>

            <div class="back">
                <div class="emoji">${item.emoji}</div>
                <div class="label">${item.text}</div>
            </div>
        `;

        card.addEventListener("click", flipCard);

        board.appendChild(card);

    });

}

// Retourner une carte
function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (!gameStarted) {

        gameStarted = true;
        startTimer();

    }

    this.classList.add("flip");

    if (!firstCard) {

        firstCard = this;
        return;

    }

    secondCard = this;

    moves++;
    movesDisplay.textContent = moves;

    checkMatch();

}

// Vérifier si les cartes sont identiques
function checkMatch() {

    const isMatch =
        firstCard.dataset.emoji === secondCard.dataset.emoji;

    if (isMatch) {

        disableCards();

    } else {

        unflipCards();

    }

}

// Si paire trouvée
function disableCards() {

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedPairs++;

    resetBoard();

    if (matchedPairs === 6) {

        clearInterval(timer);

        setTimeout(() => {

            victoryModal.classList.remove("hidden");

        }, 500);

    }

}

// Si mauvaise paire
function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();

    }, 1000);

}

// Réinitialiser les variables
function resetBoard() {

    [firstCard, secondCard, lockBoard] = [null, null, false];

}

// Recommencer la partie
function restartGame() {

    clearInterval(timer);

    seconds = 0;
    timerDisplay.textContent = "00:00";

    moves = 0;
    movesDisplay.textContent = "0";

    matchedPairs = 0;

    firstCard = null;
    secondCard = null;

    gameStarted = false;

    victoryModal.classList.add("hidden");

    createBoard();

}

restartBtn.addEventListener("click", restartGame);

playAgainBtn.addEventListener("click", restartGame);

// Lancer le jeu
createBoard();