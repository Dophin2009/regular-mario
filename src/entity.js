import { Collider } from "./collider";
import { sides } from "./side_enum";
import { isColliding, collisionDir, collisionCorrection } from "./collisions";
import { platforms, g } from "./main";

export let entities = [];

export class Entity {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.collision = sides.NONE;
    this.collider = new Collider(this.x, this.y, this.w, this.h);

    this.vx = 0;
    this.vy = 0;

    entities.push(this);
  }

  update() {
    this.vy += g;

    let nextCollider = new Collider(
      this.x + this.vx,
      this.y + this.vy,
      this.w,
      this.h
    );
    for (let i = 0; i < platforms.length; i++) {
      let platform = platforms[i];
      if (isColliding(nextCollider, platform.collider)) {
        this.collision = collisionDir(
          this.collider,
          nextCollider,
          platform.collider
        );

        this.collider = collisionCorrection(
          this.collision,
          this.collider,
          nextCollider,
          platform.collider
        );
        this.x = this.collider.x;
        this.y = this.collider.y;

        if (this.collision === sides.LEFT || this.collision === sides.RIGHT)
          this.vx = 0;
        if (this.collision === sides.DOWN) this.vy = 0;
        if (this.collision === sides.UP) this.vy = -this.vy;
        return;
      }
    }
  }
}
