class Screen {
  canvas = null;
  ctx = null;
  options = {};
  constructor(idCanvas, option) {
    this.options = option
    console.log(this.options)
    this.canvas = document.getElementById(idCanvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.options.size.world.x * this.options.size.cell;
    this.canvas.height = this.options.size.world.y * this.options.size.cell;
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, this.options.size.world.x * this.options.size.cell, this.options.size.world.y * this.options.size.cell)
  }
}

export default Screen;