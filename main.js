window.onload = function () {
  //Create an object of the html canvas
  canv = document.getElementById("gameCanvas");
  //Set it to 2d
  ctx = canv.getContext("2d");
  //call gameLoop every 1000ms
  setInterval(gameLoop, 1000);
}
function gameLoop() {

}