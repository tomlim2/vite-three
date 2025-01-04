let x = 450;
let y = 450;
let isDead = false;
let lifeSpan = 60;
let life = lifeSpan;
let amount = 0;
let effects = [];
let colors = ["#eac435", "#345995", "#e40066", "#fb4d3d", "#000000"];
let clr;
let d;

class Agent {
  constructor(x, y, lifeSpan) {
    this.x = x;
    this.y = y;
    this.isDead = false;
    this.lifeSpan = lifeSpan;
    this.life = this.lifeSpan;
    this.amount = 0;
  }
  show() {}
  move() {}
  update() {
    this.amount = norm(this.life, this.lifeSpan, 0);
  }
  checkLife() {
    this.life--;
    if (this.life == 0) {
      this.isDead = true;
    }
  }
  run() {
    this.show();
    this.move();
    this.update();
    this.checkLife();
  }
}

class Donut extends Agent {
  constructor(x, y, lifespan, color) {
    super(x, y, lifespan);
    this.d = width * random(0.08, 0.05);
    this.shiftY = -height / 2;
    this.clr = color;
    this.sw = this.d;
  }
  show() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.clr);
    beginShape();
    for (let a = 0; a < TAU; a += TAU / 360) {
      let r = (this.d / 2) * easeOutExpo(this.amount);
      vertex(r * cos(a), r * sin(a));
    }
    beginContour();
    for (let a = TAU; a > 0; a -= TAU / 360) {
      let r = (this.d / 2) * easeInQuart(this.amount);
      vertex(r * cos(a), r * sin(a));
    }
    endContour();
    endShape();
    pop();
  }
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInQuart(x) {
  return x * x * x * x;
}
let donut;
function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  donut = new Donut(width / 2, height / 2, 90, random(colors));
}

function draw() {
  background(230);
  donut.checkLife();
  isDonutDead = donut.isDead;
  if (!isDonutDead) {
    donut.run();
  } else {
    donut = new Donut(width / 2, height / 2, 90, random(colors));
  }
}
