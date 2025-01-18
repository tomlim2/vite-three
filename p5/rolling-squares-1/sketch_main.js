let objs = [];
let colors = ["#252525", "#f0f0f0"];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  let c = 10;
  let w = width / c;
  for (let i = 0; i <= c; i++) {
    for (let j = 0; j < c; j++) {
      let x = i * w;
      let y = j * w;
      objs.push(new OBJ(x + w / 4, y + w * 0.75, w / 2));
    }
  }
}

function draw() {
  background('#252525');
  for (let i of objs) {
    i.run();
  }
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
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

class OBJ {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.t = 0;
    this.t1 = 40;
    this.ang = 0;
    this.col1 = color(random(colors));
    this.col0 = color("#f0f0f0");
    this.col = color("#f0f0f0");
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    fill(this.col);
    noStroke();
    square(this.w / 2, -this.w / 2, this.w);
    pop();
  }

  move() {
    this.t++;
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.ang = lerp(0, -HALF_PI, easeInQuart(n));
      this.col = lerpColor(this.col0, this.col1, sin(easeInQuart(n) * PI));
    }
    if (this.t1 < this.t) {
      this.t = 0;
      this.x += -this.w;
      this.ang = 0;
	  this.col1 = color(random(colors));
    }
    if (this.x + this.w <= 0) {
      this.x = height + this.w / 2;
    }
  }
  run() {
    this.move();
    this.show();
  }
}
