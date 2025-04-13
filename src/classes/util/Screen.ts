import ScreenOptions from "../../types/ScreenOptions.ts";
import Tree from "../Tree/Tree.ts";

class Screen {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public options: ScreenOptions;
  constructor(idCanvas: string, option: ScreenOptions) {
    this.options = option;
    this.canvas = <HTMLCanvasElement>document.getElementById(idCanvas);
    this.ctx = <CanvasRenderingContext2D>this.canvas?.getContext("2d");
    this.canvas.width = this.options.size.world.x * this.options.size.cell;
    this.canvas.height = this.options.size.world.y * this.options.size.cell;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      0,
      this.options.size.world.x * this.options.size.cell,
      this.options.size.world.y * this.options.size.cell
    );
  }
  get getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }
  drawScene(trees: Array<Tree>) {
    trees.forEach((tree) => {
      tree.draw();
    });
  }
}

export default Screen;
