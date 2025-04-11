import './style.sass'

import Tree from "./classes/Tree.js";
import Screen from "./classes/Screen.js"

const SIZE_WORLD = { x: 100, y: 50 };
const SIZE_CELL = 10;
let tree = null;
const screen = new Screen('canvas', {
  size: {
    world: SIZE_WORLD,
    cell: SIZE_CELL
  }
})
const createDNK = () => {
  const dnk = [];
  for (let i = 0; i < 16; i++) {
    dnk.push([Math.floor(Math.random() * 32), Math.floor(Math.random() * 32), Math.floor(Math.random() * 32), Math.floor(Math.random() * 32)])
  }
  return dnk;
}
const nextState = () => {
  tree.growth();
  tree.draw();
}
function run() {
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null
  } else {
    this.interval = setInterval(nextState, 250);
  }

}
document.getElementById('nextState').addEventListener('click', nextState);
document.getElementById('run').addEventListener('click', run);

tree = new Tree(createDNK(), screen);
tree.draw();

