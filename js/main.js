const beginGame = document.getElementById("app");

let titleName = document.createElement("h2");
let startBtn = document.createElement("button");

startBtn.innerText = "Begin";
startBtn.style.position = "absolute";
startBtn.style.left = "480px";
startBtn.style.top = "300px";
startBtn.style.fontSize = "20px";
startBtn.style.background = "none";
startBtn.style.border = "none";
startBtn.style.color = "white";

titleName.innerHTML = "Monster Plague";
titleName.style.position = "absolute";
titleName.style.left = "300px";
titleName.style.top = "190px";
titleName.style.fontSize = "35px";
titleName.style.color = "white";
titleName.style.textShadow = "2px 2px 5px black";

beginGame.appendChild(startBtn);
beginGame.appendChild(titleName);

startBtn.addEventListener("mouseover", function () {
  startBtn.style.color = "black";
});
startBtn.addEventListener("mouseout", function () {
  startBtn.style.color = "white";
});

startBtn.addEventListener("click", function () {
  startBtn.style.display = "none";
  titleName.style.display = "none";

  // this allows the power ups interval to run as soon as you start the game//
  setInterval(() => {
    MAX_POWERUPS = 1;
  }, 3000);

  // }, Math.random() * 25000 + 20000);

  gameEngine.gameLoop();
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
