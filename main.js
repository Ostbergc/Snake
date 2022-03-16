window.onload = function () {
  //Create an object of the html canvas
  canv = document.getElementById("gameCanvas");
  //Set it to 2d
  ctx = canv.getContext("2d");
  //call gameLoop every 1000ms
  setInterval(gameLoop, 1000);
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

function gameLoop() {

  //Call colorBackground function to fill canvas background
  colorBackground();

  //Call colorSnake function to color the snake
  colorSnake();

  //Push x & y into the snake array to make the snake
  snake.push({ x: snakeX, y: snakeY });

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