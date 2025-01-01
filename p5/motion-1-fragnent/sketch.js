let colors = [
  "#c1292e",
  "#f1d302",
  "#1A53C0",
  "#083d77",
  "#da4167",
  "#FBAF00",
  "#00AF54",
];
let ctx;
let motions = [];
let motionClasses = [];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  ctx = drawingContext;
  motionClasses = [Motion01];

  shuffle(motionClasses, true);

  let gridSize = width * 0.8;
  let cellCount = 1;
  let cellSize = gridSize / cellCount;
  let number = 1;
  let x = cellSize / 2 + (width - gridSize) / 2;
  let y = cellSize / 2 + (height - gridSize) / 2;
  let MotionClass = motionClasses[number % motionClasses.length];
  let clr1 = (clr2 = "🐿️");
  while (clr1 == clr2) {
    clr1 = random(colors);
    clr2 = random(colors);
  }
  motions.push(new MotionClass(x, y, cellSize * 0.75, clr1, clr2));
}

function draw() {
  background(240);
  motions[0].run();
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

class Motion {
  constructor(x, y, w, clr1, clr2) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.rest = 20;
    this.t = -this.rest;
    this.t1 = 40;
    this.t2 = this.t1 + this.rest;
    this.t3 = this.t2 + 40;
    this.progress = 0;
    this.clr1 = color(clr1);
    this.clr2 = color(clr2);
  }
  show() {}

  move() {
    if (0 < this.t && this.t < this.t1) {
      this.progress = easeInOutCubic(norm(this.t, 0, this.t1 - 1));
    } else if (this.t2 < this.t && this.t < this.t3) {
      this.progress = easeInOutCubic(1 - norm(this.t, this.t2, this.t3 - 1));
    } else if (this.t3 + this.rest < this.t) {
      this.t = -this.rest;
    }
    this.t++;
  }

  run() {
    this.show();
    this.move();
  }
}

class Motion01 extends Motion {
  constructor(x, y, w, clr1, clr2) {
    super(x, y, w, clr1, clr2);
  }

  show() {
    let h = this.w * this.progress;
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.clr1);
    rect(0, this.w / 2 - h / 2, this.w, h);

    scale(1 - this.progress * 2, 1);
    fill(this.clr1);
    if (this.progress > 0.5) {
      fill(this.clr2);
    }
    circle(0, 0, this.w * 0.8);
    fill(this.clr2);
    if (this.progress > 0.5) {
      fill(this.clr1);
    }
    circle(0, 0, this.w * 0.3);
    pop();
  }
}
