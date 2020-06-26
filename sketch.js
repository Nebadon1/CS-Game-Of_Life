



function DimentionalArray(cols, rows){
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
        }
    return arr
}
let grid;
let cols; 
let rows;
let counter;  
let resolution = 20;
let a = false;
let fr = 10;
let generation = 0;
let scoreElem;







function changeValueOfA() {
a = !a;
  }
 function Clear(){
  cols = width / resolution;
  rows = height / resolution;
  grid = DimentionalArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
      generation = 0 
        }
        //nested loop 
    }
 }
 function resetCanvas(){
  cols = width / resolution;
  rows = height / resolution;
  grid = DimentionalArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
        }
        //nested loop 

    }
 }

 
function setup(){
 createCanvas(800, 600);
 


  //  select('canvas').position(800, 200);
  resetCanvas()// create a ramdom pattern of squares 
  frameRate(fr);
  // let c = createCanvas(800,1);
  // c.elt.style.border = '1px solid gray';
  //25, 23, 200, 50
     
    button = createButton("Start");
    let col = color(91, 192, 222);
    button.style('background-color', col)
    button.style("color", "#fffff0")
    button.style('width', "200px")
    button.style('height', "100px")
    button.style('border-radius', "8px")
    button.style('font-size', "20px")
    button.position(877, 849);
    button.mousePressed(changeValueOfA); 
    
    glider = createButton("Glider")
    glider.style('background-color', col)
    glider.style("color", "#fffff0")
    glider.style('width', "200px")
    glider.style('height', "100px")
    glider.style('border-radius', "8px")
    glider.style('font-size', "20px")
    glider.position(1750, 209);
    glider.mousePressed(gliderGenerate)

    
    clear = createButton("Clear")
    clear.style('background-color', col)
    clear.style("color", "#fffff0")
    clear.style('width', "200px")
    clear.style('height', "100px")
    clear.style('border-radius', "8px")
    clear.style('font-size', "20px")
    clear.position(1180, 849);
    clear.mousePressed(Clear)
    
    
    scramble = createButton("Random")
    scramble.style('background-color', col)
    scramble.style("color", "#fffff0")
    scramble.style('width', "200px")
    scramble.style('height', "100px")
    scramble.style('border-radius', "8px")
    scramble.style('font-size', "20px")
    scramble.position(1487, 849);
    scramble.mousePressed(resetCanvas)
  
    tetrotmino = createButton("Tetromino")
    tetrotmino.style('background-color', col)
    tetrotmino.style("color", "#fffff0")
    tetrotmino.style('width', "200px")
    tetrotmino.style('height', "100px")
    tetrotmino.style('border-radius', "8px")
    tetrotmino.style('font-size', "20px")
    tetrotmino.position(1750, 339);
    tetrotmino.mousePressed(tetrominoGenerate)   
    
    spaceship = createButton("Spaceship")
    spaceship.style('background-color', col)
    spaceship.style("color", "#fffff0")
    spaceship.style('width', "200px")
    spaceship.style('height', "100px")
    spaceship.style('border-radius', "8px")
    spaceship.style('font-size', "20px")
    spaceship.position(1750, 469);
    spaceship.mousePressed(SpaceShipGenerate)
    
    


    

}

function draw() {
  frameRate(fr);
  background(211,211,211);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
    
      if (grid[i][j] == 1) {
       
        fill(47,79,79);
        stroke(255);
        rect(x, y, resolution - 1, resolution - 1);
        text("Framerate: " + fr, 120, 90);
        text("generation: " + generation,  520, 90 );
        textSize(20);
      }
    }
    
  }
  if(a == true) {
    start();

  }
    
  
}
  

function start(){
let next = DimentionalArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
     
      // Count live neighbors!
      //let sum = 0;
      let neighbors = countNeighbors(grid, i, j);
      
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
       
      }
    }
  }

  grid = next;
  generation ++;
  console.log(generation)
}



function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

 function touch() {
 let  x = floor(mouseX / resolution);
  let  y = floor(mouseY / resolution);
  console.log(x)
  //toggle squares
  if( x < 44){
  if(grid[x][y] == 1) {
    grid[x][y] = 0;
  } else if(grid[x][y] == 0) {
    grid[x][y] = 1;
    console.log(x)
  }
}else{

}
}
function mouseClicked() {
  touch();
}

function keyPressed(){
   if(keyCode === UP_ARROW){
    fr++;
  } else if(keyCode === DOWN_ARROW){
    fr--;
  }
}


function gliderGenerate() {
  //Glider
  grid[floor(cols/2) -1][floor(rows/2) -1] = 1;
  grid[floor(cols/2) -1][floor(rows/2)   ] = 1;
  grid[floor(cols/2) -1][floor(rows/2) +1] = 1;
  grid[floor(cols/2)   ][floor(rows/2) +1] = 1;
  grid[floor(cols/2) +1][floor(rows/2)   ] = 1;
}

function tetrominoGenerate() {
  //tetromino
  grid[floor(cols/6) -1][floor(rows/3) +3] = 1;
  grid[floor(cols/6) -2][floor(rows/3) +3] = 1;
  grid[floor(cols/6) -3][floor(rows/3) +3] = 1;
  grid[floor(cols/6) -2][floor(rows/3) +2] = 1;
  
}

function SpaceShipGenerate() {
  //SpaceShip
  grid[floor(cols/8) +3][floor(rows/3) -3] = 1;
  grid[floor(cols/8) +3][floor(rows/4) -2] = 1;
  grid[floor(cols/8) -1][floor(rows/4) -2] = 1;
  grid[floor(cols/9) -1][floor(rows/7) +2] = 1;
  grid[floor(cols/7) +1][floor(rows/5) +2] = 1;
  grid[floor(cols/7) +1][floor(rows/5) +2] = 1;
  grid[floor(cols/6) +1][floor(rows/6) +3] = 1;
  grid[floor(cols/6) -2][floor(rows/6) +3] = 1;
  grid[floor(cols/6) -3][floor(rows/6) +3] = 1;
  grid[floor(cols/6) -3][floor(rows/6) +2] = 1;
  grid[floor(cols/6) -1][floor(rows/6) +3] = 1;
}