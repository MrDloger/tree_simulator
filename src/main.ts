import './style.sass'

import Tree from "./classes/Tree.ts";
import Screen from "./classes/Screen.ts"
import { runFunction } from "./types/system.ts"

const SIZE_WORLD = { x: 100, y: 50 };
const SIZE_CELL = 10;
let tree: Tree;
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

function run(this: runFunction) {
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null
  } else {
    this.interval = setInterval(nextState, 250);
  }

}
const btnNext: HTMLButtonElement = <HTMLButtonElement>document.getElementById('nextState');
btnNext.addEventListener('click', nextState);
const btnRun: HTMLButtonElement = <HTMLButtonElement>document.getElementById('run');
btnRun.addEventListener('click', run);
console.log(typeof run)
tree = new Tree(createDNK(), screen);
tree.draw();

