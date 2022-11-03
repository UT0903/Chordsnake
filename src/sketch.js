// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 40;
var food;
var pannel_height = 80;
var candy;
function setup() {
  candy = [loadImage('../asset/c1.png'), loadImage('../asset/c2.png'), loadImage('../asset/c3.png')];

  createCanvas(800, 800 + pannel_height);
  s = new Snake();
  frameRate(10);
  pickLocation();
  
  
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);

}

function mousePressed() {
  s.total++;
}

function draw_background() {
  stroke("white");
  fill("black");
  rect(0, 0, width, height / 10);
  for (let i = 0; i < width; i = i + scl){
    for (let j = pannel_height; j < height; j = j + scl){
      if ((i/scl+j/scl) % 2) {
            fill("#8ecc39");
            rect(i, j, scl, scl);
          }
      else {
            fill("#a2d645");
            rect(i, j, scl, scl);
          }
    }
  }
}

function draw() {
  // background("#8ecc39");
  // noStroke()
  draw_background();
  
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  image(candy[0], food.x, food.y, scl, scl);

  fill(255, );
}





function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}