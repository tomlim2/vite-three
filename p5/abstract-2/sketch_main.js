let colors = ["#FF6138", "#FFFF9D", "#BEEB9F", "#79BD8F", "#00A388"];

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
    let y = random(trianglePositioin.y1, trianglePosition.y2);
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
    motions.push(new motions(c.x, c.ymc.d));
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
  fill("#0b770d");
  triangle(
    traianglePosition.x1,
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
}
