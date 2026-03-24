const SaveData = {
  prefix: 'pixelFishing_',

  isAvailable() {
    try {
      const testKey = this.prefix + '__test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (err) {
      console.error('localStorage unavailable:', err);
      return false;
    }
  },

  async get(key) {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('Load failed for key:', key, err);
      return null;
    }
  },

  async set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('Save failed for key:', key, err);
      return false;
    }
  },

  async remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (err) {
      console.error('Remove failed for key:', key, err);
      return false;
    }
  }
};
// ===== USER GAME CODE BELOW =====
// Pasted from uploaded file and updated to use built-in local browser saving.

class Fish {
  constructor(data) {
    this.fishName = data.fishName || data.name || 'Unknown Fish';
    this.rarity = data.rarity || 'Common';
    this.value = data.value || 0;
    this.weight = data.weight || 1;
    this.color1 = data.color1 || '#6ec6ff';
    this.color2 = data.color2 || '#1976d2';
    this.size = data.size || 1;
    this.difficulty = data.difficulty || 1;
    this.name = this.fishName;
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    this.money = 0;
    this.inventory = [];
    this.currentLocation = 0;
    this.rodLevel = 0;
    this.selectedBait = 0;
    this.luckLevel = 0;
    this.currentSlot = null;
    this.menuOpen = true;
    this.state = 'menu';
    this.saveSlotPreviews = [null, null, null];
    this.baitStock = [Infinity, 0, 0, 0, 0, 0, 0, 0];

    this.locations = [
      { name: 'Pond', unlocked: true },
      { name: 'River', unlocked: false },
      { name: 'Lake', unlocked: false },
      { name: 'Ocean', unlocked: false }
    ];

    this.fishTypes = [
      { fishName: 'Bluegill', rarity: 'Common', value: 8, weight: 1.2, color1: '#6ec6ff', color2: '#1565c0', size: 1, difficulty: 1 },
      { fishName: 'Bass', rarity: 'Uncommon', value: 18, weight: 2.4, color1: '#81c784', color2: '#2e7d32', size: 1.2, difficulty: 1.2 },
      { fishName: 'Catfish', rarity: 'Rare', value: 40, weight: 4.8, color1: '#b0bec5', color2: '#455a64', size: 1.5, difficulty: 1.5 },
      { fishName: 'Golden Koi', rarity: 'Epic', value: 125, weight: 3.3, color1: '#ffd54f', color2: '#f57f17', size: 1.3, difficulty: 2 }
    ];

    window.game = this;

    this.setupUI();
    this.loadSavePreviews();
    this.startAutosave();
    this.gameLoop();
  }

  setupUI() {
    const newButtons = document.querySelectorAll('[data-new-slot]');
    newButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const slot = Number(btn.dataset.newSlot);
        await this.startNewGame(slot);
      });
    });

    const loadButtons = document.querySelectorAll('[data-load-slot]');
    loadButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const slot = Number(btn.dataset.loadSlot);
        await this.loadGame(slot);
      });
    });

    const menuBtn = document.getElementById('menuButton');
    if (menuBtn) {
      menuBtn.addEventListener('click', async () => {
        await this.saveGame();
        this.menuOpen = !this.menuOpen;
      });
    }

    const sellAllBtn = document.getElementById('sellAllButton');
    if (sellAllBtn) {
      sellAllBtn.addEventListener('click', async () => {
        let total = 0;
        for (const fish of this.inventory) total += fish.value || 0;
        this.money += total;
        this.inventory = [];
        await this.saveGame();
        this.render();
      });
    }
  }

  async loadSavePreviews() {
  this.saveSlotPreviews = [null, null, null];

  if (!SaveData.isAvailable()) {
    console.warn('Save system unavailable.');
    return;
  }

  for (let i = 0; i < 3; i++) {
    const data = await SaveData.get('fishSlot' + i);
    this.saveSlotPreviews[i] = data || null;
  }
}

  renderSavePreviews() {
    for (let i = 0; i < 3; i++) {
      const el = document.querySelector(`[data-slot-preview="${i}"]`);
      if (!el) continue;

      const data = this.saveSlotPreviews[i];
      if (!data) {
        el.textContent = 'Empty';
        continue;
      }

      const date = new Date(data.timestamp || Date.now()).toLocaleString();
      const fishCount = Array.isArray(data.inventory) ? data.inventory.length : 0;
      el.textContent = `$${data.money ?? 0} • ${fishCount} fish • ${date}`;
    }
  }

  async startNewGame(slot) {
    this.money = 0;
    this.inventory = [];
    this.currentLocation = 0;
    this.rodLevel = 0;
    this.selectedBait = 0;
    this.luckLevel = 0;
    this.currentSlot = slot;
    this.menuOpen = false;
    this.state = 'idle';
    this.baitStock = [Infinity, 0, 0, 0, 0, 0, 0, 0];

    this.locations.forEach((l, i) => {
      l.unlocked = i === 0;
    });

    await this.saveGame();
    await this.loadSavePreviews();
    this.render();
  }

  getRandomFish() {
    const idx = Math.floor(Math.random() * this.fishTypes.length);
    const base = this.fishTypes[idx];
    const variance = 0.8 + Math.random() * 0.4;
    return new Fish({
      ...base,
      value: Math.round(base.value * variance * (1 + this.luckLevel * 0.05)),
      weight: +(base.weight * variance).toFixed(2)
    });
  }

  catchFish() {
    const fish = this.getRandomFish();
    this.inventory.push(fish);
    this.render();
  }

  startAutosave() {
    setInterval(() => {
      if (this.currentSlot !== null) {
        this.saveGame();
      }
    }, 15000);
  }

 async saveGame() {
  if (this.currentSlot === null) return;

  const data = {
    money: this.money,
    inventory: this.inventory.map(f => ({
      fishName: f.fishName,
      rarity: f.rarity,
      value: f.value,
      weight: f.weight,
      color1: f.color1,
      color2: f.color2,
      size: f.size,
      difficulty: f.difficulty,
      name: f.fishName
    })),
    currentLocation: this.currentLocation,
    unlockedLocations: this.locations.map(l => l.unlocked),
    rodLevel: this.rodLevel,
    selectedBait: this.selectedBait,
    luckLevel: this.luckLevel,
    baitStock: this.baitStock.map(b => b === Infinity ? -1 : b),
    timestamp: Date.now()
  };

  if (SaveData.isAvailable()) {
    await SaveData.set('fishSlot' + this.currentSlot, data);
    this.saveSlotPreviews[this.currentSlot] = data;
    console.log('Saved slot', this.currentSlot, data);
  }
}

  async loadGame(slot) {
  if (!SaveData.isAvailable()) return;

  const data = await SaveData.get('fishSlot' + slot);
  if (!data) {
    console.warn('No save found for slot', slot);
    return;
  }

  this.money = data.money ?? 0;
  this.inventory = (data.inventory || []).map(f => new Fish(f));
  this.currentLocation = data.currentLocation ?? 0;
  this.rodLevel = data.rodLevel ?? 0;
  this.selectedBait = data.selectedBait ?? 0;
  this.luckLevel = data.luckLevel ?? 0;
  this.baitStock = Array.isArray(data.baitStock)
    ? data.baitStock.map(b => b === -1 ? Infinity : b)
    : [Infinity, 0, 0, 0, 0, 0, 0, 0];

  if (Array.isArray(data.unlockedLocations)) {
    this.locations.forEach((loc, i) => {
      loc.unlocked = !!data.unlockedLocations[i];
    });
  }

  this.currentSlot = slot;
  this.menuOpen = false;
  this.state = 'idle';

  console.log('Loaded slot', slot, data);
}

  render() {
    const moneyEl = document.getElementById('moneyDisplay');
    if (moneyEl) moneyEl.textContent = `$${this.money}`;

    const invEl = document.getElementById('inventoryDisplay');
    if (invEl) {
      invEl.innerHTML = this.inventory.map(f =>
        `<div class="fish-row">${f.fishName} - ${f.rarity} - $${f.value}</div>`
      ).join('');
    }

    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#87ceeb';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#0d47a1';
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Pixel Fishing', 24, 40);
      this.ctx.font = '16px Arial';
      this.ctx.fillText(`Money: $${this.money}`, 24, 70);
      this.ctx.fillText(`Inventory: ${this.inventory.length}`, 24, 95);
      this.ctx.fillText(`Slot: ${this.currentSlot === null ? 'None' : this.currentSlot}`, 24, 120);
    }
  }

  gameLoop() {
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (!window.game) {
    new Game();
  }
});
