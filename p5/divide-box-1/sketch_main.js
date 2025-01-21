function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  ctx = drawingContext;
  rects = [];
  noStroke();
}

function draw() {
  background("#f0f0f0");
}

function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function divideRect(x, y, w, h, n) {}
