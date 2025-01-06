let agents = [];
let colors = ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  let count = 13;
  let cellSize = width / count;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      let x = cellSize * i + cellSize / 2;
      let y = cellSize * j + cellSize / 2;
      let t = -int(dist(width / 2, height / 2, x, y) / 10);
      if ((i + j) % 2 == 0) agents.push(new Shape(x, y, cellSize * 1, t));
    }
  }
}

function draw() {
  background("254");
  for (let i of agents) {
    i.run();
  }
}

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

class Shape {
  constructor(x, y, d, t) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.currentD = d;
    this.t1 = 50;
    this.t2 = this.t1 + 100;
    this.t3 = this.t2 + 30;
    this.t4 = this.t3 + 50;
    this.petalSize0 = this.d * 0.1;
    this.petalSize1 = 0;
    this.petalPosition0 = this.d * 0.5 - this.petalSize0 * .7;
    this.petalPosition1 = this.d * 0.5;
    this.clr1 = this.clr2 = random(colors);
    while (this.clr1 == this.clr2) {
      this.clr2 = random(colors);
    }
    this.t = t;
    this.minD = this.d * 0.5;
  }

  show() {
    push();
    translate(this.x, this.y);
    scale(1, this.flip);
    noStroke();
    fill(this.clr1);
    for (let i = 0; i < 12; i++) {
      rotate(TAU / 12);
      rect(
        this.petalPosition0,
        0,
        this.petalSize0,
        this.petalSize * 0.4
      );
    }
    fill(this.clr2);
    rect(0, 0, this.currentD, this.currentD);
    pop();
  }

  move() {
    this.t++;
    if ((0 < this.t) & (this.t < this.t1)) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.flip = lerp(1, -1, easeInOutQuint(n));
      if (this.flip <= 0) {
        this.currentD = this.minD;
        if (this.toggle) {
          this.clr1 = this.clr2;
          while (this.clr1 == this.clr2) {
            this.clr2 = random(colors);
          }
          this.toggle = false;
        }
      }
    } else if ((this.t1 < this.t) & (this.t < this.t2)) {
      let n = norm(this.t, this.t1, this.t2 - 1);
      this.petalSize = lerp(
        this.petalSize0,
        this.petalSize1,
        easeInOutQuint(n)
      );
      this.petalPosition = lerp(
        this.petalPosition0,
        this.petalPosition1,
        easeInOutQuint(n)
      );
    } else if ((this.t3 < this.t) & (this.t < this.t4)) {
      let n = norm(this.t, this.t3, this.t4 - 1);
      this.currentD = lerp(this.minD, this.d, easeInOutQuint(n));
    }
    if (this.t4 < this.t) {
      this.init();
    }
  }
  run() {
    this.show();
    this.move();
  }
  init() {
    this.t = -20;
    this.flip = 1;
    this.petalSize = this.petalSize0;

    this.petalPosition = this.petalPosition0;
    this.toggle = true;
  }
}
