let idleFrames = [];
let rollFrames = [];
let attackFrames = []
let blockFrames = []
let runFrames = []
let runbackFrames = []
let jumpUpFrames = []
let jumpDownFrames = []

let totalRunFrames = 8;
let totalRunBackFrames = 8;
let totalIdleFrames = 8;
let totalRollFrames = 6;
let totalAttackFrames = 18;
let totalBlockFrames = 6;
let totalJumpFrames = 3;

let frameIndex = 0;
let delayCounter = 0;
let frameDelay = 7;
let bg;

let currentAnim = "idle";

let dx = 0 ;
let dy ;

function preload() {

  for (let i = 1; i <= totalIdleFrames; i++) {
    idleFrames.push(loadImage(`assets/idle_${i}.png`));
  }

  for (let i = 1; i <= totalRollFrames; i++) {
    rollFrames.push(loadImage(`assets/roll_${i}.png`));
  } 
  for (let i = 1; i <= totalAttackFrames; i++) {
    attackFrames.push(loadImage(`assets/2_atk_${i}.png`));
  } 
  for (let i = 1; i <= totalBlockFrames; i++) {
    blockFrames.push(loadImage(`assets/defend_${i}.png`));
  } 
  for (let i = 1; i <= totalRunFrames; i++) {
    runFrames.push(loadImage(`assets/run_${i}.png`));
  } 
  for (let i = 1; i <= totalRunBackFrames; i++) {
    runbackFrames.push(loadImage(`assets/run_back_ ${i}.png`));
  } 
  for (let i = 1; i <= totalJumpFrames; i++) {
    jumpUpFrames.push(loadImage(`assets/j_up_${i}.png`));
  } 
  for (let i = 1; i <= totalJumpFrames; i++) {
    jumpDownFrames.push(loadImage(`assets/j_down_${i}.png`));
  } 
}

function setup() {
  bg = loadImage('assets/Desert_bg.jpg');
  createCanvas(800, 800);
}

function draw() {
  background(bg);
  dy = height/2 -70; 
  movement();
  
  let frames;
  if (currentAnim === "idle") {
    frames = idleFrames;
  } 
  else if (currentAnim === "roll") {
  frames = rollFrames;
  }
  else if (currentAnim === "attack") {
  frames = attackFrames;
  }
  else if (currentAnim === "block") {
  frames = blockFrames;
  }
  else if (currentAnim === "run") {
  frames = runFrames;
  }
  else if (currentAnim === "runback") {
  frames = runbackFrames;
  }
  else if (currentAnim === "jumpUp") {
  frames = jumpUpFrames;
  }
  else if (currentAnim === "jumpDown") {
  frames = jumpDownFrames;
  }
  
  //console.log(frames[frameIndex])
  console.log(frames);
  image(frames[frameIndex], dx, dy, 500, 300);

  delayCounter++;
  if (delayCounter >= frameDelay) {
    frameIndex = (frameIndex + 1) % frames.length;
    delayCounter = 2;
  }
  //console.log(frameIndex + ' ' + frames.length)
  if (frameIndex === frames.length-1 && currentAnim != "idle" && currentAnim != "run"){
    currentAnim = "idle"
    frameIndex = 0

  }
}

function keyTyped() {
  if (key === " ") {  
    currentAnim = "jumpUp";
    frameIndex = 0

   }
  
  else if (key === 's'){
    currentAnim = "block"
    frameIndex = 0  
  }
  //else if (key === 'a'){
    //currentAnim = "run"
    //frameIndex = 0  
  //}
  //else if (key === 'd'){
   // currentAnim = "run"
    //frameIndex = 0  
  //}
}
function mouseClicked() {
    currentAnim = "attack"
    frameIndex = 0
  }

function movement(){
  if (keyIsDown(65)) { 
    currentAnim = "runback";
    dx -= 5; 
  } else if (keyIsDown(68)) { 
    currentAnim = "run";
    dx += 5; 
  } else {
    if (currentAnim === "run") {
      currentAnim = "idle"; 
    }
  }
}

