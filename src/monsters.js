import { Entity, entities } from "./entity";
import { player } from "./main";
import { Collider } from "./collider";
import { projectiles } from "./projectile";
import { ctx } from "./main";

export class Follower{
    constructor(x,y,w,h,speed){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;

        this.collider = new Collider(x,y,w,h);

        this.vx = 0;
        this.vy = 0;

        projectiles.push(this);
    }

    update(){

        if (this.x > player.x){
            this.collider.x -= this.speed;
        }
        else if (this.x < player.x){
            this.collider.x += this.speed
        }

        if (this.y > player.y){
            this.collider.y -= this.speed;
        }
        else if (this.y < player.y){
            this.collider.y += this.speed;
        }

        ctx.fillStyle = "rgb(255, 0, 255)";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        this.x = this.collider.x;
        this.y = this.collider.y;

    }
}