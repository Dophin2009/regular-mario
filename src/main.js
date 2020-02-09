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

import { Bottleneck } from "bottleneck";
import { calculatePlatforms } from "./generate";
import { updatePlayer, setupKeyListener, isLooping } from "./playerInput";
import { entities, Entity } from "./entity";
import { Player } from "./player";
import { Collider } from "./collider";

export let platforms = [];
export const g = 0.0002;
export let player;
export let canvas;
export let ctx;

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
    updatePlayer();

    for (let i = 0; i < entities.length; i++) entities[i].update();
  }
}

export function hide() {
  canvas.style.display = "none";
}

export function unhide() {
  canvas.style.display = "block";
}

export function start() {
  console.log(documentScroll());
  platforms = calculatePlatforms(
    document.body,
    documentWidth(),
    documentHeight()
  );

  canvas = createCanvas();
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  const offset = documentScroll();

  console.log(platforms);

  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)";
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.rect(p.x, p.y + offset, p.width, p.height);
    ctx.stroke();
  }

  player = new Player(0, 0, 25, 50);

  ctx.fillStyle = "rgb(255, 0, 0)";
  ctx.strokeStyle = "rgba(0, 0, 0, 0)";
  ctx.rect(player.x, player.y, player.w, player.h);
  ctx.stroke();

  setInterval(loop, 10);
}

(function() {
  // var limiter = new Bottleneck({
  // reservoir: 10,
  // reservoirRefreshAmount: 100,
  // reservoirRefreshInterval: 5 * 1000
  // });

  setupKeyListener();
})();
