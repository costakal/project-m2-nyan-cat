const beginGame = document.getElementById("app");

let titleName = document.createElement("h2");
let startBtn = document.createElement("button");
let howToPlay = document.createElement("button");
let backToMain = document.createElement("button");
let instructions = document.createElement("p");

titleName.innerHTML = "Monster Plague";
titleName.style.position = "absolute";
titleName.style.left = "300px";
titleName.style.top = "190px";
titleName.style.fontSize = "35px";
titleName.style.color = "white";
titleName.style.textShadow = "2px 2px 5px black";

startBtn.innerText = "Begin";
startBtn.style.position = "absolute";
startBtn.style.left = "480px";
startBtn.style.top = "300px";
startBtn.style.fontSize = "20px";
startBtn.style.background = "none";
startBtn.style.border = "none";
startBtn.style.color = "white";

howToPlay.innerText = "How to Play";
howToPlay.style.position = "absolute";
howToPlay.style.left = "420px";
howToPlay.style.top = "350px";
howToPlay.style.fontSize = "20px";
howToPlay.style.background = "none";
howToPlay.style.border = "none";
howToPlay.style.color = "white";

beginGame.appendChild(startBtn);
beginGame.appendChild(titleName);
beginGame.appendChild(howToPlay);

startBtn.addEventListener("mouseover", function () {
  startBtn.style.color = "black";
});
startBtn.addEventListener("mouseout", function () {
  startBtn.style.color = "white";
});

howToPlay.addEventListener("mouseover", function () {
  howToPlay.style.color = "black";
});
howToPlay.addEventListener("mouseout", function () {
  howToPlay.style.color = "white";
});

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  titleName.style.display = "none";
  howToPlay.style.display = "none";

  // this allows the power ups interval to run as soon as you start the game//
  setInterval(() => {
    MAX_POWERUPS = 1;
  }, Math.random() * 20000 + 10000);

  gameEngine.gameLoop();
});

howToPlay.addEventListener("click", () => {
  startBtn.style.display = "none";
  titleName.style.display = "none";
  howToPlay.style.display = "none";

  instructions.innerText =
    "Monsters are falling from the Sky!\n\nAvoide the Monsters at all costs.\n\nUse the ⬅️ and ➡️ keys to move.\n\nDrink potions to unleash your inner demon!\n\nand then take to the sky using ⬆️ and ⬇️ keys.\n\nYou can also shoot 🔥 with the 'Space' Key\n\nJust be careful because you have limited\nfire power!";

  instructions.style.display = "inline";
  instructions.style.position = "absolute";
  instructions.style.left = "80px";
  instructions.style.top = "40px";
  instructions.style.fontSize = "20px";
  instructions.style.background = "none";
  instructions.style.border = "none";
  instructions.style.color = "white";
  instructions.style.textShadow = "2px 2px 5px black";

  beginGame.appendChild(instructions);

  backToMain.innerText = "Return to Main Menu";
  backToMain.style.display = "inline";
  backToMain.style.position = "absolute";
  backToMain.style.left = "350px";
  backToMain.style.top = "400px";
  backToMain.style.fontSize = "20px";
  backToMain.style.background = "none";
  backToMain.style.border = "none";
  backToMain.style.color = "white";

  beginGame.appendChild(backToMain);

  backToMain.addEventListener("mouseover", function () {
    backToMain.style.color = "black";
  });
  backToMain.addEventListener("mouseout", function () {
    backToMain.style.color = "white";
  });
});

backToMain.addEventListener("click", () => {
  startBtn.style.display = "inline";
  titleName.style.display = "inline";
  howToPlay.style.display = "inline";
  instructions.style.display = "none";
  backToMain.style.display = "none";
});

const gameEngine = new Engine(document.getElementById("app"));

// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }

  if (event.code === "ArrowDown") {
    gameEngine.player.moveDown();
  }
};
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);
