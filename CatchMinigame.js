class CatchMinigame extends GameObject {
  constructor(fish, rodPower, baitQuality) {
    super(640 - 150, 200, 300, 320);
    this.name = 'CatchMinigame';
    this.fish = fish;
    this.barH = 250;
    this.barY = 240;
    // green zone size based on rod and difficulty
    this.zoneSize = Math.max(40, 90 - fish.difficulty * 5 + rodPower * 10);
    this.zonePos = Math.random() * (this.barH - this.zoneSize);
    this.zoneSpeed = 50 + fish.difficulty * 15;
    this.zoneDir = 1;
    // cursor
    this.cursorPos = this.barH / 2;
    this.cursorVel = 0;
    this.cursorGravity = 340;
    this.clickPower = -220 - baitQuality * 25;
    // progress
    this.progress = 50;
    this.inZone = false;
    this.done = false;
    this.success = false;
    this.timer = 0;
    this.clicking = false;
  }
  click() { this.clicking = true; }
  release() { this.clicking = false; }
  update(dt) {
    if (this.done) return;
    this.timer += dt;
    // move zone with random direction changes
    this.zoneDirTimer = (this.zoneDirTimer || 0) + dt;
    if (this.zoneDirTimer > 0.6 + Math.random() * 1.2) {
      this.zoneDir *= -1;
      this.zoneDirTimer = 0;
    }
    this.zonePos += this.zoneSpeed * this.zoneDir * dt;
    if (this.zonePos <= 0 || this.zonePos + this.zoneSize >= this.barH) this.zoneDir *= -1;
    this.zonePos = Math.max(0, Math.min(this.barH - this.zoneSize, this.zonePos));
    // cursor physics
    if (this.clicking) this.cursorVel += this.clickPower * dt * 7;
    this.cursorVel += this.cursorGravity * dt;
    this.cursorVel *= 0.95;
    this.cursorPos += this.cursorVel * dt;
    this.cursorPos = Math.max(0, Math.min(this.barH, this.cursorPos));
    if (this.cursorPos <= 0 || this.cursorPos >= this.barH) this.cursorVel = 0;
    // check zone
    this.inZone = this.cursorPos >= this.zonePos && this.cursorPos <= this.zonePos + this.zoneSize;
    this.progress += (this.inZone ? 30 : -18) * dt;
    this.progress = Math.max(0, Math.min(100, this.progress));
    if (this.progress >= 100) { this.done = true; this.success = true; }
    if (this.progress <= 0) { this.done = true; this.success = false; }
  }
  draw(ctx) {
    let x = this.x, y = this.y;
    // backdrop
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(x - 10, y - 40, 320, 380);
    ctx.fillStyle = '#ffd700';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🎣 ' + this.fish.fishName + ' on the line!', x + 150, y - 15);
    ctx.fillText('Click/Tap to reel!', x + 150, y + 5);
    // bar background
    let bx = x + 100, by = this.barY;
    ctx.fillStyle = '#1a2a3a';
    ctx.fillRect(bx, by, 40, this.barH);
    // green zone
    ctx.fillStyle = 'rgba(0,200,0,0.4)';
    ctx.fillRect(bx, by + this.zonePos, 40, this.zoneSize);
    // cursor
    ctx.fillStyle = this.inZone ? '#0f0' : '#f00';
    ctx.fillRect(bx - 4, by + this.cursorPos - 4, 48, 8);
    // progress bar
    ctx.fillStyle = '#333';
    ctx.fillRect(x + 20, by, 20, this.barH);
    let ph = this.barH * (this.progress / 100);
    let pg = this.progress > 60 ? '#0c0' : this.progress > 30 ? '#cc0' : '#c00';
    ctx.fillStyle = pg;
    ctx.fillRect(x + 20, by + this.barH - ph, 20, ph);
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(Math.floor(this.progress) + '%', x + 30, by - 5);
    // fish preview
    this.fish.drawFish(ctx, x + 230, by + 60, 20);
    ctx.fillStyle = this.rarityColor();
    ctx.font = '14px monospace';
    ctx.fillText(this.fish.rarity.toUpperCase(), x + 230, by + 90);
    ctx.fillStyle = '#aaa';
    ctx.fillText(this.fish.weight + ' lbs', x + 230, by + 110);
    ctx.fillStyle = '#ffd700';
    ctx.fillText('$' + this.fish.value, x + 230, by + 130);
  }
  rarityColor() {
    let c = { common:'#aaa', uncommon:'#5f5', rare:'#55f', epic:'#c5f', legendary:'#fa0' };
    return c[this.fish.rarity] || '#fff';
  }
}