import { sides } from "./side_enum";
function collisionDir(moveColliderPast, moveColliderFuture, staticCollider){
    if (isColliding(moveColliderFuture, staticCollider)){
            if (moveColliderPast.y+moveColliderPast.height < staticCollider.y){
                return sides.DOWN
            }
            else if (moveColliderPast.x+moveColliderPast.width < staticCollider.x){
                return sides.RIGHT
            }
            else if (moveColliderPast.x > staticCollider.x + staticCollider.width){
                return sides.LEFT
            }
            else {
                return sides.UP
            }
        }
    else {
        return sides.NONE;
    }
}

function isColliding(moveColliderFuture, staticCollider){
    if (moveColliderFuture.x > staticCollider.x+staticCollider.width 
        || moveColliderFuture.x+moveColliderFuture.width < staticCollider.x
        || moveColliderFuture.y > staticCollider.y + staticCollider.height
        || moveColliderFuture.y + moveColliderFuture.height < staticCollider.y){
            return false;
        }
    else {
        return true;
    }
}

function collisionCorrection(side, og, next, static){
    if (side === sides.UP){
        return new Collider(next.x, static.y + static.height, og.width, og.height);
    }
    else if (side === sides.DOWN){
        return new Collider(next.x, static.y - og.height, og.width, og.height);
    }
    else if (side === sides.LEFT){
        return new Collider(static.x + static.width, next.y, og.width, og.height);
    }
    else if (side === sides.RIGHT){
        return new Collider(static.x-og.width, next.y, og.width, og.height);
    }
}