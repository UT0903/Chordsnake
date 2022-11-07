// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

function Snake(board_heigth, board_width) {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.board_heigth = int(board_heigth);
  this.board_width = int(board_width);

  this.eat = function(candies) {
    for (let i = 0; i < candies.length; i++) {
      var d = dist(this.x, this.y, candies[i].pos.x, candies[i].pos.y);
      if (d < 1) {
        this.total++;
        return candies[i];
      }
    }
    return null;
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.checkDeath = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        return true;
      }
    }
    return false;
  }

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = (this.x + this.board_width) % this.board_width;
    this.y = (this.y + this.board_heigth) % this.board_heigth;
  }

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl, 10);
    }
    rect(this.x, this.y, scl, scl, 10);

  }
}