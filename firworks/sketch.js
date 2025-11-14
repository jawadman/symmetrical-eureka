// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theFire = []
const numFire = 100


class Particle {
  constructor(x, y, r, g, b){
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display(){
    noStroke();
    fill(this.r, this.b, this.g, this.opacity);
    circle(this.x, this.y, this.radius);
  }

  update() {
    this.x += this.dx
    this.y += this.dy

    this.opacity -= 1;
  }

  isDead() {
    return this.opacity <= 0;
  }
}


function mousePressed() {
  for (let i = 0; i < numFire; i ++) {
    let fireworks = new Particle(mouseX, mouseY);
    theFire.push(fireworks)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(let fire of theFire) {
    if (fire.isDead()) {
      let index = theFire.indexOf(fire);
      theFire.splice(index, 1)
    }
    else {
      fire.update();
      fire.display();
    }
  }
}
