var paused = true;
let screenwidth = 700;
let screenheight = 700;
let objects = [];
let ettabel = [1,2,3,4,5,6,7,8,98,09]
var tabeller = []
function test() {
    paused = false;
}

let x = 0;

function run() {
}




function setup() {
    let can = createCanvas(500, 500);
    can.parent('canvas-container');
    let width = can.width;
    quiz = new Quiz()
}

function draw() {
    if (paused != true) {
        run();
    }
}
