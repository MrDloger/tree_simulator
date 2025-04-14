import { DNK } from "../../types/DnkType.ts";
import Screen from "../util/Screen.ts";
import { Pos } from "../../types/CellTypes.ts";
import SeedCell from "./SeedCell.ts";
import StemCell from "./StemCell.ts";
import { randomRgbColor } from "../util/utils.ts";

class Tree {
  energy: number = 300;
  color: string;
  seeds: Array<SeedCell> = [];
  stems: Array<StemCell> = [];
  constructor(public dnk: DNK) {
    this.dnk = dnk;
    this.color = randomRgbColor();
    this.seeds.push(
      new SeedCell({ x: Math.floor(Math.random() * 100), y: 49 }, this.dnk[0])
    );
  }
  draw() {
    for (const cell of this.stems) {
      cell.draw(this.color);
    }
    for (const cell of this.seeds) {
      this.drawCell(cell.pos, "#ccc");
    }
  }
  drawCell(pos: Pos, color: string, borderColor: string = 'black') {
    console.log(borderColor);
    let sizeCell = Screen.getInstanse().options.size.cell;
    const ctx: CanvasRenderingContext2D = Screen.getInstanse().ctx;
    ctx.fillStyle = color;
    ctx.fillRect(pos.x * sizeCell, pos.y * sizeCell, sizeCell, sizeCell);
  }

  growth() {
    const newSeeds = [];
    for (const cell of this.seeds) {
      let createdCell = false;
      const newCells = cell.division();
      for (const newCell of newCells) {
        let pixel = Screen.getInstanse().getPixelCell(newCell.pos.x, newCell.pos.y);
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
  deed() {
    for (const seed of this.seeds) {
      this.drawCell(seed.pos, 'white', 'white');
    }
    for (const stem of this.stems) {
      this.drawCell(stem.pos, 'white', 'white');
    }
    this.stems = [];
  }
}

export default Tree;
