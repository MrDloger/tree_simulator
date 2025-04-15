import type { Pos } from "../../types/CellTypes.ts";
import Screen from "../utils/Screen.ts";

abstract class Cell {
  public energy: number = 0;
  constructor(public pos: Pos) { }
  draw(color: string) {
    let screen: Screen = Screen.getInstanse();
    let sizeCell = screen.options.size.cell;
    const ctx: CanvasRenderingContext2D = screen.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(
      this.pos.x * sizeCell,
      this.pos.y * sizeCell,
      sizeCell,
      sizeCell
    );
  }
  addEnergy(energy: number) {
    this.energy += energy;
  }
  checkEnergyLevel(): number {
    let level: number = 0;
    let posY: number = this.pos.y - 1;
    while (posY > 0) {
      if (Screen.getInstanse().getPixelCell(this.pos.x, posY)[1] !== 255) {

        ++level
      }
      if (level > 3) break;
      --posY;
    }
    return level;
  }
}

export default Cell;
