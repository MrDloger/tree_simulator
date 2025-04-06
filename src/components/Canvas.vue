<template>
  <div>
    <canvas ref="refCanvas"></canvas>
  </div>
  <div>
    <button @click="nextState">next</button>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import Tree from './tree.js';
const SIZE_WORLD = {x: 100, y: 50};
const SIZE_CELL = 10;
const refCanvas = useTemplateRef('refCanvas');
let ctx = null;
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
  console.log(tree)
}
onMounted(() => {
  ctx = refCanvas.value.getContext('2d');
  refCanvas.value.width = SIZE_WORLD.x * SIZE_CELL;
  refCanvas.value.height = SIZE_WORLD.y * SIZE_CELL;
  ctx.fillStyle = 'white'
  ctx.fillRect(0,0,SIZE_WORLD.x * SIZE_CELL, SIZE_WORLD.y * SIZE_CELL)  
  tree = new Tree(createDNK(), ctx);
  tree.draw();
  console.log(tree)
  tree.growth();
  tree.growth();
  tree.growth();
  tree.growth();
  tree.growth();
  tree.draw();
  console.log(tree)
})



</script>