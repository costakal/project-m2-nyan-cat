//
//
class Fireball {
  constructor(theRoot, player) {
    this.root = theRoot;
    this.x = player.x;
    this.y = player.y;

    this.fireBallHit = false;

    this.domElement = document.createElement("img");

    this.domElement.src = "images/fire.png";

    this.domElement.style.position = "absolute";
    this.domElement.style.transform = "ScaleY(-1)";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.maxWidth = 75;
    this.domElement.style.maxHeight = 60;
    this.domElement.style.zIndex = 5;

    theRoot.appendChild(this.domElement);
    this.speed = 0.5;
  }

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y < 0) {
      this.root.removeChild(this.domElement);
      this.fireBallHit = true;
    }
  }
  fireBallAttack() {
    this.root.removeChild(this.domElement);
    this.fireBallHit = true;
  }
}
