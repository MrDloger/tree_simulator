import Cell from './cell.js'
const SIZE_CELL = 10;

class Tree {
  energy = 0;
  dnk;
  buds = [];
  stem = [];
  ctx = null;
  constructor(dnk, ctx)
  {
    this.dnk = dnk;
    this.ctx = ctx;
    this.buds.push(new Cell(50, 49, this.dnk[0]));
  }
  draw() {
    console.log(this.buds)
    for (const cell of this.buds) {
      this.drawCell(cell.pos.x, cell.pos.y, 'white')
    }
    for (const cell of this.stem) {
      this.drawCell(cell.x, cell.y, 'green')
    }
  }
  drawCell(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * SIZE_CELL, y * SIZE_CELL, SIZE_CELL, SIZE_CELL);
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(x * SIZE_CELL, y * SIZE_CELL, SIZE_CELL, SIZE_CELL);
  }
  growth() {
    let cellParam = [];
    const newBuds = [];
    // const budsIndex = {}
    for (const cell of this.buds) {
      let createdCell = false;
      const param = cell.division();
      console.log(param)
      let pixel = this.ctx.getImageData(param.pos.x * SIZE_CELL + SIZE_CELL / 2, param.pos.y * SIZE_CELL + SIZE_CELL / 2, 1, 1).data;
      console.log(pixel)
      if (pixel[1] == 255 && this.dnk[param.gen]) {
        console.log('new cell')
        newBuds.push(new Cell(param.pos.x, param.pos.y, this.dnk[param.gen]));
        createdCell = true;
      }
      if (createdCell) {
        this.stem.push(cell.pos);
      } else {
        newBuds.push(cell);
      }
    }
    // for (const param of cellParam) {
      
    // }
    // this.buds = this.buds.filter((item, index) => budsIndex[index]);
    this.buds = newBuds;
  }
}

export default Tree;