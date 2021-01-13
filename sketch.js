

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, fruit, enemy;

var enemyGroup, enemyImage;
var fruitGroup, fruit1, fruit2, fruit3, fruit4,swordImage 

var score;
var gameOverImg
var gameover,swordSound

function preload(){
  monsterImage = loadAnimation("alien1.png","alien2.png");
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImg = loadImage("gameover.png")
  
  gameover = loadSound("gameover.mp3")
  swordSound = loadSound("knifeSwooshSound.mp3")
}

function setup() {
  createCanvas(600, 600);
  
  sword = createSprite(50,160,20,50);
  sword.addImage("moving", swordImage);
  sword.scale=0.7
  
  
  
  //create Obstacle and Cloud Groups
  fruitGroup = createGroup();
  enemyGroup = createGroup();

  
  sword.setCollider("rectangle",0,0,sword.width,sword.height);
  sword.debug = true
  
  score = 0;
  
}

function draw() {
  
  background("lightblue");
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
  
    fruits();
    enemys();
    
    sword.y = World.mouseY
    sword.x = World.mouseX
    
    if(fruitGroup.isTouching(sword)){
        //trex.velocityY = -12;
        swordSound.play();
        score=score+2
      fruitGroup.destroyEach()
      
    }
    if(enemyGroup.isTouching(sword)){
        //trex.velocityY = -12;
        gameover.play();
        enemyGroup.destroyEach()  
        gameState = END
      
    }
  }
   else if (gameState === END) {
      
      gameOver= createSprite(200,200,20,20)
      gameOver.addImage(gameOverImg)
      fruitGroup.visible = false;
      enemyGroup.visible = false;
     
     
       
   }
  
 
  

  drawSprites();
}




function fruits(){
 if (frameCount % 80 === 0){
   fruit = createSprite(400,200,20,20);
   fruit.scale = 0.2
   
    //generate random obstacles
    r = Math.round(random(1,4)) 
     
    if(r === 1){
       fruit.addImage(fruit1)
     }
     else if(r === 2){
       fruit.addImage(fruit2)
     }
     else if(r === 3){
       fruit.addImage(fruit2)
     }
    else if(r === 3){
       fruit.addImage(fruit4)
     }
   
    fruit.y = Math.round(random(50,340))
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit)
    
    
    
}  
}

function enemys() {

  if (frameCount % 200 === 0) {
    enemy = createSprite(400,200,20,20);
    
    enemy.addAnimation("monsterMoving",monsterImage);
    
    enemy.velocityX = -8;
    
     
    enemy.y = Math.round(random(100,300))
    enemy.setlifetime = 50;
    enemyGroup.add(enemy);
  }
}


