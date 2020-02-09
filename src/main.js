// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// @noframes
// @require      https://unpkg.com/bottleneck@2.13.0/es5.js
// ==/UserScript==

import { Bottleneck } from "bottleneck";
import { calculatePlatforms } from "./generate";

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

  let top = documentScroll();

  canvas.style.top = top + "px";
  canvas.style.left = 0 + "px";
  canvas.style.zIndex = 99999;

  return canvas;
}

(function() {
  // var limiter = new Bottleneck({
  // reservoir: 10,
  // reservoirRefreshAmount: 100,
  // reservoirRefreshInterval: 5 * 1000
  // });

  console.log(documentScroll());

  const platforms = calculatePlatforms(document.body);

  const canvas = createCanvas();
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  console.log(platforms);
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(p.x, p.y, p.width, p.height);
  }
})();
