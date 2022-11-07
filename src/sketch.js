// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 40;
var food;
var nextNote;
var pannel_height = 80;
var board_heigth, board_width;
var candy;
var state = 0;

var notes;

function insertNote(note) {
  notes.shift();
  notes.push(note);
}

/* credit: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const scales = [
  0, 4, 7, 11, 2, 6, 9
];

// length = 12
const note2text = [
  'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'G', 'G#', 'A', 'A#', 'B'
];

var nextIdx = 3;
function getNextNote() {
  nextIdx = (nextIdx + 1) % scales.length;
  return scales[nextIdx];
}

function preload() {
  img_start = loadImage('../asset/chordsnake.png');
  candy = [loadImage('../asset/c1.png'), loadImage('../asset/c2.png'), loadImage('../asset/c3.png'), loadImage('../asset/c4.png')];
  //font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
  getAudioContext().suspend();
  createCanvas(800, 800 + pannel_height);
  board_heigth = height - pannel_height;
  board_width = width;
  s = new Snake(board_heigth, board_width);
  frameRate(10);
}

function pickLocation() {
  var cols = floor(board_heigth / scl);
  var rows = floor(board_width / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  nextNote = getNextNote();
}

function draw_background() {
  stroke("white");
  fill("black");
  rect(0, board_heigth, board_width, pannel_height);
  stroke("#8ecc39");
  // drawingContext.shadowBlur = 32
  // drawingContext.shadowColor = color("#8ecc39")
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
      insertNote(nextNote);
      pickLocation();
    }
    if (s.checkDeath()) {
      state = 2;
    }
    s.update();
    s.show();
    fill(255, 0, 100);
    image(candy[0], food.x, food.y, scl, scl);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(note2text[nextNote], food.x, food.y);
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
  // drawingContext.shadowBlur = blurriness;
  // drawingContext.shadowColor = glowColor;
}

function keyPressed() {
  if (keyCode == 32) {
    state = 1;
    s.total++;
    Pd.start();
    notes = new Array(0, 4, 7, 11);
    nextIdx = 3;
    pickLocation();
    Pd.send('timbre', [1]);
  } else if (keyCode === UP_ARROW) {
    s.dir(0, -1);
    let midiNote = notes[0] + 60;
    Pd.send('note', [midiNote]);
    // Pd.send('timbre', [0]);
    Pd.send('chord_note', [midiNote]);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
    let midiNote = notes[1] + 60;
    Pd.send('note', [midiNote]);
    // Pd.send('timbre', [1]);
    Pd.send('chord_note', [midiNote]);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
    let midiNote = notes[2] + 60;
    Pd.send('note', [midiNote]);
    // Pd.send('timbre', [2]);
    Pd.send('chord_note', [midiNote]);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
    let midiNote = notes[3] + 60;
    Pd.send('note', [midiNote]);
    // Pd.send('timbre', [3]);
    Pd.send('chord_note', [midiNote]);
  }
}