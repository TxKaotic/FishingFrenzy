class Player extends GameObject {
  constructor(x, y) {
    super(x, y, 32, 48);
    this.name = 'Player';
    this.frame = 0;
    this.frameTime = 0;
  }
  update(dt) {
    this.frameTime += dt;
    if (this.frameTime > 0.5) { this.frameTime = 0; this.frame = (this.frame + 1) % 2; }
  }
  draw(ctx) {
    let x = Math.floor(this.x), y = Math.floor(this.y);
    // hat
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x - 4, y - 8, 40, 8);
    ctx.fillRect(x + 4, y - 16, 24, 8);
    // head
    ctx.fillStyle = '#fdbcb4';
    ctx.fillRect(x + 8, y, 16, 16);
    // eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 20, y + 4, 3, 3);
    // body
    ctx.fillStyle = '#2266aa';
    ctx.fillRect(x + 4, y + 16, 24, 20);
    // legs
    ctx.fillStyle = '#444';
    ctx.fillRect(x + 6, y + 36, 8, 12);
    ctx.fillRect(x + 18, y + 36, 8, 12);
    // rod
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(x + 28, y - 20, 3, 40);
    ctx.fillRect(x + 28, y - 20, 30, 3);
  }
}