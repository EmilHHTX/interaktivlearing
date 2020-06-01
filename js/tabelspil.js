// Vi starter med at lave globale variabler i programmet så de kan bruges i alle de forskellige klasser, funktioner osv.
let screenwidth = 700;
let screenheight = 700;
let objects = [];
let img;
let backimg;
// Da vi skal arbejde med tabeller i dette program laver vi "en liste med lister i sig" som inde holder alle de 10 grundtabeller.
var tabeller = []
for (let y = 1; y <= 10; y++) {
  var temptabel = []
  for (let x = 1; x <= 10; x++) {
    temptabel.push(y * x);
  }
  tabeller.push(temptabel);
}
let tabelnumber = 0
var whichTabel = Math.floor(Math.random() * 10);

// Denne klasse er de objekter som falder ned fra toppen af skærmen.
class Falling {
  // I constructoren til denne klasse bliver der modtaget 3 værdier, i og correct answer er to værdier der hjælper os med at finde ud af hvilket af de faldende objekter skal være det korrekte svar, og nummer som er den værdi der fortæller hvor langt spilleren er kommet i tabellen. 
  constructor(i, correctAnswer, nummer) {
    this.spawnx = 100 + (i * 150);
    this.y = 1;
    this.speed = 5;
    this.diameter = 10;
    this.color = color(255, 255, 255)
    this.correct = false
    this.tal = Math.floor(Math.random() * 100);

    if (this.tal == tabeller[whichTabel][nummer]) {
      this.tal = Math.floor(Math.random() * 100);
    }


    if (i == correctAnswer) {
      this.color = color(255, 0, 0)
      this.correct = true
      this.tal = tabeller[whichTabel][nummer]

    }


  }
  // Her er vores draw command for de faldene tal, på skærmen kan man kun se tallene falde ned, men bag tallene har vi lagt en cirkel som ikke bliver vist på skærmen på grund af funktionerne noStroke og noFill. Cirklerne bag teksten er tallenes "hitbox"
  draw() {
    stroke(5)
    fill(color(0))
    textSize(32)
    textStyle(NORMAL);
    text(this.tal, this.spawnx - 8, this.y + 10)

    noStroke()
    noFill()
    circle(this.spawnx, this.y, this.diameter)
  }

  // Denne metode er meget simpel, den ændre blot de faldende objekters position med den givne hastighed af objektet
  move() {
    this.y += this.speed;
  }

  // Denne metode tjekker om de faldende objekter støder ind i et andet objekt "other" i dette tilfælde er det spilleren.
  kollision(other) {
    var d = dist(this.spawnx, this.y, other.x, other.y);

    if (d < (this.diameter / 2) + (other.size / 2)) {
      return true;
    }

    else {
      return false;
    }
  }

}

// Denne klasse skal skabe objektet som spilleren kan styre.
class Player {
  constructor() {
    this.x = screenwidth / 2
    this.y = screenheight
    this.size = 100
    this.speed = 5
  }

  // Denne metode flytter spilleren højre eller venstre alt efter hvilken en af piletasterne bliver trykket ned.
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5
    }

    if (this.x > screenwidth) {
      this.x = screenwidth
    }

    if (this.x < 0) {
      this.x = 0
    }
  }

  // I draw commanden tegner vi spilleren, vi har valgt at indsætte et billede til spilleren, dog har vi igen tegnet en "usynlig" cirkel som følger positionen af spilleren, vi bruger en cirkel da det simplificerer collision-detection processen 
  draw() {
    noFill()
    noStroke()
    circle(this.x + 3, this.y - 80, this.size);
    image(img, this.x - 55, this.y - 150, 125, 150);
  }
}
// Denne funktion bruger vi til at skabe en ny liste af objekter fra "Falling" classen, denne funktion er meget vigtig da den bliver udført hver gang objekterne rammer bunden af skærmen.
function createFalling(nummer) {
  let numberOfFalling = 4
  objects = [];
  let cA = Math.floor(Math.random() * 4);
  for (let i = 0; i < numberOfFalling; i++) {
    objects.push(new Falling(i, cA, nummer))
  }
}

// Functionen setupspil gør det muligt for os at have en reset knap der genstarter spillet med en ny tabel osv.
function setupspil() {
  var can = createCanvas(screenwidth, screenheight);
  can.parent('canvas-container');
  createFalling(tabelnumber)
  player = new Player()
  whichTabel = Math.floor(Math.random() * 10);
  tabelnumber = 0

}

// I funktionen preload får vi programmet til at indlæse billedfilerne der skal bruges som det første for at optimerer programmet mest muligt.
function preload() {
  img = loadImage('../js/progeksamentingninjaferdigcropped.png');
  backimg = loadImage('../js/japser.jpg');
}

// setup funktionen er essentiel i p5 det er en function der kun kører en enkelt gang efter der bliver trykket på p5's startknap. I denne funktion bruger vi setupspil-funktionen og opsætter en reset-knap.
function setup() {
  setupspil();
  button = createButton('Reset');
  button.mousePressed(setupspil);
}

// Draw commanden er igen en basis funktion der bliver kørt flere gange i sekundet. 
function draw() {
  background(255, 255, 0);
  image(backimg, 0, 0, screenwidth, screenheight);
  player.draw();
  player.move();

  // Vi har delt draw op i to dele med et if-else statement, den første del er hvis man er igang med at spille en tabel.
  if (tabelnumber < 10) {
    fill(color(0))
    textSize(32)
    textStyle(BOLD);
    text("Du spiller " + (whichTabel + 1) + " tabellen", screenwidth / 4, 100)


    // Her bruger vi også forloops for at sikre os alle objekternes metoder bliver udført.   
    for (let j = 0; j < 4; j++) {
      objects[j].draw();
      objects[j].move();
      // Her bruger vi endnu et if-statement til at tjekke om spilleren kolliderer med det korrekte tal i tabellen. 
      if (objects[j].kollision(player) == true && objects[j].correct == true) {
        tabelnumber += 1
        createFalling(tabelnumber);
      }
      // Som nævnt tidligere i programmet bruger vi funktionen createFalling til at skabe en helt ny liste af objekter når de faldende objekter rammer bunden af skærmen.
      if (objects[j].y > screenheight) {
        createFalling(tabelnumber);
      }
    }
  }
  // Den anden del af draw commanden er når du har færdiggjort en tabel, i denne del stopper spillet og der kommer en tekst op på skræmen der beder brugeren om at trykke på reset-knappen hvis de vil spille igen. 
  else {
    textSize(30)
    fill(color(0))
    textStyle(BOLD);
    text("DU HAR KLARET TABELLEN GODT ARBEJDE!", screenwidth / 200, 50)
    textSize(20);
    fill(color(0))
    textStyle(BOLD);
    text("Hvis du vil spille en ny tabel kan du trykke på 'Reset' knappen", screenwidth / 200, 80)
  }
}