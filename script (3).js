// ===========================
// Configuration
// ===========================

const rink = document.getElementById("rink");
const player = document.getElementById("player");
const snowContainer = document.getElementById("snowContainer");
const confettiContainer = document.getElementById("confettiContainer");

const scoreText = document.getElementById("currentScore");

const victory = document.getElementById("victoryScreen");

const restartBtn = document.getElementById("restartBtn");

const targetScore = 50;

let score = 0;

let playerX = rink.clientWidth / 2;

let spawnInterval;

let gameRunning = true;

const keys = {};


// ===========================
// Déplacement joueur
// ===========================

document.addEventListener("keydown", e => {

    keys[e.key.toLowerCase()] = true;

});

document.addEventListener("keyup", e => {

    keys[e.key.toLowerCase()] = false;

});

function movePlayer(){

    if(!gameRunning) return;

    const speed = 7;

    if(keys["arrowleft"] || keys["a"]){

        playerX -= speed;

    }

    if(keys["arrowright"] || keys["d"]){

        playerX += speed;

    }

    const limit = rink.clientWidth - 60;

    if(playerX < 20) playerX = 20;

    if(playerX > limit) playerX = limit;

    player.style.left = playerX + "px";

    requestAnimationFrame(movePlayer);

}


// ===========================
// Création flocons
// ===========================

function createSnowflake(){

    if(!gameRunning) return;

    const snow = document.createElement("div");

    snow.className = "snowflake";

    snow.innerHTML = "❄️";

    const x = Math.random() * (rink.clientWidth - 30);

    snow.style.left = x + "px";

    const duration = 4 + Math.random()*2;

    snow.style.animationDuration = duration+"s";

    snowContainer.appendChild(snow);

    let y = -40;

    const speed = 2 + Math.random()*2;

    const loop = setInterval(()=>{

        if(!gameRunning){

            clearInterval(loop);
            return;
        }

        y += speed;

        snow.style.top = y+"px";

        const snowRect = snow.getBoundingClientRect();

        const playerRect = player.getBoundingClientRect();

        if(

            snowRect.left < playerRect.right &&
            snowRect.right > playerRect.left &&
            snowRect.top < playerRect.bottom &&
            snowRect.bottom > playerRect.top

        ){

            clearInterval(loop);

            snow.remove();

            collectSnow();

            return;

        }

        if(y > rink.clientHeight){

            clearInterval(loop);

            snow.remove();

        }

    },16);

}


// ===========================
// Collecte
// ===========================

function collectSnow(){

    score++;

    scoreText.textContent = score;

    player.classList.add("collect");

    setTimeout(()=>{

        player.classList.remove("collect");

    },300);

    if(score >= targetScore){

        winGame();

    }

}


// ===========================
// Victoire
// ===========================

function winGame(){

    gameRunning = false;

    clearInterval(spawnInterval);

    victory.classList.remove("hidden");

    createConfetti();

}


// ===========================
// Confettis
// ===========================

function createConfetti(){

    const colors=[
        "#ffcc00",
        "#ff4d6d",
        "#00c853",
        "#2196f3",
        "#9c27b0",
        "#ffffff"
    ];

    for(let i=0;i<180;i++){

        const c=document.createElement("div");

        c.className="confetti";

        c.style.left=Math.random()*rink.clientWidth+"px";

        c.style.background=colors[Math.floor(Math.random()*colors.length)];

        c.style.animationDuration=(3+Math.random()*3)+"s";

        c.style.animationDelay=(Math.random()*2)+"s";

        confettiContainer.appendChild(c);

    }

}


// ===========================
// Restart
// ===========================

restartBtn.addEventListener("click",()=>{

    score=0;

    scoreText.textContent="0";

    gameRunning=true;

    playerX=rink.clientWidth/2;

    player.style.left=playerX+"px";

    victory.classList.add("hidden");

    snowContainer.innerHTML="";

    confettiContainer.innerHTML="";

    spawnInterval=setInterval(createSnowflake,650);

    movePlayer();

});


// ===========================
// Lancement
// ===========================

spawnInterval=setInterval(createSnowflake,650);

movePlayer();