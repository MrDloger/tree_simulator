import { DNK } from "../../types/DnkType.ts";
import Screen from "../util/Screen.ts";
import { Pos } from "../../types/CellTypes.ts";
import SeedCell from "./SeedCell.ts";
import StemCell from "./StemCell.ts";
import { randomRgbColor } from "../util/utils.ts";

class Tree {
  energy: number = 0;
  color: string;
  dnk: DNK;
  seeds: Array<SeedCell> = [];
  stems: Array<StemCell> = [];
  screen: Screen;
  constructor(dnk: DNK, screen: Screen) {
    this.dnk = dnk;
    this.screen = screen;
    this.color = randomRgbColor();
    this.seeds.push(
      new SeedCell({ x: Math.floor(Math.random() * 100), y: 49 }, this.dnk[0])
    );
  }
  draw() {
    for (const cell of this.stems) {
      cell.draw(this.screen, this.color);
    }
    for (const cell of this.seeds) {
      this.drawCell(cell.pos, "#ccc");
    }
  }
  drawCell(pos: Pos, color: string) {
    let sizeCell = this.screen.options.size.cell;
    const ctx: CanvasRenderingContext2D = this.screen.getCtx;
    ctx.fillStyle = color;
    ctx.fillRect(pos.x * sizeCell, pos.y * sizeCell, sizeCell, sizeCell);
    ctx.fillStyle = "black";
    ctx.strokeRect(pos.x * sizeCell, pos.y * sizeCell, sizeCell, sizeCell);
  }
  growth() {
    const newSeeds = [];
    for (const cell of this.seeds) {
      let createdCell = false;
      const newCells = cell.division();
      const sizeCell = this.screen.options.size.cell;
      const ctx: CanvasRenderingContext2D = this.screen.getCtx;
      for (const newCell of newCells) {
        let pixel = ctx.getImageData(
          newCell.pos.x * sizeCell + sizeCell / 2,
          newCell.pos.y * sizeCell + sizeCell / 2,
          1,
          1
        ).data;
        if (pixel[1] == 255 && this.dnk[newCell.gen]) {
          newSeeds.push(new SeedCell(newCell.pos, this.dnk[newCell.gen]));
          this.drawCell(newCell.pos, "#ccc");
          this.drawCell(cell.pos, "green");
          createdCell = true;
        }
      }
      if (createdCell) {
        this.stems.push(new StemCell(cell.pos));
      } else {
        newSeeds.push(cell);
      }
    }
    this.seeds = newSeeds;
  }
}

export default Tree;
