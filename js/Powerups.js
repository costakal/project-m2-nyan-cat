// My attempt at creating power ups.....//

class PowerUp {
  constructor(theRoot, powerUpSpot) {
    this.root = theRoot;
    this.spot = powerUpSpot;

    this.x = powerUpSpot * ENEMY_WIDTH;

    this.y = -ENEMY_HEIGHT;
    this.usedPowerUp = false;

    this.domElement = document.createElement("img");

    this.domElement.src = "images/red-potion.png";

    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x + 35}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.maxWidth = 30;
    this.domElement.style.maxHeight = 30;
    this.domElement.style.zIndex = 5;

    theRoot.appendChild(this.domElement);
    this.speed = 0.1;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.usedPowerUp = true;
    }
  }
  usePowerUp() {
    this.root.removeChild(this.domElement);
    this.usedPowerUp = true;
  }
}
