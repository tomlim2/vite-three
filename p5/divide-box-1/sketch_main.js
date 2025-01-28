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
}
