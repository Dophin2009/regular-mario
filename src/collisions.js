import { sides } from "./side_enum";
import { Collider } from "./collider";

export function collisionDir(moveColliderPast, moveColliderFuture, staticCollider) {
  if (isColliding(moveColliderFuture, staticCollider)) {
    if (moveColliderPast.y + moveColliderPast.h <= staticCollider.y) {
      return sides.DOWN;
    } else if (moveColliderPast.x + moveColliderPast.w <= staticCollider.x) {
      return sides.RIGHT;
    } else if (moveColliderPast.x >= staticCollider.x + staticCollider.w) {
      return sides.LEFT;
    } else {
      return sides.UP;
    }
  } else {
    return sides.NONE;
  }
}

export function isColliding(moveColliderFuture, staticCollider) {
  if (
    moveColliderFuture.x > staticCollider.x + staticCollider.w ||
    moveColliderFuture.x + moveColliderFuture.w < staticCollider.x ||
    moveColliderFuture.y > staticCollider.y + staticCollider.h ||
    moveColliderFuture.y + moveColliderFuture.h < staticCollider.y
  ) {
    return false;
  } else {
    return true;
  }
}

export function collisionCorrection(side, og, next, st){
    if (side === sides.DOWN){
        return new Collider(next.x, st.y - og.h, og.w, og.h);
    }
    else if (side === sides.UP){
        return new Collider(next.x, st.y + st.h, og.w, og.h);
    }
    else if (side === sides.LEFT){
        return new Collider(st.x + st.w, next.y, og.w, og.h);
    }
    else if (side === sides.RIGHT){
        return new Collider(st.x-og.w, next.y, og.w, og.h);
    }
    else return next;
}
