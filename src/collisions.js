import { sides } from "./side_enum";
function collisionDir(moveColliderPast, moveColliderFuture, staticCollider){
    if (isColliding(moveColliderFuture, staticCollider)){
            
        }
    else {
        return sides.NONE;
    }
}

function isColliding(moveColliderFuture, staticCollider){
    if (moveColliderFuture.x > staticCollider.x+width 
        || moveColliderFuture.x+width < staticCollider.x
        || moveColliderFuture.y > staticCollider.y + height
        || moveColliderFuture.y + height < staticCollider.y){
            return false;
        }
    else {
        return true;
    }
}