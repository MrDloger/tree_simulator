import ScreenOptions from "../../types/ScreenOptions.ts";
import Tree from "../Tree/Tree.ts";

class Screen {
  private static instanse?: Screen;
  private canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private constructor(idCanvas: string, public options: ScreenOptions) {
    if (Screen.instanse) {
      return Screen.instanse;
    }
    this.options = <ScreenOptions>options;
    this.canvas = <HTMLCanvasElement>document.getElementById(idCanvas);
    this._ctx = <CanvasRenderingContext2D>this.canvas?.getContext("2d");
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
  get ctx(): CanvasRenderingContext2D {
    return <CanvasRenderingContext2D>this._ctx;
  }
  static getInstanse(idCanvas?: string, options?: ScreenOptions): Screen {
    if (!Screen.instanse) {
      Screen.instanse = new Screen(<string>idCanvas, <ScreenOptions>options)
    }
    return Screen.instanse;
  }
  drawScene(trees: Array<Tree>) {
    trees.forEach((tree) => {
      tree.draw();
    });
  }
  getPixelCell(x: number, y: number): Uint8ClampedArray<ArrayBufferLike> {
    const sizeCell = Screen.getInstanse().options.size.cell;
    return Screen.getInstanse().ctx.getImageData(
      x * sizeCell + sizeCell / 2,
      y * sizeCell + sizeCell / 2,
      1,
      1
    ).data
  }
}

export default Screen;
