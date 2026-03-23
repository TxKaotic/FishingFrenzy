class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.entities = [];
    this.particles = [];
    this.scrollX = 0;
    this.scrollY = 0;
    this.lastTime = 0;
    this.money = 0;
    this.inventory = [];
    this.state = 'idle';
    this.waitTimer = 0;
    this.biteCooldown = 0;
    this.notification = null;
    this.notifTimer = 0;
    // locations
    this.locations = [
      { id: 'pond', name: '🌿 Peaceful Pond', cost: 0, unlocked: true,
        sky1: '#1a1a4e', sky2: '#4a6fa5', sky3: '#87ceeb',
        water1: '#2266aa', water2: '#0a2a4a',
        ground: '#3a5a2a', groundDark: '#2a4a1a',
        trees: '#1a4a1a', dockColor: '#8b6914',
        desc: 'A calm pond for beginners' },
      { id: 'river', name: '🏞️ Rushing River', cost: 200, unlocked: false,
        sky1: '#1a2a4e', sky2: '#3a7fa5', sky3: '#6abfdb',
        water1: '#1a7788', water2: '#0a3a4a',
        ground: '#4a6a3a', groundDark: '#3a5a2a',
        trees: '#2a5a2a', dockColor: '#7a5a10',
        desc: 'Fast waters with bigger fish' },
      { id: 'ocean', name: '🌊 Open Ocean', cost: 500, unlocked: false,
        sky1: '#0a1a3e', sky2: '#2a5a95', sky3: '#5aaddb',
        water1: '#1155aa', water2: '#051a3a',
        ground: '#8a8a6a', groundDark: '#6a6a4a',
        trees: '#3a6a3a', dockColor: '#6a4a0a',
        desc: 'Deep waters, rare catches' },
      { id: 'swamp', name: '🐊 Murky Swamp', cost: 800, unlocked: false,
        sky1: '#1a2a1a', sky2: '#3a5a2a', sky3: '#5a7a3a',
        water1: '#3a5a2a', water2: '#1a2a0a',
        ground: '#4a3a1a', groundDark: '#3a2a0a',
        trees: '#2a4a1a', dockColor: '#5a4a1a',
        desc: 'Foggy waters, strange creatures' },
      { id: 'arctic', name: '🧊 Frozen Arctic', cost: 2500, unlocked: false,
        sky1: '#1a2a4e', sky2: '#5a8abb', sky3: '#aaddee',
        water1: '#4488aa', water2: '#1a3a5a',
        ground: '#ccddee', groundDark: '#aabbcc',
        trees: '#8899aa', dockColor: '#6a7a8a',
        desc: 'Icy waters, frozen treasures' },
      { id: 'volcano', name: '🌋 Volcanic Rift', cost: 4000, unlocked: false,
        sky1: '#2a0a0a', sky2: '#5a1a0a', sky3: '#8a3a1a',
        water1: '#883311', water2: '#441100',
        ground: '#2a2a2a', groundDark: '#1a1a1a',
        trees: '#3a1a0a', dockColor: '#5a3a1a',
        desc: 'Lava meets the sea' },
      { id: 'deepsea', name: '🦑 Deep Sea Trench', cost: 6000, unlocked: false,
        sky1: '#050510', sky2: '#0a1030', sky3: '#152050',
        water1: '#0a1533', water2: '#020510',
        ground: '#2a2a3a', groundDark: '#1a1a2a',
        trees: '#1a2a1a', dockColor: '#4a3a1a',
        desc: 'Darkness hides monsters' },
      { id: 'mystic', name: '✨ Mystic Lake', cost: 10000, unlocked: false,
        sky1: '#1a0a3e', sky2: '#4a2a8a', sky3: '#8a5acc',
        water1: '#3322aa', water2: '#110a4a',
        ground: '#3a2a5a', groundDark: '#2a1a4a',
        trees: '#2a3a4a', dockColor: '#8a6acc',
        desc: 'Legendary fish await' },
      { id: 'coral', name: '🪸 Coral Reef', cost: 15000, unlocked: false,
        sky1: '#0a2a4e', sky2: '#2a6a9a', sky3: '#5ac8eb',
        water1: '#1a88aa', water2: '#0a4a6a',
        ground: '#aa8866', groundDark: '#886644',
        trees: '#4a8a4a', dockColor: '#aa8844',
        desc: 'Tropical paradise, colorful catches' },
      { id: 'abyss', name: '🕳️ The Abyss', cost: 22000, unlocked: false,
        sky1: '#020208', sky2: '#060618', sky3: '#0a0a2a',
        water1: '#050510', water2: '#010105',
        ground: '#1a1a2a', groundDark: '#0a0a1a',
        trees: '#0a0a1a', dockColor: '#3a3a4a',
        desc: 'Bottomless darkness, alien life' },
      { id: 'paradise', name: '🏝️ Lost Paradise', cost: 35000, unlocked: false,
        sky1: '#1a3a5e', sky2: '#4a8abb', sky3: '#88ddff',
        water1: '#22aacc', water2: '#0a6688',
        ground: '#55aa44', groundDark: '#448833',
        trees: '#338822', dockColor: '#bb9944',
        desc: 'A hidden island with mythical fish' },
      { id: 'storm', name: '⛈️ Eternal Storm', cost: 50000, unlocked: false,
        sky1: '#1a1a2a', sky2: '#2a2a3a', sky3: '#3a3a5a',
        water1: '#2a3a5a', water2: '#0a1a2a',
        ground: '#3a3a3a', groundDark: '#2a2a2a',
        trees: '#2a3a2a', dockColor: '#5a5a5a',
        desc: 'Lightning-charged waters, electric catches' },
      { id: 'void', name: '🌀 The Void', cost: 75000, unlocked: false,
        sky1: '#0a000a', sky2: '#1a0a2a', sky3: '#2a1a4a',
        water1: '#1a0a3a', water2: '#0a0018',
        ground: '#2a1a3a', groundDark: '#1a0a2a',
        trees: '#1a1a2a', dockColor: '#4a2a6a',
        desc: 'Beyond reality, cosmic fish of legend' }
    ];
    this.currentLocation = 0;
    this.transitioning = false;
    this.transitionAlpha = 0;
    this.transitionTarget = -1;
    // upgrades
    this.rodLevel = 0;
    this.selectedBait = 0;
    this.luckLevel = 0;
    this.rods = [
      { name: 'Basic Rod', power: 1, cost: 0 },
      { name: 'Fiberglass Rod', power: 2, cost: 100 },
      { name: 'Carbon Rod', power: 3, cost: 300 },
      { name: 'Titanium Rod', power: 4, cost: 800 },
      { name: 'Legendary Rod', power: 6, cost: 2000 },
      { name: 'Dragon Scale Rod', power: 8, cost: 5000 },
      { name: 'Poseidon Trident', power: 10, cost: 12000 },
      { name: 'Cosmic Rod', power: 13, cost: 25000 }
    ];
    this.baits = [
      { name: 'Worm', quality: 1, cost: 0, bulk: Infinity, desc: 'Free & infinite, basic bait' },
      { name: 'Minnow', quality: 2, cost: 5, bulk: 10, desc: 'Faster bites, slightly better fish' },
      { name: 'Shrimp', quality: 3, cost: 12, bulk: 10, desc: 'Good bites, bigger catch zone' },
      { name: 'Golden Lure', quality: 5, cost: 30, bulk: 5, desc: 'Great bites, rare fish more likely' },
      { name: 'Magic Bait', quality: 7, cost: 75, bulk: 5, desc: 'Best bait, legendary chances up' },
      { name: 'Dragon Fly', quality: 9, cost: 150, bulk: 5, desc: 'Epic bait, attracts rare monsters' },
      { name: 'Phoenix Feather', quality: 12, cost: 300, bulk: 3, desc: 'Mythic bait, legendary fish flock' },
      { name: 'Stardust Lure', quality: 15, cost: 500, bulk: 3, desc: 'Cosmic bait, best in the universe' }
    ];
    this.baitStock = [Infinity, 0, 0, 0, 0, 0, 0, 0];
    this.lucks = [
      { name: 'No Charm', bonus: 0, cost: 0 },
      { name: 'Lucky Coin', bonus: 1, cost: 150 },
      { name: 'Rabbit Foot', bonus: 2, cost: 400 },
      { name: 'Four Leaf Clover', bonus: 4, cost: 1000 },
      { name: 'Golden Horseshoe', bonus: 7, cost: 3000 },
      { name: 'Enchanted Pearl', bonus: 10, cost: 7000 },
      { name: 'Dragon Eye Gem', bonus: 14, cost: 15000 },
      { name: 'Star Fragment', bonus: 20, cost: 15000 }
    ];
    this.waterTime = 0;
    this.mapOpen = false;
    this.mapLocations = [
      { x: 120, y: 380, icon: '🌿' },
      { x: 250, y: 320, icon: '🏞️' },
      { x: 420, y: 280, icon: '🌊' },
      { x: 560, y: 350, icon: '🐊' },
      { x: 720, y: 250, icon: '🧊' },
      { x: 880, y: 310, icon: '🌋' },
      { x: 1020, y: 230, icon: '🦑' },
      { x: 1140, y: 300, icon: '✨' },
      { x: 160, y: 480, icon: '🪸' },
      { x: 340, y: 520, icon: '🕳️' },
      { x: 540, y: 490, icon: '🏝️' },
      { x: 740, y: 530, icon: '⛈️' },
      { x: 940, y: 480, icon: '🌀' }
    ];
    this.mapHover = -1;
    // random events
    this.eventTimer = 15 + Math.random() * 25;
    this.bottleEvent = null; // { x, y, timer }
    this.luckBoostTimer = 0;
    this.luckBoostAmount = 10;
    this.nessieEvent = null; // { timer, phase, x }
    this.goldSparkles = [];
    this.schoolingEvent = null; // { timer, x, y }
    this.rainEvent = null; // { timer, drops: [] }
    this.clouds = [];
    for (let i = 0; i < 5; i++) this.clouds.push({ x: Math.random() * 1400, y: 20 + Math.random() * 80, w: 60 + Math.random() * 80, s: 10 + Math.random() * 20 });
    // main menu & save system
    this.menuOpen = true;
    this.currentSlot = null;
    this.saveSlotPreviews = [null, null, null];
    this.menuTime = 0;
    this.newGamePicking = false;
    this.loadSavePreviews();
    this.setup();
    this.setupInput();
    this.setupUI();
  }

  setup() {
    this.player = new Player(200, 280);
    this.entities.push(this.player);
    this.line = null;
    this.minigame = null;
  }

  setupInput() {
    this.canvas.addEventListener('mousedown', (e) => this.onDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.onUp(e));
    this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); this.onDown(e.touches[0]); });
    this.canvas.addEventListener('touchend', (e) => { e.preventDefault(); this.onUp(e); });
  }

  getCanvasPos(e) {
    let r = this.canvas.getBoundingClientRect();
    let sx = this.canvas.width / r.width;
    let sy = this.canvas.height / r.height;
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  }

  onDown(e) {
    let p = this.getCanvasPos(e);
    // main menu handling
    if (this.menuOpen) {
      this.handleMenuClick(p);
      return;
    }
    // check schooling event click - tap whirlpool for free random bait
    if (this.schoolingEvent) {
      let sx = this.schoolingEvent.x, sy = this.schoolingEvent.y;
      if (p.x > sx - 50 && p.x < sx + 50 && p.y > sy - 50 && p.y < sy + 50) {
        // give 1 random bait (not worm)
        let baitIdx = 1 + Math.floor(Math.random() * (this.baits.length - 1));
        this.baitStock[baitIdx]++;
        let baitName = this.baits[baitIdx].name;
        this.notify('🌀 Got 1x ' + baitName + ' from the whirlpool!');
        this.spawnParticles(sx, sy, 10, ['#4af','#48f','#0af','#fff','#ffd700']);
        return;
      }
    }
    // check bottle event click FIRST (works during any state)
    if (this.bottleEvent) {
      let bx = this.bottleEvent.x, by = this.bottleEvent.y;
      if (p.x > bx - 30 && p.x < bx + 30 && p.y > by - 30 && p.y < by + 30) {
        this.luckBoostTimer = 20;
        this.bottleEvent = null;
        this.notify('✨ MEGA LUCK BOOST! Rare fish x3 for 20 seconds!');
        this.spawnParticles(640, 360, 60, ['#ffd700','#ff0','#fa0','#fff']);
        this.spawnParticles(200, 200, 30, ['#ffd700','#ff0','#fa0']);
        this.spawnParticles(1000, 300, 30, ['#ffd700','#ff0','#fa0']);
        return;
      }
    }
    if (this.state === 'minigame' && this.minigame) {
      this.minigame.click();
      return;
    }
    if (this.transitioning) return;
    // map click handling
    if (this.mapOpen) {
      this.handleMapClick(p);
      return;
    }
    if (this.state !== 'idle') return;
    // check buttons
    if (p.x > 1050 && p.x < 1230 && p.y > 20 && p.y < 60) { this.openShop(); return; }
    if (p.x > 1050 && p.x < 1230 && p.y > 70 && p.y < 110) { this.openMarket(); return; }
    // map button
    if (p.x > 1050 && p.x < 1230 && p.y > 120 && p.y < 160) { this.mapOpen = true; this.state = 'map'; return; }
    // menu button
    if (p.x > 1050 && p.x < 1230 && p.y > 170 && p.y < 210) { this.saveGame(); this.menuOpen = true; this.state = 'idle'; this.loadSavePreviews(); return; }
    // cast
    this.castLine();
  }

  onUp(e) {
    if (this.state === 'minigame' && this.minigame) this.minigame.release();
  }

  travelTo(index) {
    if (index < 0 || index >= this.locations.length) return;
    let loc = this.locations[index];
    if (!loc.unlocked) {
      if (this.money >= loc.cost) {
        this.money -= loc.cost;
        loc.unlocked = true;
        this.notify('🔓 Unlocked ' + loc.name + '!');
      } else {
        this.notify('🔒 Need $' + loc.cost + ' to unlock ' + loc.name);
        return;
      }
    }
    this.transitioning = true;
    this.transitionTarget = index;
    this.transitionAlpha = 0;
  }

  castLine() {
    // consume bait
    let bi = this.selectedBait;
    if (bi > 0 && this.baitStock[bi] <= 0) {
      this.selectedBait = 0;
      bi = 0;
      this.notify('⚠️ Out of bait! Using worms.');
    }
    if (bi > 0 && !this.rainEvent) this.baitStock[bi]--;
    this.state = 'casting';
    this.line = new FishingLine(258, 264);
    this.line.cast(500 + Math.random() * 300, 450 + Math.random() * 100);
    this.entities.push(this.line);
  }

  setupUI() {
    document.getElementById('close-shop').addEventListener('click', () => this.closeShop());
    document.getElementById('close-market').addEventListener('click', () => this.closeMarket());
    document.getElementById('sell-all').addEventListener('click', () => this.sellAll());
  }

  openShop() {
    this.state = 'shop';
    let html = '';
    html += '<h3 style="color:#adf">🎣 Rods</h3>';
    this.rods.forEach((r, i) => {
      let owned = i <= this.rodLevel;
      let equipped = i === this.rodLevel;
      html += `<div class="shop-item ${owned?'item-owned':''}"><span>${r.name} (Power: ${r.power})</span>`;
      if (equipped) html += '<span style="color:#4f4">Equipped</span>';
      else if (owned) html += '<span style="color:#aaa">Owned</span>';
      else html += `<button class="btn" onclick="game.buyRod(${i})">$${r.cost}</button>`;
      html += '</div>';
    });
    html += '<h3 style="color:#fda">🪱 Bait (consumed each cast)</h3>';
    this.baits.forEach((b, i) => {
      let stock = i === 0 ? '∞' : this.baitStock[i];
      let sel = i === this.selectedBait;
      html += `<div class="shop-item ${sel?'item-owned':''}"><span>${b.name} (Qty: ${b.quality}) [${stock}]</span>`;
      html += `<span style="color:#aaa;font-size:11px">${b.desc}</span>`;
      if (i === 0) {
        html += sel ? '<span style="color:#4f4">Selected</span>' : `<button class="btn" onclick="game.selectBait(${i})">Use</button>`;
      } else {
        html += `<button class="btn" onclick="game.buyBait(${i})">Buy ${b.bulk} for $${b.cost * b.bulk}</button> `;
        if (this.baitStock[i] > 0) html += sel ? '<span style="color:#4f4">Selected</span>' : `<button class="btn" onclick="game.selectBait(${i})">Use</button>`;
      }
      html += '</div>';
    });
    html += '<h3 style="color:#faf">🍀 Luck Charms</h3>';
    this.lucks.forEach((l, i) => {
      let owned = i <= this.luckLevel;
      let equipped = i === this.luckLevel;
      html += `<div class="shop-item ${owned?'item-owned':''}"><span>${l.name} (Luck: +${l.bonus})</span>`;
      if (equipped) html += '<span style="color:#4f4">Equipped</span>';
      else if (owned) html += '<span style="color:#aaa">Owned</span>';
      else html += `<button class="btn" onclick="game.buyLuck(${i})">$${l.cost}</button>`;
      html += '</div>';
    });
    document.getElementById('shop-items').innerHTML = html;
    document.getElementById('shop-panel').classList.remove('hidden');
  }

  buyRod(i) { let r = this.rods[i]; if (i === this.rodLevel + 1 && this.money >= r.cost) { this.money -= r.cost; this.rodLevel = i; this.openShop(); this.notify('Bought ' + r.name + '!'); } else this.notify('Cannot buy!'); }
  selectBait(i) { if (i === 0 || this.baitStock[i] > 0) { this.selectedBait = i; this.openShop(); this.notify('Now using ' + this.baits[i].name + '!'); } }
  buyBait(i) { let b = this.baits[i]; let total = b.cost * b.bulk; if (this.money >= total) { this.money -= total; this.baitStock[i] += b.bulk; this.selectedBait = i; this.openShop(); this.notify('Bought ' + b.bulk + 'x ' + b.name + '!'); } else this.notify('Need $' + total + '!'); }
  buyLuck(i) { let l = this.lucks[i]; if (i === this.luckLevel + 1 && this.money >= l.cost) { this.money -= l.cost; this.luckLevel = i; this.openShop(); this.notify('Bought ' + l.name + '!'); } else this.notify('Cannot buy!'); }

  closeShop() { document.getElementById('shop-panel').classList.add('hidden'); this.state = 'idle'; }

  openMarket() {
    this.state = 'market';
    let html = '';
    if (this.inventory.length === 0) html = '<p style="text-align:center;color:#aaa">No fish to sell!</p>';
    else this.inventory.forEach((f, i) => {
      html += `<div class="inv-item"><span class="rarity-${f.rarity}">${f.fishName}</span><span>${f.weight}lbs - $${f.value}</span></div>`;
    });
    document.getElementById('inventory-items').innerHTML = html;
    document.getElementById('market-panel').classList.remove('hidden');
  }

  sellAll() {
    let total = this.inventory.reduce((s, f) => s + f.value, 0);
    if (total > 0) {
      this.money += total;
      this.notify('Sold all fish for $' + total + '!');
      this.inventory = [];
      this.openMarket();
      this.saveGame();
    }
  }

  closeMarket() { document.getElementById('market-panel').classList.add('hidden'); this.state = 'idle'; }

  handleMapClick(p) {
    // close button (top-right of map)
    if (p.x > 1140 && p.x < 1180 && p.y > 55 && p.y < 85) {
      this.mapOpen = false;
      this.state = 'idle';
      return;
    }
    // check location clicks
    for (let i = 0; i < this.locations.length; i++) {
      let ml = this.mapLocations[i];
      let dx = p.x - ml.x, dy = p.y - ml.y;
      if (dx * dx + dy * dy < 900) { // radius 30
        if (i === this.currentLocation) {
          this.mapOpen = false;
          this.state = 'idle';
          return;
        }
        // must unlock in order
        let canTravel = this.locations[i].unlocked;
        let canUnlock = !canTravel && i > 0 && this.locations[i - 1].unlocked;
        if (canTravel) {
          this.mapOpen = false;
          this.travelTo(i);
        } else if (canUnlock) {
          if (this.money >= this.locations[i].cost) {
            this.money -= this.locations[i].cost;
            this.locations[i].unlocked = true;
            this.notify('\ud83d\udd13 Unlocked ' + this.locations[i].name + '!');
            this.spawnParticles(ml.x, ml.y, 20, ['#ffd700','#ff0','#fff']);
            this.mapOpen = false;
            this.travelTo(i);
          } else {
            this.notify('\ud83d\udd12 Need $' + this.locations[i].cost + ' to unlock!');
          }
        } else {
          this.notify('\ud83d\udd12 Unlock previous locations first!');
        }
        return;
      }
    }
  }

  drawMap(ctx, W, H) {
    // darken background
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, W, H);
    // map frame
    let mx = 60, my = 40, mw = W - 120, mh = H - 80;
    // parchment background
    let pGrad = ctx.createLinearGradient(mx, my, mx, my + mh);
    pGrad.addColorStop(0, '#3a2a15');
    pGrad.addColorStop(0.3, '#2a1a0a');
    pGrad.addColorStop(1, '#1a1008');
    ctx.fillStyle = pGrad;
    ctx.fillRect(mx, my, mw, mh);
    // border
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.strokeRect(mx, my, mw, mh);
    ctx.strokeStyle = '#8b6914';
    ctx.lineWidth = 2;
    ctx.strokeRect(mx + 6, my + 6, mw - 12, mh - 12);
    // title
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WORLD MAP', W / 2, my + 35);
    // close button
    ctx.fillStyle = '#aa2222';
    ctx.fillRect(1140, 55, 36, 28);
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2;
    ctx.strokeRect(1140, 55, 36, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('X', 1158, 75);
    // draw pixel terrain on map
    // water base
    ctx.fillStyle = '#0a2a4a';
    ctx.fillRect(mx + 10, my + 60, mw - 20, mh - 70);
    // some land masses (pixel art style)
    ctx.fillStyle = '#2a4a1a';
    // main continent
    ctx.fillRect(80, 330, 200, 120);
    ctx.fillRect(120, 280, 160, 60);
    ctx.fillRect(200, 240, 280, 80);
    ctx.fillRect(380, 210, 240, 100);
    ctx.fillRect(520, 300, 120, 100);
    // northern land
    ctx.fillRect(650, 190, 200, 80);
    ctx.fillRect(700, 170, 120, 40);
    // eastern islands
    ctx.fillRect(840, 260, 180, 100);
    ctx.fillRect(960, 180, 200, 80);
    ctx.fillRect(1020, 260, 160, 80);
    // snow caps on arctic area
    ctx.fillStyle = '#ccddee';
    ctx.fillRect(680, 200, 100, 20);
    ctx.fillRect(700, 180, 60, 20);
    // volcano terrain
    ctx.fillStyle = '#4a2a1a';
    ctx.fillRect(850, 270, 80, 40);
    ctx.fillStyle = '#ff4400';
    ctx.fillRect(870, 265, 12, 8);
    ctx.fillRect(885, 262, 8, 6);
    // swamp detail
    ctx.fillStyle = '#3a5a1a';
    ctx.fillRect(520, 320, 80, 40);
    ctx.fillRect(540, 310, 60, 20);
    // deep sea trench
    ctx.fillStyle = '#050515';
    ctx.fillRect(980, 210, 80, 30);
    ctx.fillRect(990, 200, 60, 15);
    // mystic glow
    ctx.fillStyle = 'rgba(150,100,255,0.3)';
    ctx.fillRect(1100, 270, 80, 60);
    // southern islands (new locations)
    ctx.fillStyle = '#aa8866';
    ctx.fillRect(120, 450, 100, 60);
    ctx.fillRect(140, 440, 60, 20);
    // abyss trench
    ctx.fillStyle = '#050510';
    ctx.fillRect(300, 490, 100, 50);
    ctx.fillRect(320, 480, 60, 15);
    // paradise island
    ctx.fillStyle = '#55aa44';
    ctx.fillRect(500, 460, 100, 55);
    ctx.fillRect(520, 445, 60, 20);
    ctx.fillStyle = '#ffdd44';
    ctx.fillRect(510, 510, 80, 8);
    // storm clouds area
    ctx.fillStyle = '#3a3a5a';
    ctx.fillRect(700, 500, 100, 50);
    ctx.fillRect(710, 490, 70, 15);
    // void rift
    ctx.fillStyle = 'rgba(100,0,200,0.4)';
    ctx.fillRect(900, 450, 100, 55);
    ctx.fillStyle = 'rgba(200,0,255,0.2)';
    ctx.fillRect(920, 440, 60, 15);
    // draw paths between locations
    ctx.strokeStyle = '#886622';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    for (let i = 0; i < this.mapLocations.length - 1; i++) {
      let a = this.mapLocations[i], b = this.mapLocations[i + 1];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    // draw location nodes
    for (let i = 0; i < this.locations.length; i++) {
      let loc = this.locations[i];
      let ml = this.mapLocations[i];
      let isCurrent = i === this.currentLocation;
      let isUnlocked = loc.unlocked;
      let canUnlock = !isUnlocked && i > 0 && this.locations[i - 1].unlocked;
      // node glow for current
      if (isCurrent) {
        ctx.fillStyle = 'rgba(255,215,0,' + (0.2 + Math.sin(this.waterTime * 3) * 0.15) + ')';
        ctx.beginPath(); ctx.arc(ml.x, ml.y, 32, 0, Math.PI * 2); ctx.fill();
      }
      // node background
      if (isUnlocked) {
        ctx.fillStyle = isCurrent ? '#ffd700' : '#8b6914';
      } else if (canUnlock) {
        ctx.fillStyle = '#5a4a2a';
      } else {
        ctx.fillStyle = '#333';
      }
      // draw pixel circle
      ctx.fillRect(ml.x - 18, ml.y - 14, 36, 28);
      ctx.fillRect(ml.x - 14, ml.y - 18, 28, 36);
      // border
      ctx.strokeStyle = isCurrent ? '#fff' : isUnlocked ? '#ffd700' : canUnlock ? '#886622' : '#555';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(ml.x, ml.y, 20, 0, Math.PI * 2); ctx.stroke();
      // icon
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      if (isUnlocked || canUnlock) {
        ctx.fillText(ml.icon, ml.x, ml.y + 7);
      } else {
        ctx.fillStyle = '#666';
        ctx.fillText('\ud83d\udd12', ml.x, ml.y + 7);
      }
      // name label
      ctx.fillStyle = isUnlocked ? '#fff' : canUnlock ? '#aa8833' : '#666';
      ctx.font = '12px monospace';
      ctx.fillText(loc.name.replace(/^.\s*/, ''), ml.x, ml.y + 38);
      // cost label for locked
      if (!isUnlocked && canUnlock) {
        ctx.fillStyle = this.money >= loc.cost ? '#4f4' : '#f44';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('$' + loc.cost, ml.x, ml.y + 52);
      }
      // "YOU ARE HERE" marker
      if (isCurrent) {
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('YOU ARE HERE', ml.x, ml.y - 26);
        // bouncing arrow
        let bounce = Math.sin(this.waterTime * 4) * 4;
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(ml.x - 3, ml.y - 24 + bounce, 6, 4);
      }
    }
    // money display on map
    ctx.fillStyle = '#ffd700';
    ctx.font = '18px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('\ud83d\udcb0 $' + this.money, mx + 20, my + mh - 15);
    // hint
    ctx.fillStyle = '#aaa';
    ctx.font = '13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Click a location to travel or unlock', W / 2, my + mh - 15);
  }

  // ========== SAVE / LOAD SYSTEM ==========
  async loadSavePreviews() {
    if (typeof SaveData !== 'undefined' && SaveData.isAvailable()) {
      for (let i = 0; i < 3; i++) {
        try {
          let data = await SaveData.get('fishSlot' + i);
          this.saveSlotPreviews[i] = data || null;
        } catch(e) { this.saveSlotPreviews[i] = null; }
      }
    }
  }

  async saveGame() {
    if (this.currentSlot === null) return;
    let data = {
      money: this.money,
      inventory: this.inventory.map(f => ({ fishName: f.fishName, rarity: f.rarity, value: f.value, weight: f.weight, color1: f.color1, color2: f.color2, size: f.size, difficulty: f.difficulty, name: f.fishName })),
      currentLocation: this.currentLocation,
      unlockedLocations: this.locations.map(l => l.unlocked),
      rodLevel: this.rodLevel,
      selectedBait: this.selectedBait,
      luckLevel: this.luckLevel,
      baitStock: this.baitStock.map(b => b === Infinity ? -1 : b),
      timestamp: Date.now()
    };
    if (typeof SaveData !== 'undefined' && SaveData.isAvailable()) {
      await SaveData.set('fishSlot' + this.currentSlot, data);
      this.saveSlotPreviews[this.currentSlot] = data;
    }
  }

  async loadGame(slot) {
    if (typeof SaveData !== 'undefined' && SaveData.isAvailable()) {
      let data = await SaveData.get('fishSlot' + slot);
      if (data) {
        this.money = data.money || 0;
        this.inventory = (data.inventory || []).map(f => new Fish(f));
        this.currentLocation = data.currentLocation || 0;
        if (data.unlockedLocations) {
          data.unlockedLocations.forEach((u, i) => { if (this.locations[i]) this.locations[i].unlocked = u; });
        }
        this.rodLevel = data.rodLevel || 0;
        this.selectedBait = data.selectedBait || 0;
        this.luckLevel = data.luckLevel || 0;
        if (data.baitStock) {
          this.baitStock = data.baitStock.map(b => b === -1 ? Infinity : b);
        }
      }
    }
    this.currentSlot = slot;
    this.menuOpen = false;
    this.state = 'idle';
  }

  startNewGame(slot) {
    this.money = 0;
    this.inventory = [];
    this.currentLocation = 0;
    this.locations.forEach((l, i) => l.unlocked = i === 0);
    this.rodLevel = 0;
    this.selectedBait = 0;
    this.luckLevel = 0;
    this.baitStock = [Infinity, 0, 0, 0, 0, 0, 0, 0];
    this.currentSlot = slot;
    this.menuOpen = false;
    this.state = 'idle';
    this.saveGame();
  }

  handleMenuClick(p) {
    let cx = 640, startY = 310;
    // If picking a slot for new game
    if (this.newGamePicking) {
      // Back button
      if (p.x > cx - 80 && p.x < cx + 80 && p.y > startY + 280 && p.y < startY + 310) {
        this.newGamePicking = false;
        return;
      }
      for (let i = 0; i < 3; i++) {
        let sy = startY + 50 + i * 65;
        if (p.x > cx - 200 && p.x < cx + 200 && p.y > sy && p.y < sy + 55) {
          this.newGamePicking = false;
          this.startNewGame(i);
          return;
        }
      }
      return;
    }
    // New Game button
    if (p.x > cx - 140 && p.x < cx + 140 && p.y > startY && p.y < startY + 50) {
      let anySaves = this.saveSlotPreviews.some(s => s);
      if (!anySaves) {
        this.startNewGame(0);
      } else {
        this.newGamePicking = true;
      }
      return;
    }
    // Save slots
    for (let i = 0; i < 3; i++) {
      let sy = startY + 70 + i * 65;
      if (p.x > cx - 200 && p.x < cx + 200 && p.y > sy && p.y < sy + 55) {
        if (this.saveSlotPreviews[i]) {
          this.loadGame(i);
        } else {
          this.startNewGame(i);
        }
        return;
      }
    }
  }

  drawMainMenu(ctx, W, H) {
    this.menuTime += 0.016;
    // animated water background
    let grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#0a1a3e');
    grad.addColorStop(0.4, '#1a4a7a');
    grad.addColorStop(0.7, '#0a3a6a');
    grad.addColorStop(1, '#051a3a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    // animated waves
    for (let i = 0; i < 20; i++) {
      let wx = (i * 80 + this.menuTime * 40) % (W + 100) - 50;
      let wy = 300 + i * 22 + Math.sin(this.menuTime * 2 + i) * 8;
      ctx.fillStyle = 'rgba(100,180,255,0.1)';
      ctx.fillRect(wx, wy, 60, 3);
    }
    // fish silhouettes swimming
    for (let i = 0; i < 8; i++) {
      let fx = (i * 180 + this.menuTime * (30 + i * 15)) % (W + 100) - 50;
      let fy = 350 + i * 40 + Math.sin(this.menuTime + i * 2) * 20;
      ctx.fillStyle = 'rgba(0,60,120,0.4)';
      ctx.fillRect(fx, fy, 20 + i * 3, 10 + i * 2);
      ctx.fillRect(fx + 14 + i * 2, fy - 4, 10, 18 + i * 2);
    }
    // sparkles
    for (let i = 0; i < 15; i++) {
      let sx = (i * 97 + Math.sin(this.menuTime * 0.5 + i) * 40) % W;
      let sy = (i * 53 + Math.cos(this.menuTime * 0.7 + i * 1.3) * 30) % H;
      let a = 0.2 + Math.sin(this.menuTime * 3 + i * 2) * 0.2;
      ctx.fillStyle = 'rgba(255,215,0,' + a + ')';
      ctx.fillRect(sx, sy, 3, 3);
    }
    // title
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    let bounce = Math.sin(this.menuTime * 2) * 5;
    ctx.fillText('\ud83c\udfa3 PIXEL FISHING \ud83c\udfa3', W / 2, 160 + bounce);
    ctx.fillStyle = 'rgba(255,215,0,0.15)';
    ctx.fillText('\ud83c\udfa3 PIXEL FISHING \ud83c\udfa3', W / 2 + 2, 162 + bounce);
    // subtitle
    ctx.fillStyle = '#88bbdd';
    ctx.font = '18px monospace';
    ctx.fillText('Cast, Catch, Conquer the Waters!', W / 2, 200);
    // version line
    ctx.fillStyle = '#446688';
    ctx.font = '12px monospace';
    ctx.fillText('13 Locations \u2022 100+ Fish \u2022 Upgrades & Events', W / 2, 230);
    let cx = W / 2;
    let startY = 310;
    if (this.newGamePicking) {
      // Slot picking UI for new game
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Choose a save slot to overwrite:', cx, startY + 30);
      for (let i = 0; i < 3; i++) {
        let sy = startY + 50 + i * 65;
        let preview = this.saveSlotPreviews[i];
        if (preview) {
          ctx.fillStyle = 'rgba(80,20,20,0.9)';
          ctx.fillRect(cx - 200, sy, 400, 55);
          ctx.strokeStyle = '#ff4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - 200, sy, 400, 55);
          ctx.fillStyle = '#ff8844';
          ctx.font = 'bold 16px monospace';
          ctx.textAlign = 'left';
          ctx.fillText('OVERWRITE SAVE ' + (i + 1), cx - 180, sy + 22);
          ctx.fillStyle = '#aaa';
          ctx.font = '13px monospace';
          let locName = this.locations[preview.currentLocation] ? this.locations[preview.currentLocation].name : 'Unknown';
          ctx.fillText('💰$' + (preview.money || 0) + '  📍' + locName, cx - 180, sy + 42);
          ctx.fillStyle = '#ff4444';
          ctx.font = 'bold 13px monospace';
          ctx.textAlign = 'right';
          ctx.fillText('⚠ OVERWRITE', cx + 185, sy + 42);
        } else {
          ctx.fillStyle = 'rgba(0,80,40,0.9)';
          ctx.fillRect(cx - 200, sy, 400, 55);
          ctx.strokeStyle = '#4f4';
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - 200, sy, 400, 55);
          ctx.fillStyle = '#4f4';
          ctx.font = 'bold 16px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('SAVE ' + (i + 1) + ' - Empty (Use This)', cx, sy + 33);
        }
      }
      // Back button
      ctx.fillStyle = 'rgba(60,60,60,0.9)';
      ctx.fillRect(cx - 80, startY + 280, 160, 30);
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 80, startY + 280, 160, 30);
      ctx.fillStyle = '#ccc';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('← Back', cx, startY + 300);
    } else {
    // New Game button
    ctx.fillStyle = 'rgba(0,120,60,0.9)';
    ctx.fillRect(cx - 140, startY, 280, 50);
    ctx.strokeStyle = '#4f4';
    ctx.lineWidth = 3;
    ctx.strokeRect(cx - 140, startY, 280, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🆕 NEW GAME', cx, startY + 32);
    // Save slots
    for (let i = 0; i < 3; i++) {
      let sy = startY + 70 + i * 65;
      let preview = this.saveSlotPreviews[i];
      if (preview) {
        ctx.fillStyle = 'rgba(40,30,15,0.9)';
        ctx.fillRect(cx - 200, sy, 400, 55);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 200, sy, 400, 55);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('SAVE ' + (i + 1), cx - 180, sy + 22);
        ctx.fillStyle = '#aaa';
        ctx.font = '13px monospace';
        let locName = this.locations[preview.currentLocation] ? this.locations[preview.currentLocation].name : 'Unknown';
        ctx.fillText('💰$' + (preview.money || 0) + '  📍' + locName, cx - 180, sy + 42);
        if (preview.timestamp) {
          let d = new Date(preview.timestamp);
          ctx.fillStyle = '#666';
          ctx.font = '11px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(d.toLocaleDateString() + ' ' + d.toLocaleTimeString(), cx + 185, sy + 22);
        }
        ctx.fillStyle = '#4f4';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('▶ LOAD', cx + 185, sy + 42);
      } else {
        ctx.fillStyle = 'rgba(30,30,30,0.7)';
        ctx.fillRect(cx - 200, sy, 400, 55);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 200, sy, 400, 55);
        ctx.fillStyle = '#777';
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SAVE ' + (i + 1) + ' - Empty', cx, sy + 33);
      }
    }
    // footer
    ctx.fillStyle = '#556';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Click a save slot to load, or start a new game', cx, startY + 290);
    }
  }

  notify(msg) { this.notification = msg; this.notifTimer = 2.5; }

  spawnParticles(x, y, count, colors) {
    for (let i = 0; i < count; i++) {
      let c = colors[Math.floor(Math.random() * colors.length)];
      let vx = (Math.random() - 0.5) * 300;
      let vy = -100 - Math.random() * 250;
      let s = 3 + Math.random() * 5;
      let p = new Particle(x, y, c, s, vx, vy, 0.5 + Math.random() * 1);
      this.particles.push(p);
      this.entities.push(p);
    }
  }

  rarityParticles(fish, x, y) {
    let map = {
      common: { colors: ['#aaa','#ccc'], count: 8 },
      uncommon: { colors: ['#5f5','#afa','#0f0'], count: 15 },
      rare: { colors: ['#55f','#aaf','#00f'], count: 25 },
      epic: { colors: ['#c5f','#f5f','#a0f'], count: 40 },
      legendary: { colors: ['#fa0','#ff0','#f80','#fff'], count: 60 }
    };
    let m = map[fish.rarity] || map.common;
    this.spawnParticles(x, y, m.count, m.colors);
  }

  screenToWorld(cx, cy) { return { x: cx + this.scrollX, y: cy + this.scrollY }; }
  worldToScreen(wx, wy) { return { x: wx - this.scrollX, y: wy - this.scrollY }; }
  getObjectAt(cx, cy) {
    let w = this.screenToWorld(cx, cy);
    for (let e of this.entities) { let b = e.getBounds(); if (w.x >= b.x && w.x <= b.x+b.width && w.y >= b.y && w.y <= b.y+b.height) return e; }
    return null;
  }

  update(dt) {
    dt = Math.min(dt, 0.05);
    this.waterTime += dt;
    this.clouds.forEach(c => { c.x += c.s * dt; if (c.x > 1400) c.x = -c.w; });
    if (this.notifTimer > 0) this.notifTimer -= dt;

    // luck boost countdown
    if (this.luckBoostTimer > 0) {
      this.luckBoostTimer -= dt;
      // spawn gold sparkles
      if (Math.random() < 0.7) {
        this.goldSparkles.push({ x: Math.random() * 1280, y: Math.random() * 720, life: 1 + Math.random(), maxLife: 1 + Math.random(), size: 2 + Math.random() * 4 });
      }
    }
    // update gold sparkles
    for (let i = this.goldSparkles.length - 1; i >= 0; i--) {
      this.goldSparkles[i].life -= dt;
      if (this.goldSparkles[i].life <= 0) this.goldSparkles.splice(i, 1);
    }

    // random events - only one at a time
    let anyEvent = this.bottleEvent || this.nessieEvent || this.schoolingEvent || this.rainEvent;
    if (!anyEvent) {
      this.eventTimer -= dt;
      if (this.eventTimer <= 0) {
        this.eventTimer = 20 + Math.random() * 30;
        let roll = Math.random();
        if (this.inventory.length > 5 && roll < 0.3) {
          this.nessieEvent = { timer: 6, phase: 'rising', x: 500 + Math.random() * 500, y: 550, shakeTimer: 0 };
          this.notify('🐉 THE WATER IS SHAKING! Something huge approaches...');
        } else if (roll < 0.45) {
          this.bottleEvent = { x: 400 + Math.random() * 500, y: 420 + Math.random() * 80, timer: 2.0 };
          this.notify('🍾 A message in a bottle! Click it quickly!');
        } else if (roll < 0.7) {
          this.schoolingEvent = { timer: 10, x: 500 + Math.random() * 400, y: 440 + Math.random() * 60 };
          this.notify('🌀 A WHIRLPOOL appeared! Tap it for FREE BAIT!');
        } else if (roll < 0.9) {
          this.rainEvent = { timer: 30, drops: [] };
          for (let i = 0; i < 80; i++) this.rainEvent.drops.push({ x: Math.random() * 1280, y: Math.random() * 720, speed: 400 + Math.random() * 300 });
          this.notify('🌧️ RAIN! Bait is NOT consumed while it rains!');
        }
      }
    }

    // schooling event update
    if (this.schoolingEvent) {
      this.schoolingEvent.timer -= dt;
      if (this.schoolingEvent.timer <= 0) {
        this.schoolingEvent = null;
        this.notify('🌀 The whirlpool faded away!');
      }
    }

    // rain event update
    if (this.rainEvent) {
      this.rainEvent.timer -= dt;
      for (let d of this.rainEvent.drops) {
        d.y += d.speed * dt;
        if (d.y > 720) { d.y = -10; d.x = Math.random() * 1280; }
      }
      if (this.rainEvent.timer <= 0) {
        this.rainEvent = null;
        this.notify('☀️ The rain stopped.');
      }
    }

    // bottle event timer
    if (this.bottleEvent) {
      this.bottleEvent.timer -= dt;
      this.bottleEvent.y += Math.sin(this.waterTime * 3) * 0.5;
      if (this.bottleEvent.timer <= 0) {
        this.bottleEvent = null;
        this.notify('💨 The bottle drifted away...');
      }
    }

    // nessie event
    if (this.nessieEvent) {
      this.nessieEvent.timer -= dt;
      this.nessieEvent.shakeTimer += dt;
      if (this.nessieEvent.phase === 'rising') {
        this.nessieEvent.y -= dt * 25;
        // screen shake effect
        this.scrollX = Math.sin(this.nessieEvent.shakeTimer * 30) * 4;
        this.scrollY = Math.cos(this.nessieEvent.shakeTimer * 25) * 3;
        if (this.nessieEvent.timer <= 3) {
          this.nessieEvent.phase = 'stealing';
          let stolen = this.inventory.length;
          this.inventory = [];
          this.notify('🐉 NESSIE STOLE ALL ' + stolen + ' FISH! SELL YOUR CATCH OFTEN!');
          this.spawnParticles(this.nessieEvent.x, 420, 50, ['#2a5a2a','#1a3a1a','#3a7a3a','#ff4444','#ff0']);
          this.spawnParticles(this.nessieEvent.x - 80, 440, 30, ['#4af','#48f','#fff']);
          this.spawnParticles(this.nessieEvent.x + 80, 440, 30, ['#4af','#48f','#fff']);
        }
      } else if (this.nessieEvent.phase === 'stealing') {
        this.nessieEvent.y += dt * 20;
        this.scrollX *= 0.95;
        this.scrollY *= 0.95;
      }
      if (this.nessieEvent.timer <= 0) {
        this.nessieEvent = null;
        this.scrollX = 0;
        this.scrollY = 0;
      }
    }

    // transition
    if (this.transitioning) {
      this.transitionAlpha += dt * 2.5;
      if (this.transitionAlpha >= 1 && this.transitionTarget >= 0) {
        this.currentLocation = this.transitionTarget;
        this.transitionTarget = -1;
        // cleanup line if any
        if (this.line) { this.removeEntity(this.line); this.line = null; }
        this.state = 'idle';
      }
      if (this.transitionTarget < 0) {
        this.transitionAlpha -= dt * 5;
        if (this.transitionAlpha <= 0) {
          this.transitionAlpha = 0;
          this.transitioning = false;
        }
      }
      return;
    }

    // auto-save every 30 seconds
    if (!this._saveTimer) this._saveTimer = 0;
    this._saveTimer += dt;
    if (this._saveTimer > 15 && this.currentSlot !== null) {
      this._saveTimer = 0;
      this.saveGame();
    }

    // state machine
    let loc = this.locations[this.currentLocation];
    if (this.state === 'casting' && this.line && this.line.casted) {
      this.state = 'waiting';
      let baitQ = this.baits[this.selectedBait].quality;
      this.waitTimer = 1.5 + Math.random() * 4 - baitQ * 0.5;
      this.waitTimer = Math.max(0.5, this.waitTimer);
    }
    if (this.state === 'waiting') {
      this.waitTimer -= dt;
      if (this.waitTimer <= 0) {
        let baitQ = this.baits[this.selectedBait].quality;
        let luckExtra = this.luckBoostTimer > 0 ? this.luckBoostAmount : 0;
        let fish = Fish.rollFish(this.lucks[this.luckLevel].bonus + baitQ * 1.5 + luckExtra, loc.id);

        this.minigame = new CatchMinigame(fish, this.rods[this.rodLevel].power, baitQ);
        this.entities.push(this.minigame);
        this.state = 'minigame';
        this.notify('🐟 A ' + fish.fishName + ' is biting!');
      }
    }
    if (this.state === 'minigame' && this.minigame && this.minigame.done) {
      if (this.minigame.success) {
        let f = this.minigame.fish;
        this.inventory.push(f);
        this.notify('✅ Caught a ' + f.fishName + '! (' + f.weight + 'lbs, $' + f.value + ')');
        this.rarityParticles(f, 640, 400);
      } else {
        this.notify('❌ The fish got away!');
        this.spawnParticles(500, 450, 10, ['#4af','#48f','#fff']);
      }
      this.removeEntity(this.minigame);
      this.minigame = null;
      if (this.line) { this.removeEntity(this.line); this.line = null; }
      this.state = 'idle';
    }

    for (let e of this.entities) e.update(dt);
    for (let i = this.entities.length - 1; i >= 0; i--) {
      if (this.entities[i].dead) this.entities.splice(i, 1);
    }
    this.particles = this.particles.filter(p => !p.dead);

    document.getElementById('money').textContent = '💰 $' + this.money;
    let baitName = this.baits[this.selectedBait].name;
    let baitCount = this.selectedBait === 0 ? '∞' : this.baitStock[this.selectedBait];
    document.getElementById('rod-info').textContent = '🎣 ' + this.rods[this.rodLevel].name + ' | 🪱 ' + baitName + ' x' + baitCount + ' | 🐟 ' + this.inventory.length;
  }

  removeEntity(e) {
    let i = this.entities.indexOf(e);
    if (i >= 0) this.entities.splice(i, 1);
  }

  draw() {
    let ctx = this.ctx;
    let W = this.canvas.width, H = this.canvas.height;
    // main menu
    if (this.menuOpen) {
      this.drawMainMenu(ctx, W, H);
      return;
    }
    let loc = this.locations[this.currentLocation];

    // sky gradient
    let grad = ctx.createLinearGradient(0, 0, 0, 400);
    grad.addColorStop(0, loc.sky1);
    grad.addColorStop(0.5, loc.sky2);
    grad.addColorStop(1, loc.sky3);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 400);

    // sun/moon depending on location
    if (loc.id === 'deepsea') {
      // moon
      ctx.fillStyle = '#aabbcc';
      ctx.beginPath(); ctx.arc(1050, 80, 30, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(170,187,204,0.1)';
      ctx.beginPath(); ctx.arc(1050, 80, 55, 0, Math.PI*2); ctx.fill();
    } else if (loc.id === 'mystic') {
      // glowing orb
      ctx.fillStyle = '#cc88ff';
      ctx.beginPath(); ctx.arc(1050, 80, 35, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(204,136,255,0.15)';
      ctx.beginPath(); ctx.arc(1050, 80, 65, 0, Math.PI*2); ctx.fill();
      // floating sparkles
      for (let i = 0; i < 12; i++) {
        let sx = 100 + Math.sin(this.waterTime * 0.7 + i * 1.5) * 500 + i * 90;
        let sy = 50 + Math.cos(this.waterTime * 0.5 + i * 2) * 80 + i * 15;
        ctx.fillStyle = 'rgba(200,160,255,' + (0.3 + Math.sin(this.waterTime * 2 + i) * 0.2) + ')';
        ctx.fillRect(sx, sy, 3, 3);
      }
    } else {
      ctx.fillStyle = '#ffe066';
      ctx.beginPath(); ctx.arc(1050, 80, 40, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(255,224,102,0.15)';
      ctx.beginPath(); ctx.arc(1050, 80, 70, 0, Math.PI*2); ctx.fill();
    }

    // clouds
    ctx.fillStyle = loc.id === 'deepsea' ? 'rgba(100,100,120,0.4)' : 'rgba(255,255,255,0.7)';
    this.clouds.forEach(c => {
      ctx.fillRect(c.x, c.y, c.w, 20);
      ctx.fillRect(c.x+10, c.y-10, c.w-20, 15);
    });

    // far background hills
    if (loc.id !== 'ocean' && loc.id !== 'deepsea') {
      ctx.fillStyle = loc.groundDark;
      for (let i = 0; i < 8; i++) {
        let hx = i * 180 - 40;
        let hh = 40 + Math.sin(i * 1.7) * 20;
        ctx.fillRect(hx, 340 - hh, 180, hh);
      }
    }

    // ground - extends to water line
    ctx.fillStyle = loc.ground;
    ctx.fillRect(0, 340, W, 50);
    ctx.fillStyle = loc.groundDark;
    ctx.fillRect(0, 340, W, 5);
    // left bank ground (elevated for player/shop)
    ctx.fillStyle = loc.ground;
    ctx.fillRect(0, 330, 300, 60);
    ctx.fillStyle = loc.groundDark;
    ctx.fillRect(0, 340, 300, 5);

    // distant trees/scenery ON the ground
    ctx.fillStyle = loc.trees;
    if (loc.id === 'ocean') {
      // distant waves/horizon line
      for (let i = 0; i < 10; i++) {
        let tx = i * 140;
        let ty = 350 + Math.sin(this.waterTime * 1.5 + i) * 3;
        ctx.fillStyle = 'rgba(100,180,255,0.2)';
        ctx.fillRect(tx, ty, 100, 5);
      }
    } else if (loc.id === 'deepsea') {
      // rocky cliffs growing up from ground
      for (let i = 0; i < 15; i++) {
        let tx = i * 90 + 10;
        let ch = 30 + (i % 3) * 20;
        ctx.fillStyle = '#1a1a2a';
        ctx.fillRect(tx, 340 - ch, 40, ch + 10);
        ctx.fillStyle = '#151525';
        ctx.fillRect(tx + 10, 340 - ch - 15, 25, 20);
      }
    } else {
      // trees rooted on the ground at y=340
      for (let i = 0; i < 20; i++) {
        let tx = i * 70 + 10;
        let th = 25 + (i % 3) * 10;
        // trunk grows up from ground
        ctx.fillStyle = '#5a3a1a';
        ctx.fillRect(tx + 10, 340 - th, 8, th);
        // foliage layers
        ctx.fillStyle = loc.trees;
        ctx.fillRect(tx, 340 - th - 15, 28, 18);
        ctx.fillStyle = loc.id === 'mystic' ? '#3a4a5a' : loc.trees;
        ctx.fillRect(tx + 4, 340 - th - 28, 20, 16);
        ctx.fillRect(tx + 7, 340 - th - 36, 14, 12);
      }
    }

    // grass/ground detail along the shore
    if (loc.id !== 'ocean' && loc.id !== 'deepsea') {
      ctx.fillStyle = loc.ground;
      for (let i = 0; i < 30; i++) {
        let gx = 300 + i * 35;
        ctx.fillRect(gx, 338, 4, 6);
        ctx.fillRect(gx + 12, 336, 3, 8);
      }
    }

    // dock
    ctx.fillStyle = loc.groundDark;
    ctx.fillRect(0, 340, 300, 5);
    // dock
    ctx.fillStyle = loc.dockColor;
    ctx.fillRect(160, 340, 200, 16);
    ctx.fillStyle = loc.id === 'mystic' ? '#6a4a9a' : '#6b4914';
    ctx.fillRect(180, 340, 4, 80);
    ctx.fillRect(280, 340, 4, 80);
    ctx.fillRect(340, 340, 4, 80);

    // water
    let wGrad = ctx.createLinearGradient(0, 390, 0, H);
    wGrad.addColorStop(0, loc.water1);
    wGrad.addColorStop(1, loc.water2);
    ctx.fillStyle = wGrad;
    ctx.fillRect(0, 390, W, H - 390);

    // water waves
    let waveColor = loc.id === 'mystic' ? 'rgba(150,100,255,0.15)' : loc.id === 'deepsea' ? 'rgba(40,60,100,0.15)' : 'rgba(100,180,255,0.15)';
    ctx.fillStyle = waveColor;
    for (let i = 0; i < 15; i++) {
      let wx = (i * 100 + this.waterTime * 30) % (W + 100) - 50;
      let wy = 400 + i * 22 + Math.sin(this.waterTime * 2 + i) * 5;
      ctx.fillRect(wx, wy, 80, 3);
    }

    // underwater fish silhouettes
    let silColor = loc.id === 'deepsea' ? 'rgba(10,20,40,0.4)' : loc.id === 'mystic' ? 'rgba(60,30,100,0.3)' : 'rgba(0,40,80,0.3)';
    ctx.fillStyle = silColor;
    for (let i = 0; i < 6; i++) {
      let fx = (i * 210 + this.waterTime * (20 + i * 10)) % (W + 100) - 50;
      let fy = 480 + i * 30 + Math.sin(this.waterTime + i * 2) * 15;
      let fs = 10 + i * 4;
      ctx.fillRect(fx, fy, fs * 2, fs);
      ctx.fillRect(fx + fs * 1.5, fy - fs * 0.3, fs * 0.8, fs * 1.6);
    }

    // buildings - tackle shop
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(20, 250, 80, 80);
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(15, 240, 90, 15);
    ctx.fillStyle = '#3a2a0a';
    ctx.fillRect(45, 290, 25, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('TACKLE', 60, 270);
    ctx.fillText('SHOP', 60, 282);

    // player and line
    this.player.draw(ctx);
    if (this.line) this.line.draw(ctx);

    // particles
    for (let p of this.particles) p.draw(ctx);

    // minigame
    if (this.minigame) this.minigame.draw(ctx);

    // buttons
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(1050, 20, 180, 36);
    ctx.fillRect(1050, 70, 180, 36);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.strokeRect(1050, 20, 180, 36);
    ctx.strokeRect(1050, 70, 180, 36);
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🏪 Tackle Shop', 1140, 44);
    ctx.fillText('🐟 Fish Market', 1140, 94);

    // location name banner
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(400, 660, 480, 40);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.strokeRect(400, 660, 480, 40);
    ctx.fillStyle = '#ffd700';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(loc.name, 640, 685);



    // state hint
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    if (this.state === 'idle') ctx.fillText('Click anywhere to cast!', 640, 650);
    else if (this.state === 'waiting') {
      let dots = '.'.repeat(Math.floor(this.waterTime * 2) % 4);
      ctx.fillText('Waiting for a bite' + dots, 640, 650);
    }

    // notification
    if (this.notifTimer > 0 && this.notification) {
      let a = Math.min(1, this.notifTimer);
      ctx.globalAlpha = a;
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(390, 140, 500, 40);
      ctx.fillStyle = '#ffd700';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(this.notification, 640, 166);
      ctx.globalAlpha = 1;
    }

    // draw bottle event
    if (this.bottleEvent) {
      let bx = this.bottleEvent.x, by = this.bottleEvent.y;
      let bob = Math.sin(this.waterTime * 4) * 3;
      // bottle body
      ctx.fillStyle = '#2a6a2a';
      ctx.fillRect(bx - 6, by + bob - 10, 12, 20);
      ctx.fillStyle = '#3a8a3a';
      ctx.fillRect(bx - 4, by + bob - 8, 8, 16);
      // cork
      ctx.fillStyle = '#8b6914';
      ctx.fillRect(bx - 3, by + bob - 14, 6, 6);
      // paper sticking out
      ctx.fillStyle = '#ffe0a0';
      ctx.fillRect(bx - 1, by + bob - 18, 4, 6);
      // pulsing glow
      let pulse = 0.3 + Math.sin(this.waterTime * 6) * 0.2;
      ctx.fillStyle = 'rgba(255,215,0,' + pulse + ')';
      ctx.beginPath(); ctx.arc(bx, by + bob, 20, 0, Math.PI * 2); ctx.fill();
      // timer bar
      let tw = 40 * (this.bottleEvent.timer / 2.0);
      ctx.fillStyle = '#333';
      ctx.fillRect(bx - 20, by + bob + 18, 40, 6);
      ctx.fillStyle = this.bottleEvent.timer > 1 ? '#ffd700' : '#ff4400';
      ctx.fillRect(bx - 20, by + bob + 18, tw, 6);
      ctx.fillStyle = '#fff';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CLICK!', bx, by + bob - 22);
    }

    // draw nessie event
    if (this.nessieEvent) {
      let nx = this.nessieEvent.x, ny = this.nessieEvent.y;
      let shake = Math.sin(this.waterTime * 30) * 3;
      // dark water disturbance
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.arc(nx, ny + 20, 80 + Math.sin(this.waterTime * 5) * 10, 0, Math.PI * 2); ctx.fill();
      // water splashes
      for (let i = 0; i < 8; i++) {
        let sx = nx - 60 + i * 16 + Math.sin(this.waterTime * 8 + i) * 5;
        let sy = ny + 10 + Math.cos(this.waterTime * 6 + i * 2) * 8;
        ctx.fillStyle = 'rgba(100,200,255,0.5)';
        ctx.fillRect(sx, sy, 6, 4);
      }
      // body - larger and more detailed
      ctx.fillStyle = '#0a3a0a';
      ctx.fillRect(nx - 60 + shake, ny - 5, 120, 30);
      ctx.fillRect(nx - 40 + shake, ny - 20, 80, 25);
      ctx.fillRect(nx - 70 + shake, ny + 5, 20, 15);
      // humps
      ctx.fillStyle = '#1a5a1a';
      ctx.fillRect(nx - 30 + shake, ny - 30, 30, 20);
      ctx.fillRect(nx + 15 + shake, ny - 25, 25, 18);
      // long neck
      ctx.fillStyle = '#0a4a0a';
      ctx.fillRect(nx + 50 + shake, ny - 70, 16, 65);
      // head
      ctx.fillStyle = '#1a5a1a';
      ctx.fillRect(nx + 42 + shake, ny - 85, 32, 22);
      // jaw
      ctx.fillStyle = '#0a3a0a';
      ctx.fillRect(nx + 44 + shake, ny - 65, 28, 8);
      // teeth
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 5; i++) ctx.fillRect(nx + 46 + i * 5 + shake, ny - 65, 2, 4);
      // eyes - glowing red
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(nx + 64 + shake, ny - 80, 6, 6);
      ctx.fillStyle = 'rgba(255,0,0,0.3)';
      ctx.beginPath(); ctx.arc(nx + 67 + shake, ny - 77, 10, 0, Math.PI * 2); ctx.fill();
      // flippers
      ctx.fillStyle = '#0a3a0a';
      ctx.fillRect(nx - 50 + shake, ny + 15, 25, 10);
      ctx.fillRect(nx + 30 + shake, ny + 15, 25, 10);
      // tail
      ctx.fillRect(nx - 75 + shake, ny - 10, 20, 25);
      ctx.fillRect(nx - 90 + shake, ny - 20, 18, 20);
      // label - big flashing warning
      let flash = Math.sin(this.waterTime * 8) > 0;
      if (this.nessieEvent.phase === 'rising') {
        // red screen flash
        ctx.fillStyle = 'rgba(255,0,0,' + (0.05 + Math.sin(this.waterTime * 6) * 0.05) + ')';
        ctx.fillRect(0, 0, W, H);
        // warning banner
        ctx.fillStyle = flash ? 'rgba(200,0,0,0.9)' : 'rgba(150,0,0,0.8)';
        ctx.fillRect(340, 100, 600, 50);
        ctx.strokeStyle = '#ff0';
        ctx.lineWidth = 3;
        ctx.strokeRect(340, 100, 600, 50);
        ctx.fillStyle = flash ? '#ff0' : '#fff';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚠ LOCH NESS MONSTER APPROACHING! ⚠', 640, 132);
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(390, 100, 500, 50);
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 3;
        ctx.strokeRect(390, 100, 500, 50);
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('NESSIE STOLE YOUR FISH!', 640, 132);
        // fish flying away from nessie
        for (let i = 0; i < 4; i++) {
          let fx = nx + Math.sin(this.waterTime * 3 + i * 2) * 40 - 20;
          let fy = ny - 30 - i * 20 + Math.cos(this.waterTime * 4 + i) * 10;
          ctx.fillStyle = '#4488aa';
          ctx.fillRect(fx, fy, 12, 6);
          ctx.fillRect(fx + 8, fy - 3, 6, 12);
        }
      }
    }

    // gold sparkle overlay during luck boost
    if (this.luckBoostTimer > 0) {
      // gold border glow
      ctx.strokeStyle = 'rgba(255,215,0,' + (0.3 + Math.sin(this.waterTime * 4) * 0.2) + ')';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, W - 6, H - 6);
      // sparkles
      for (let s of this.goldSparkles) {
        let a = s.life / s.maxLife;
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(s.x, s.y, s.size, s.size);
        ctx.fillStyle = '#fff';
        ctx.fillRect(s.x + 1, s.y + 1, s.size - 2, s.size - 2);
      }
      ctx.globalAlpha = 1;
      // countdown
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(540, 190, 200, 36);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2;
      ctx.strokeRect(540, 190, 200, 36);
      ctx.fillStyle = '#ffd700';
      ctx.font = '18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('✨ LUCK ' + Math.ceil(this.luckBoostTimer) + 's ✨', 640, 214);
    }

    // map button
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(1050, 120, 180, 36);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.strokeRect(1050, 120, 180, 36);
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('\ud83d\uddfa\ufe0f World Map', 1140, 144);

    // menu button
    ctx.fillStyle = '#5a2a2a';
    ctx.fillRect(1050, 170, 180, 36);
    ctx.strokeStyle = '#ff6644';
    ctx.lineWidth = 2;
    ctx.strokeRect(1050, 170, 180, 36);
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('\ud83c\udfe0 Main Menu', 1140, 194);

    // inventory count
    ctx.fillStyle = '#aaa';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Inventory: ' + this.inventory.length + ' fish', 1050, 225);
    let totalVal = this.inventory.reduce((s,f)=>s+f.value,0);
    ctx.fillText('Value: $' + totalVal, 1050, 240);

    // draw schooling event (whirlpool)
    if (this.schoolingEvent) {
      let sx = this.schoolingEvent.x, sy = this.schoolingEvent.y;
      let t = this.waterTime;
      // whirlpool rings
      for (let r = 0; r < 4; r++) {
        let radius = 15 + r * 12 + Math.sin(t * 3 + r) * 4;
        let a = 0.5 - r * 0.1;
        ctx.strokeStyle = 'rgba(100,200,255,' + a + ')';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, t * (3 - r * 0.5), t * (3 - r * 0.5) + Math.PI * 1.5);
        ctx.stroke();
      }
      // center glow
      ctx.fillStyle = 'rgba(0,150,255,' + (0.3 + Math.sin(t * 5) * 0.15) + ')';
      ctx.beginPath(); ctx.arc(sx, sy, 12, 0, Math.PI * 2); ctx.fill();
      // fish silhouettes circling
      for (let i = 0; i < 6; i++) {
        let angle = t * 2 + i * Math.PI / 3;
        let dist = 30 + Math.sin(t + i) * 8;
        let fx = sx + Math.cos(angle) * dist;
        let fy = sy + Math.sin(angle) * dist * 0.6;
        ctx.fillStyle = 'rgba(0,80,180,0.6)';
        ctx.fillRect(fx - 5, fy - 3, 10, 6);
        ctx.fillRect(fx + 4, fy - 5, 4, 10);
      }
      // label
      let pulse = 0.7 + Math.sin(t * 4) * 0.3;
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(sx - 55, sy - 55, 110, 22);
      ctx.fillStyle = 'rgba(100,200,255,' + pulse + ')';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TAP FOR BAIT!', sx, sy - 39);
      // timer bar
      let tw = 60 * (this.schoolingEvent.timer / 10);
      ctx.fillStyle = '#222';
      ctx.fillRect(sx - 30, sy + 50, 60, 6);
      ctx.fillStyle = this.schoolingEvent.timer > 4 ? '#0af' : '#f80';
      ctx.fillRect(sx - 30, sy + 50, tw, 6);
      // countdown
      ctx.fillStyle = '#0af';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(Math.ceil(this.schoolingEvent.timer) + 's', sx, sy + 70);
    }

    // draw rain event
    if (this.rainEvent) {
      // darken sky slightly
      ctx.fillStyle = 'rgba(0,0,30,0.2)';
      ctx.fillRect(0, 0, W, 400);
      // rain drops
      ctx.strokeStyle = 'rgba(150,180,255,0.4)';
      ctx.lineWidth = 1;
      for (let d of this.rainEvent.drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + 12);
        ctx.stroke();
      }
      // splashes on water
      for (let i = 0; i < 10; i++) {
        let rx = (i * 137 + this.waterTime * 80) % W;
        let ry = 390 + Math.random() * 4;
        ctx.fillStyle = 'rgba(150,200,255,0.3)';
        ctx.fillRect(rx - 4, ry, 8, 2);
      }
      // banner
      ctx.fillStyle = 'rgba(0,30,60,0.7)';
      ctx.fillRect(490, 190, 300, 36);
      ctx.strokeStyle = '#4af';
      ctx.lineWidth = 2;
      ctx.strokeRect(490, 190, 300, 36);
      ctx.fillStyle = '#4af';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('🌧️ RAIN ' + Math.ceil(this.rainEvent.timer) + 's - FREE BAIT! 🌧️', 640, 214);
    }

    // draw map overlay
    if (this.mapOpen) {
      this.drawMap(ctx, W, H);
    }

    // transition overlay
    if (this.transitioning) {
      ctx.globalAlpha = Math.min(1, this.transitionAlpha);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ffd700';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      if (this.transitionTarget >= 0) {
        ctx.fillText('Traveling to ' + this.locations[this.transitionTarget].name + '...', 640, 360);
      } else {
        ctx.fillText(loc.name, 640, 360);
        ctx.fillStyle = '#aaa';
        ctx.font = '14px monospace';
        ctx.fillText(loc.desc, 640, 390);
      }
      ctx.globalAlpha = 1;
    }
  }

  start() {
    const loop = (ts) => {
      let dt = (ts - this.lastTime) / 1000;
      this.lastTime = ts;
      if (dt > 0.1) dt = 0.016;
      this.update(dt);
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}