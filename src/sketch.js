// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 40;
var food;
var pannel_height = 80;
var board_heigth, board_width;
var candy;
var state = 0;

function preload() {
  img_start = loadImage('../asset/chordsnake.png');
  candy = [loadImage('../asset/c1.png'), loadImage('../asset/c2.png'), loadImage('../asset/c3.png')];
  //font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(800, 800 + pannel_height);
  board_heigth = height - pannel_height;
  board_width = width;
  s = new Snake(board_heigth, board_width);
  frameRate(10);
  pickLocation();

}

function pickLocation() {
  var cols = floor(board_heigth / scl);
  var rows = floor(board_width / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);

}

// function mousePressed() {
//   state = 1;
//   // s.total++;
// }

function draw_background() {
  stroke("white");
  fill("black");
  rect(0, board_heigth, board_width, pannel_height);
  stroke("#8ecc39");
  drawingContext.shadowBlur = 32
  drawingContext.shadowColor = color("#8ecc39")
  for (let i = 0; i < board_width; i = i + scl){
    for (let j = 0; j < board_heigth; j = j + scl){
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
    image(img_start, 0, board_width/4, board_width, board_width/2);
    glow(color(33, 58, 91, 100), 12);
    textAlign(CENTER, CENTER);
    textSize(board_width / 20);
    text("Press space to start", board_width/2, board_width*2/3);
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
    image(candy[0], food.x, food.y, scl, scl);
    glow(color(33, 58, 91, 100), 12);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('C', food.x + 20, food.y + 20);
    fill(255, );
  } else if (state == 2) {
    background("#8ecc39");
    glow(color(33, 58, 91, 100), 12);
    textAlign(CENTER, CENTER);
    textSize(board_width / 10);
    text("Game over", board_width/2, board_width*1/2);
    textSize(board_width / 20);
    text("Press space to start a new game", board_width/2, board_width*3/5);
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