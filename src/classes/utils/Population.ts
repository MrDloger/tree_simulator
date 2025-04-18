import Tree from "../Tree/Tree";
import Screen from "./Screen";
import Cell from "../Tree/Cell";

export class Population {
  levelEnergy: number = 10;
  public heightLevel: number = 0;
  constructor(private levels: number) {
    this.heightLevel = Screen.getInstanse().options.size.world.y / this.levels;
  }
  tick(trees: Array<Tree>): Array<Tree> {
    let newTrees: Array<Tree> = [];
    let deedIndex: Array<number> = [];
    trees.forEach((tree: Tree, index: number) => {
      if (this.addEnergy(tree) && tree.tickLive) {
        tree.tick();
      } else {
        newTrees = [...newTrees, ...tree.deed()];
        deedIndex.push(index);
      }
    });
    for (const index of deedIndex) {
      trees.splice(index, 1);
    }
    if (newTrees.length > 0) {
      return [...trees, ...newTrees];
    }
    return trees;
  }
  getEnergy(cell: Cell): number {
    const checkLevel: number = cell.checkEnergyLevel();
    let level: number = Math.round(cell.pos.y / this.heightLevel) + checkLevel;
    level = level > 10 ? 10 : level;
    if (level < 1) level = 1;
    return checkLevel <= 3 ? (this.levels - (level - 1)) * this.levelEnergy : 0;
  }
  addEnergy(tree: Tree): boolean {
    for (const stem of tree.stems) {
      tree.energy += this.getEnergy(stem);
    }
    tree.energy -= tree.stems.length * 11;
    if (tree.energy <= 0) {
      return false;
    } else {
      for (const seed of tree.seeds) {
        seed.addEnergy(this.getEnergy(seed));
      }
    }
    return true;
  }
}