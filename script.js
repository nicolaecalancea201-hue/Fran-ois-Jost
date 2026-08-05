// Récupération des éléments

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const successScreen = document.getElementById("successScreen");


// -----------------------------
// Bouton NON qui fuit
// -----------------------------


function moveNoButton() {


    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;


    // Nouvelle position aléatoire

    const newX = Math.random() * (windowWidth - 200);
    const newY = Math.random() * (windowHeight - 100);


    noBtn.style.position = "fixed";

    noBtn.style.left = newX + "px";

    noBtn.style.top = newY + "px";


}


// Quand la souris approche du bouton NON

document.addEventListener("mousemove", (event) => {


    const buttonPosition = noBtn.getBoundingClientRect();


    const buttonCenterX =
        buttonPosition.left + buttonPosition.width / 2;


    const buttonCenterY =
        buttonPosition.top + buttonPosition.height / 2;



    const distance = Math.sqrt(

        Math.pow(event.clientX - buttonCenterX, 2) +

        Math.pow(event.clientY - buttonCenterY, 2)

    );



    // Si la souris est proche

    if(distance < 120){

        moveNoButton();

    }


});



// Le bouton NON bouge aussi automatiquement

setInterval(() => {


    moveNoButton();


}, 5000);




// Empêcher le clic sur NON

noBtn.addEventListener("click", function(){


    moveNoButton();


});




// -----------------------------
// Bouton OUI
// -----------------------------


yesBtn.addEventListener("click", function(){


    successScreen.classList.remove("hidden");


});
