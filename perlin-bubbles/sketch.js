// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBubble();

  //Add new bubble every 1/2 second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);

  for(let bubble of theBubbles){

    fill(bubble.r, bubble.g, bubble.b)

    bubble.x = noise(bubble._time)*width
    bubble.y = noise(bubble._time)*height*_buffer
    bubble.time += deltaTime

    circle(bubble.x, bubble.y, bubble.diameter);
  }
}

function spawnBubble(){
  let _time = random(1000);
  let _buffer = random(1000);
  let theBubble = {
    _time: random(1000),
    _buffer: random(1000),
    x: noise(_time)*width,
    y: noise(_time)*height*_buffer,
    diameter: random (20, 50),
    deltaTime: 0.01,

    r: random(255),
    b: random(255),
    g: random(255),
  };
  theBubbles.push(theBubble)
}