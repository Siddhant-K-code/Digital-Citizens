const w = 1000;
const h = 1000;

const numWalkers = 1000;
let walkers = [];

function setup() {
    createCanvas(w, h);
    background(255);
    
    stroke(0, 18);

    createWalkers(numWalkers);
}

function createWalkers(num) {
    for (let i = 0; i < num; i++) {
        let pos = createVector(
            random(width), 
            random(height)
        );
        walkers.push(
            new Walker(pos, createVector(0, 0))
        );
    }
}

function mouseClicked() {
    background(225);
    clear();
}

function draw() {
    walkers.forEach(
        walker => {
            if (!walker.isOut()) {
                walker.updVelocity();
                walker.move();
                walker.draw();
            }
        }
    );
}




class Walker {
    constructor(pos, v) {
        this.pos = pos;
        this.prevPos = pos;
        this.v = v;
        
    }

    isOut() {
        return (
            this.pos.x < 0
            || this.pos.x > width
            || this.pos.y < 0
            || this.pos.y > height
        );
    }

    updVelocity() {
        this.prevPos = createVector(this.pos.x, this.pos.y);

        let ms = millis();
        this.v.x += Math.sin(this.pos.x);
        this.v.y += Math.sin(this.pos.y);
    }

    move() {
        this.pos = p5.Vector.add(this.pos, this.v);
    }

    draw() {
        line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
        this.prevPos = createVector(this.pos.x, this.pos.y);
    }
}
