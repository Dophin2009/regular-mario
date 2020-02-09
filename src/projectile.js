export projectiles = [];

export class Projectile {
    constructor(x, y, w, h, vx, vy) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
        this.vy = vy;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}