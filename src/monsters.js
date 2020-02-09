import { Entity, entities } from "./entity"
import { player } from "./main"
import { Collider } from "./collider"
import { projectiles } from "./projectiles"

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

        this.x = this.collider.x;
        this.y = this.collider.y;

    }
}