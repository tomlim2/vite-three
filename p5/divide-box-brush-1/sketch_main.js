// let colors = ["#0A1D37",  "#0B3954",  "#16658A",  "#2F6690",  "#187BCD",  "#3083DC",  "#527DC6",  "#64C2F5",  "#81DAF5",  "#A0E1FA",  "#243E73",  "#113259",  "#2A5B97",  "#1D4D8F",  "#326EB8",  "#4C8EC6",  "#6FB1D6",  "#8BC7E2",  "#A6DDF0",  "#C2ECF9",];

let colors = ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"];

let brushRect;
let rects = [];

function setup() {
  createCanvas(720, 1080, WEBGL);
  background("#f0f0f0");
  brush.noStroke();
  rects = [];
  divideRect(
    width / 2,
    height / 2,
    width * 0.9,
    height * 0.9,
    int(random(5, 9))
  );
}

function draw() {
  background("#f0f0f0");
  translate(-width / 2, -height / 2);
  for (i of rects) {
    i.brushRect();
  }
}

function mousePressed() {
  rects = [];
  divideRect(
    width / 2,
    height / 2,
    width * 0.9,
    height * 0.9,
    int(random(5, 9))
  );
}

function divideRect(x, y, w, h, n) {
  let ww = random(0.2, 0.8) * w;
  let hh = random(0.2, 0.9) * h;
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
    // new Rect(x, y, w, h).brushRect();
  }
}

class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = random(colors);
  }

  brushRect() {
    brush.fill(this.col, 255);
    brush.bleed(0, 0.1, 1);
    brush.rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }

  show() {}
}
