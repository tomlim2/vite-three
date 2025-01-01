let colors = [
  "#1E3A8A",
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#BFDBFE",
  "#DBEAFE",
];
let colors2 = [
  "#0D1B2A",
  "#1B263B",
  "#415A77",
  "#778DA9",
  "#E0E1DD",
];
let ctx;
let motions = [];
let motionClasses = [];
function setup() {
  createCanvas(900, 900);
  background("255");
  textFont("Do Hyeon");
  fill("255");
  textSize(600);
  textAlign(CENTER, TOP);
  text("20", width / 2, -40);
  text("25", width / 2, height / 2 - 60);

  rectMode(CENTER);
  ctx = drawingContext;
  motionClasses = [Motion1, Motion2, Motion3, Motion4, Motion5];
  shuffle(motionClasses, true);

  let gridSize = width * .8;
  let cellCount = 6;
  let cellSize = gridSize / cellCount;
  let number = 1;
  for (i = 0; i < cellCount; i++) {
    for (j = 0; j < cellCount; j++) {
      let x = cellSize * j + cellSize / 2 + (width - gridSize) / 2;
      let y = cellSize * i + cellSize / 2 + (height - gridSize) / 2;
      let c = get(x, y);
      let b = brightness(c);
      let MotionClass = motionClasses[number % motionClasses.length];
      let clr1 = (clr2 = "🐿️");
      if (b == 100) {
        while (clr1 == clr2) {
          clr1 = random(colors2);
          clr2 = random(colors2);
        }
      } else {
        while (clr1 == clr2) {
          clr1 = random(colors);
          clr2 = random(colors);
        }
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
