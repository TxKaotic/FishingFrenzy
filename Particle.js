class Particle extends GameObject {
  constructor(x, y, color, size, vx, vy, life) {
    super(x, y, size, size);
    this.name = 'Particle';
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.gravity = 200;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.life -= dt;
    if (this.life <= 0) this.dead = true;
  }
  draw(ctx) {
    let a = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = a;
    ctx.fillStyle = this.color;
    let s = this.width * a;
    ctx.fillRect(Math.floor(this.x - s/2), Math.floor(this.y - s/2), Math.ceil(s), Math.ceil(s));
    ctx.globalAlpha = 1;
  }
}