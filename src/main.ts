import "./style.sass";

import Tree from "./classes/Tree/Tree.ts";
import Screen from "./classes/utils/Screen.ts";
import { runFunction } from "./types/system.ts";
import { DNK } from "./types/DnkType.ts";
import { Population } from "./classes/utils/Population.ts";

const SIZE_WORLD = { x: 100, y: 50 };
const SIZE_CELL = 10;
let trees: Array<Tree> = [];
const screen = Screen.getInstanse("canvas", {
  size: {
    world: SIZE_WORLD,
    cell: SIZE_CELL,
  },
});
const population = new Population(10)
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
  trees = population.tick(trees);
  Screen.getInstanse().drawScene();
};

function run(this: runFunction) {
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null;
  } else {
    this.interval = setInterval(nextState, 1000 / 30);
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
for (let i = 0; i < 1; i++) {
  trees.push(new Tree(createDNK(), { x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 10 + 40) }));
}

population.tick(trees);
screen.drawScene();
