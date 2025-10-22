// Interactive Scene Assignment
// Character Animation Controller
// Jawad Imran
// 3/10/25

// GOAL: make a character that can move around the screen and perform different actions
// Controls: A and D to move left and right, W to jump, S to block, click to attack, space to roll

// For my extra for experts, I used the push function, a start screen that incorporates text, I also used preload function to
// load in my image assets, although I dont recall if we've done that in class, and I also used the int() function to 
// convert my timer from a float to an integer so it wouldn't look silly with  bunch of decimanls. I hope all this counts, and
// makes up for the fact that I didn't follow the extra fo expert examples. :)

// In terms of the basic requirements, for the assignment, I don't know if my for loop pushing my images into an array counts as 
// using nested loops, but I did add a timer to the program, so I hope that makes up for the state variable requirement.

//PLEASE NOTE: I WAS NOT ABLE TO FIX THE ISSUE OF THE CHARACTER DISAPPEARING WHEN MOVING RIGHT AFTER ATTACKING.
//PLEASE TRY TO WAIT ABOUT A SECOND AFTER THE ATTACK ANIMATION BEFORE TRYING TO MOVE.

//Global Variables

// Arrays to hold animation frames
playerFrames = {

idleFrames : [],
rollFrames : [],
attackFrames : [],
blockFrames : [],
runFrames : [],
runbackFrames : [],
jumpUpFrames : [],
jumpDownFrames : []

}

bossFrames = {
  idleFrames : [],
  attack1Frames : []
}
// Total frames for each animation
let totalRunFrames = 8;
let totalRunBackFrames = 8;
let totalIdleFrames = 8;
let totalRollFrames = 6;
let totalAttackFrames = 18;
let totalBlockFrames = 6;
let totalJumpFrames = 3;

// Animation control variables
let frameIndex = {
  player: 0,
  boss: 0
}
let delayCounter = 0;
let frameDelay = 7;
let bg;

// Base animation state
let currentAnim ={
  Player: "idle",
  Boss: "idle",  
} 

// Object Positions
backPos = {
    dx: 800,
    dy: 800
  }
charPos = {
    dx: 0,
    dy: 0,
  }
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
    playerFrames.idleFrames.push(loadImage(`assets/playerAnims/idle_${i}.png`));
  }

  for (let i = 1; i <= totalRollFrames; i++) {
    playerFrames.rollFrames.push(loadImage(`assets/playerAnims/roll_${i}.png`));
  }

  for (let i = 1; i <= totalAttackFrames; i++) {
    playerFrames.attackFrames.push(loadImage(`assets/playerAnims/2_atk_${i}.png`));
  }

  for (let i = 1; i <= totalBlockFrames; i++) {
    playerFrames.blockFrames.push(loadImage(`assets/playerAnims/defend_${i}.png`));
  }

  for (let i = 1; i <= totalRunFrames; i++) {
    playerFrames.runFrames.push(loadImage(`assets/playerAnims/run_${i}.png`));
  }

  for (let i = 1; i <= totalRunBackFrames; i++) {
    playerFrames.runbackFrames.push(loadImage(`assets/playerAnims/run_back_ ${i}.png`));
  }

  for (let i = 1; i <= totalJumpFrames; i++) {
    playerFrames.jumpUpFrames.push(loadImage(`assets/playerAnims/j_up_${i}.png`));
  }

  for (let i = 1; i <= totalJumpFrames; i++) {
    playerFrames.jumpDownFrames.push(loadImage(`assets/playerAnims/j_down_${i}.png`));
  }
  for (let i = 1; i <= totalIdleFrames; i++) {
    bossFrames.idleFrames.push(loadImage(`assets/bossAnims/boss_idle_${i}.png`));
  }
  for (let i = 1; i <= totalIdleFrames; i++) {
    bossFrames.idleFrames.push(loadImage(`assets/bossAnims/boss_idle_${i}.png`));
  }
  console.log()
  for (let i = 1; i <= totalIdleFrames; i++) {
    bossFrames.attack1Frames.push(loadImage(`assets/bossAnims/boss_atk1_${i}.png`));
  }
  bg = loadImage("assets/Desert_bg.jpg");
}

function setup() {
  createCanvas(800, 800);
  initialY = height / 2 - 70;
  charPos.dy = initialY;
}


function draw() {
  // Start Screen
  if (game === "start") {
    timer = millis();
    console.log("start");
      background("red");
      textFont('Courier New');
      textSize(24);
      text("A Terrible Simulator For An Assassin", width / 4, height / 2);
      text("Press Any Key To Start", width / 4, height / 2 + 40);
      text("W to Jump, A to Move Left, D to Move Right", width / 4 - 50, height / 2 + 80);
      text("Click to Attack, S to Block, Space to Roll", width / 4 - 50, height / 2 + 100);
  }
  // Main Game
  else{
    //backMove();
    background(bg, backPos.dx, backPos.dy);
    timerPassed = int((millis()-timer) / 1000);
    fill("black");
    textSize(20);
    text("Time Wasted On These Plains: " + timerPassed + " seconds", 10, 30);
    movement();

    // Determine which frames to play depending on the current animation
    let Frames = {
      player: "idle",
      boss: "idle"
    }
    if (currentAnim.Boss === "idle") {
      Frames.boss = bossFrames.idleFrames;
    }
    else if (currentBossAnim === "attack") {
      Frames.boss = bossFrames.attack1Frames;
    }


    if (currentPlayerAnim === "idle") {
      Frames.player = playerFrames.idleFrames;
    } 
    else if (currentPlayerAnim === "roll") {
      Frames.player = playerFrames.rollFrames;
    } 
    else if (currentPlayerAnim === "attack") {
      Frames.player = playerFrames.attackFrames;
    } 
    else if (currentPlayerAnim === "block") {
      Frames.player = playerFrames.blockFrames;
    } 
    else if (currentPlayerAnim === "run") {
      Frames.player = playerFrames.runFrames;
    } 
    else if (currentPlayerAnim === "runback") {
      Frames.player = playerFrames.runbackFrames;
    } 
    else if (currentPlayerAnim === "jumpUp") {
      Frames.player = playerFrames.jumpUpFrames;
    } 
    else if (currentPlayerAnim === "jumpDown") {
      Frames.player = playerFrames.jumpDownFrames;
    }

    // Draws the current frame
    image(Frames.player[frameIndex.player], charPos.dx, charPos.dy, 500, 300);
    image(Frames.boss[frameIndex.boss], 100, 360, 500, 400);

    // Update the frame index based on animation delay
    delayCounter++;
    if (delayCounter >= frameDelay) {
      frameIndex.player = (frameIndex.player + 1) % Frames.player.length;
      frameIndex.boss = (frameIndex.boss + 1) % Frames.boss.length;
      delayCounter = 0;
    }
   if (delayCounter >= frameDelay) {
      frameIndex.boss = (frameIndex.boss + 1) % Frames.boss.length;
      delayCounter = 0;
    }

  // Reset to idle after animations taht dont loop finish
    if (frameIndex.player === Frames.player.length-1 && currentPlayerAnim != "idle" && currentPlayerAnim != "run" ){
    currentPlayerAnim = "idle"
    frameIndex.player = 0
  }
    if (frameIndex === Frames.boss.length-1 && currentBossAnim != "idle" && currentBossAnim != "run" ){
    currentBossAnim = "idle"
    frameIndex.boss = 0
  }

  }
}
function keyTyped() {
  // Change animation based on key pressed
  if (key === " ") {
    currentPlayerAnim = "roll";
    frameIndex.player = 0;
  } 
  else if (key === "s") {
    currentPlayerAnim = "block";
    frameIndex.player = 0;
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
  currentPlayerAnim = "attack";
  frameIndex.player = 0;
  currentBossAnim = "attack";
  frameIndex.boss = 0;
}

function movement() {
  // Horizontal movement
  if (keyIsDown(65)) {
    currentPlayerAnim = "runback";
    charPos.dx -= 6;
  } 
  else if (keyIsDown(68)) {
    currentPlayerAnim = "run";
    charPos.dx += 6;
  } 
  // If no movement keys are pressed, the animation goes back to idle
  else {
    if (currentPlayerAnim === "run" || currentPlayerAnim === "runback") {
      currentPlayerAnim = "idle";
    }
  }

  // The jumping mechanic
  if (isJumping) {
    //console.log("jumping");
    charPos.dy += yVelocity;
    yVelocity += gravity;

    if (yVelocity < 0) {
      currentPlayerAnim = "jumpUp";
      frameIndex.player = 0;
    } 
    else {
      currentPlayerAnim = "jumpDown";
      frameIndex.player = 0;
    }

    if (charPos.dy >= initialY) {
      charPos.dy = initialY;
      isJumping = false;
      currentPlayerAnim = "idle";
    }
  }
}


