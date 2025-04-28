import ScreenOptions from "../../types/ScreenOptions.ts";
import Tree from "../Tree/Tree.ts";

class Screen {
  private static instanse?: Screen;
  private canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private _buffer?: CanvasRenderingContext2D;
  private constructor(idCanvas: string, public options: ScreenOptions) {
    if (Screen.instanse) {
      return Screen.instanse;
    }
    this.options = <ScreenOptions>options;
    this.canvas = <HTMLCanvasElement>document.getElementById(idCanvas);
    this._ctx = <CanvasRenderingContext2D>this.canvas?.getContext("2d");
    this.canvas.width = this.options.size.world.x * this.options.size.cell;
    this.canvas.height = this.options.size.world.y * this.options.size.cell;
    this._buffer = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
    this._buffer.canvas.width = this.options.size.world.x * this.options.size.cell;
    this._buffer.canvas.height = this.options.size.world.y * this.options.size.cell;
    this._buffer.fillStyle = "white";
    this._buffer.fillRect(

      0,
      0,
      this.options.size.world.x * this.options.size.cell,
      this.options.size.world.y * this.options.size.cell
    );
  }
  get ctx(): CanvasRenderingContext2D {
    return <CanvasRenderingContext2D>this._ctx;
  }
  get buffer(): CanvasRenderingContext2D {
    return <CanvasRenderingContext2D>this._buffer
  }
  static getInstanse(idCanvas?: string, options?: ScreenOptions): Screen {
    if (!Screen.instanse) {
      Screen.instanse = new Screen(<string>idCanvas, <ScreenOptions>options)
    }
    return Screen.instanse;
  }
  drawTrees(trees: Array<Tree>) {
    this.buffer.fillStyle = "white";
    this.buffer.fillRect(
      0,
      0,
      this.options.size.world.x * this.options.size.cell,
      this.options.size.world.y * this.options.size.cell
    );
    trees.forEach((tree) => {
      tree.draw();
    });
  }
  drawScene() {
    this.ctx.drawImage(this.buffer.canvas, 0, 0);
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
