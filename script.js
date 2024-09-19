let chance;
const digits = 4;
let code, allGuess;

const startGame = () => {
    document.getElementsByClassName("cntr1")[0].style.display = "none";
    document.getElementById("main").style.display = "block";
    reset();
};

const setRand = () => {
    code = [];
    while (code.length < digits) {
        const num = Math.floor(Math.random() * 10);
        if (!code.includes(num)) {
            code.push(num);
        }
    }
};

const reset = () => {
    allGuess = [];
    chance = 1;
    setRand();
    document.getElementById('bulls').textContent = 0;
    document.getElementById('cows').textContent = 0;
    document.getElementById('chance').textContent = 10;
    document.getElementById('turn').textContent = "";
    document.getElementById('attempts').innerHTML = "";
    document.getElementById('win').style.display = "none";
    document.getElementById('lose').style.display = "none";
    document.getElementById('error').style.display = "none";
    document.getElementById('guessInput').disabled = false;
    document.querySelector("button[onclick='playbullsandcows()']").disabled = false;
};

const playbullsandcows = () => {
    const guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.trim();
    document.getElementById("error").style.display = "none";
    if (!guess) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "❗Erreur : Entrez un nombre.";
        return;
    }

    if (checkInput(guess)) {
        if (allGuess.includes(guess)) {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").textContent = "❗Erreur : Vous avez déjà saisi ce nombre.";
            return;
        }

        allGuess.push(guess); // Ajout de la tentative à la liste des essais

        guess = guess.split("").map(Number);
        const bulls = numberOfBulls(guess, code);
        const cows = numberOfCows(guess, code);
        document.getElementById("bulls").textContent = bulls;
        document.getElementById("cows").textContent = cows;
        document.getElementById("chance").textContent = 10 - chance;

        updateAttemptsDisplay(chance, guess.join(''), bulls, cows);
        chance++;

        if (bulls === digits) {
            endGame(` 🏆  🎉 Le code est  : ${code.join('')} ,Vous avez trouvé le code en ${chance - 1} essai(s)🏆`, "win");
        } else if (chance > 10) {
            endGame(`Malheureusement  ! 😢 Le code était : ${code.join('')} `);
        }
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "❗Erreur : Entrez un nombre valide de 4 chiffres.";
    }
};

const checkInput = (guess) => {
    return guess.length === digits && /^[0-9]+$/.test(guess) && new Set(guess).size === digits;
};

const updateAttemptsDisplay = (chance, guess, bulls, cows) => {
    const attemptsList = document.getElementById("attempts");
    const listItem = document.createElement("li");
    listItem.textContent = `✅ Essai ${chance}: ${guess} | Taureaux 🐂: ${bulls} | Vaches 🐄: ${cows}`;
    attemptsList.appendChild(listItem);
};

const numberOfBulls = (guess, code) => {
    return guess.filter((digit, index) => digit === code[index]).length;
};

const numberOfCows = (guess, code) => {
    return guess.filter((digit, index) => code.includes(digit) && digit !== code[index]).length;
};

const endGame = (message, result) => {
    document.getElementById("turn").textContent = message;
    document.getElementById("result").style.display = "flex";
    document.getElementById("main").style.display = "none";

    // Réinitialisez la visibilité des images
    document.querySelectorAll("#result-images img").forEach(img => img.style.display = "none");

    // Affichez les images appropriées
    if (result === "win") {
        document.getElementById("win").style.display = "block";
        document.getElementById("win-image").style.display = "block";
        document.getElementById("win-image-2").style.display = "block";
    } else {
        document.getElementById("lose").style.display = "block";
        document.getElementById("lose-image").style.display = "block";
        document.getElementById("lose-image-2").style.display = "block";
    }
};


const giveUp = () => {
    endGame(`Vous avez abandonné ! 😞 Le code était : ${code.join('')}`, "lose");
};


const returnToHome = () => {
    document.getElementsByClassName("cntr1")[0].style.display = "block";  // Affiche la page d'accueil
    document.getElementById("result").style.display = "none";  // Cache le résultat
    document.getElementById("main").style.display = "none";  // Cache la section du jeu
};
window.onload = () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("result").style.display = "none";
};
