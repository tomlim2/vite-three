let colors = [
  "#e6302b",
  "#fbd400",
  "#36ad63",
  "#2B50AA",
  "#ffffff",
  "#232323",
  "#f654a9",
];
let ctx;
let centerX, centerY;
let movers = [];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  ctx = drawingContext;
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  background("#dfdfdf");
  for (let m of movers) {
    m.run();
  }

  if (frameCount % 5 == 0) {
    if (movers.length < 300) {
      addMovers();
    }
  }

  for (let i = 0; i < movers.length; i++) {
    let m1 = movers[i];
    for (let j = i + 1; j < movers.length; j++) {
      let m2 = movers[j];
      let dx = m2.x - m1.x;
      let dy = m2.y - m1.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = m1.d + m2.d;
      if (distance < minDist && distance > 0) {
        let force = (minDist - distance) * 0.0;
        let nx = dx / distance;
        let ny = dy / distance;
        m1.vx -= force * nx;
        m1.vy -= force * ny;
        m2.vx += force * nx;
        m2.vy += force * ny;
      }
    }
  }

  for (let i = 0; i < movers.length; i++) {
    let m = movers[i];
    if (m.isDead) {
      movers.splice(i, 1);
    }
  }

  CollisionManager.handleCollisions(movers);
}

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function addMovers() {
  let maxAttempts = 100;
  let attempts = 0;

  while (attempts < maxAttempts) {
    let x = random(width);
    let y = random(height);
    let d = width * random(0.005, 0.15);
    let overlap = false;

    for (let m of movers) {
      let distance = dist(x, y, m.x, m.y);
      let r1 = 1;
      let r2 = m.d / 2;
      if (distance < r1 + r2) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      movers.push(new Mover(x, y, d));
      break;
    }
    attempts++;
  }
}

class Mover {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = 0;
    this.maxD = d;
    this.dStep = d / 20;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.isDead = false;
    this.clr = random(colors);
    this.t1 = d;
    this.t = 0;
  }

  show() {
    fill(this.clr);
    stroke(0);
    strokeWeight(width * 0.001);
    strokeWeight(0);
    circle(this.x, this.y, this.d);
  }

  update() {
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1);
      this.d = lerp(0, this.maxD, easeInOutQuint(n));
    }
    this.t++;

    this.x += this.vx;
    this.y += this.vy;

    this.r = this.d / 2;

    if (
      this.x < -this.r ||
      width + this.r < this.x ||
      this.y < -this.r ||
      height + this.r < this.y
    ) {
      this.isDead = true;
    }
  }

  run() {
    this.show();
    this.update();
  }
}

class CollisionManager {
  static handleCollisions(movers) {
    for (let i = 0; i < movers.length; i++) {
      for (let j = i + 1; j < movers.length; j++) {
        let m1 = movers[i];
        let m2 = movers[j];
        let distance = dist(m1.x, m1.y, m2.x, m2.y);

        if (distance < m1.r + m2.r && distance > 0) {
          let dx = m2.x - m1.x;
          let dy = m2.y - m1.y;
          let overlap = m1.r + m2.r - distance;
          let nx = dx / distance;
          let ny = dy / distance;
          let correction = overlap / 2;
          m1.x -= correction * nx;
          m1.y -= correction * ny;
          m2.x += correction * nx;
          m2.y += correction * ny;

          let v1x = m1.vx;
          let v1y = m1.vy;
          let v2x = m2.vx;
          let v2y = m2.vy;

          let v1n = v1x * nx + v1y * ny;
          let v2n = v2x * nx + v2y * ny;

          let v1nAfter = v2n;
          let v2nAfter = v1n;

          m1.vx = v1x + (v1nAfter - v1n) * nx;
          m1.vy = v1y + (v1nAfter - v1n) * ny;
          m2.vx = v2x + (v2nAfter - v2n) * nx;
          m2.vy = v2y + (v2nAfter - v2n) * ny;
        }
      }
    }
  }
}
