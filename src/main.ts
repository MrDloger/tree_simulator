import "./style.sass";

import Tree from "./classes/Tree/Tree.ts";
import Screen from "./classes/util/Screen.ts";
import { runFunction } from "./types/system.ts";
import { DNK } from "./types/DnkType.ts";

const SIZE_WORLD = { x: 100, y: 50 };
const SIZE_CELL = 10;
let tree: Tree;
const screen = new Screen("canvas", {
  size: {
    world: SIZE_WORLD,
    cell: SIZE_CELL,
  },
});
const createDNK = (): DNK => {
  const dnk: DNK = [];
  for (let i = 0; i < 16; i++) {
    dnk.push([
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
    ]);
  }
  return dnk;
};
const nextState = () => {
  tree.growth();
  tree.draw();
};

function run(this: runFunction) {
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null;
  } else {
    this.interval = setInterval(nextState, 250);
  }
}

(<HTMLButtonElement>document.getElementById("nextState")).addEventListener(
  "click",
  nextState
);
(<HTMLButtonElement>document.getElementById("run")).addEventListener(
  "click",
  run
);

tree = new Tree(createDNK(), screen);
tree.draw();
