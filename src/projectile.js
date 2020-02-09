import { ctx } from "./main";

export let projectiles = [];

export class Projectile {
    constructor(x, y, w, h, vx, vy) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
        this.vy = vy;

        projectiles.push(this);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

export function projectileGen(w, h) {
    if (Math.random() >= 0.8) {
        let y = 30 + Math.random() * (h - 60);
        let proj = new Projectile(w + 30, y, 10, 10, -1, 0);
    }
}