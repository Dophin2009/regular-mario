export class Platform {
  constructor(el, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.el = el;
  }
}

function textNodeRect(textNode) {
  let range = document.createRange();
  range.selectNodeContents(textNode);
  let rects = range.getClientRects();
  if (rects.length > 0) {
    return rects[0];
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
      console.log(node);
      textNodes.push(node);
    }
  }
  return textNodes;
}

export function calculatePlatforms(el) {
  let nodes = textNodesUnder(el);
  let platforms = [];
  for (let i = 0; i < nodes.length; i++) {
    let rect = textNodeRect(nodes[i]);
    if (rect === null) {
      continue;
    }

    let plat = new Platform(
      nodes[i],
      rect.left,
      rect.top,
      rect.width,
      rect.height
    );
    platforms.push(plat);
  }
  return platforms;
}
