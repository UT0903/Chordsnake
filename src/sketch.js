// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 40;
var foodList = [];

var pannelHeight = 80;
var boardHeigth, boardWidth;
var cols;
var rows;

var candy;
var state = 0;
var notes = new Array(0, 4, 7, 11);
var cur_timbre = 1;
const CHORD_CANDY_NUM = 2;
const TIMBRE_CANDY_NUM = 2;

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

const timbre2id = {
  "drum": 3,
  "electronic": 0,
  "piano": 1,
  "electric guitar": 2
};
const id2timbre = {
  3: "drum",
  0: "electronic",
  1: "piano",
  2: "electric guitar"
};

var nextIdx = 3;
function getNextNote() {
  nextIdx = (nextIdx + 1) % scales.length;
  return scales[nextIdx];
}

var nextTimbreIdx = 3;
function getNextTimbre() {
  nextTimbreIdx = (nextTimbreIdx + 1) % Object.keys(id2timbre).length;
  return nextTimbreIdx;
}

function preload() {
  img_start = loadImage('../asset/chordsnake.png');
  chord = [loadImage('../asset/c1.png'), loadImage('../asset/c2.png'), loadImage('../asset/c3.png'), loadImage('../asset/c4.png')];
  timbre = [loadImage('../asset/electronic.png'), loadImage('../asset/piano.png'), loadImage('../asset/guitar.png'), loadImage('../asset/drum.png')]
  //font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
  getAudioContext().suspend();
  createCanvas(800, 800 + pannelHeight);
  boardHeigth = height - pannelHeight;
  boardWidth = width;
  s = new Snake(boardHeigth, boardWidth);
  frameRate(10);
  cols = floor(boardHeigth / scl);
  rows = floor(boardWidth / scl);
}

function draw_background() {
  stroke("white");
  fill("gray");
  rect(0, boardHeigth, boardWidth, pannelHeight);
  
  // draw current timbre & notes in panel below 
  fill("yellow");
  textSize(20);
  textAlign(LEFT);
  text("current timbre: " + id2timbre[cur_timbre], 10, boardHeigth + 20);
  
  let note_str = "current note: ";
  for (let i = 0; i < notes.length; i++){
    note_str += " " + note2text[notes[i]];
  }
  text(note_str, 10, boardHeigth + 50);
  
  stroke("#8ecc39");
  // drawingContext.shadowBlur = 32
  // drawingContext.shadowColor = color("#8ecc39")
  for (let i = 0; i < boardWidth; i = i + scl){
    for (let j = 0; j < boardHeigth; j = j + scl){
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

function draw_food() {
  fill(255, 0, 100);
  textSize(32);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < foodList.length; i++) {
    foodList[i].show();
  }
}

var counter = 0;

function draw() {
  // background("#8ecc39");
  // noStroke()
  if (state == 0) {
    background("#8ecc39");
    image(img_start, 0, boardWidth/4, boardWidth, boardWidth/2);
    textAlign(CENTER, CENTER);
    textSize(boardWidth / 20);
    text("Press space to start", boardWidth/2, boardWidth*2/3);
  } else if (state == 1) {
    counter += 1;
    if (counter > 10) {
      counter = 0;
      let noteId1 = getRandomInt(0, 3);
      let noteId2 = noteId1;
      while (noteId2 == noteId1) {
        noteId2 = getRandomInt(0, 3);
      }
      const midiNote1 = notes[noteId1] + 60;
      const midiNote2 = notes[noteId2] + 60;
      Pd.send('chord_note', [midiNote1]);
      Pd.send('chord_note', [midiNote2]);
    }
    draw_background();
    let eaten = s.eat(foodList);
    if (eaten != null) {
      if (eaten instanceof ChordCandy) {
        insertNote(eaten.content);
        let nextNote = getNextNote();
        eaten.genNext(nextNote, chord[nextNote % 4]);
      } else if (eaten instanceof TimbreCandy) {
        update_timbre(eaten.content);
        let nextTimbre = getNextTimbre();
        eaten.genNext(nextTimbre, timbre[nextTimbre]);
      }
    }
    if (s.checkDeath()) {
      state = 2;
    }
    s.update();
    s.show();
    draw_food();
    fill(255, );
  } else if (state == 2) {
    foodList = []
    background("#8ecc39");
    textAlign(CENTER, CENTER);
    textSize(boardWidth / 10);
    text("Game over", boardWidth/2, boardWidth*1/2);
    textSize(boardWidth / 20);
    text("Press space to start a new game", boardWidth/2, boardWidth*3/5);
    Pd.send('reset_chord', ['bang']);
  }
}

function glow(glowColor, blurriness){
  // drawingContext.shadowBlur = blurriness;
  // drawingContext.shadowColor = glowColor;
}

function update_timbre(timbre){
  cur_timbre = timbre;
  Pd.send('timbre', [timbre]);
}

function keyPressed() {
  if (keyCode == 32) {
    state = 1;
    s.total++;
    Pd.start();
    cur_timbre = 3;
    update_timbre(cur_timbre);
    nextIdx = 3;
    for (let i = 0; i < CHORD_CANDY_NUM; i++) {
      let nextNote = getNextNote();
      foodList.push(new ChordCandy(nextNote, chord[nextNote % 4]));
    }
    for (let i = 0; i < TIMBRE_CANDY_NUM; i++) {
      let nextTimbre = getNextTimbre();
      foodList.push(new TimbreCandy(nextTimbre, timbre[nextTimbre]));
    }
  } else if (keyCode === UP_ARROW) {
    s.dir(0, -1);
    let midiNote = notes[0] + 60;
    Pd.send('note', [midiNote]);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
    let midiNote = notes[1] + 60;
    Pd.send('note', [midiNote]);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
    let midiNote = notes[2] + 60;
    Pd.send('note', [midiNote]);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
    let midiNote = notes[3] + 60;
    Pd.send('note', [midiNote]);
  }
}