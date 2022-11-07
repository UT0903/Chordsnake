class Candy {
    content;
    pos;
    img;
    constructor(content, img) {
        this.content = content;
        this.pos = this.genNextPos();
        this.img = img;
    }

    genNext(content, img) {
        this.pos = this.genNextPos();
        this.content = content;
        this.img = img;
    }
    
    genNextPos() {
        return createVector(floor(random(cols)), floor(random(rows))).mult(scl);
    }

    getPos() {
        return this.pos;
    }

}

class ChordCandy extends Candy {
    constructor(content, img) {
        super(content, img);
    }

    show() {
        image(this.img, this.pos.x, this.pos.y, scl, scl);
        text(note2text[this.content], this.pos.x, this.pos.y);
    }
}

class TimbreCandy extends Candy {
    constructor(content, img) {
        super(content, img);
    }

    show() {
        image(this.img, this.pos.x, this.pos.y, scl, scl);
    }
}