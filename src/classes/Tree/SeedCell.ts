import { Genom } from "../../types/DnkType.ts";
import type { Pos, NewCellOpt } from "../../types/CellTypes.ts";
import Cell from "./Cell.ts";

class SeedCell extends Cell {
  constructor(public pos: Pos, public genom: Genom) {
    super(pos);
  }
  division(): Array<NewCellOpt> {
    const newCells: Array<NewCellOpt> = [];
    for (let i = 0; i < 4; i++) {
      newCells.push({ pos: this.newPos(i), gen: this.genom[i] });
    }
    return newCells;
  }
  newPos(duration: number): Pos {
    let pos: Pos = { x: 0, y: 0 };
    switch (duration) {
      case 0:
        pos = { x: this.pos.x - 1, y: this.pos.y };
        break;
      case 1:
        pos = { x: this.pos.x, y: this.pos.y - 1 };
        break;
      case 2:
        pos = { x: this.pos.x + 1, y: this.pos.y };
        break;
      case 3:
        pos = { x: this.pos.x, y: this.pos.y + 1 };
        break;
    }
    return pos;
  }
}

export default SeedCell;
