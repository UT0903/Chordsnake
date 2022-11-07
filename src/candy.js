class Candy {
    content;
    pos;
    constructor(content) {
        this.content = content;
        this.pos = this.genNextPos();
    }
    genNextPos() {
        return createVector(floor(random(cols)), floor(random(rows))).mult(scl);
    }

    getPos() {
        return this.pos;
    }

}

class ChordCandy extends Candy {
    constructor(content) {
        super(content);
    }
    genNext(content) {
        this.pos = this.genNextPos();
        this.content = content;
    }

    show(img) {
        image(img, this.pos.x, this.pos.y, scl, scl);
        text(note2text[this.content], this.pos.x, this.pos.y);
    }
}

class TimbreCandy extends Candy {
    constructor() {
        super(getRandomInt(0, 3));
    }
    genNext() {
        this.pos = this.genNextPos();
        this.content = getRandomInt(0, 3);
    }

    show(img) {
        image(img, this.pos.x, this.pos.y, scl, scl);
    }
}