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
let centerX, centerY;
let bubbles = [];

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  ctx = drawingContext;
  centerX = width / 2;
  centerY = height / 2;
  let area = width * 0.85;
  let cellCount = 8;
  let cellSize = area / cellCount;
  for (let i = 0; i < cellCount; i++) {
    for (let j = 0; j < cellCount; j++) {
      let x = cellSize * i + cellSize / 2 + (width - area) / 2;
      let y = cellSize * j + cellSize / 2 + (height - area) / 2;
      bubbles.push(new Bubble(x, y + cellSize * 0.2, cellSize * 0.4));
    }
  }
}

function draw() {
  background(255);
  for (let b of bubbles) {
    b.run();
  }
}

function aetherLink(x1, y1, d1, x2, y2, d2, dst) {
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
  endShape();
}

function easeOutQuint(x) {
  return 1 - Math.pow(1 - x, 5);
}

class Bubble {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.cage = [];
    this.dst = this.d / 2;
    this.clr = random(colors);
  }

  show() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.clr);
    circle(0, 0, this.d);

    for (let c of this.cage) {
      c.run();
    }

    for (let c of this.cage) {
      aetherLink(c.x, c.y, c.d, 0, 0, this.d, this.dst);
    }

    for (let i = 0; i < this.cage.length; i++) {
      if (this.cage[i].isDead) {
        this.cage.splice(i, 1);
      }
    }

    if (random() < 0.02) {
      this.addWisp();
    }
    pop();
  }

  addWisp() {
    this.cage.push(
      new Wisp(0, 0, this.d * random(0.25, 0.75), this.d * random(0.75, 1.25))
    );
  }

  run() {
    this.show();
  }
}
class Wisp {
  constructor(x, y, d, r) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.timer = 0;
    this.endTime = int(random(60, 200));
    this.ang = random(TAU);
    this.r = r;
    this.originX = this.x;
    this.originY = this.y;
    this.targetX = this.x + this.r * cos(this.ang);
    this.targetY = this.y + this.r * sin(this.ang);
    this.originD = d;
    this.isDead = false;
  }

  show() {
    if (this.isDead == false) {
      circle(this.x, this.y, this.d);
    }
  }
  move() {
    this.timer++;
    if (0 < this.timer && this.timer < this.endTime) {
      let n = norm(this.timer, 0, this.endTime);
      this.x = lerp(this.originX, this.targetX, easeOutQuint(n));
      this.y = lerp(this.originY, this.targetY, easeOutQuint(n));
      this.d = lerp(this.originD, 0, n);
    }
    if (this.timer > this.endTime) {
      this.isDead = true;
    }
  }
  run() {
    this.move();
    this.show();
  }
}
