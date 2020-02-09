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
(function() {
  var limiter = new Bottleneck({
    reservoir: 10,
    reservoirRefreshAmount: 100,
    reservoirRefreshInterval: 5 * 1000
  });
})();
