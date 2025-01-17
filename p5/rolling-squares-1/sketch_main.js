let colors = ["#DE183C", "#F2B541", "#0C79BB", "#ec4e20", "#00916e", "#f654a9"];

function setup(){
	createCanvas(900, 900);
	rectMode(CENTER);

}

function draw(){
	background(211);

}

class OBJ{
	constructor(x,y,w){
		this.x = x;
		this.y = y;
		this.w = w;
		this.t = 0;
		this.t1 = 40;
		this.ang = 0;
		this.col1 = color(random(colors));;
		this.col0 = color("#ffffff");
		this.col = color("#ffffff");

	}

	show(){
		push();
		translate(this.x,this.y);
		this.rotate(this.ang);
		fill(this.col);
		noStroke();
		square(this.w / 2, this -this.w/2,this.2);
		pop();
	}
}