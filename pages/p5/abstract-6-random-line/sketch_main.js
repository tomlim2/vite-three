let colors = ["#00A651", "#4CAF50", "#8BC34A", "#2E7D32", "#1B5E20"];
let ctx;
let centerX, centerY;
let rings = [];

function setup() {
	const oldCanvas = document.querySelector('canvas');
    if (oldCanvas) oldCanvas.remove();

	createCanvas(740, 740);
	rectMode(CENTER);
	colorMode(HSB, 360, 100, 100, 100);
	ctx = drawingContext;
	centerX = width / 2;
	centerY = height / 2;
	init();
}

function draw() {
	background("#010101");
	for (let r of rings) {
		r.run();
	}
	if (frameCount % 120 == 0) {
		init();
	}
}

function init() {
	rings = [];
	let cellCount = 11;
	let gridArea = width * 1.1;
	let cellSize = gridArea / cellCount;
	let w = cellSize * 0.25;
	for (let j = 0; j < cellCount; j++) {
		for (let i = 0; i < cellCount; i++) {
			let x = i * cellSize + cellSize / 2 + (width - gridArea) / 2;
			let y = j * cellSize + cellSize / 2 + (height - gridArea) / 2;
			let dst = dist(x, y, centerX, centerY);
			let t = map(dst, 0, sqrt(sq(width / 2) + sq(height / 2)), 0, -90);
			rings.push(new Shape(x, y, w, t));
		}
	}
}

function easeInOutQuart(x) {
	return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

class Shape {
	constructor(x, y, d, t) {
		this.x = x;
		this.y = y;
		this.d = d;
		this.radius = this.d / 2;

		this.scaleStart = 1;
		this.scaleEnd = 2;
		this.scale = 1;

		this.frequencyStart = 0;
		this.frequencyEnd = 6;
		this.frequency = this.frequencyStart;

		this.xDeformStart = 1;
		this.xDeformEnd = int(random(2, 13));
		this.xDeform = this.xDeformStart;

		this.yDeformStart = 1;
		this.yDeformEnd = this.xDeformEnd + random([-1, 1]);
		this.yDeform = this.yDeformStart;

		this.ang0 = random(TAU);
		this.ang1 = this.ang0 + random(-1, 1) * TAU;
		this.ang = this.ang0;

		this.timer = t;
		this.phase1 = 10;
		this.phase2 = this.phase1 + 0;
		this.phase3 = this.phase2 + 10;

		this.color1 = color("#ffffff");
		this.color2 = color(random(colors));
		this.currentColor = this.color1;
	}

	show() {
				push();
				translate(this.x, this.y);
				rotate(this.ang);
				noFill();
				stroke(this.currentColor);
				strokeWeight(width * 0.003);
				beginShape();
				for (let a = 0; a < TAU; a += (TAU / 1800)) {
						let variedRadius = this.radius * (this.scale + sin(a * this.frequency));
						let x = variedRadius * cos(a * this.xDeform);
						let y = variedRadius * sin(a * this.yDeform);
						vertex(x, y);
				}
				endShape();
				pop();
		}
	update() {
		this.timer++;
		if (0 < this.timer && this.timer < this.phase1) {
		let nrm = norm(this.timer, 0, this.phase1 - 1);
		this.scale = lerp(this.scaleStart, this.scaleEnd, easeInOutQuart(nrm));
		this.frequency = lerp(
			this.frequencyStart,
			this.frequencyEnd,
			easeInOutQuart(nrm)
		);
		this.xDeform = lerp(
			this.xDeformStart,
			this.xDeformEnd,
			easeInOutQuart(nrm)
		);
		this.yDeform = lerp(
			this.yDeformStart,
			this.yDeformEnd,
			easeInOutQuart(nrm)
		);
		this.ang = lerp(this.ang0, this.ang1, easeInOutQuart(nrm));
		this.currentColor = lerpColor(
			this.color1,
			this.color2,
			easeInOutQuart(nrm)
		);
		} else if (this.phase1 < this.timer && this.timer < this.phase2) {
		} else if (this.phase2 < this.timer && this.timer < this.phase3) {
		let nrm = norm(this.timer, this.phase2, this.phase3 - 1);
		this.scale = lerp(this.scaleEnd, this.scaleStart, easeInOutQuart(nrm));
		this.frequency = lerp(
			this.frequencyEnd,
			this.frequencyStart,
			easeInOutQuart(nrm)
		);
		this.xDeform = lerp(
			this.xDeformEnd,
			this.xDeformStart,
			easeInOutQuart(nrm)
		);
		this.yDeform = lerp(
			this.yDeformEnd,
			this.yDeformStart,
			easeInOutQuart(nrm)
		);
		this.ang = lerp(this.ang1, this.ang0, easeInOutQuart(nrm));
		this.currentColor = lerpColor(
			this.color2,
			this.color1,
			easeInOutQuart(nrm)
		);
		}
	}

	run() {
		this.show();
		this.update();
	}
}
