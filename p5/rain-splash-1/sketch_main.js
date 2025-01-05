let colors = ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"];
let effects = [];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
}

function draw() {
  background(252);

  for (let i of effects) {
    i.run();
  }
  for (let i = 0; i < effects.length; i++) {
    if (effects[i].isDead) {
      effects.splice(i, 1);
    }
  }
  if (frameCount % 10 == 0) {
    let x = random(width);
    let y = random(0, 1) * height;
    effects.push(new EffectGroup(x, y));
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

class EffectGroup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isDead = false;
    this.agents = [];
    this.clr = random(colors);
    this.agents.push(
      new Raindrop(this.x, this.y, int(random(90, 120)), this.clr)
    );
    this.count = 0;
  }

  run() {
    for (let o of this.agents) {
      o.run();
    }
    for (let i = 0; i < this.agents.length; i++) {
      if (this.agents[i].isDead) {
        this.agents.splice(i, 1);
      }
    }
    if (this.agents.length == 0 && this.count == 0) {
      this.count++;
    }
    if (this.count == 1) {
      this.agents.push(
        new Donut(this.x, this.y, int(random(50, 40)), this.clr)
      );
      for (let i = 0; i < 50; i++) {
        this.agents.push(new Splash(this.x, this.y, int(random(90, 120))));
      }
      this.count++;
    } else if (this.count == 2) {
      if (this.agents.length == 0) {
        this.isDead = true;
      }
    }
  }
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
    // rotate(this.revo);
    noStroke();
    fill(this.clr);
    rect(
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
    this.shapeType = int(random(7));
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
    } else if (this.shapeType == 4) {
      push();
      let x = this.xShift * easeOutCubic(this.amount); // + r;
      let y = this.yShift * easeOutCubic(this.amount); // + r;
      translate(x, y);
      rotate(this.revo * 2 * easeOutCubic(this.amount));
      noStroke();
      fill(this.clr);
      rect(0, 0, width * 0.05 * (1 - easeOutCubic(this.amount)));
      pop();
    } else if (this.shapeType == 5) {
      push();
      let x = this.xShift * easeOutExpo(this.amount);
      let y = this.yShift * easeOutExpo(this.amount);
      let d = this.w * (1 - easeOutCubic(this.amount));
      translate(x, y);
      rotate(random(TAU));
      noStroke();
      fill(this.clr);
      rect(0, 0, d, d);
      pop();
    } else if (this.shapeType == 6) {
      push();
      let x = this.xShift * easeOutExpo(this.amount);
      let y = this.yShift * easeOutExpo(this.amount);
      translate(x, y);
      noStroke();
      fill(this.clr);
      if (random() < 0.5) rect(0, 0, width * 0.05 * (1 - this.amount));
      pop();
    }

    pop();
  }
}
