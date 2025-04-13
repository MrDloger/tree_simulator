import type { Pos } from "../../types/CellTypes.ts";
import Screen from "../util/Screen.ts";

abstract class Cell {
  constructor(public pos: Pos) {}
  draw(screen: Screen, color: string) {
    let sizeCell = screen.options.size.cell;
    const ctx: CanvasRenderingContext2D = screen.getCtx;
    ctx.fillStyle = color;
    ctx.fillRect(
      this.pos.x * sizeCell,
      this.pos.y * sizeCell,
      sizeCell,
      sizeCell
    );
    ctx.fillStyle = "black";
    ctx.strokeRect(
      this.pos.x * sizeCell,
      this.pos.y * sizeCell,
      sizeCell,
      sizeCell
    );
  }
}

export default Cell;
