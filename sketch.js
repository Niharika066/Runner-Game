var backImage,backgr,obstacleImage;
var player, player_running;
var ground,ground_img, moneyImage;
var GOimg
var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("background.jpg");
  player_running = loadAnimation("Sprite_1.png","Sprite_2.png","Sprite_3.png","Sprite_4.png","Sprite_5.png","Sprite_6.png","Sprite_7.png","Sprite_8.png");
moneyImage=loadImage("money.png");
obstacleImage=loadImage("obstacle.png");
GOimg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(500,300);
  
  moneyGroup=new Group();
obstaclesGroup=new Group();

  backgr=createSprite(0,0,500,300);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(80,218,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.25;

  ground = createSprite(400,290,900,20);
  ground.x=ground.width/2;
  ground.visible=false;
  }

function draw() { 
  background(0);
  
  if(gameState===PLAY){
  
    spawnmoney();
    spawnObstacles();

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(player.isTouching(moneyGroup)){
      score=score+2;
      moneyGroup.destroyEach();
    }
  
  if(obstaclesGroup.isTouching(player)){
    gameState=END;
  }
  } 
  else if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;

    moneyGroup.destroyEach();
    obstaclesGroup.destroyEach();

  var GO=createSprite(250,150,20,20);

 GO. addImage(GOimg);
  }
  fill("white");
  textSize(23);
  text("score="+ score,10,30);
    
   drawSprites();
}

function spawnmoney(){
  if(frameCount%80===0){
    var money=createSprite(400,50,40,10);
    money.y=random(100,200);
    money.addImage(moneyImage);
   money.scale=0.07;
    money.velocityX=-6;

    money.lifetime=200;
    player.depth=money.depth+1;
    moneyGroup.add(money);
  }
}
function spawnObstacles(){
  if (frameCount % 200 === 0){
     var obstacle = createSprite(400,275,10,40);
     obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
     obstacle.scale=0.3;
      //assign scale and lifetime to the obstacle           
  
      obstacle.lifetime = 300;
     //adding obstacles to the group
     obstaclesGroup.add(obstacle);
  }
  }
  
