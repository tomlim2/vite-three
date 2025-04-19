let colors = [
  "#0A1D37",
  "#0B3954",
  "#16658A",
  "#2F6690",
  "#187BCD",
  "#3083DC",
  "#527DC6",
  "#64C2F5",
  "#81DAF5",
  "#A0E1FA",
  "#243E73",
  "#113259",
  "#2A5B97",
  "#1D4D8F",
  "#326EB8",
  "#4C8EC6",
  "#6FB1D6",
  "#8BC7E2",
  "#A6DDF0",
  "#C2ECF9",
];
let ctx;
let shapes = [];
let bgClr;

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  ctx = drawingContext;
  bgClr = color(random(colors));
  INIT();
}

function draw() {
  background(bgClr);
  for (let s of shapes) {
    s.run();
  }
  if (frameCount % (60 * 3) == 0) {
    INIT();
  }
}

function divideRect(x, y, w, h, min) {
  if (w > min && h > min && random() < 0.95) {
    if (w >= h) {
      let rndw = random(0.3, 0.7) * w;
      divideRect(x, y, rndw, h, min);
      divideRect(x + rndw, y, w - rndw, h, min);
    }
    if (w < h) {
      let rndh = random(0.3, 0.7) * h;
      divideRect(x, y, w, rndh, min);
      divideRect(x, y + rndh, w, h - rndh, min);
    }
  } else {
    let t = dist(width / 2, height / 2, x + w / 2, y + h / 2) * 0.15;
    let margin = width * 0.025;
    shapes.push(new Shape(x + w / 2, y + h / 2, w - margin, h - margin, -t));
  }
}

function INIT() {
  shapes = [];
  shapes.push(
    new Shape(width * 0.5, height * 0.5, width * 0.9, height * 0.9, 0)
  );
  divideRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8, width * 0.2);
}

function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) * 0.5;
}

class Shape {
  constructor(x, y, w, h, t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.t = t;
    this.t1 = 40;
    this.t2 = this.t1 + 100 + t;
    this.t3 = this.t2 + 40;

    this.amount = 0;
  }

  show() {
    push();
    noStroke();
    fill(bgClr);
    ctx.shadowBlur = width * 0.015 * this.amount;
    ctx.shadowColor = "#00000088";
    ctx.shadowOffsetX = width * 0.008 * this.amount;
    ctx.shadowOffsetY = width * 0.008 * this.amount;
    rect(this.x, this.y, this.w, this.h, width * 0.01);
    pop();
  }

  move() {
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1);
      this.amount = lerp(0, 1, easeInOutQuart(n));
    } else if (this.t2 < this.t && this.t < this.t3) {
      let n = norm(this.t, this.t2, this.t3);
      this.amount = lerp(1, 0, easeInOutQuart(n));
    }
    this.t++;
  }

  run() {
    if (this.amount > 0.05) this.show();
    this.move();
  }
}
