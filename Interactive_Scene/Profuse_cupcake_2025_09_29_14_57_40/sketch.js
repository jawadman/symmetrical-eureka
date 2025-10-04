// Interactive Scene Assignment
// Character Animation Controller
// Jawad Imran
// 3/10/25

// GOAL: make a character that can move around the screen and perform different actions
// Controls: A and D to move left and right, W to jump, S to block, click to attack, space to roll
// For my extra for experts, I used the push function, and a start screen that incorporates text.
// In terms of the basic requirements, for the assignment, I don't know if my for loop pushing my images into an array counts as 
// using nested loops, but I did add a timer to the program, so I hope that makes up for the state variable requirement.
//PLEASE NOTE: I WAS NOT ABLE TO FIX THE ISSUE OF THE CHARACTER DISAPPEARING WHEN MOVING RIGHT AFTER ATTACKING.
//PLEASE TRY TO WAIT ABOUT A SECOND AFTER THE ATTACK ANIMATION BEFORE TRYING TO MOVE.

//Global Variables

// Arrays to hold animation frames
let idleFrames = [];
let rollFrames = [];
let attackFrames = [];
let blockFrames = [];
let runFrames = [];
let runbackFrames = [];
let jumpUpFrames = [];
let jumpDownFrames = [];

// Total frames for each animation
let totalRunFrames = 8;
let totalRunBackFrames = 8;
let totalIdleFrames = 8;
let totalRollFrames = 6;
let totalAttackFrames = 18;
let totalBlockFrames = 6;
let totalJumpFrames = 3;

// Animation control variables
let frameIndex = 0;
let delayCounter = 0;
let frameDelay = 7;
let bg;

// Base animation state
let currentAnim = "idle";

// Position variables
let dx = 0;
let dy = 0;
let initialY;

// Jumping variables
let isJumping = false;
let yVelocity = 0;
let gravity = 1;

// Game state variable
let game = "start";

let timer = 0;
let timerPassed = 0;

// Preload function to load images into the empty arrays
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

  bg = loadImage("assets/Desert_bg.jpg");
}

function setup() {
  createCanvas(800, 800);
  initialY = height / 2 - 70;
  dy = initialY;
}


function draw() {
  // Start Screen
  if (game === "start") {
    timer = millis();
    console.log("start");
      background("gold");
      textFont('Courier New');
      textSize(24);
      text("A Terrible Simulator For An Assassin", width / 4, height / 2);
      text("Press Any Key To Start", width / 4, height / 2 + 40);
      text("W to Jump, A to Move Left, D to Move Right", width / 4 - 50, height / 2 + 80);
      text("Click to Attack, S to Block, Space to Roll", width / 4 - 50, height / 2 + 100);
  }
  // Main Game
  else{
    background(bg);
    timerPassed = int((millis()-timer) / 1000);
    fill("black");
    textSize(20);
    text("Time Wasted On These Plains: " + timerPassed + " seconds", 10, 30);
    movement();

    // Determine which frames to play depending on the current animation
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

    // Draws the current frame
    image(frames[frameIndex], dx, dy, 500, 300);

    // Update the frame index based on delay
    delayCounter++;
    if (delayCounter >= frameDelay) {
      frameIndex = (frameIndex + 1) % frames.length;
      delayCounter = 0;
    }

  // Reset to idle after non-looping animations finish
    if (frameIndex === frames.length-1 && currentAnim != "idle" && currentAnim != "run" ){
    currentAnim = "idle"
    frameIndex = 0
  }

  }
}
function keyTyped() {
  // Change animation based on key pressed
  if (key === " ") {
    currentAnim = "roll";
    frameIndex = 0;
  } 
  else if (key === "s") {
    currentAnim = "block";
    frameIndex = 0;
  } 
  else if (key === "w" && !isJumping) {
    isJumping = true;
    yVelocity = -15; 
  }
  if (game === "start") {
      game = "play";
}
  }

  // Right click to attack
function mouseClicked() {
  currentAnim = "attack";
  frameIndex = 0;
}

function movement() {
  // Horizontal movement
  if (keyIsDown(65)) {
    currentAnim = "runback";
    dx -= 6;
  } 
  else if (keyIsDown(68)) {
    currentAnim = "run";
    dx += 6;
  } 
  // If no movement keys are pressed, the animation goes back to idle
  else {
    if (currentAnim === "run" || currentAnim === "runback") {
      currentAnim = "idle";
    }
  }

  // The jumping mechanic
  if (isJumping) {
    //console.log("jumping");
    dy += yVelocity;
    yVelocity += gravity;

    if (yVelocity < 0) {
      currentAnim = "jumpUp";
      frameIndex = 0;
    } 
    else {
      currentAnim = "jumpDown";
      frameIndex = 0;
    }

    if (dy >= initialY) {
      dy = initialY;
      isJumping = false;
      currentAnim = "idle";
    }
  }
}
