/* global createCanvas,keyIsDown, RIGHT_ARROW LEFT_ARROW DOWN_ARROW UP_ARROW textSize background, collideRectRect circle drawGUI, createGui(), createSlider mouseX, frameRate, loadSound random mouseY, width noStroke, stroke, round fill io text windowWidth, height windowHeight, rect, loadImage, image, deltaTime, keyCode, createImg, animation, loadAnimation, textAlign, imageMode, CENTER */

let socket = io.connect("https://waterloo-coop.glitch.me/");
let topBorder;
let count;
let gameState;
let imgBomb, imgCrate, imgExplosion, imgPowerBomb, imgPowerFire;
let time;
let bombs, blockWidth;
let powerUps;
let crates;
let metalBoxes;
let playerNum;
let imgBomberDead
let players;
let icons;
let numIcons;
let imgPacmanF;
let imgPacmanR;
let imgPacmanU;
let imgPacmanD;
let imgRedGhost;
let imgBlueGhost;
let imgPinkGhost;
let imgOrangeGhost;
let gifLose;
let imgCherry;
let gifWin;
let activeBombs;
let score;
let loading,lSprite,lSpriteX,sprite,loadBg, lTime, loadingG,playButton,hPlayButton;
let hpSound, gSound, nScene,settingsPanel, sClick;
let exitButton, hExitButton, exitCircle;
let endGame;
let backgroundImg;
let gui, s, help;
let walls;
let canMove;
let canvasWidth;
let canvasHeight
let cherry;
let upWalls;
let downWalls;
let rightWalls;
let leftWalls;
let canMoveUp;
let canMoveDown;
let canMoveRight;
let canMoveLeft;
let timer;
let r;

function setup() {
  timer = 300
  imgPacmanF = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Pac_Man.svg/1200px-Pac_Man.svg.png");
  imgPacmanR = loadImage("https://cdn.glitch.me/37c79126-3ec3-4720-860c-ebd635a07bc1%2Fpacmanbackward.png?v=1638595614911");
  imgRedGhost = loadImage("https://cdn.glitch.me/37c79126-3ec3-4720-860c-ebd635a07bc1%2Fredghost1.png?v=1638590565782");
  backgroundImg = loadImage("https://cdn.glitch.me/37c79126-3ec3-4720-860c-ebd635a07bc1%2F462b223a236b4ffdd15d1e70d2db00ba.jpg?v=1638589187269");
  gifLose = loadImage("https://cdn.glitch.me/37c79126-3ec3-4720-860c-ebd635a07bc1%2Fjumpscare.gif?v=1638599478162");
  gifWin = loadImage("https://cdn.glitch.me/37c79126-3ec3-4720-860c-ebd635a07bc1%2Fpacman-video-game.gif?v=1638598745857");
  imgCherry = loadImage("https://cdn.glitch.me/37c79126-3ec3-4720-860c-ebd635a07bc1%2F93-930313_drawn-cherry-pacman-minecraft-pixel-art-disco.png?v=1638599252090");
  topBorder = 100;
  canvasWidth = 750;
  canvasHeight = 850;
  nScene = "playing";
  gameState = nScene;
  lTime = 0;
  frameRate(60);
  numIcons = 0;
  icons = [];
  lSpriteX = 20;
  playerNum = -1;
  socket.on("private", function(player) {
    playerNum = player;
  });
  time = 0;
  blockWidth = 25;
  players = [];
  createCanvas(canvasWidth, canvasHeight);
  background("red");
  noStroke();
  canMove = true;
  score= 0;
  r = 1;
  cherry = new Cherry(1);

  activeBombs = 0;
   upWalls = [
      [0, 15, 734, 15],
      [73, 125, 143, 125],
      [205, 125, 303, 125],
      [447, 125, 538, 125],
      [605, 125, 675, 125],
      [605, 205, 675, 205],
      [73, 205, 143, 205],
      [280, 205, 360, 205],
      [360, 205, 460, 205],
      [227, 285, 302, 285],
      [362, 285, 384, 285],
      [445, 285, 518, 285],
      [0, 370, 137, 370],
      [202, 370, 224, 370],
      [515, 370, 540, 370],
      [605, 370, 750, 370],
      [0, 530, 137, 530],
      [203, 530, 223, 530],
      [285, 530, 462, 530],
      [519, 530, 544, 530],
      [603, 530, 738, 530],
      [70, 618, 119, 618],
      [200, 618, 300, 618],
      [363, 618, 387, 618],
      [443, 618, 547, 618],
      [627, 618, 675, 618],
      [15, 700, 60, 700],
      [122, 700, 143, 700],
      [285, 700, 460, 700],
      [600, 700, 628, 700],
      [682, 700, 730, 700],
      [70, 780, 302, 780],
      [443, 780, 682, 780],
      [360, 780, 385, 780],
      [282, 450, 467, 450],
      [293, 358, 452, 358],  
    ];

    leftWalls = [
      [14, 17, 14, 258],
      [14, 539, 14, 830],
      [65, 675, 65, 700],
      [147, 77, 147, 125],
      [147, 180, 147, 203],
      [147, 267, 147, 367],
      [147, 432, 147, 528],
      [147, 590, 147, 683],
      [225, 180, 225, 369],
      [225, 430, 225, 525],
      [225, 678, 225, 748],
      [304, 72, 304, 120],
      [304, 262, 304, 288],
      [304, 589, 304, 610],
      [304, 754, 304, 777],
      [385, 14, 385, 122],
      [385, 209, 385, 287],
      [385, 539, 385, 614],
      [385, 700, 385, 777],
      [467, 183, 467, 207],
      [467, 345, 467, 455],
      [467, 508, 467, 530],
      [467, 675, 467, 700],
      [547, 73, 547, 120],
      [547, 185, 547, 365],
      [547, 432, 547, 530],
      [547, 592, 547, 618],
      [547, 674, 547, 753],
      [679, 74, 679, 120],
      [679, 182, 679, 204],
      [679, 593, 679, 614],
      [679, 754, 679, 779],
      [625, 618, 625, 694],
      [293, 355, 293, 435],
    ];

    rightWalls = [
      [69, 74, 69, 118],
      [69, 182, 69, 203],
      [69, 593, 69, 615],
      [69, 757, 69, 778],
      [120, 618, 120, 692],
      [203, 77, 203, 119],
      [203, 184, 203, 362],
      [203, 434, 203, 528],
      [203, 590, 203, 613],
      [203, 672, 203, 749],
      [282, 180, 282, 207],
      [282, 348, 282, 452],
      [282, 510, 282, 532],
      [282, 672, 282, 695],
      [363, 17, 363, 125],
      [363, 210, 363, 287],
      [363, 534, 363, 617],
      [363, 702, 363, 778],
      [443, 78, 443, 122],
      [443, 265, 443, 288],
      [443, 590, 443, 613],
      [443, 775, 443, 778],
      [519, 184, 519, 365],
      [519, 427, 519, 534],
      [519, 679, 519, 754],
      [603, 73, 603, 120],
      [603, 184, 603, 205],
      [603, 268, 603, 368],
      [603, 430, 603, 528],
      [603, 594, 603, 694],
      [734, 18, 734, 258],
      [734, 535, 734, 830],
      [454, 359, 454, 439],
    ];

    downWalls = [
      [13, 832, 728, 832],
      [69, 754, 300, 754],
      [439, 754, 679, 754],
      [14, 673, 64, 673],
      [200, 673, 224, 673],
      [280, 673, 467, 673],
      [518, 673, 545, 673],
      [682, 673, 730, 673],
      [69, 589, 145, 589],
      [200, 589, 303, 589],
      [443, 589, 545, 589],
      [602, 589, 679, 589],
      [280, 510, 463, 510],
      [0, 428, 138, 428],
      [200, 428, 225, 428],
      [520, 428, 545, 428],
      [604, 428, 745, 428],
      [297, 438, 454, 438],
      [280, 345, 463, 345],
      [14, 260, 142, 260],
      [229, 260, 303, 260],
      [442, 260, 519, 260],
      [604, 260, 730, 260],
      [70, 180, 140, 180],
      [200, 180, 228, 180],
      [284, 180, 463, 180],
      [522, 180, 544, 180],
      [603, 180, 675, 180],
      [72, 70, 142, 70],
      [202, 70, 303, 70],
      [447, 70, 542, 70],
      [600, 70, 677, 70],
    ];

  for (let i = 0; i < 5; i++) {
    players.push(new Character(i));
  }
  socket.on("move", ({ x, y }) => {
    if (y == "left") {
      players[x].moveLeft();
    } else if (y == "up") {
      players[x].moveUp();
    } else if (y == "right") {
      players[x].moveRight();
    } else if (y == "down") {
      players[x].moveDown();
    }
  });
  socket.on("mouse", ({ x, y }) => {
    fill("red");
    circle(x, y, 20);
  });
}
function mouseClicked(){
  print("Mouse X followed by Mouse Y:");
  print(mouseX);
  print(mouseY);
}

function draw() {
  //Check game states
  
  if (gameState === "playing") {
    background(100);
    fill("black");
    time += deltaTime / 1000;
    
    background(backgroundImg);
    drawTopBorder();
    
    fill("black");
    for (let i = 0; i < players.length; i++) {
      players[i].drawCharacters(i);
      players[i].isAttacked(i);
    }
    cherry.drawCherry();
    cherry.eating();
    for (let i = 0; i < players.length; i++) {
      players[i].drawBorder(i);
    }
  }
    
  
  if (keyIsDown(LEFT_ARROW)) {
    players[playerNum].moveLeft();
    socket.emit("move", { x: playerNum, y: "left" });
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    players[playerNum].moveRight();
    socket.emit("move", { x: playerNum, y: "right" });
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    players[playerNum].moveDown();
    socket.emit("move", { x: playerNum, y: "down" });
  }
  
  if (keyIsDown(UP_ARROW)) {
    players[playerNum].moveUp();
    socket.emit("move", { x: playerNum, y: "up" });
  }
  
  
  drawTopBorder();
  fill("black");
  
   if (gameState === "win"){
    background(100);
    background('black');
    image(gifWin, canvasWidth/2, canvasWidth/4);
    imageMode(CENTER);
    fill("black");
    drawWinGameText();
  }
  if (gameState === "lose"){
    background(100);
    background('black');
    imageMode(CENTER);
    image(gifLose, canvasWidth/2, canvasWidth/4);
    
    fill("black");
    drawLoseGameText();
    imageMode(CORNER);
    timer = timer - 1;
    if(timer < 0){
      gameState = "playing";
    }
  }
}

function keyPressed() {
  //   z key is pressed
  if (players[playerNum].isAlive) {

    //   left arrow key
    if (keyCode == 37) {
      players[playerNum].moveLeft(playerNum);
      socket.emit("move", { x: playerNum, y: "left" });
    }
    //   Up arrow key
    if (keyCode == 38) {
      players[playerNum].moveUp();
      socket.emit("move", { x: playerNum, y: "up" });
    }
    //   Right arrow key
    if (keyCode == 39) {
      players[playerNum].moveRight();
      socket.emit("move", { x: playerNum, y: "right" });
    }
    //   Down arrow key
    if (keyCode == 40) {
      players[playerNum].moveDown();
      socket.emit("move", { x: playerNum, y: "down" });
    }
  }
}

function drawTopBorder() {
  textSize(30);
  fill("red");
  text("You are player: " + playerNum, 50, 50);
  text(round(time, 1) + " sec", 400, 50);
  text("Score: " + score, 600, 50);
}
function drawWinGameText() {
  textSize(100);
  fill("green");
  text("YOU WIN", canvasWidth/2, canvasHeight/2);
  textAlign(CENTER);
}
function drawLoseGameText(){
  textSize(100);
  fill("red");
  text("YOU LOSE", canvasWidth/2, 620);
  textAlign(CENTER);
  textSize(50);
  text("RESPAWNING IN: " + timer, canvasWidth/2, 700);
}

class Cherry{
  constructor(i) { 
    if(i == 1){
      this.x = 150;
      this.y = 130;
    } else if(i == 2){
      this.x = 550;
      this.y = 120;
    }else if (i == 3){
      this.x = 150;
      this.y = 610
    }else{
      this.x = 550;
      this.y = 540;
    }
    this.eaten = 300;
  }
  
  eating(){
    for(let i = 0; i < players.length; i++) {
      if(i != 0 && collideRectRect(this.x,this.y,blockWidth*2, blockWidth*2, players[i].x, players[i].y, blockWidth, blockWidth)){
        this.eaten = this.eaten - 1;
      }else if(i == 0 && this.eaten > 300 && collideRectRect(this.x,this.y,blockWidth*2, blockWidth*2, players[i].x, players[i].y, blockWidth, blockWidth)){
        this.eaten = this.eaten + 0.1;
      }
    
    }
    fill("yellow");
    rect(this.x, this.y - 10,this.eaten/5, 10);
    fill("black");
    if(this.eaten < 0){
      scoreCounter();
      cherry = new Cherry(r + 1);
      r = r + 1;
    }
  }
  
  drawCherry(){
    image(imgCherry, this.x, this.y, blockWidth *2, blockWidth *2);
  }
}

class Character {
  //chacter codes
  constructor(playerNum) {
    if (playerNum == 0) {
      this.x = blockWidth;
      this.y = blockWidth + topBorder;
    } else if (playerNum == 1) {
      this.x = width - blockWidth * 2;
      this.y = blockWidth + topBorder;
    } else if (playerNum == 2) {
      this.x = blockWidth;
      this.y = height - blockWidth * 2;
    } else if (playerNum == 3) {
      this.x = width - blockWidth * 2;
      this.y = height - blockWidth * 2;
    
    } else if (playerNum == 4) {
      this.x = width / 2;
      this.y = height /2 + 50;
    }
    this.numPlayer = playerNum;
    this.isAlive = true;
  }
  
  drawCharacters(playerNumber) {
    //  Draw characters
    if (playerNumber == 0) {
      imgRedGhost.resize(170, 170);
      image(imgRedGhost, this.x, this.y, blockWidth, blockWidth);
    }
    if (playerNumber == 1) {
        image(imgPacmanF, this.x, this.y, blockWidth, blockWidth);
      }
    if (playerNumber == 2) {
        image(imgPacmanF, this.x, this.y, blockWidth, blockWidth);
      }
    if (playerNumber == 3) {
        image(imgPacmanF, this.x, this.y, blockWidth, blockWidth);
      }
    if (playerNumber == 4) {
        image(imgPacmanF, this.x, this.y, blockWidth, blockWidth);
      }
      
  }
  
  drawBorder(playerNumber) {
    
    if(playerNumber == playerNum && !(playerNum == 0) && (this.isAlive)){
      let offset = 100;
      rect(0,0 , canvasWidth, this.y - offset);
      rect(0,0, this.x - offset, canvasHeight);
      rect(this.x + blockWidth*2 + offset, 0, canvasWidth, canvasHeight);
      rect(0, this.y + blockWidth*2 + offset, canvasWidth, canvasHeight);
      
    }
    
    
  }
  isAttacked(playerNumber){
    if(!(playerNumber == 0) && collideRectRect(this.x,this.y, blockWidth, blockWidth, players[0].x, players[0].y, blockWidth, blockWidth)){
      this.x = canvasWidth/2 - blockWidth*2;
      this.y = canvasHeight/2 - blockWidth*2;
      this.isAlive = false;
      if(playerNumber == playerNum && !(playerNum == 0)){
        gameState = "lose"
      }
    }
      
  }
  
  moveLeft() {
    
    for (let i = 0; i < leftWalls.length; i++) {
       if(collideLineRect(leftWalls[i][0], leftWalls[i][1] , leftWalls[i][2], leftWalls[i][3], this.x, this.y, blockWidth, blockWidth)) {
         canMoveLeft = false;
      }
    }
    
    if (canMoveLeft) {
      this.x -= 5;
    }
    canMoveLeft = true;
  }
  
  
  moveUp() {
    
    
    for (let i = 0; i < upWalls.length; i++) {
       if(collideLineRect(upWalls[i][0], upWalls[i][1] , upWalls[i][2], upWalls[i][3], this.x, this.y, blockWidth, blockWidth)) {
         canMoveUp = false;
      }
    }
    
    if (canMoveUp) {
      this.y -= 5;
    }
    canMoveUp = true;
    
  }
  
  moveRight() {
    for (let i = 0; i < rightWalls.length; i++) {
       if(collideLineRect(rightWalls[i][0], rightWalls[i][1] , rightWalls[i][2], rightWalls[i][3], this.x, this.y, blockWidth, blockWidth)) {
         canMoveRight = false;
      }
    }
    
    if (canMoveRight) {
      this.x += 5;
    }
    canMoveRight = true;
  }
  
  
  moveDown() {
    for (let i = 0; i < downWalls.length; i++) {
       if(collideLineRect(downWalls[i][0], downWalls[i][1] , downWalls[i][2], downWalls[i][3], this.x, this.y, blockWidth, blockWidth)) {
         canMoveDown = false;
      }
    }
    
    if (canMoveDown) {
      this.y += 5;
    }
    canMoveDown = true;
  }
}
function scoreCounter(){
       if(score < 3){
        score++;
      }
      else{
        gameState = 'win';
      }  
}
