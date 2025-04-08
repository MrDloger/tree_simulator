class Cell {
  pos = null;
  gen = null;
  constructor(x, y, gen) {
    this.pos = {x, y};
    this.gen = gen;
  }
  division() {
    return [
      {pos: this.newPos(0), gen: this.gen[0]},
      {pos: this.newPos(1), gen: this.gen[1]},
      {pos: this.newPos(2), gen: this.gen[2]},
      {pos: this.newPos(3), gen: this.gen[3]},
    ];
  }
  newPos(duration) {
    switch (duration) {
      case 0:
        return {x: this.pos.x - 1, y: this.pos.y};
      case 1:
        return {x: this.pos.x, y: this.pos.y - 1};
      case 2:
        return {x: this.pos.x + 1, y: this.pos.y};
      case 3:
        return {x: this.pos.x, y: this.pos.y + 1};
      default:
        break;
    }
  }
}

export default Cell;