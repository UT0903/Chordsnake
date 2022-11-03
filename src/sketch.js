// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 40;
var food;
var state = 0;

function preload() {
  img_start = loadImage('chordsnake.png');
}

function setup() {
  createCanvas(600, 600);
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

// function mousePressed() {
//   state = 1;
//   // s.total++;
// }

function draw_background() {
  stroke("#8ecc39");
  
  drawingContext.shadowBlur = 32
  drawingContext.shadowColor = color("#8ecc39")
  for (let i = 0; i < width; i = i + scl){
    for (let j = 0; j < height; j = j + scl){
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
  if (state == 0) {
    background("#8ecc39");
    image(img_start, 0, height/4, height, height/2);
    glow(color(33, 58, 91, 100), 12);
    textAlign(CENTER, CENTER);
    textSize(width / 20);
    text("Press space to start", height/2, height*2/3);
  } else if (state == 1) {
    draw_background();
    if (s.eat(food)) {
      pickLocation();
    }
    if (s.checkDeath()) {
      state = 2;
    }
    s.update();
    s.show();
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
    fill(255, );
  } else if (state == 2) {
    background("#8ecc39");
    glow(color(33, 58, 91, 100), 12);
    textAlign(CENTER, CENTER);
    textSize(width / 10);
    text("Game over", height/2, height*1/2);
    textSize(width / 20);
    text("Press space to start a new game", height/2, height*3/5);
  }
}

function glow(glowColor, blurriness){
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}

function keyPressed() {
  if (keyCode == 32) {
    state = 1;
    s.total++;
  } else if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}