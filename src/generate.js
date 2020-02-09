import { Collider } from "./collider";

export class Platform {
  constructor(el, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.el = el;
    this.collider = new Collider(x, y, width, height);
  }
}

function textNodeRect(textNode) {
  let range = document.createRange();
  range.selectNodeContents(textNode);
  let rects = range.getClientRects();
  if (rects.length > 0) {
    return rects;
  }
  return null;
}

function textNodesUnder(el) {
  let walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);

  let node;
  let textNodes = [];

  while ((node = walker.nextNode())) {
    if (
      node != null &&
      node.nodeName.toLowerCase() != "div" &&
      node.nodeType === 3
    ) {
      textNodes.push(node);
    }
  }
  return textNodes;
}

export function calculatePlatforms(el, w, h) {
  let nodes = textNodesUnder(el);
  let platforms = [];
  for (let i = 0; i < nodes.length; i++) {
    let rects = textNodeRect(nodes[i]);
    if (rects === null) {
      continue;
    }
    for (let j = 0; j < rects.length; j++) {
      let rect = rects[j];

      let plat = new Platform(
        nodes[i],
        rect.left,
        rect.top,
        rect.width,
        rect.height
      );
      platforms.push(plat);
    }
  }

  let ground = new Platform(Null, 0, h, w, 10);
  platforms.push(ground);

  return platforms;
}
