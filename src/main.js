import './style.sass'

import Tree from './classes/tree.js';
const SIZE_WORLD = {x: 100, y: 50};
const SIZE_CELL = 10;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btnNextState = document.getElementById('nextState');
let tree = null;

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
btnNextState.addEventListener('click', nextState)

canvas.width = SIZE_WORLD.x * SIZE_CELL;
canvas.height = SIZE_WORLD.y * SIZE_CELL;
ctx.fillStyle = 'white'
ctx.fillRect(0,0,SIZE_WORLD.x * SIZE_CELL, SIZE_WORLD.y * SIZE_CELL)  
tree = new Tree(createDNK(), ctx, {
  size: {
    world: SIZE_WORLD,
    cell: SIZE_CELL
  }
});
tree.draw();
tree.growth();
tree.growth();
tree.growth();
tree.growth();
tree.growth();
tree.draw();
