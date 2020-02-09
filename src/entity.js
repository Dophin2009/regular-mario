export var entities = []

export class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collision = sides.NONE;
        this.collider = this.createCollider();

        this.vx = 0;
        this.vy = 0;

        entities.push(this);
    }

    createCollider() {
        return new Collider(this.x, this.y, this.w, this.h);
    }

    update() {
        this.vy += g;
        this.x += this.vx;
        this.y += this.vy;

        let nextCollider = this.createCollider();
        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];
            if (isColliding(nextCollider, platform.collider)) {
                this.collision = collisionDir(this.collider, nextCollider, platform.collider);
                this.collider = nextCollider;
                if (this.collision === sides.DOWN) this.vy = 0 
                return;
            }
        }
    }
}