window.onload = function () {
  //Create an object of the html canvas
  canv = document.getElementById("gameCanvas");
  //Set it to 2d
  ctx = canv.getContext("2d");
  //call gameLoop every 1000ms
  setInterval(gameLoop, 100);
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

//Apple position
var appleX = Math.floor(Math.random() * pixel);
var appleY = Math.floor(Math.random() * pixel);

function gameLoop() {

  //Move the snake each loop in x & y
  snakeX += directionX;
  snakeY += directionY;

  //Call colorBackground function to fill canvas background
  colorBackground();

  //Call colorSnake function to color the snake
  colorSnake();

  //Call generateApple function to place an apple on the canvas
  generateApple();

  //Push x & y into the snake array to make the snake
  snake.push({ x: snakeX, y: snakeY });

  //Shift the last element to keep the length of the snake
  while (snake.length > snakeLength) {
    snake.shift();
  }

  //If snake is ontop of apple length is increased by 2 and apple is placed in a new random place
  if ((snakeX == appleX) && (snakeY == appleY)) {
    snakeLength += 2;
    appleX = Math.floor(Math.random() * pixel);
    appleY = Math.floor(Math.random() * pixel);
  }

}
function generateApple() {
  ctx.fillStyle = "green";
  ctx.fillRect(appleX * grid, appleY * grid, grid, grid);
}
function colorSnake() {
  ctx.fillStyle = "white";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid, grid);
    //If  we step on tail we reset game, check if snakeLength != 3 to not trigger the if statement at start of game
    if ((snake[i].x == snakeX && snake[i].y == snakeY) && snakeLength != 3) {
      //Call resetGame function to reset snake length to 3 and replace snake and apple on the canvas
      resetGame();
    }
  }
}
function colorBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);
}
function resetGame() {
  snakeX = Math.floor(Math.random() * pixel);
  snakeY = Math.floor(Math.random() * pixel);
  appleX = Math.floor(Math.random() * pixel);
  appleY = Math.floor(Math.random() * pixel);
  snakeLength = 3;
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
