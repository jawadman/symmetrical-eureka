// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let timeX = 1;
let timeY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //move ball
  x = noise(timeX)*width;
  y = noise(timeY)*height;
  
  //move on time axis
  timeX += 0.02
  timeY += 0.01

  //display ball
  fill("black");
  circle(x, y, 50);
}
