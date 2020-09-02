var monkey, monkey_running, monkey_standing;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var highscore = 0;
var Play = 1;
var End = 0;
var gamestate = Play;
var jungle, jungleImg;
var gameover,gameOverImg;
var restart , restartImg;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkey_standing = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImg = loadImage("jungleback.jpg");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.jpg");
}



function setup() {
  createCanvas(600, 600);

  jungle = createSprite(300, 200, 600, 20);
  jungle.addImage("background", jungleImg);
  jungle.x = jungle.width / 3;
  jungle.scale = 2;

  monkey = createSprite(50, 290, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkey_standing);
  monkey.setCollider("rectangle", 0, 0, 100, 50);
  monkey.scale = 0.15;
  
  gameover = createSprite(300,150);
  gameover.addImage(gameOverImg);
  gameover.scale = 0.2;
  gameover.visible = false;
  
  restart = createSprite(300,300);
  restart.addImage("reStart",restartImg);
  restart.scale =  0.4;
  restart.visible = false;

  invisibleg = createSprite(300, 310, 600, 5);
  invisibleg.visible = false;

  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background("white");


  if (gamestate == Play) {
    
    jungle.velocityX = -(6+3*score/100);
    

    if (jungle.x < 100) {
      jungle.x = jungle.width / 2;
    }

    monkey.velocityY = monkey.velocityY + 0.5;


    if (keyDown("space") && monkey.y >= 149) {
      monkey.velocityY = -10;

    }
    spawnBananas();
    spawnObstacles();

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }
    if (monkey.isTouching(obstacleGroup)) {
      gamestate = End;
    }
  }

  if (gamestate == End) {
    jungle.velocityX = 0;
    gameover.visible = true;
    restart.visible = true;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    monkey.setvelocityY = 0;
    monkey.changeAnimation("collide", monkey_standing);
  }
  
  if(mousePressedOver(restart)){
    reset();
  }

  monkey.collide(invisibleg);
  monkey.collide(obstacleGroup);
  drawSprites();

  fill("yellow");
  textSize(18);
  text("SCORE:" + score, 440, 20);
  text("HighScore" + highscore, 300, 20);
}

function spawnObstacles() {
  if (World.frameCount % 150 == 0) {
    obstacle = createSprite(600, 300, 40, 10);
    obstacle.velocityX = -(6+3*score/100);
    obstacle.lifetime = 200;
    obstacle.scale =  0.2;
    obstacle.addImage("stone", obstacleImage);
    obstacleGroup.add(obstacle);
  }
}


function spawnBananas() {
  if (World.frameCount % 120 == 0) {
    banana = createSprite(600, 300, 40, 10);
    banana.velocityX = -(6+3*score/100);
    banana.lifetime = 200;
    banana.scale = 0.15;
    banana.addImage("banana", bananaImage);
    FoodGroup.add(banana);
  }
}

function reset (){
  gamestate = Play;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  monkey.changeAnimation("monkey",monkey_running);
  if(highscore<score){
    highscore = score;
  }
  score = 0;
}