var paused = true;
var setupGame = true;
function test() {
    paused = false;
    setupGame = false;
}

let x = 0;
var quiz = new Quiz();

function setup() {
    background(100)
    let can = createCanvas(500, 500);
    can.parent('canvas-container');
    let width = can.width;

}

function draw() {
    if (setupGame != true && paused != true) {
        quiz.gameSetup();
        setupGame = true;
    }
    if (paused != true) {
        quiz.gameRunner()
    }
}
