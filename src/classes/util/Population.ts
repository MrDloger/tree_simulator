import Tree from "../Tree/Tree";
import Screen from "./Screen";
import Cell from "../Tree/Cell";

export class Population {
  levelEnergy: number = 10;
  public heightLevel: number = 0;
  constructor(private levels: number) {
    this.heightLevel = Screen.getInstanse().options.size.world.y / this.levels;
  }
  getEnergy(cell: Cell): number {
    const checkLevel: number = cell.checkEnergyLevel();
    let level: number = Math.round(cell.pos.y / this.heightLevel) + checkLevel;
    level = level > 10 ? 10 : level;
    if (level < 1) level = 1;
    return checkLevel <= 3 ? (this.levels - (level - 1)) * this.levelEnergy : 0;
  }
  addEnergy(tree: Tree) {
    for (const stem of tree.stems) {
      tree.energy += this.getEnergy(stem);
    }
    for (const seed of tree.seeds) {
      seed.addEnergy(this.getEnergy(seed));
      console.log(seed.energy)
    }
  }
}