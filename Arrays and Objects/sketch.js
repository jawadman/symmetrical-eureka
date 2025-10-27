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
attackbackFrames : [],
blockFrames : [],
runFrames : [],
runbackFrames : [],
jumpUpFrames : [],
jumpDownFrames : []

}

bossFrames = {
  idleFrames : [],
  attack1Frames : [],
  runFrames : [],
  runbackFrames : []
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
  player: "idle",
  boss: "idle",  
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
bossPos = {
    dx: 100,
    dy: 360
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

let playerHealth = 100;
let bossHealth = 100;
let maxHealth = 100; 
let bossAttackCooldown = 800; 
let lastBossAttack = 0;

let bgMusic;

// Function to change animation state
function setAnimation(character, animName) {
  if (currentAnim[character] !== animName) {
    currentAnim[character] = animName;
    frameIndex[character] = 0;
  }
}


// Preload function to load images into the empty arrays, and load music
function preload() {

  bgMusic = loadSound("assets/music/desertmusic.mp3");

  for (let i = 1; i <= totalIdleFrames; i++) {
    playerFrames.idleFrames.push(loadImage(`assets/playerAnims/idle_${i}.png`));
  }

  for (let i = 1; i <= totalRollFrames; i++) {
    playerFrames.rollFrames.push(loadImage(`assets/playerAnims/roll_${i}.png`));
  }

  for (let i = 1; i <= totalAttackFrames; i++) {
    playerFrames.attackFrames.push(loadImage(`assets/playerAnims/2_atk_${i}.png`));
  }

  for (let i = 1; i <= totalAttackFrames; i++) {
    playerFrames.attackbackFrames.push(loadImage(`assets/playerAnims/2_atkback_${i}.png`));
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
    bossFrames.runFrames.push(loadImage(`assets/bossAnims/run_${i}.png`));
  }
  for (let i = 1; i <= totalIdleFrames; i++) {
    bossFrames.idleFrames.push(loadImage(`assets/bossAnims/boss_idle_${i}.png`));
  }
  for (let i = 1; i <= totalIdleFrames; i++) {
    bossFrames.attack1Frames.push(loadImage(`assets/bossAnims/boss_atk1_${i}.png`));
  }
  for (let i = 1; i <= totalIdleFrames; i++) {
    bossFrames.runbackFrames.push(loadImage(`assets/bossAnims/run_back_${i}.png`));
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
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.5);
  }
  timer = millis();
  background("black");
  textSize(36);
  textAlign(CENTER, CENTER);
  fill("red");
  textLeading(100); 

  textAlign(CENTER, CENTER);
  fill("red");

  textSize(48);
  text("A Terrible Simulator For An Assassin", width / 2, height / 2 - 80);
  textSize(20);
  text("Press Any Key To Start", width / 2, height / 2 - 10);
  
  fill("white");
  textSize(30);
  text("W to Jump, A to Move Left, D to Move Right", width / 2, height / 2 + 80); 
  text("Click to Attack, S to Block, Space to Roll", width / 2, height / 2 + 120);

}
  // Main Game
  else{
    
    if (playerHealth <= 0 || bossHealth <= 0) {
    game = "gameOver";
  }
    if (game === "gameOver") {
    background("black");
    fill("red");
    textSize(48);
    textAlign(CENTER, CENTER);

    if (playerHealth <= 0) {
      text("GAME OVER", width / 2, height / 2 - 40);
      text("You Died!", width / 2, height / 2 + 20);
    } 
    else if (bossHealth <= 0) {
      text("YOU WIN", width / 2, height / 2 - 40);
      text("The Wizard Has Been Slain", width / 2, height / 2 + 20);
    }

    textSize(24);
    fill("white");
    text("Press R to Restart", width / 2, height / 2 + 100);
    return; 
  }



    background(bg, backPos.dx, backPos.dy);
    timerPassed = int((millis()-timer) / 1000);
    fill("black");
    textSize(20);
    text("Time Wasted On These Plains: " + timerPassed + " seconds", 200, 30);

    // Player Health Bar
    fill("green");
    rect(50, 50, (playerHealth / maxHealth) * 200, 20);
    stroke(0);
    noFill();
    rect(50, 50, 200, 20);

    // Boss Health Bar
    fill("green");
    rect(550, 50, (bossHealth / maxHealth) * 200, 20);
    stroke(0);
    noFill();
    rect(550, 50, 200, 20);


    movement();
    updateBossAttack();

    // Determine which frames to play depending on the current animation
    let Frames = {
      player: "idle",
      boss: "idle"
    }

    // Frames for boss animations
    if (currentAnim.boss === "idle") {
      Frames.boss = bossFrames.idleFrames;
    }
    else if (currentAnim.boss === "attack") {
      Frames.boss = bossFrames.attack1Frames;
    }
    else if (currentAnim.boss === "run") {
      Frames.boss = bossFrames.runFrames;
    }
    else if (currentAnim.boss === "runback") {
      Frames.boss = bossFrames.runbackFrames;
    }

    // Frames for player animations
    if (currentAnim.player === "idle") {
      Frames.player = playerFrames.idleFrames;
    } 
    else if (currentAnim.player === "roll") {
      Frames.player = playerFrames.rollFrames;
    } 
    else if (currentAnim.player === "attack") {
      Frames.player = playerFrames.attackFrames;
    } 
    else if (currentAnim.player === "attackback") {
      Frames.player = playerFrames.attackbackFrames;
    }
    else if (currentAnim.player === "block") {
      Frames.player = playerFrames.blockFrames;
    } 
    else if (currentAnim.player === "run") {
      Frames.player = playerFrames.runFrames;
    } 
    else if (currentAnim.player === "runback") {
      Frames.player = playerFrames.runbackFrames;
    } 
    else if (currentAnim.player === "jumpUp") {
      Frames.player = playerFrames.jumpUpFrames;
    } 
    else if (currentAnim.player === "jumpDown") {
      Frames.player = playerFrames.jumpDownFrames;
    }
//console.log('Draw: ' + currentAnim.player);
    // Draws the current frame
    if (Frames.player.length > 0) {
  image(Frames.player[frameIndex.player], charPos.dx, charPos.dy, 200, 300);
}
    if (Frames.boss.length > 0) {
  image(Frames.boss[frameIndex.boss], bossPos.dx, bossPos.dy, 500, 400);
}


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

  // Reset to idle after animations that dont loop finish
    if (frameIndex.player === Frames.player.length-1 && currentAnim.player !== "idle" && currentAnim.player !== "run" && currentAnim.player !== "runback") {
    currentAnim.player = "idle"
    frameIndex.player = 0
  }
    if (frameIndex.boss === Frames.boss.length-1 && currentAnim.boss !== "idle" && currentAnim.boss !== "run" && currentAnim.boss !== "runback") {
    currentAnim.boss = "idle"
    frameIndex.boss = 0
  }

  }
}
function keyTyped() {

  // Change animation based on key pressed
  if (key === " ") {
    setAnimation("player", "roll");
  } 
  else if (key === "s") {
    setAnimation("player", "block");
  } 
  else if (key === "w" && !isJumping) {
    isJumping = true;
    yVelocity = -15; 
  }
  if (game === "start") {
      game = "play";
      if (bgMusic && !bgMusic.isPlaying()) {
        bgMusic.loop();
        bgMusic.setVolume(0.5);
}
  }
}

function keyPressed() {
  if (game === "gameOver" && (key === 'r' || key === 'R')) {
    game = "start";
    playerHealth = 100;
    bossHealth = 100;
    charPos.dx = 0;
    charPos.dy = initialY;
    bossPos.dx = 100;
    bossPos.dy = 360;
    currentAnim.player = "idle";
    currentAnim.boss = "idle";
    frameIndex.player = 0;
    frameIndex.boss = 0;
    lastBossAttack = 0;
  }
}


// Right click to attack
function mouseClicked() {
  // Determine attack direction
  if (mouseX < charPos.dx + 100) { 
    setAnimation("player", "attackback");
  } else {
    setAnimation("player", "attack");
  }

  // Apply damage if boss within 20px
  let distanceX = Math.abs(charPos.dx - bossPos.dx);
  if (distanceX <= 20) {
    bossHealth -= 10;
    if (bossHealth < 0) bossHealth = 0;
  }
}


function movement() {
  // Horizontal movement
  if (keyIsDown(65)) {
    if (charPos.dx > 0) {
    setAnimation("player", "runback");
    charPos.dx -= 6;
    }
  } 
  else if (keyIsDown(68)) {
    if (charPos.dx < width - 100) {
    setAnimation("player", "run");
    charPos.dx += 6;
    }
  } 

  // If no movement keys are pressed, the animation goes back to idle
  else {
    if (currentAnim.player === "run" || currentAnim.player === "runback") {
      currentAnim.player = "idle";
    }
  }

  // The jumping mechanic
  if (isJumping) {
    charPos.dy += yVelocity;
    yVelocity += gravity;

    if (yVelocity < 0) {
      currentAnim.player = "jumpUp";
      frameIndex.player = 0;
    } 
    else {
      currentAnim.player = "jumpDown";
      frameIndex.player = 0;
    }

    if (charPos.dy >= initialY) {
      charPos.dy = initialY;
      isJumping = false;
      currentAnim.player = "idle";
    }
  }

let attackRange = 20;
let distanceX = charPos.dx - bossPos.dx;

if (Math.abs(distanceX) > attackRange) {
    if (distanceX > attackRange) { 
        bossPos.dx += 2;
        setAnimation("boss", "run");
    } 
    else { 
        bossPos.dx -= 2;
        setAnimation("boss", "runback");
    }
} 
else {
    if (currentAnim.boss !== "attack") {
        setAnimation("boss", "attack");
      }
  }
}

function updateBossAttack() {
  let distanceX = Math.abs(charPos.dx - bossPos.dx);

  if (distanceX <= 20 && millis() - lastBossAttack > bossAttackCooldown) {
    playerHealth -= 10;
    if (playerHealth < 0) playerHealth = 0;

    setAnimation("boss", "attack"); 
    lastBossAttack = millis();
  }
}
