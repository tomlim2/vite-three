function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

class Motion {
  constructor(x, y, w, clr1, clr2) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.clr1 = color(clr1);
    this.clr2 = color(clr2);
    this.progress = 0;
    this.rest = 20;
    this.time = 0;
    this.time1 = 40;
    this.time2 = this.time1 + this.rest;
    this.time3 = this.time1 + this.rest + 40;
  }
  show() {}
  move() {
    if (0 < this.time && this.time < this.time1) {
      this.progress = easeInOutCubic(norm(this.time, 0, this.time1 - 1));
    } else if (this.time2 < this.time && this.time < this.time3) {
      this.progress = easeInOutCubic(
        1 - norm(this.time, this.time2, this.time3 - 1)
      );
    } else if (this.time3 + this.rest < this.time) {
      this.time = -this.rest;
    }
    this.time++;
  }
  run() {
    this.show();
    this.move();
  }
}

class Motion1 extends Motion {
  constructor(x, y, w, clr1, clr2) {
    super(x, y, w, clr1, clr2);
  }
  show() {
    let h = this.w * this.progress;
    push();
    translate(this.x, this.y);
    let clr = lerpColor(this.clr1, this.clr2, this.progress);
    noStroke();
    fill(clr);
    ellipse((this.w / 2 - h) * 0.25, 0, this.w * 0.75);
    pop();
  }
}

class Motion2 extends Motion {
  constructor(x, y, w, clr1, clr2) {
    super(x, y, w, clr1, clr2);
  }
  show() {
    push();
    translate(this.x, this.y);
    let clr = lerpColor(this.clr1, this.clr2, this.progress);
    rotate(this.progress * PI);
    noStroke();
    fill(clr);
    rect(0, 0, this.w * 0.75, this.w * 0.75);
    pop();
  }
}

class Motion3 extends Motion {
  constructor(x, y, w, clr1, clr2) {
    super(x, y, w, clr1, clr2);
  }
  show() {
    push();
    noStroke();
    translate(this.x, this.y);
    let clr = lerpColor(this.clr1, this.clr2, this.progress);
    fill(clr);
    rect(
      -(this.w / 4) + (this.w / 2) * this.progress,
      -(this.w / 4),
      this.w / 2
    );
    rect(this.w / 4 - (this.w / 2) * this.progress, this.w / 4, this.w / 2);
    fill(this.clr2);
    circle(this.w / 4, -this.w / 4, this.w * 0.3);
    circle(-this.w / 4, this.w / 4, this.w * 0.3);
    fill(this.clr1);
    circle(-this.w / 4, -this.w / 4, this.w * 0.2);
    circle(this.w / 4, this.w / 4, this.w * 0.2);
    pop();
  }
}

class Motion2 extends Motion {
  constructor(x, y, w, clr1, clr2) {
    super(x, y, w, clr1, clr2);
  }
  show() {
    push();
    translate(this.x, this.y);
    let clr = lerpColor(this.clr1, this.clr2, this.progress);
    rotate(this.progress * PI);
    noStroke();
    fill(clr);
    rect(0, 0, this.w * 0.75, this.w * 0.75);
    pop();
  }
}

class Motion4 extends Motion {
  constructor(x, y, w, clr1, clr2) {
    super(x, y, w, clr1, clr2);
  }
  show() {
    let h = this.w * this.progress;
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.clr1);
    rect(0, this.w / 2 - h / 2, this.w, h);

    scale(1 - this.progress * 2, 1);
    fill(this.clr1);
    if (this.progress > 0.5) {
      fill(this.clr2);
    }
    circle(0, 0, this.w * 0.8);
    fill(this.clr2);
    if (this.progress > 0.5) {
      fill(this.clr1);
    }
    circle(0, 0, this.w * 0.3);
    pop();
  }
}
