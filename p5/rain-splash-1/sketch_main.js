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

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  d = width * random(0.08, 0.05);
  clr = random(colors);
}

function draw() {
  background(230);

  life--;
  if (life == 0) {
    isDead = true;
  }
  amount = norm(life, lifeSpan, 0);
  push();
  translate(x, y);
  noStroke();
  fill(clr);
  if (!isDead) {
    beginShape();
    for (let a = 0; a < TAU; a += TAU / 360) {
      let r = (d / 2) * easeOutExpo(amount);
      vertex(r * cos(a), r * sin(a));
    }
    beginContour();
    for (let a = TAU; a > 0; a -= TAU / 360) {
      let r = (d / 2) * easeInQuart(amount);
      vertex(r * cos(a), r * sin(a));
    }
    endContour();
    endShape();
  } else {
    isDead = false;
    life = lifeSpan;
    d = width * random(0.12, 0.1);
    clr = random(colors);
  }
  pop();
}
