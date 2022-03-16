window.onload = function () {
  //Create an object of the html canvas
  canv = document.getElementById("gameCanvas");
  //Set it to 2d
  ctx = canv.getContext("2d");
  //call gameLoop every 1000ms
  setInterval(gameLoop, 1000);
  document.addEventListener("keydown", keyPressed);
}

//Grid and pixel size
var grid = 20;
var pixel = 20;

//Snake position
var snakeX = Math.floor(Math.random() * pixel);
var snakeY = Math.floor(Math.random() * pixel);

//Array to represent the snake
var snake = [];

//Default snake length = 3
var snakeLength = 3;

//Set directionX to 1 to make snake move right
var directionX = 1;
var directionY = 0;

function gameLoop() {

  //Move the snake each loop in x & y
  snakeX += directionX;
  snakeY += directionY;

  //Call colorBackground function to fill canvas background
  colorBackground();

  //Call colorSnake function to color the snake
  colorSnake();

  //Push x & y into the snake array to make the snake
  snake.push({ x: snakeX, y: snakeY });

}
function keyPressed(key) {
  //Switch case for every arrow-key pressed, if statement to hinder the snake from being able to turn the opposite direction
  switch (key.keyCode) {
    //Left
    case 37:
      if (directionX == 1 && directionY == 0) { break; }
      directionX = -1;
      directionY = 0;
      break;
    //Up
    case 38:
      if (directionX == 0 && directionY == 1) { break; }
      directionX = 0;
      directionY = -1;
      break;
    //Right
    case 39:
      if (directionX == -1 && directionY == 0) { break; }
      directionX = 1;
      directionY = 0;
      break;
    //Down
    case 40:
      if (directionX == 0 && directionY == -1) { break; }
      directionX = 0;
      directionY = 1;
      break;
  }
}
function colorSnake() {
  ctx.fillStyle = "white";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid, grid);
  }
}
function colorBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);
}