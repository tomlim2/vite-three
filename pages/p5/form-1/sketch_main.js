let colors = ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"];

function setup() {
  createCanvas(800, 800);
  blendMode(ADD);
  background(0);

  let seg = int(random(6, 14));
  let w = height / seg;
  for (let i = 0; i <= seg; i++) {
    for (let j = 0; j <= seg; j++) {
      let x = i * w;
      let y = j * w;
      noFill();
      stroke(255, 100);
      if (random() < 0.5) line(x, y, x + w, y + w);
      else line(x + w, y, x, y + w);
      if ((i + j) % 2 == 0) {
        form(x, y, w * 0.8);
      }
    }
  }
}

function draw() {}

function form(x, y, s) {
  let t = random(100000);
  let a = random(1234567);
  let col1 = color(colors[0]);
  let col2 = color(colors[1]);
  col1.setAlpha(10);
  col2.setAlpha(30);
  shuffle(colors, true);
  push();
  translate(x, y);
  rotate(a);
  stroke(col1);
  noFill();
  for (let i = 0; i < 1000; i++) {
    rotate(noise(i * 0.01) * 0.03);
    stroke(col1);
    if (random() < 0.01) stroke(col2);
    rect(0, 0, s * noise(i * 0.007, t), s * noise(i * 0.01, t));
    t += 0.001;
  }
  pop();
}
