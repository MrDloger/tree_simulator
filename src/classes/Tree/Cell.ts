import type { Pos } from "../../types/CellTypes.ts";

abstract class Cell {
  constructor(public pos: Pos) {}
}

export default Cell;
