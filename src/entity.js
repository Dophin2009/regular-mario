export var entities = []

export class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collision = sides.NONE;
        this.collider = this.createCollider();

        entities.push(this);
    }

    createCollider() {
        return new Collider(this.x, this.y, this.w, this.h);
    }

    update() {
        nextCollider = this.createCollider();
        
    }
}