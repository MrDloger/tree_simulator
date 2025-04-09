import Cell from './Cell.js'
const SIZE_CELL = 10;

class Tree {
  energy = 0;
  dnk;
  buds = [];
  stem = [];
  ctx = null;
  options = {};
  constructor(dnk, ctx, options) {
    this.dnk = dnk;
    this.ctx = ctx;
    this.options = options;
    this.buds.push(new Cell(50, 49, this.dnk[0]));
  }
  draw() {
    console.log(this)
    for (const cell of this.buds) {
      this.drawCell(cell.pos.x, cell.pos.y, 'white')
    }
    for (const cell of this.stem) {
      this.drawCell(cell.x, cell.y, 'green')
    }
  }
  drawCell(x, y, color) {
    let sizeCell = this.options.size.cell;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
  }
  growth() {
    let cellParam = [];
    const newBuds = [];
    for (const cell of this.buds) {
      let createdCell = false;
      const newCells = cell.division();
      for (const newCell of newCells) {
        let sizeCell = this.options.size.cell;
        let pixel = this.ctx.getImageData(newCell.pos.x * sizeCell + sizeCell / 2, newCell.pos.y * sizeCell + sizeCell / 2, 1, 1).data;
        if (pixel[1] == 255 && this.dnk[newCell.gen]) {
          newBuds.push(new Cell(newCell.pos.x, newCell.pos.y, this.dnk[newCell.gen]));
          createdCell = true;
        }
      }
      if (createdCell) {
        this.stem.push(cell.pos);
      } else {
        newBuds.push(cell);
      }
    }
    this.buds = newBuds;
  }
}

export default Tree;