let effects = [];
let colors = ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"];
let donut, raindrop;
let splashs = [];
let splashCount = 50;

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  donut = new Donut(width / 2, height / 2, int(random(50, 40)), random(colors));
  for (let i = 0; i < splashCount; i++) {
    let splash = new Splash(
      width / 2,
      height / 2,
      int(random(90, 120)),
      random(colors)
    );
    splashs.push(splash);
  }
}

function draw() {
  background(255);
  if (!donut.isDead) donut.run();
  if (!splashs[0].isDead) {
    for (let i = 0; i < splashCount; i++) {
      splashs[i].run();
    }
  } else {
    splashs = [];
    for (let i = 0; i < splashCount; i++) {
      let splash = new Splash(
        width / 2,
        height / 2,
        int(random(90, 120)),
        random(colors)
      );
      splashs.push(splash);
    }
    donut = new Donut(
      width / 2,
      height / 2,
      int(random(50, 40)),
      random(colors)
    );
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

class Raindrop extends Agent {
  constructor(x, y, lifeSpan, clr) {
    super(x, y, lifeSpan);
    this.w = width * random(0.02, 0.01);
    this.h = this.w * 2.5;
    this.shiftY = -height / 2;
    this.clr = clr;
    this.sw = width * 0.003;
    this.revo = TAU * random(10) * random(-1, 1);
  }
  show() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.clr);
    ellipse(
      0,
      this.shiftY * (1 - this.amount ** 3),
      this.w * (1 - this.amount < 0.5 ? 0.5 : 1 - this.amount),
      this.h * this.amount
    );
    pop();
  }
}

class Splash extends Agent {
  constructor(x, y, lifeSpan, clr) {
    super(x, y, lifeSpan);
    this.shapeType = int(random(4));
    this.w = width * random(0.05, 0.01);
    let r = this.w * random(1, 4);
    let a = random(TAU);
    this.xShift = r * cos(a);
    this.yShift = r * sin(a);
    this.clr = random(colors);
    this.revo = TAU * random(10) * random(-1, 1);
  }
  show() {
    push();
    translate(this.x, this.y);
    if (this.shapeType == 0) {
      let x = this.xShift * easeOutExpo(this.amount);
      let y = this.yShift * easeOutExpo(this.amount);
      let d = this.w * (1 - easeOutCubic(this.amount));
      noStroke();
      fill(this.clr);
      circle(x, y, d);
    } else if (this.shapeType == 1) {
      let x1 = this.xShift * easeOutExpo(this.amount);
      let y1 = this.yShift * easeOutExpo(this.amount);
      let x2 = this.xShift * easeOutCubic(this.amount);
      let y2 = this.yShift * easeOutCubic(this.amount);
      let sw = this.w * 0.1 * (1 - this.amount);
      stroke(this.clr);
      strokeWeight(sw);
      line(x1, y1, x2, y2);
    } else if (this.shapeType == 2) {
      let x = this.xShift * easeOutExpo(this.amount);
      let y = this.yShift * easeOutExpo(this.amount);
      noStroke();
      fill(this.clr);
      if (random() < 0.5) circle(x, y, width * 0.05 * (1 - this.amount));
    } else if (this.shapeType == 3) {
      let a = this.revo * this.amount;
      let r = this.w * (1 - easeOutCubic(this.amount));
      let x = this.xShift * easeOutCubic(this.amount) + r * cos(a);
      let y = this.yShift * easeOutCubic(this.amount) + r * sin(a);
      let sw = this.w * 0.3 * (1 - this.amount);
      stroke(this.clr);
      strokeWeight(sw);
      point(x, y);
    }
    pop();
  }
}
