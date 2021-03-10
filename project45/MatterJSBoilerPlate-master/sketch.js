
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var guy, ground,robber,gun,bullet;
var score = 0;
var bulletSound, dieSound;
var gameState = "play"
var gameOver;
var backGround;
var guyimage,robberimage,gunimage,bulletImage;

function preload()
{
  backGround.loadImage("GuyvRobber/background-5.jpg");
  guyimage.loadImage("GuyvRobber/Guy.png");
  robberimage.loadImage("GuyvRobber/robber-4.png");
  gunimage.loadImage("GuyvRobber/Gun.png");
  bulletImage.loadImage("GuyvRobber/bullet-3.png");
	bulletSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	guy = new Guy(400,350,100,100);
	ground = new Ground(400,650,1000,50);
	robber = new Robber(600,350,100,100);
	gun = new Gun(guy.x,guy.y,50,70);
	bullet = new Bullet(guy.x,guy.y,10,20);
  gameOver = createSprite(400,350,100,100);
  gameOver.visible = false;


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backGround);

 
  
if(gameState === "play"){
  if(keydown("space")){
    bullet.velocityX = 8;
    bulletSound.play();
  }

  if(bullet.isTouching(robber)){
    robber.x = 600;
  }

  robber.velocityX = -(3 + 5*100/score);
}

  if(robber.isTouching(guy)){
    dieSound.play();
    gameState === "end"
  }	
  
  if(gameState === "end"){
    guy.destroy();
    robber.destroy();
    gun.destroy();

    if(mousePressedOver(restart)){
      reset();
  }
  }

  textSize(20);
  stroke(4);
  text("Score: " + score, 600,400);
  fill("yellow");

  bullet.display();
  ground.display();
  gun.display();
  guy.display();
  robber.display();

  drawSprites();
 
}

function reset(){
  gameState = "play"
  gameOver.visible = false;
  
  score = 0;
}



