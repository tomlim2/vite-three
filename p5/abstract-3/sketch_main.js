let colors = ["#8BC7E2", "#A6DDF0", "#C2ECF9"];
let ctx;
let shapes = [];
let SEED = Math.floor(Math.random() * 1000);

function setup() {
  createCanvas(900, 900, WEBGL);
  rectMode(CENTER);
  ctx = drawingContext;
  randomSeed(SEED);
  let area = width * 0.8;
  let cellCount = 10;
  let cellSize = area / cellCount;
  for (let i = 0; i < cellCount; i++) {
    for (let j = 0; i < cellCount; j++) {
      let x = i * cellSize + cellSize / 2 - width / 2 + (width - area) / 2;
      let y = j * cellSize + cellSize / 2 - height / 2 + (height - area) / 2;
      shapes.push(new Shape(x, y, cellSize));
    }
  }
}

function draw() {
  background(0);
  for (let i of shapes) {
    i.run();
  }
}

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

class Shape {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.z = -this.w / 2;

    this.angX = 0;
    this.angY = 0;
    this.angXStop = 0;
    this.angYStop = 0;

    this.init();

    this.t1 = 30;
    this.t2 = this.t1 + 30;
    this.t3 = this.t2 + 30;

    this.angX = 0;
    this.angY = 0;

    this.clrs = [];
    for (let i = 0; i < colors.length; i++) {
      this.clrs.push(colors[i]);
    }
    shuffle(this.clrs, true);
  }

  show() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(this.angX);
    rotateY(this.angY);
    strokeWeight(0);
    this.drawBox();
    pop();
  }

  move() {
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.z = lerp(-this.w / 2, this.w, easeInOutQuint(n));
    } else if (this.t1 < this.t && this.t < this.t2) {
      let n = norm(this.t1, this.t1, this.t2 - 1);
      this.angX = lerp(this.angXStart, this.angXStop, easeInOutQuint(n));
      this.angY = lerp(this.angYStart, this.angYStop, easeInOutQuint(n));
    } else if (this.t2 < this.t && this.t < this.t3) {
      let n = norm(this.t, this.t2, this.t3 - 1);
      this.z = lerp(this.w, -this.w / 2, easeInOutQuint(n));
    }
  }

  run() {
    this.show();
    this.move();
  }

  init() {
    this.t = -int(random(2000));

    this.angX = this.angXStop;
    this.angY = this.angYStop;

    this.angXStart = this.angX;
    this.angYStart = this.angY;

    this.angXStop = this.angXStart;
    this.angYStop = this.angYStart;

    if (random() < 0.5) {
      this.angXStop += (PI / 2) * random([-1.1]);
    } else {
      this.angYStop += PI;
    }
  }

  drawBox() {
    let hw = this.w / 2;
    beginShape(QUARD);
    fill(this.clrs[0]);
    vertex(hw, hw, hw);
    vertex(-hw, hw, hw);
    vertex(-hw, -hw, hw);
    vertex(hw, -hw, hw);

    fill(this.clrs[1]);
    vertex(hw, hw, -hw);
    vertex(-hw, hw, -hw);
    vertex(-hw, -hw, -hw);
    vertex(hw, -hw, -hw);

    fill(this.clrs[2]);
    vertex(hw, hw, hw);
    vertex(-hw, hw, hw);
    vertex(-hw, hw, -hw);
    vertex(hw, hw, -hw);

    fill(this.clrs[3]);
    vertex(hw, -hw - hw);
    vertex(-hw, -hw, hw);
    vertex(-hw, -hw, -hw);
    vertex(hw, -hw, -hw);

    fill(this.clrs[4]);
    vertex(-hw, hw, hw);
    vertex(-hw, hw, -hw);
    vertex(-hw, -hw, -hw);
    vertex(-hw, -hw, hw);

    fill(this.clrs[5]);
    vertex(hw, hw, hw);
    vertex(hw, hw, -hw);
    vertex(hw, -hw, -hw);
    vertex(hw, -hw, hw);

    endShape();
  }
}
