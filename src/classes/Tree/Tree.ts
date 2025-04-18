import { DNK } from "../../types/DnkType.ts";
import Screen from "../utils/Screen.ts";
import { Pos } from "../../types/CellTypes.ts";
import SeedCell from "./SeedCell.ts";
import StemCell from "./StemCell.ts";
import { randomRgbColor } from "../utils/utils.ts";

class Tree {
  energy: number = 300;
  color: string;
  seeds: Array<SeedCell> = [];
  stems: Array<StemCell> = [];
  tickLive: number = 100;
  constructor(public dnk: DNK, pos: Pos) {
    this.dnk = dnk;
    this.color = randomRgbColor();
    this.seeds.push(
      new SeedCell(pos, this.dnk[0])
    );
  }
  draw() {
    for (const cell of this.stems) {
      cell.draw(this.color);
    }
    for (const cell of this.seeds) {
      cell.draw("#ccc");
    }
  }
  dicrementTickLive() {
    --this.tickLive;
  }
  drawCell(pos: Pos, color: string) {
    let sizeCell = Screen.getInstanse().options.size.cell;
    const buffer: CanvasRenderingContext2D = Screen.getInstanse().buffer;
    buffer.fillStyle = color;
    buffer.fillRect(pos.x * sizeCell, pos.y * sizeCell, sizeCell, sizeCell);
  }
  tick() {
    this.growth();
    this.dicrementTickLive();
    this.draw();
  }
  down() {
    if (Screen.getInstanse().getPixelCell(this.seeds[0].pos.x, this.seeds[0].pos.y + 1)[1] == 255) {
      this.seeds[0].draw('white');
      this.seeds[0].pos.y += 1;
      this.draw();
    }
  }
  growth() {
    const newSeeds = [];
    if (this.seeds.length === 1 && this.seeds[0].pos.y < 49) {
      this.down()
    } else {
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
  }
  deed(): Array<Tree> {
    const newTrees: Array<Tree> = []
    for (const seed of this.seeds) {
      seed.draw('white');
      newTrees.push(new Tree(this.dnk, seed.pos))
    }
    for (const stem of this.stems) {
      stem.draw('white')
    }
    this.stems = [];
    return newTrees;
  }
}

export default Tree;
