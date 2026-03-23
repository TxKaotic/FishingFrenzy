class FishingLine extends GameObject {
  constructor(startX, startY) {
    super(startX, startY, 2, 2);
    this.name = 'FishingLine';
    this.endX = startX;
    this.endY = startY;
    this.targetY = 500;
    this.casting = false;
    this.casted = false;
    this.reeling = false;
    this.bobTime = 0;
    this.bobY = 0;
  }
  cast(tx, ty) {
    this.endX = tx;
    this.targetY = ty;
    this.endY = this.y;
    this.casting = true;
    this.casted = false;
    this.reeling = false;
  }
  reel() {
    this.reeling = true;
  }
  update(dt) {
    if (this.casting && !this.casted) {
      this.endY += 600 * dt;
      if (this.endY >= this.targetY) {
        this.endY = this.targetY;
        this.casted = true;
      }
    }
    if (this.casted && !this.reeling) {
      this.bobTime += dt;
      this.bobY = Math.sin(this.bobTime * 3) * 3;
    }
    if (this.reeling) {
      this.endY -= 400 * dt;
      if (this.endY <= this.y) { this.dead = true; }
    }
  }
  draw(ctx) {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.endX, this.endY + this.bobY);
    ctx.stroke();
    // bobber
    if (this.casted && !this.reeling) {
      let by = this.endY + this.bobY;
      ctx.fillStyle = '#e22';
      ctx.fillRect(this.endX - 4, by - 4, 8, 8);
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.endX - 4, by - 4, 8, 4);
    }
  }
}