let colors = [];
let ctx;
let centerX, centerY;
let circles = [];
let balls = [];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  ctx = drawingContext;
  centerX = width / 2;
  centerY = height / 2;
  let area = width * 0.75;
  let cellCount = 5;
  let cellSize = area / cellCount;
  for (let i = 0; i < cellCount; i++) {
    for (let j = 0; j < cellCount; j++) {
      let x = i * cellSize + cellSize / 2 + (width - area) / 2;
      let y = j * cellSize + cellSize / 2 + (height - area) / 2;
      circles.push({ x: x, y: y, d: cellSize / 2 });
    }
  }
  for (let i = 0; i < 6; i++) {
    let x = random(width);
    let y = random(height);
    let d = cellSize / 2;
    balls.push(new Ball(x, y, d));
  }
}

function draw() {
  background("#000000");
  noStroke();
  fill("#ffffff");
  for (let b of balls) {
    for (let c of circles) {
      drawBridge(b.x, b.y, b.d, c.x, c.y, c.d, width * 0.05);
    }
  }

  for (let c of circles) {
    circle(c.x, c.y, c.d);
  }

  for (let b of balls) {
    b.run();
  }
  for (let b of balls) {
    for (let c of circles) {
      let dx = c.x - b.x;
      let dy = c.y - b.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = c.d + b.d;
      if (distance < minDist && distance > 0) {
        let force = (minDist - distance) * 0.005;
        let nx = dx / distance;
        let ny = dy / distance;
        b.vx += force * nx;
        b.vy += force * ny;
      }
    }
  }
}

function drawBridge(x1, y1, d1, x2, y2, d2, dst) {
  let r = dst / 2;
  let r1 = d1 / 2;
  let r2 = d2 / 2;
  let R1 = r1 + r;
  let R2 = r2 + r;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let d = sqrt(dx * dx + dy * dy);
  if (d > R1 + R2) {
    return;
  }
  let dirX = dx / d;
  let dirY = dy / d;
  let a = (R1 * R1 - R2 * R2 + d * d) / (2 * d);
  let underRoot = R1 * R1 - a * a;
  if (underRoot < 0) return;
  let h = sqrt(underRoot);
  let midX = x1 + dirX * a;
  let midY = y1 + dirY * a;
  let perpX = -dirY * h;
  let perpY = dirX * h;
  let cx1 = midX + perpX;
  let cy1 = midY + perpY;
  let cx2 = midX - perpX;
  let cy2 = midY - perpY;

  if (dist(cx1, cy1, cx2, cy2) < r * 2) {
    return;
  }

  let ang1 = atan2(y1 - cy1, x1 - cx1);
  let ang2 = atan2(y2 - cy1, x2 - cx1);
  let ang3 = atan2(y2 - cy2, x2 - cx2);
  let ang4 = atan2(y1 - cy2, x1 - cx2);

  if (ang2 < ang1) {
    ang2 += TAU;
  }

  beginShape();
  for (let i = ang1; i < ang2; i += TAU / 180) {
    vertex(cx1 + r * cos(i), cy1 + r * sin(i));
  }

  if (ang4 < ang3) {
    ang4 += TAU;
  }
  for (let i = ang3; i < ang4; i += TAU / 180) {
    vertex(cx2 + r * cos(i), cy2 + r * sin(i));
  }
  endShape(CLOSE);
}

class Ball {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.vx = (random([-1, 1]) * width) / 300;
    this.vy = (random([-1, 1]) * width) / 300;
  }

  show() {
    noStroke();
    fill("#ffffff");
    circle(this.x, this.y, this.d);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    let radius = this.d / 2;
    if (this.x < radius || this.x > width - radius) {
      this.vx *= -1;
    }
    if (this.y < radius || this.y > height - radius) {
      this.vy *= -1;
    }
    this.x = constrain(this.x, radius, width - radius);
    this.y = constrain(this.y, radius, height - radius);
  }

  run() {
    this.show();
    this.move();
  }
}
