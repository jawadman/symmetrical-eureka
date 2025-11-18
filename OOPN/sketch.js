// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('white');
  for (let node of nodes) {
    node.update();
    node.connectsTo(nodes)
  }

  for(let node of nodes){
    node.display();
  }
}

function mousePressed(){
  let somePoint = new MovingPoint(mouseX, mouseY)
  nodes.push(somePoint);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.05;
    this.radius = 15;
    this.speed = 10;
    this.color = color(random(255), random(255), random(255))
    this.reach = 200;
    this.maxRad = 30;
    this.minRad = 10;
  }

  display() {
    noStroke();
    fill(this.color)
    //circle(this.x, this.y, this.radius*2);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustbyMouse();
  }

  adjustbyMouse() {
    let mouseDist = dist(this.x, this.y, mouseX, mouseY)
    if (mouseDist < this.reach) {
      let theSize = map(mouseDist, 0, this.reach, this.maxRad, this.minRad)
      this.radius = this.maxRad;
    }
    else {
      this.radius  =this.minRad
    }
  }

  connectsTo(nodesArray){

    for (let otherNode of nodesArray){
      if (this !== otherNode){
        let distanceAway = dist(this.x, this.y, otherNode.x, otherNode.y)
        if (distanceAway < this.reach){
          stroke(this.color)
          line(this.x, this.y, otherNode.x, otherNode.y)
        }
      }
    }

  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);


    //sacel from 1- 0 movement speed 

    dx = map(dx, 0, 1,-this.speed,this.speed)
    dy = map(dy, 0, 1,-this.speed,this.speed)

    //move teh point
    this.x += dx;
    this.y += dy;
    


    //move on time
    this.xTime += deltaTime
    this.yTime += deltaTime
  }

  wrapAroundScreen() {
    if(this.x < 0){
      this.x += width;
    }
    if(this.x > width){
      this.x -= width;
    }
    if(this.y < 0){
      this.y += height;
    }
    if(this.y > height){
      this.y -= height;
    }



  }

}