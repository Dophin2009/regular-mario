import { Entity } from "./entity";
import { sides } from "./side_enum";
import { ctx } from "./main";

export class Player extends Entity {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.targetVel = 0;
    this.maxVel = 1.5;
    this.velUpdateCoef = 0.4;

    this.vertKE = 0;
    this.vertKERate = 0.1;
  }

  move(up, down, left, right) {
    if (left && !right) this.targetVel = -this.maxVel;
    else if (right && !left) this.targetVel = this.maxVel;
    else this.targetVel = 0;
    this.vx =
      this.velUpdateCoef * this.targetVel + (1 - this.velUpdateCoef) * this.vx;

    if (up) this.vertKE += this.vertKERate;
    else if (this.vertKE > 0) {
      this.vy = -Math.sqrt(this.vertKE);
      this.vertKE = 0;
    }
  }

  update() {
    super.update();

    if (this.collision !== sides.DOWN) this.vertKE = 0;

    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
