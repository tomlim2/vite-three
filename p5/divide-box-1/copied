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
// let colors = [];
let ctx;
let rects = [];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  ctx = drawingContext;
  rects = [];
  divideRect(
    width / 2,
    height / 2,
    width * 0.75,
    height * 0.75,
    int(random(5, 9))
  );
  noStroke();
}

function draw() {
  background("#f0f0f0");
  for (let i of rects) {
    fill(i.col);
    rect(i.x, i.y, i.w + 1, i.h + 1);
  }
}

function INIT() {
  rects = [];
  divideRect(
    width / 2,
    height / 2,
    width * 0.75,
    height * 0.75,
    int(random(5, 9))
  );
}

function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function divideRect(x, y, w, h, n) {
  let ww = random(0.2, 0.8) * w;
  let hh = random(0.2, 0.8) * h;
  let xx = x - w / 2 + ww;
  let yy = y - h / 2 + hh;
  n -= int(random(1, 3));
  if (n >= 0) {
    if (h < w) {
      divideRect(xx - ww / 2, y, ww, h, n);
      divideRect(xx + (w - ww) / 2, y, w - ww, h, n);
    } else {
      divideRect(x, yy - hh / 2, w, hh, n);
      divideRect(x, yy + (h - hh) / 2, w, h - hh, n);
    }
  } else {
    rects.push(new Rect(x, y, w, h));
  }
}

class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = random(colors);
    this.t = -0;
    this.t1 = 30;
    this.t2 = 10 + this.t1;
    this.t3 = 30 + this.t2;
    this.dst = dist(x, y, width / 2, height / 2);
    let r = this.dst * 0.25;
    this.theta = atan2(y - height / 2, x - width / 2);
    this.x0 = x;
    this.x1 = x + r * cos(this.theta);
    this.y0 = y;
    this.y1 = y + r * sin(this.theta);
    this.f = 0;
    this.tmp = int(random(20));
  }

  show() {}

  move() {
    this.t++;
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.x = lerp(this.x0, this.x1, easeInOutQuart(n));
      this.y = lerp(this.y0, this.y1, easeInOutQuart(n));
    } else if (this.t2 < this.t && this.t < this.t3) {
      let n = norm(this.t, this.t2, this.t3 - 1);
      this.x = lerp(this.x1, this.x0, easeInOutQuart(n));
      this.y = lerp(this.y1, this.y0, easeInOutQuart(n));
    }
  }
}
