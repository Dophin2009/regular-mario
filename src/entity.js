export var entities = []

export class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        

        entities.push(this);
    }

    update() {
        
    }
}