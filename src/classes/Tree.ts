import Cell from "./Cell.ts";
import DnkType from "../types/DnkType.ts";
import Screen from "./Screen.ts";

class Tree {
  energy: number = 0;
  dnk: Array<DnkType>;
  buds: Array<Cell> = [];
  stem: Array<{ x: number, y: number }> = [];
  screen: Screen;
  constructor(dnk: Array<DnkType>, screen: Screen) {
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
  drawCell(x: number, y: number, color: string) {
    let sizeCell = this.screen.options.size.cell;
    const ctx: CanvasRenderingContext2D = this.screen.getCtx();
    ctx.fillStyle = color;
    ctx.fillRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x * sizeCell, y * sizeCell, sizeCell, sizeCell);
  }
  growth() {
    const newBuds = [];
    for (const cell of this.buds) {
      let createdCell = false;
      const newCells = cell.division();
      const sizeCell = this.screen.options.size.cell;
      const ctx: CanvasRenderingContext2D = this.screen.getCtx();
      for (const newCell of newCells) {
        let pixel = ctx.getImageData(newCell.pos.x * sizeCell + sizeCell / 2, newCell.pos.y * sizeCell + sizeCell / 2, 1, 1).data;
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