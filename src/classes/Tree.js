import Cell from './Cell.js'

class Tree {
  energy = 0;
  dnk;
  buds = [];
  stem = [];
  screen = null;
  constructor(dnk, screen) {
    this.dnk = dnk;
    this.screen = screen;
    this.buds.push(new Cell(Math.floor(Math.random() * 100), 49, this.dnk[0]));
  }
  draw() {
    for (const cell of this.stem) {
      this.drawCell(cell.x, cell.y, 'green')
    }
    for (const cell of this.buds) {
      this.drawCell(cell.pos.x, cell.pos.y, '#ccc')
    }
  }
  drawCell(x, y, color) {
    let sizeCell = this.screen.options.size.cell;
    this.screen.ctx.fillStyle = color;
    this.screen.ctx.fillRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
    this.screen.ctx.fillStyle = 'black';
    this.screen.ctx.strokeRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
  }
  growth() {
    const newBuds = [];
    for (const cell of this.buds) {
      let createdCell = false;
      const newCells = cell.division();
      const sizeCell = this.screen.options.size.cell;
      for (const newCell of newCells) {
        let pixel = this.screen.ctx.getImageData(newCell.pos.x * sizeCell + sizeCell / 2, newCell.pos.y * sizeCell + sizeCell / 2, 1, 1).data;
        if (pixel[1] == 255 && this.dnk[newCell.gen]) {
          newBuds.push(new Cell(newCell.pos.x, newCell.pos.y, this.dnk[newCell.gen]));
          this.drawCell(newCell.pos.x, newCell.pos.y, "#ccc");
          this.drawCell(cell.pos.x, cell.pos.y, "green");
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