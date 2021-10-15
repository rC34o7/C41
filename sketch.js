var canvas, backgroundImage;
var gold,silver,bronze; 
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var trackimg;
var form, player, game;
var passedFinish;
var cars, car1, car2, car3, car4;
var car1img, car2img, car3img,car4img;
var CarsAtEnd = 0;
var bg; 
var obstacle1;
var obstacle2;
var nos; 
var fuel;
var obstacle,obstacleGroup;
var boy, nos, oilSpill; 
var boy1img,nos1img,oilspill1img; 



function preload(){
car1img=loadImage("images/vehicle 1.png");
car2img=loadImage("images/vehicle 2.png");
car3img=loadImage("images/vehicle 3.png");
car4img=loadImage("images/vehicle 4.png");
trackimg=loadImage("images/track.jpg")
gold=loadImage("images/gold.png");
silver=loadImage("images/silver.png");
bronze=loadImage("images/bronze.png");
bg=loadImage("images/GrandPrixBG.jpg");
obstacle1=loadImage("images/obstacle1.png");
obstacle2=loadImage("images/obstacle2.png");
boy=loadImage("images/boy.png");
nos=loadImage("images/nos.png");
oilSpill=loadImage("images/oilSpill.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

 background(bg);

  if(playerCount === 4 && CarsAtEnd === 0 ){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(CarsAtEnd===4){

    gameState=2;
    
  }

if (gameState===2 && CarsAtEnd ===4){
  game.end();
}
  
}
