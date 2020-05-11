let screenwidth = 700;
let screenheight = 700;
let objects = [];
let ettabel = [1,2,3,4,5,6,7,8,98,09]
var tabeller = []
for (let y = 1; y <= 10; y++) 
  {
  var temptabel = []
  for (let x = 1; x <= 10; x++) 
    {
    temptabel.push(y*x);
    }
  tabeller.push(temptabel);
  }

console.log(tabeller)
let tabelnumber = 0

class Falling
{
 constructor(i, correctAnswer, nummer)
  {
    this.spawnx = 100 + (i*100);
    this.y = 1;
    this.speed = 5;
    this.diameter = 10;
    this.color= color(255,255,255)
    this.correct = false
    this.tal = 0
    
    if(i == correctAnswer)
    {
      this.color = color(255, 0, 0)
      this.correct = true
      this.tal = tabeller[0][nummer]
      
    }
  }
  
  draw()
  { 
    stroke(5)
    noFill()
    textSize(32)
    text(this.tal, this.spawnx-8, this.y+10)    
    
    noStroke()
    noFill()
    circle(this.spawnx, this.y, this.diameter)
  }
  
  move()
  {
    this.y += this.speed;
  }
  
  kollision(other)
  {
    var d = dist(this.spawnx, this.y, other.x, other.y);
    
    if (d < (this.diameter/2) + (other.size/2)) 
    {
      return true;
    }
      
    else
    {
      return false;
    }
  }
  
}

class Player
{
  constructor()
  {
    this.x = screenwidth/2
    this.y = screenheight
    this.size = 15
    this.speed = 5
  }
  
  move()
  {
    if(keyIsDown(LEFT_ARROW))
    {
      this.x -= 5
    }
    
    if(keyIsDown(RIGHT_ARROW))
    {
      this.x += 5
    }
  }
  
  draw()
  {
    noFill()
    stroke(5)
    circle(this.x, this.y-this.size-10, this.size)
  }
  
}

function createFalling(nummer)
{
  let numberOfFalling = 4
  objects = [];
  let cA = Math.floor(Math.random() * 4);

  for (let i = 0; i<numberOfFalling ; i++)
  {
    objects.push (new Falling(i, cA, nummer))
  }
  
  
}

function setup() 
{
  createCanvas(screenwidth, screenheight);

  createFalling(tabelnumber)  
  player = new Player()
}

function draw() {
  background(220);
  player.draw();  
  player.move();
  
  for (let j = 0; j<4 ; j++)
  {
    objects[j].draw();
    objects[j].move();
    if (objects[j].kollision(player) == true && objects[j].correct == true)
    {    
      tabelnumber += 1
      createFalling(tabelnumber);
    }
  
    if ( objects[j].y > screenheight)
    {
      createFalling(tabelnumber);
    }
  }

}