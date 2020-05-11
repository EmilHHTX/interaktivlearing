

class Spil {
    constructor(text, navn) {
        this.text = text;
        this.navn = navn;
    }
}

let x = 0

function setup() {
    let can = createCanvas(400, 400);
    can.parent('canvas-container')
    let width = can.width;
}

function draw() {
    background(0)
    circle(x, 30, 30);


    x += 3;
    if (x > width) {
        x = 0;
    }


}
