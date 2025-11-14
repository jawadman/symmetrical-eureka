// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let theWalkers = [];

class Walker {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.speed = 3;
    this.radius = 5;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);;
  }
  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50){
      this.y += this.speed;
    }
    else if (choice < 75){
      this.x -= this.speed;
    }
    else {
      this.x += this.speed; 
    }
  }
}

let ro = new Walker(200, 300, "green");
let noor = new Walker(400, 500, "red")

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(220);
  // ro.move()
  // ro.display()
  // noor.move()
  // noor.display()

  for (let myWalker of theWalkers){;
    myWalker.move();
    myWalker.display();
  }
}

function mousePressed(){
  spawnWalker(mouseX, mouseY);
}

function spawnWalker (x, y) {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColour = color(r, g, b);
  let someWalker = new Walker(x, y, someColour);
  theWalkers.push(someWalker);
}
