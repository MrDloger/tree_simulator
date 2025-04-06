class Cell {
  pos = null;
  gen = null;
  constructor(x, y, gen) {
    this.pos = {x, y};
    this.gen = gen;
  }
  division() {
    const duration = Math.floor(Math.random() * 4);
    return {pos: this.newPos(duration), gen: this.gen[duration]};
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