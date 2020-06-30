// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.powerUps = [];
    this.fireBalls = [];
    this.ammo = 0;

    this.totalPoints = new Text(this.root, 30, 25);
    this.newlevel = new Text(this.root, 890, 25);
    this.poweredUp = new Text(this.root, 860, 18);

    this.addMusic = document.createElement("audio");
    this.addMusic.src = "sound/music-long.mp3";
    this.addMusic.style.display = "none";
    this.addMusic.id = "audiofile";
    this.root.appendChild(this.addMusic);

    this.gameOverMusic = document.createElement("audio");
    this.gameOverMusic.src = "sound/music-long.mp3";
    this.gameOverMusic.style.display = "none";
    this.gameOverMusic.id = "gameover-tune";
    this.root.appendChild(this.gameOverMusic);

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space" && this.ammo > 0) {
        this.fireBalls.push(new Fireball(this.root, this.player));
        this.fireDamage();
        this.ammo -= 1;
        if (this.ammo < 1) {
          this.player.domElement.src = "images/wizard.gif";
          this.poweredUp.update(``);
        }
      }
      if (event.code === "ArrowUp" && this.ammo > 0) {
        gameEngine.player.moveUp();
      }
    });

    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array

  gameLoop = () => {
    // controls my audio file within the gameloop.
    let audioFile = document.getElementById("audiofile");
    // let gameoverMusic = document.getElementById("gameover-tune");

    // audioFile.play();

    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.powerUps.forEach((powerUp) => {
      powerUp.update(timeDiff);
    });

    this.fireBalls.forEach((fireBall) => {
      fireBall.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.powerUps = this.powerUps.filter((powerUp) => {
      MAX_POWERUPS = 0;
      return !powerUp.usedPowerUp;
    });

    this.fireBalls = this.fireBalls.filter((fireBall) => {
      return !fireBall.fireBallHit;
    });

    // this.fireBalls = this.fireBalls.filter((fireBall) => {
    //   return !fireBall.fireBallHit;
    // });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    while (this.powerUps.length < MAX_POWERUPS) {
      const powerUpSpot = nextPowerUpSpot(this.powerUps);
      this.powerUps.push(new PowerUp(this.root, powerUpSpot));
    }

    // Determines what level you are at based on how many points you have.
    if (POINTS_TRACKER > 250) {
      CURRENT_LEVEL = 2;
      MAX_ENEMIES = 2;
    }
    if (POINTS_TRACKER > 1200) {
      CURRENT_LEVEL = 3;
      MAX_ENEMIES = 3;
    }
    if (POINTS_TRACKER > 4000) {
      CURRENT_LEVEL = 4;
      MAX_ENEMIES = 4;
    }
    if (POINTS_TRACKER > 8500) {
      CURRENT_LEVEL = 5;
      MAX_ENEMIES = 5;
    }
    if (POINTS_TRACKER > 12000) {
      CURRENT_LEVEL = 6;
      MAX_ENEMIES = 6;
    }
    if (POINTS_TRACKER > 20000) {
      CURRENT_LEVEL = 7;
      MAX_ENEMIES = 7;
    }
    if (POINTS_TRACKER > 30000) {
      CURRENT_LEVEL = 8;
      MAX_ENEMIES = 8;
    }
    if (POINTS_TRACKER > 40000) {
      CURRENT_LEVEL = 9;
      MAX_ENEMIES = 9;
    }
    if (POINTS_TRACKER > 50000) {
      CURRENT_LEVEL = 10;
      MAX_ENEMIES = 10;
    }

    // updates the score and the level on screen
    this.totalPoints.update(`Score: ${POINTS_TRACKER}`);

    this.newlevel.update(`Level: ${CURRENT_LEVEL}`);

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      audioFile.pause();
      audioFile.currentTime = 0;

      const restartGame = document.getElementById("app");

      let restartBtn = document.createElement("button");

      restartBtn.innerText = "Try Again";
      restartBtn.style.position = "absolute";
      restartBtn.style.left = "450px";
      restartBtn.style.top = "250px";
      restartBtn.style.fontSize = "20px";
      restartBtn.style.background = "none";
      restartBtn.style.border = "none";
      restartBtn.style.color = "white";

      restartBtn.addEventListener("mouseover", () => {
        restartBtn.style.color = "black";
      });
      restartBtn.addEventListener("mouseout", () => {
        restartBtn.style.color = "white";
      });

      restartGame.appendChild(restartBtn);

      restartBtn.addEventListener("click", () => {
        this.gameLoop();
        restartBtn.style.display = "none";
        POINTS_TRACKER = 0;
        CURRENT_LEVEL = 1;
      });
      return;
    }

    if (this.isPlayerPoweredUp()) {
      if (this.ammo > 0) {
        this.poweredUp.update(`🔥`);
      }
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let deadPlayer = false;
    this.enemies.forEach((enemy) => {
      if (
        enemy.y < this.player.y + ENEMY_HEIGHT &&
        enemy.y + ENEMY_HEIGHT > this.player.y &&
        enemy.y >= this.player.y - ENEMY_HEIGHT + 35 &&
        enemy.x < this.player.x + ENEMY_WIDTH &&
        enemy.x + ENEMY_WIDTH > this.player.x
      ) {
        deadPlayer = true;
      }
    });
    return deadPlayer;
  };

  isPlayerPoweredUp = () => {
    let poweredPlayer = false;
    this.powerUps.forEach((powerUp) => {
      if (
        powerUp.y < this.player.y + ENEMY_HEIGHT &&
        powerUp.y + ENEMY_HEIGHT > this.player.y &&
        powerUp.y >= this.player.y - ENEMY_HEIGHT + 35 &&
        powerUp.x < this.player.x + ENEMY_WIDTH &&
        powerUp.x + ENEMY_WIDTH > this.player.x
      ) {
        poweredPlayer = true;
        powerUp.usePowerUp();
        this.ammo = 5;
        if (this.ammo <= 5) {
          this.player.domElement.src = "images/devil.gif";
        }
      }
    });
    return poweredPlayer;
  };

  fireDamage = () => {
    console.log("shot fired");
    let deadEnemy = false;
    this.fireBalls.forEach((fireBall) => {
      this.enemies.forEach((enemy) => {
        if (
          enemy.y + ENEMY_HEIGHT > fireBall.y &&
          enemy.y < fireBall.y + FIREBALL_HEIGHT &&
          enemy.x === fireBall.x
        ) {
          console.log("Hitting the target");
          deadEnemy = true;
          fireBall.fireBallAttack();
          enemy.killEnemy();
        }
      });
    });
    return deadEnemy;
  };
}

// *************    ORIGINAL FUNCTION FOR ISPLAYERDEAD!! DO NOT DELETE UNTIL EVERYTHING WORKS!!!!!!!!!!! *****************
// isPlayerDead = () => {
//   let deadPlayer = false;
//   this.enemies.forEach((enemy) => {
//     if (
//       enemy.y >= this.player.y - ENEMY_HEIGHT + 50 &&
//       enemy.y <= GAME_HEIGHT - 55 &&
//       enemy.x === this.player.x
//     ) {
//       deadPlayer = true;
//     }
//   });
//   return deadPlayer;
// };
// *************    ORIGINAL FUNCTION FOR IS PLAYER DEAD!! DO NOT DELETE UNTIL EVERYTHING WORKS!!!!!!!!!!! *****************
