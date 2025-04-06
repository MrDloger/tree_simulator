import Cell from './cell.js'
const SIZE_CELL = 10;

class Tree {
  energy = 0;
  dnk;
  cells = [];
  ctx = null;
  constructor(dnk, ctx)
  {
    this.dnk = dnk;
    this.ctx = ctx;
    this.cells.push(new Cell(50, 49, this.dnk[0]));
  }
  draw() {
    for (const cell of this.cells) {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(cell.pos.x * SIZE_CELL, cell.pos.y * SIZE_CELL, SIZE_CELL, SIZE_CELL);
    }
  }
  run() {
    let cellParam = [];
    for (const cell of this.cells) {
      cellParam.push(cell.division());
    }
    for (const param of cellParam) {
      let pixel = this.ctx.getImageData(param.pos.x * SIZE_CELL + SIZE_CELL / 2, param.pos.y * SIZE_CELL + SIZE_CELL / 2, 1, 1).data;
      console.log(this.ctx.getImageData(param.pos.x * SIZE_CELL + SIZE_CELL / 2, param.pos.y * SIZE_CELL + SIZE_CELL / 2, 1, 1).data)
      if (pixel[1] == 255 && this.dnk[param.gen]) {
        console.log('newCell')
        this.cells.push(new Cell(param.pos.x, param.pos.y, this.dnk[param.gen]));
      }
    }
  }
}

export default Tree;