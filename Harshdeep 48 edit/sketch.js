var story;
var bg, bg1, bg2;
var gameState = 0;
var hrithik, HrithikImg;
var gun, gunImg;
var zombie, zombieImg, zombieG;
var shoot;
var bullet, bulletImg, bulletG;
var gun1, gun1Img;
var killZombies = 0;
var sound;
var bullets = 100;
var health, healthImg1, healthImg2, healthImg3;
var restart, restart1, restartImg, restart1Img;
var boss, bossImg;
var healthCount = 3;

function preload(){
  bg = loadImage("bg.jpg");
  bg1 = loadImage("bg1.jpg");
  bg2 = loadImage("bg2.jpg");
  HrithikImg = loadImage("boy.gif");
  gunImg = loadImage("gun.png");
  zombieImg = loadImage("zombie.gif");
  bulletImg = loadImage("bullet.png");
  gun1Img = loadImage("gun1.png");
  healthImg1 = loadImage("heart3.png");
  healthImg2 = loadImage("heart2.png");
  healthImg3 = loadImage("heart1.png");
  restartImg = loadImage("restart.png");
  restart1Img = loadImage("restart.png");
  bossImg = loadImage("boss.png");

  sound = loadSound("gun.mp3");



}

function setup(){
  createCanvas(800, 400);

  story = new Story();

  zombieG = new Group();

  bulletG = new Group();

  Hrithik = createSprite(60, 250);
  Hrithik.addImage(HrithikImg);
  Hrithik.scale = 0.45;
  Hrithik.visible = false;
  Hrithik.setCollider("rectangle",0,0,300,700);
  Hrithik.debug=true;

  gun = createSprite(Hrithik.x+80, Hrithik.y-10);
  gun.addImage(gunImg);
  gun.scale = 0.15;
  gun.visible = false;

  health = createSprite(100, 100);
  health.visible=false;
  health.scale = 0.3;
 

  restart = createSprite(350, 250);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;

  boss = createSprite(700, 300);
  boss.addImage(bossImg);
  boss.scale = 1;
  boss.visible = false;
  
}

function draw(){

  
  

  if(gameState === 0){
    background(bg);
  }

  if(gameState === 1){
    background(bg1);
  }

  if(gameState === 2){
    background(bg2);

      button = createButton("Shoot");
        button.position(700, 30);
        button.style('background', 'yellow');

        button.mousePressed(()=>{
            bullet = createSprite(145, 220);
            bullet.addImage(bulletImg);
            bullet.scale = 0.095;
            bullet.velocityX = 3;
            bulletG.add(bullet);
            sound.play();
            bullets = bullets-1;
        })

  fill("white");
  textSize(20);
  text("ZombiesKilled = " +  killZombies, 50, 40);

  fill("white");
  textSize(20);
  text("Bullets - " + bullets, 50, 60);

        

    Hrithik.visible = true;
    gun.visible = true;
    health.visible = true;
    health.visible=true;
    spawnZombie();
    
    if(healthCount === 3){
      health.addImage(healthImg1);
      }
    
      else if(healthCount === 2){
        health.addImage(healthImg2);
      }
    
      else if(healthCount === 1){
        health.addImage(healthImg3);
      }

      else if(healthCount === 0){
        health.visible=false;
        gameState=3;
    
      }

    if(zombieG.isTouching(bulletG)){
      for(var i=0;i<zombieG.length;i++){     
      
        if(zombieG[i].isTouching(bulletG)){
             zombieG[i].destroy()
             bulletG.destroyEach();
             killZombies++    
             
             if(healthCount<3){
               healthCount++;
             }
        }   
     } 
   }

   
   
   for(var i=0;i<zombieG.length;i++){     
      
    
      if(zombieG[i].isTouching(Hrithik)){
      zombieG[i].destroy();
     if(healthCount>0){
      healthCount= healthCount-1
     }
    }
  }



      if(bullets === 0){
        gameState = 3;
        bullet.destroy();
      }

      if(killZombies === 1){
        fill("red");
        text("BOSS BATTLE", 350, 100);
        textSize(30);

        zombieG.destroyEach();
        boss.visible = true;
      }

      if(bulletG.isTouching(boss)){
        gameState = 5;
        
      }   
    
  }

  if(gameState === 3){
    fill("Red");
    textSize(40);
    text("GameOver", 450, 150);
    zombieG.setVelocityXEach(0);
    bulletG.setVelocityXEach(0);
    bulletG.destroyEach();
    zombieG.destroyEach();
    restart.visible = true;
    Hrithik.visible= false;
    gun.visible= false;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }

  

    if(gameState === 5){

    fill("yellow");
    textSize(20);
    text("You Won", 350, 200);

    restart.visible = true;

    bulletG.destroyEach();
    bulletG.setVelocityXEach(0);
    zombieG.setVelocityXEach(0);
    
    boss.visible = false;

    if(mousePressedOver(restart)){
      reset();
    }
    }

  

  story.display();
  

  drawSprites();
}

function spawnZombie(){
  if(frameCount% 120 === 0){
    zombie = createSprite(830, 220);
    zombie.y = Math.round(random(300, 260));
    zombie.addImage(zombieImg);
    zombie.scale = 0.25;
    zombie.velocityX = -(3 + 3* killZombies/3);
    zombieG.add(zombie);

    zombie.setCollider("rectangle",0,0,450,700);
    zombie.debug=true;
  
  }
}

function keyPressed(){
  if(keyCode === 32){
    gun.visible = false;
    gun.addImage(gun1Img);
    gun.scale = 0.4;
    
  }
}



function reset(){
  gameState = 2;
  killZombies = 0;
  bullets = 100;
  healthCount =3;

  restart.visible = false;

}