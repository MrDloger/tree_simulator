import DnkType from "../types/DnkType.ts";
import type { Pos, NewCellOpt } from "../types/CellTypes.ts"

class Cell {
  public pos: { x: number, y: number };
  public genom: DnkType;
  constructor(x: number, y: number, genom: DnkType) {
    this.pos = { x, y };
    this.genom = genom;
  }
  division(): Array<NewCellOpt> {
    return [
      { pos: this.newPos(0), gen: this.genom[0] },
      { pos: this.newPos(1), gen: this.genom[1] },
      { pos: this.newPos(2), gen: this.genom[2] },
      { pos: this.newPos(3), gen: this.genom[3] },
    ];
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

export default Cell;