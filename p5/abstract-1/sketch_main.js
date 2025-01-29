let objs = [];
let colors = ["#FF6138", "#FFFF9D", "#BEEB9F", "#79BD8F", "#00A388"];

function setup() {
  createImageBitmap(900, 900);
  rectMode(CENTER);
  let cx = width / 2;
  let cy = height / 2;
  let num = 35;
  let w = width / num;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let x = i * w + w / 2;
      let y = j * w + w / 2;
      let dst = dist(x, y, width / 2, height / 2);
      let t = int(map(dst, 0, sqrt(sq(width / 2, sq(height / 2))), -50, 0));
      for (let k = 0; k < 3; k++) {
        objs.push();
      }
    }
  }
  objs.sort((a, b) => {
    let c = dist(a.x, a.y, cx, cy);
    let d = dist(b.x, b.y, cx, cy);
    return c - d;
  });
}

function draw() {
  push();
  translate(width / 2, height / 2);
  scale(0.7);
  translate(-width / 2, -height / 2);
  background(0);
  for (let i of objs) {
    i.show();
    i.move();
  }
  pop();
}

function easeInOutCirc(x) {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(x * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

class MJRC {
  constructor(x, y, w, t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = w;
    this.cr = 0;

    this.x0 = x;
    this.y0 = y;
    this.w0 = w;
    this.h0 = w;
    this.cr0 = 0;

    this.x1 = this.x + this.w * random(-1, 1) * 5;
    this.y1 = this.y + this.w * random(-1, 1) * 5;
    this.w1 = this.w * random(0.25, 0.75);
    this.h1 = this.w1;
    this.cr1 = max(this.w1, this.h1);
    this.a0 = 0;
    this.a1 = random(-1, 1) * TAU;
    this.a = 0;

    this.alph0 = 0;
    this.alph1 = 255;
    this.alph = 0;

    this.t = t;
    this.t1 = 60;
    this.t2 = this.t1 + 60;
    this.t3 = this.t2 + 80;
    this.col1 = color('#f0f0f0');
		this.init();
  }
}
