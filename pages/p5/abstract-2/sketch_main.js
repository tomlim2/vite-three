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
let circles = [];
let motions = [];
let noiseFilter;
let trianglePosition;

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  ctx = drawingContext;
  trianglePosition = {
    x1: width / 2,
    y1: height * 0.15,
    x2: width * 0.8,
    y2: height * 0.88,
    x3: width * 0.2,
    y3: height * 0.88,
  };

  for (let i = 0; i < 10000; i++) {
    let d = width * random(0.02, 0.08);
    let y = random(trianglePosition.y1, trianglePosition.y2);
    let n = norm(y, trianglePosition.y1, trianglePosition.y2);
    let x = width / 2 + random(-1, 1) * width * lerp(0, 0.3, n);
    let newShape = { x, y, d };
    let overlap = false;
    for (let c of circles) {
      if (checkCircleCollision(newShape, c)) {
        overlap = true;
        break;
      }
    }
    if (!overlap) {
      circles.push({ x, y, d });
    }
  }
  for (let c of circles) {
    motions.push(new Motion(c.x, c.y, c.d));
  }

  noiseFilter = createImage(width, height);
  noiseFilter.loadPixels();
  let pix = noiseFilter.width * noiseFilter.height * 4;
  for (let i = 0; i < pix; i += 4) {
    let x = (i / 4) % noiseFilter.width;
    let y = floor(map(i, 0, pix, 0, noiseFilter.height));
    let alph = random(30);
    let c = noise(y * 0.08, x * 0.08) * 240;
    noiseFilter.pixels[i] = c;
    noiseFilter.pixels[i + 1] = c;
    noiseFilter.pixels[i + 2] = c;
    noiseFilter.pixels[i + 3] = alph;
  }
  noiseFilter.updatePixels();
}

function draw() {
  background(0);
  noStroke();
  fill("#A6DDF0");
  triangle(
    trianglePosition.x1,
    trianglePosition.y1,
    trianglePosition.x2,
    trianglePosition.y2,
    trianglePosition.x3,
    trianglePosition.y3
  );
  for (let m of motions) {
    m.show();
    m.move();
  }
  image(noiseFilter, 0, 0);
}

function checkCircleCollision(a, b) {
  let distSq = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  let radiusSum = a.d / 2 + b.d / 2;
  return distSq < radiusSum ** 2;
}

function easeOutCirc(x) {
  return sqrt(1 - Math.pow(x - 1, 2));
}

class Motion {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.n = 4;
    this.sw = d / this.n;
    this.te = int(random(300, 600));
    this.t = 0;
    this.circles = [];
    this.cols = [];
    shuffle(colors, true);
    for (let i = 0; i < this.n; i++) {
      this.cols.push(colors[i % colors.length]);
      this.circles.push(
        new Circle(
          0,
          0,
          this.d * 1.1,
          -((this.te / this.n) * i) + this.te,
          this.te,
          this.cols[i]
        )
      );
    }
    this.count = 0;
  }

  show() {
    push();
    translate(this.x, this.y);
    strokeWeight(0);
    stroke(0);
    noFill();
    circle(0, 0, this.d);
    drawingContext.clip();
    for (let i = 0; i < this.circles.length; i++) {
      let r = this.circles[i];
      r.show();
      r.move();
    }
    for (let i = 0; i < this.circles.length; i++) {
      let r = this.circles[i];
      if (r.isDead) {
        this.count++;
        this.circles.splice(i, 1);
        this.circles.push(
          new Circle(
            0,
            0,
            this.d * 1.1,
            0,
            this.te,
            this.cols[this.count % this.cols.length]
          )
        );
      }
    }
    pop();
  }
  move() {
    this.t++;
  }
}

class Circle {
  constructor(x, y, d, t0, t1, col) {
    let th = random(TAU);
    let r = random(0, 0.5) * d;
    this.x0 = x + r * cos(th);
    this.x1 = x;
    this.y0 = y + r * sin(th);
    this.y1 = y;
    this.x = this.x0;
    this.y = this.y0;

    this.d = 0;
    this.d1 = d;
    this.t = t0;
    this.t1 = t1;
    this.isDead = false;
    this.col = col;
  }
  show() {
    noStroke();
    fill(this.col);
    circle(this.x, this.y, this.d);
  }
  move() {
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.d = lerp(0, this.d1, easeOutCirc(n));
      this.x = lerp(this.x0, this.x1, easeOutCirc(n));
      this.y = lerp(this.y1, this.y1, easeOutCirc(n));
    }
    if (this.t > this.t1) {
      this.isDead = true;
    }
    this.t++;
  }
}