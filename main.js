window.onload = function () {
  //Create an object of the html canvas
  canv = document.getElementById("gameCanvas");
  //Set it to 2d
  ctx = canv.getContext("2d");
  //call gameLoop every 1000ms
  setInterval(gameLoop, 100);
  document.addEventListener("keydown", keyPressed);

  //Get highscores from localStorage & display it in the highScore divs
  //Check if undefined to prevent the display of null
  let highScoreFromBrowser1 = localStorage.getItem("highScore1");
  if (highScoreFromBrowser1 != undefined) highScore1 = highScoreFromBrowser1;
  document.getElementById("highScore1").innerHTML = "High Score #1: " + highScore1;

  let highScoreFromBrowser2 = localStorage.getItem("highScore2");
  if (highScoreFromBrowser2 != undefined) highScore2 = highScoreFromBrowser2;
  document.getElementById("highScore2").innerHTML = "High Score #2: " + highScore2;

  let highScoreFromBrowser3 = localStorage.getItem("highScore3");
  if (highScoreFromBrowser3 != undefined) highScore3 = highScoreFromBrowser3;
  document.getElementById("highScore3").innerHTML = "High Score #3: " + highScore3;
}

//Grid and pixel size
var grid = 25;
var pixel = 25;

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

//Scores
let score = 0;
let highScore1 = 0;
let highScore2 = 0;
let highScore3 = 0;

var snakeColor = "white";


function gameLoop() {

  //Move the snake each loop in x & y
  snakeX += directionX;
  snakeY += directionY;

  //If snake goes offscreen set the x or y to other side of the canvas
  if (snakeX < 0) {
    snakeX = pixel - 1;
  }
  if (snakeX > pixel - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = pixel - 1;
  }
  if (snakeY > pixel - 1) {
    snakeY = 0;
  }

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

    //Increment score and update highscore divs
    score++;
    document.getElementById("currentScore").innerHTML = "Current Score: " + score;
    //Change color of snake depending on score for extreme immersive gameplay
    if (score > highScore1) {
      highScore1 = score
      snakeColor = "yellow";
    } else if (score > highScore2) {
      highScore2 = score
      snakeColor = "purple";
    } else if (score > highScore3) {
      highScore3 = score
      snakeColor = "pink";
    }
    //Set highscores in localStorage
    localStorage.setItem("highScore1", highScore1);
    localStorage.setItem("highScore2", highScore2);
    localStorage.setItem("highScore3", highScore3);
    //Display the highscores
    document.getElementById("highScore1").innerHTML = "High Score #1: " + highScore1;
    document.getElementById("highScore2").innerHTML = "High Score #2: " + highScore2;
    document.getElementById("highScore3").innerHTML = "High Score #3: " + highScore3;
  }

}
function generateApple() {
  ctx.fillStyle = "green";
  ctx.fillRect(appleX * grid, appleY * grid, grid, grid);
}
function colorSnake() {
  //ctx.fillStyle = "white";
  ctx.fillStyle = snakeColor;
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
  score = 0;
  snakeColor = "white";
  document.getElementById("currentScore").innerHTML = "Current Score: " + score;
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
