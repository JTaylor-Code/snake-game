let canvas;
let ctx;

let trumpHead;
let trumptTail;
let eatNews;

let dots;
let news_x;
let news_y;

const pHeight = 25;
const pWidth = 25;

let leftDirection = false;
let rightDirection = true;
let upDirection = false;
let downDirection = false;
let inGame = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 500;
const C_WIDTH = 500;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

let x = new Array(ALL_DOTS);
let y = new Array(ALL_DOTS);

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
  loadImages();
  createSnake();
  locateApple();
  setTimeout("gameCycle()", DELAY);


}
function loadImages(){
  trumpHead = new Image();
  trumpHead.src = 'apple.png';

  trumpTail = new Image();
  trumpTail.src = 'apple.png';

  eatNews = new Image();
  eatNews.src = 'apple.png';
}

function createSnake() {
  dots = 1;

  for (let z = 0; z < dots; z++) {
    x[z] = 50 - z * 10;
    y[z] = 50;
  }
}

function checkApple(){
  if((x[0]== news_x)&&(y[0] == news_y)){
    dots++;
    locateApple();
  }
}

function doDrawing() {

  ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

  if (inGame) {

      ctx.drawImage(eatNews, news_x, news_y, pWidth, pHeight);

      for (let z = 0; z < dots; z++) {

          if (z == 0) {
              ctx.drawImage(trumpHead, x[z], y[z], pWidth, pHeight);
          } else {
              ctx.drawImage(trumpTail, x[z], y[z], pWidth, pHeight);
          }
      }
  } else {

      gameOver();
  }
}

function gameOver(){
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctxAlign = 'center';
  ctx.font = 'normal bold 19px serif';

  ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function move(){
  for (let z = dots; z > 0; z--){
    x[z] = x[(z-1)];
    y[z] = y[(z-1)];
  }

  if (leftDirection){
    x[0] -= DOT_SIZE;
  }

  if (rightDirection){
    x[0] += DOT_SIZE;
  }

  if (upDirection){
    y[0] -= DOT_SIZE;
  }
  if (downDirection){
    y[0] += DOT_SIZE;
  }
}

function checkCollision(){
  for (let z = dots; z > 0; z--){
   if((z > 4 && x[0] == x[z])&&(y[0] == y[z])){
     inGame = False;
   }
  }
if (y[0] >= C_HEIGHT){
  inGame = false;
}
if (x[0] >= C_WIDTH){
  inGame = false;
}
if(x[0] < 0){
  inGame = false;
}
}

function locateApple() {

  let r = Math.floor(Math.random() * MAX_RAND);
  news_x = r * DOT_SIZE;

  r = Math.floor(Math.random() * MAX_RAND);
  news_y = r * DOT_SIZE;
}

function gameCycle() {

  if (inGame) {

      checkApple();
      checkCollision();
      move();
      doDrawing();
      setTimeout("gameCycle()", DELAY);
    }
  }

onkeydown = function(e){
  let key = e.keyCode;
  if ((key == LEFT_KEY) && (!rightDirection)){
    leftDirection = true;
    upDirection = false;
    downDirection = false;
  }
  if ((key == RIGHT_KEY) && (!leftDirection)){
    rightDirection = true;
    upDirection = false;
    downDirection = false;
  }
  if ((key == UP_KEY) && (!downDirection)){
    upDirection = true;
    rightDirection = false;
    leftDirection = false;
  }
  if ((key == DOWN_KEY) && (!upDirection)){
    downDirection = true;
    rightDirection = false;
    leftDirection = false;
  }

};
