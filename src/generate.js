class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  collide() {
    // Implement
  }
}

function textNodesUnder(el) {
  let n;
  let a = [];
  let walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while ((n = walk.nextNode())) {
    a.push(n);
  }
  return a;
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

export function calculatePlatforms(el) {
  const nodes = textNodesUnder(el);
  let platforms = [];
  for (let i = 0; i < nodes.length; i++) {
    let rect = textNodeRect(nodes[i]);
    let plat = new Platform(rect.left, rect.top, rect.width, rect.height);
    platforms.push(plat);
  }
  return platforms;
}
