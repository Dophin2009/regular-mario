up = false;
down = false;
left = false;
right = false;
function setupKeyListener(){
    document.addEventListener('keydown', function(event) {
        if(event.key === " " || event.key === "ArrowUp" || event.key === "w") {
            up = true;
        }
        else if(event.key === "s" || event.key === "ArrowDown") {
            down = true;
        }
        else if(event.key === "a" || event.key === "ArrowRight") {
            left = true;
        }
        else if(event.key === "d" || event.key === "ArrowLeft") {
            right = true;
        }
    });
    document.addEventListener('keyup', function(event) {
        if(event.key === " " || event.key === "ArrowUp" || event.key === "w") {
            up = false;
        }
        else if(event.key === "s" || event.key === "ArrowDown") {
            down = false;
        }
        else if(event.key === "a" || event.key === "ArrowRight") {
            left = false;
        }
        else if(event.key === "d" || event.key === "ArrowLeft") {
            right = false;
        }
    });
}

function updatePlayer(){
    player.move(up,down,left,right);
}