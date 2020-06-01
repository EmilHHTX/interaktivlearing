let screenwidth = 700;
let screenheight = 700;

var paused = true;
var setupGame = true;
function test() {
    paused = false;
    setupGame = false;
}


class Game {
    constructor(runner) {
        this.runner;
    }
}



let x = 0;
var tabelSpil = new TabelSpil(new Player());
var quiz = new Quiz();
var game = new Game();
game.runner = tabelSpil;
function setup() {
    let can = createCanvas(500, 500);
    can.parent('canvas-container');
    let width = can.width;

}

function draw() {
    if (setupGame != true && paused != true) {
        game.runner.gameSetup();
        setupGame = true;
    }
    if (paused != true) {
        game.runner.gameRunner()
    }
}
