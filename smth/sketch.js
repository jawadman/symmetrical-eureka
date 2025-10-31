// Rectangle Neighbours 2d Array Demo

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 9;

let grid;
let rows;
let cols;
let theplayer = {
  x: 0,
  y: 0,
};

function setup() {
  createCanvas(windowWidth*0.9, windowHeight*0.9);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);


  // add player to grid
  grid[theplayer.y, theplayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x ,y);

  //neighbours
  toggleCell(x + 1, y);
  toggleCell(x - 1, y);
  toggleCell(x, y - 1);
  toggleCell(x, y + 1);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === "w") {
    moveplayer(theplayer.x, theplayer.y-1);
  }
  else if (key === "s") {
    moveplayer(theplayer.x, theplayer.y+1);
  }
  else if (key === "a") {
    moveplayer(theplayer.x-1, theplayer.y);
  }
  else if (key === "d") {
    moveplayer(theplayer.x+1, theplayer.y);
  }
}

function moveplayer(x, y){
  if(x >= 0 && x < cols && y >= 0 && y< rows&& grid[y][x] === OPEN_TILE ){
    let oldx = theplayer.x;
    let oldy = theplayer.y;
  
    theplayer.x = x;
    theplayer.y = y;
    grid[theplayer.y][theplayer.x] = PLAYER;
  
    grid[oldx][oldy] = OPEN_TILE;

  }

}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill("white");
      }
      else if (grid[y][x] === IMPASSABLE) {
        fill("black");
      }
      else if(grid[y][x] === PLAYER) {
        fill ("red")
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //pick 0 or 1 randomly
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}