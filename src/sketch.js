// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 40;
var food;

function setup() {
  getAudioContext().suspend();
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

function mousePressed() {
  Pd.start();
  Pd.send('timbre', [3])
  s.total++;
}

function draw_background() {
  stroke("#8ecc39");
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
  draw_background();
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);

  fill(255, );
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
    Pd.send('note', [60]);
    // Pd.send('timbre', [0]);
    Pd.send('chord_note', [60]);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
    Pd.send('note', [64]);
    // Pd.send('timbre', [1]);
    Pd.send('chord_note', [64]);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
    Pd.send('note', [67]);
    // Pd.send('timbre', [2]);
    Pd.send('chord_note', [67]);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
    Pd.send('note', [71]);
    // Pd.send('timbre', [3]);
    Pd.send('chord_note', [71]);
  }
}