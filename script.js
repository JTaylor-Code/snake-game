let canvas;
let ctx;

let trumpHead;
let trumptTail;
let eatNews;

let dots;
let news_x;
let news_y;

const pHeight = 50;
const pWidth = 50;

let faceMap = new Map;
let faceArray = new Array;
faceArray.push(trumpHead);

let leftDirection = false;
let rightDirection = true;
let upDirection = false;
let downDirection = false;
let inGame = true;

const DOT_SIZE = 50;
const ALL_DOTS = 900;
const MAX_RANDX = 19;
const MAX_RANDY = 15;
const DELAY = 140;
const C_HEIGHT = 800;
const C_WIDTH = 1000;

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
  trumpHead.src = 'trump_25.png';

  trumpTail = new Image();
  trumpTail.src = 'fake.jpg';

  eatNews = new Image();
  eatNews.src = 'fake.jpg';

  devos = new Image();
  devos.src = 'devos.png';
  faceMap.set(0,devos);


  carson = new Image();
  carson.src = 'carson.png';
  faceMap.set(1,carson);

  barr = new Image();
  barr.src ='bar.png';
  faceMap.set(2,barr);

  giulani = new Image();
  giulani.src = 'giulani.png';
  faceMap.set(3, giulani);

  pompeo = new Image();
  pompeo.src = 'pompeo.png';
  faceMap.set(4, pompeo);

  chao = new Image();
  chao.src = 'chao.png';
  faceMap.set(5, chao);

  mnuchin = new Image();
  mnuchin.src = 'mnuchin.png';
  faceMap.set(6, mnuchin);

  kushner = new Image();
  kushner.src = 'kushner.png';
  faceMap.set(7, kushner);

  trumpjr = new Image();
  trumpjr.src = 'trumpjr.png';
  faceMap.set(8, trumpjr);

  ross = new Image();
  ross.src = 'ross.png';
  faceMap.set(9, ross);

  pence = new Image();
  pence.src = 'pence.png';
  faceMap.set(10, pence);





}

function createSnake() {
  dots = 1;

  for (let z = 0; z < dots; z++) {
    x[z] = 50 - z * 10;
    y[z] = 50;
  }
}

function tailPicture(){
  let choice = Math.floor(Math.random()*10)
  faceArray.push(faceMap.get(choice));
}

function checkApple(){
  if((x[0]== news_x)&&(y[0] == news_y)){
    dots++;
    tailPicture();
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

            console.log(faceArray);
            console.log(z);
            console.log(faceArray[z]);
              ctx.drawImage(faceArray[z], x[z], y[z], pWidth, pHeight);
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
   if((z > 4) && (x[0] == x[z])&&(y[0] == y[z])){
     inGame = False;
   }
  }
if (y[0] >= C_HEIGHT){
  inGame = false;
}
if (y[0] < 0){
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

  let r = Math.floor(Math.random() * MAX_RANDX);
  news_x = r * DOT_SIZE;

  r = Math.floor(Math.random() * MAX_RANDY);
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
