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