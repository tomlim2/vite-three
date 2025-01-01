let colors = [
  "#c1292e",
  "#f1d302",
  "#1A53C0",
  "#083d77",
  "#da4167",
  "#FBAF00",
  "#00AF54",
];
let ctx;
let motions = [];
let motionClasses = [];
function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  ctx = drawingContext;
  motionClasses = [Motion1, Motion2, Motion3];
  shuffle(motionClasses, true);

  let gridSize = width * 0.8;
  let cellCount = 5;
  let cellSize = gridSize / cellCount;
  let number = 1;
  for (i = 0; i < cellCount; i++) {
    for (j = 0; j < cellCount; j++) {
      let x = cellSize * j + cellSize / 2 + (width - gridSize) / 2;
      let y = cellSize * i + cellSize / 2 + (height - gridSize) / 2;
      let MotionClass = motionClasses[number % motionClasses.length];
      let clr1 = (clr2 = "🐿️");
      while (clr1 == clr2) {
        clr1 = random(colors);
        clr2 = random(colors);
      }
      motions.push(new MotionClass(x, y, cellSize * 0.75, clr1, clr2));
      number++;
    }
  }
}

function draw() {
  background("#f0f0f0");
  for (let i = 0; i < motions.length; i++) {
    motions[i].run();
  }
}
