// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

function setup() {
  createCanvas(600, 600);
  let lightColor = "red";
  let switchTime = 0;
  let greenDur = 4000;
  let redDur = 4000;
  let yellowDur = 2000;
}

function draw() {
  background(255);
  updateState();
  drawOutlineOfLights();
  showCurrentLight();
}

function updateState() {
  if (lightColor === "red" && millis() > switchTime  + greenDur) {
    lightColor === "green";
    
  }
  else if(lightColor === "green" && millis() > lastSwitch  + yellowDur){
    lightcolor === "yellow";
  }
  else if(lightColor === "green" && millis() > lastSwitch  + redDur){
    lightcolor === "red";
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function showCurrentLight() {
  if (lightColor === "red") {
    fill ("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
  else if (lightColor === "yellow") {
    fill("yellow")
    ellipse(width/2, height/2, 50, 50); //middle
  }
  else if (lightcolor === "green") {
    fill(green);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
}