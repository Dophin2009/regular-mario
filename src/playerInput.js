import { player, start, hide, unhide } from "./main";

let up = false;
let down = false;
let left = false;
let right = false;
let started = false;
export let isLooping = true;
export let isScrollLocked = false;

export function setupKeyListener() {
  document.addEventListener("keydown", function(event) {
    if (event.key === "\\") {
      if (!started) {
        start();
        started = true;
        isLooping = true;
        isScrollLocked = true;
      } else if (isLooping) {
        hide();
        isLooping = false;
        isScrollLocked = false;
      } else {
        unhide();
        isLooping = true;
        isScrollLocked = true;
      }
    }

    if (event.key === " " || event.key === "ArrowUp" || event.key === "w") {
      event.preventDefault();
      up = true;
    } else if (event.key === "s" || event.key === "ArrowDown") {
      event.preventDefault();
      down = true;
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      event.preventDefault();
      left = true;
    } else if (event.key === "d" || event.key === "ArrowRight") {
      event.preventDefault();
      right = true;
    }
  });
  document.addEventListener("keyup", function(event) {
    if (event.key === " " || event.key === "ArrowUp" || event.key === "w") {
      event.preventDefault();
      up = false;
    } else if (event.key === "s" || event.key === "ArrowDown") {
      event.preventDefault();
      down = false;
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      event.preventDefault();
      left = false;
    } else if (event.key === "d" || event.key === "ArrowRight") {
      event.preventDefault();
      right = false;
    }
  });
}

export function updatePlayer() {
  player.move(up, down, left, right);
}
