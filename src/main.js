// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// @noframes
// @require      https://unpkg.com/bottleneck@2.13.0/es5.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/canvasjs/1.7.0/canvasjs.min.js
// ==/UserScript==

import { calculatePlatforms } from "./generate";
import {
  updatePlayer,
  setupKeyListener,
  isLooping,
  started,
  isScrollLocked,
  pause
} from "./playerInput";
import { entities } from "./entity";
import { Player } from "./player";
import { Collider } from "./collider";
import { isColliding } from "./collisions";
import { projectiles, Projectile, projectileGen } from "./projectile";

export let platforms = [];
export const g = 0.025;
export let player;
export let canvas;
export let ctx;
let docW;
let docH;
let offset;
let finishY;
let interval;
let stopped = false;

function documentWidth() {
  return Math.max(
    document.documentElement["clientWidth"],
    document.body["scrollWidth"],
    document.documentElement["scrollWidth"],
    document.body["offsetWidth"],
    document.documentElement["offsetWidth"]
  );
}

function documentHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
}

function documentScroll() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = documentWidth();
  canvas.height = documentHeight();
  canvas.style.position = "absolute";

  canvas.style.top = 0 + "px";
  canvas.style.left = 0 + "px";
  canvas.style.zIndex = 99999;

  return canvas;
}

function loop() {
  if (isLooping) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(31, 153, 2, 0.3)";
    ctx.fillRect(0, 0, documentWidth(), finishY);

    updatePlayer();

    if (isScrollLocked) {
      window.scrollTo(player.x, player.y - 300);
    }

    projectileGen(docW, docH);

    for (let i = 0; i < entities.length; i++) entities[i].update();

    for (let i = 0; i < projectiles.length; i++) {
      projectiles[i].update();
      if (isColliding(player.collider, projectiles[i].collider)) {
        restart();
      }
    }
    
    if (player.y < finishY) {
      stop();
    }

    // for (let i = 0; i < platforms.length; i++) {
    //   let p = platforms[i];
    //   ctx.strokeStyle = "rgb(0, 0, 0)";
    //   ctx.strokeRect(p.x, p.y + offset, p.width, p.height);
    // }
    //
  }
}

export function hide() {
  canvas.style.display = "none";
}

export function unhide() {
  canvas.style.display = "block";
}

export function restart() {
  player.x = (docW - 25) / 2;
  player.y = docH - 25;
  player.vx = 0;
  player.vy = 0;
  projectiles.length = 0;
}

export function stop() {
  restart();
  pause();
}

export function start() {
  console.log(documentScroll());
  docW = documentWidth();
  docH = documentHeight();
  offset = documentScroll();
  platforms = calculatePlatforms(
    document.body,
    docW,
    docH,
    offset
  );

  canvas = createCanvas();
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");

  finishY = Math.min(platforms[0].y + 30, 100);

  player = new Player((docW - 25) / 2, docH - 25, 25, 25);

  interval = setInterval(loop, 10);
}

(function() {
  // var limiter = new Bottleneck({
  // reservoir: 10,
  // reservoirRefreshAmount: 100,
  // reservoirRefreshInterval: 5 * 1000
  // });

  setupKeyListener();
})();
