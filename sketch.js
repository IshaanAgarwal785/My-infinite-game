var PLAY = 1
var END = 0 
var gameState = PLAY


var car , car_moving , car_broken
var obstaclesGroup , obstacle1 , obstacle2, obstacle3
var ground , invisibleground , groundImage
var gameOver, restart
var score = 0
var backgroundAnimation
var bottomEdge;




function preload(){
    backgroundAnimation = loadImage("background.png")
    
    car_moving = loadImage("car.png")
car_broken = loadImage("broken car.png")

groundImage = loadImage("road.png")

obstacle1 = loadImage("obstacle 1.png")
obstacle2 = loadImage("obstacle 2.png")
obstacle3 = loadImage("obstacle3.png")

gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  
}

function setup() {
 
    createCanvas(1500,700);

invisibleGround = createSprite(width/2,height-5,width,125); 
invisibleGround.visible= false
   
    ground = createSprite(width/2,height-30,width,125);
  ground.addImage("ground",groundImage);
ground.scale=1.5

//ground.visible = true

bottomEdge=createSprite(550,740,1400,1)
bottomEdge.visible=true
bottomEdge.shapeColor="green"

//bottomEdge.debug=true

gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverImg);

restart = createSprite(width/2,height/2);
restart.addImage(restartImg);

gameOver.scale = 2
restart.scale = 1.5

gameOver.visible = false;
  restart.visible = false;

 
//invisibleground.debug = true
  
    car = createSprite(100,50,60,80);
    car.addImage("moving" , car_moving)
    car.addImage("broken" , car_broken)
    car.setCollider('circle',0,0,100)
    car.scale = 1
    //car.debug=true
   
  
  

  obstaclesGroup = new Group()

 
  

}

function draw() {
 
  background(backgroundAnimation)
  text("Score: "+ score,90,80)



  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/90);
    ground.velocityX = -(9 + 5*score/100);

    if(( keyDown("SPACE")) && car.y  >= height-100) {
    
      car.velocityY = -20;
       touches = [];
         
    }
    if (ground.x < 0){
      ground.x = ground.width/2
    
      
    }
    
    ground.velocityX = -5
   
    
    
    if(car.y  <= height-310) {
      car.velocityY=7
  
    }

    car.collide(invisibleground)
  spawnObstacles()

  
    

    if(car.collide(obstaclesGroup)){
      gameState === END
    }
    
  }

  else if (gameState === END){
    gameOver.visible = true
    restart.visible = true

    car.velocityX = 0 
    ground.velocityX =0
    obstaclesGroup.setVelocityXEach(0)

    car.changeImage("broken",car_broken)

    obstaclesGroup.setLifetimeEach(-2)

    if(touches.length>0 || keyDown("SPACE")) {      
    
      touches = []
  
      
      
    }
  }

  
  

 
 carDestroy()
  car.collide(bottomEdge)
 
  drawSprites()
 
}
function spawnObstacles(){
  if(frameCount % 90 === 0) {
   var obstacle = createSprite(300,height-60,20,30)
   obstacle.setCollider('circle',0,0,45)
   obstacle.velocityX = -(6 + 3*score/100);
    obstacle.scale = 0.3
    obstacle1.scale = 0.3
    obstaclesGroup.add(obstacle)
    car.depth = obstacle.depth
    car.depth = car.depth+1
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3 : obstacle.addImage(obstacle3);
              break;
      default: break;
    }
  }
 
 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  car.changeImage("moving ", car_moving);
  
  score = 0;
  
}

