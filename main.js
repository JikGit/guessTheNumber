const gradientBarElm = document.getElementById("gradientBar");
const buttonRangeNumberElm = document.querySelector("#formRangeN > .buttonIcon");
const inputNMaxElm = document.getElementById("inputNMax");
const inputNMinElm = document.getElementById("inputNMin");
const inputGuessedNElm = document.getElementById("inputGuessedN");
const formGuessedNElm = document.getElementById("formGuessedN");
const formRangeN = document.getElementById("formRangeN");
const tagElm = document.querySelector("#gradientBar > .tag");
const vittoriaElm = document.getElementById("vittoria");
const listTriedNumberElm = document.querySelector("#triedNumber > ol");

//default range
let rangeN = [0, 100];
let randomN;

const inputNumberOnClick = () => {	
	let guessedValue = parseInt(inputGuessedNElm.value);
	//se sfora il range prende come numero l'estremo del range
	if (guessedValue > rangeN[1]) guessedValue = rangeN[1];
	if (guessedValue < rangeN[0]) guessedValue = rangeN[0];

	//numero da 0 a 1 in base alla vicinanza del guessedNumber al randomN tenendo conto del range
	let scaledNumber = Math.abs(randomN - guessedValue) / ((rangeN[1]-randomN > randomN) ? rangeN[1]-randomN : randomN);
	let color = getColorFromRedToYellowPercentage(scaledNumber * 60);
	//cambio il colore dello sfondo
	document.querySelector("body").style.background = color;

	//cambio il posto del tag colore
	if (guessedValue > randomN) scaledNumber = scaledNumber * 50 + 50;
	else scaledNumber = 50 - (scaledNumber * 50);
	tagElm.style.left = `calc(${scaledNumber} * 1%)`; //transformato in %

	//mostro la scritta vittoria se azzecca il numero
	if (guessedValue === randomN) numeroIndovinato();
	else addTriedNumber(listTriedNumberElm, guessedValue);
}

//in caso di vittoria
const numeroIndovinato = () => {
	vittoriaElm.classList.remove("hide");
	formGuessedNElm.removeEventListener("submit", inputNumberOnClick)
}

//aggiunge un un elemento ad una lista con valore value
const addTriedNumber = (listElm, value) => {
	let listChildElm = document.createElement("li");	
	listChildElm.innerHTML = value;
	listElm.appendChild(listElm);
}

//quando clicco il bottone per impostare il range dei numeri
const startGame = () => {
	//se non e' un numero non lo imposto nel range
	if (!isNumeric(inputNMaxElm.value) || !isNumeric(inputNMinElm.value)) return;

	//setto il range e il randomN
	rangeN = [inputNMaxElm.value, inputNMinElm.value];
	randomN = parseInt(Math.random() * (rangeN[1] - rangeN[0])) + parseInt(rangeN[0]);
	//nascondo la scritta vittoria
	vittoriaElm.classList.add("hide");
	//reimposto il valore dell'input
	inputGuessedNElm.value = "";

	//aggiungo l'even listener al form (invio nell'input)
	formGuessedNElm.addEventListener("submit", inputNumberOnClick)
}

//click del range icon
buttonRangeNumberElm.addEventListener("click", startGame);
//se clicko enter nel range e' come se cliccassi il bottone
formRangeN.addEventListener("keydown", (e) => {
	if(e.key === "Enter") buttonRangeNumberElm.click();
})

//niente refresh su invio 
formGuessedNElm.addEventListener("submit", (e) => {e.preventDefault();})


//where value in range 0-100, red to yellow
function getColorFromRedToYellowPercentage(value) {
    const hue = Math.round(value);
    return ["hsl(", hue, ", 100%, 50%)"].join("");
}

//check if a string is numeric => https://stackoverflow.com/a/24457420
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}


