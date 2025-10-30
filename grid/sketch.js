// Project Title
// Your Name
// Date


// 
// let theGrid = [[1, 0, 1, 0],
//                [0,0,1,1],
//                [1,1,0,0],
//                [0,1,0,1]]
let theGrid;

const SQUARE_DIMENSIONS = 4;

let cellSize;



function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width/GRID_DIMENSIONS;
  }
  else {
    cellSize = height/GRID_DIMENSIONS
  }
  theGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function draw() {
  background(220);
  showGrid();
  toggleCell();
  generateRandomGrid();
}

function showGrid() {
  for (let y= 0; y < 4; y ++) {
    for (let x = 0; y < 4; x ++){
      if(theGrid[y][x] === 1) {
        fill("black");
      }
      else if (theGrid[y][x] === 0) {
        fill("white")
      }
      square(x*cellSize, y*cellSize, cellSize);
    }
  }
}


function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell[x, y];
}

function toggleCell(x, y) {
  if (theGrid[y][x] === 0) {
    theGrid[y][x] = 1;
  }
}

function generateRandomGrid () {
  let newGrid = []; 
  for(let y = 0; y< rows; y ++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100)< 50){
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
}