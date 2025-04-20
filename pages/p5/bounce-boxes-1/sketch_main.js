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
let shapes = [];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  let c = 10;
  let w = width / c;
  let t = -500;
  for (let j = 0; j < c; j++) {
    for (let i = 0; i < c; i++) {
      let x = i * w + w / 2;
      let y = j * w + w / 2;
      shapes.push(new Form(x, y, w, t));
      t += 500 / (c * c);
    }
  }
}

function draw() {
  background(255);
  for (let i of shapes) {
    i.show();
    i.move();
  }
}

function easeOutBounce(x) {
  const n1 = 7.5626;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

class Form {
  constructor(x, y, w, t) {
    this.x = x;
    this.y0 = y - width;
    this.y1 = y;
    this.y = this.y0;
    this.w = w;
    this.t = t;
    this.t1 = 80;
  }
  show() {
    fill(0);
    noStroke();
    square(this.x, this.y, this.w);
  }
  move() {
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.y = lerp(this.y0, this.y1, easeOutBounce(n));
    }
    this.t++;
  }
}
