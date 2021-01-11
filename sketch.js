var jungle,jungleImage;
var car,carImage;
var ground;
var obstacle,obstacleImage
var bird,birdImage;
var obstacleGroup,birdGroup;
var gameState = "play";
var score = 0;
function preload(){
jungleImage = loadImage("jungle.jpg")
carImage = loadImage("car.png")
obstacleImage = loadImage("rock.png")
birdImage = loadImage("bird.png")
}
  
function setup(){
createCanvas(600,300)

//sprites and images for jungle
jungle = createSprite(600,100,50,50)
jungle.addImage(jungleImage)
jungle.scale = 1.6

//sprites and images for car
car = createSprite(100,260,50,50)
car.addImage(carImage)
car.scale = 0.3
car.setCollider("rectangle",50,50,200,150)

//sprites and images for ground
ground = createSprite(300,280,600,10)
ground.visible = false
obstacleGroup = new Group()
birdGroup = new Group()
}

function draw(){
background(0);


if(gameState === "play"){

  jungle.velocityX = -6

//to reset the background
if(jungle.x<0){
jungle.x = 300

}

// to make the car jump
if(keyDown("space") && car.y>= 230) {
  car.velocityY = -14
} 

//giving the car gravity
car.velocityY = car.velocityY + 0.8
console.log(car.y)
car.collide(ground)
spawnBirds()
spawnObstacles()

// to destroy the birds and obstacles once the car touches them
if(birdGroup.isTouching(car) || obstacleGroup.isTouching(car)){
  gameState = "end"
} 


drawSprites()

textSize(15)
fill("white")
text("Score: " + score,500,50)
text("Jungle Rider",50,50)
score = score+Math.round(getFrameRate()/60)

}
else if(gameState === "end") {
  stroke("red")
  fill("red")
  textSize(30)
  text("GAME OVER",220,150)
  }
}
//to create the obstacles
function spawnObstacles(){
  if (frameCount%150 === 0){
obstacle = createSprite(600,265,10,10)
obstacle.velocityX = -12;
obstacle.addImage(obstacleImage)
obstacle.scale = 0.3
obstacle.lifetime = 100
obstacleGroup.add(obstacle)
}
}

// to create the birds
function spawnBirds() {
  if (frameCount%200 === 0){
bird = createSprite(600,100,20,20)
bird.velocityX = -5
bird.addImage(birdImage)
bird.scale = 0.3
bird.lifetime = 120
birdGroup.add(bird)
}
}