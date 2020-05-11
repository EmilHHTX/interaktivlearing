var paused = true;
function test() {
    paused = false;
}

let x = 0;

function run() {
    background(0)
    circle(x, 30, 30);


    x += 3;
    if (x > width) {
        x = 0;
    }
    quiz = new Quiz()
}




function setup() {
    let can = createCanvas(500, 500);
    can.parent('canvas-container');
    let width = can.width;
    run();
}

function draw() {
    if (paused != true) {
        
    }
}
