class Fish extends GameObject {
  constructor(data) {
    super(0, 0, data.size, data.size * 0.5);
    this.name = 'Fish';
    this.fishName = data.name;
    this.rarity = data.rarity;
    this.value = data.value;
    this.difficulty = data.difficulty;
    this.color1 = data.color1;
    this.color2 = data.color2;
    this.size = data.size;
    this.weight = data.weight;
  }
  draw(ctx) {
    this.drawFish(ctx, this.x, this.y, this.width * 0.5);
  }
  drawFish(ctx, cx, cy, scale) {
    let w = scale * 2;
    let h = scale;
    ctx.fillStyle = this.color1;
    ctx.fillRect(Math.floor(cx - w/2), Math.floor(cy - h/2), Math.floor(w * 0.7), Math.floor(h));
    ctx.fillStyle = this.color2;
    ctx.fillRect(Math.floor(cx + w * 0.2), Math.floor(cy - h * 0.7), Math.floor(w * 0.3), Math.floor(h * 1.4));
    ctx.fillStyle = '#fff';
    ctx.fillRect(Math.floor(cx - w * 0.35), Math.floor(cy - h * 0.2), 4, 4);
    ctx.fillStyle = '#000';
    ctx.fillRect(Math.floor(cx - w * 0.33), Math.floor(cy - h * 0.15), 2, 2);
  }
}

Fish.TYPES = [
  // Pond (8 fish)
  { name: 'Sardine', rarity: 'common', value: 5, difficulty: 1, size: 20, color1: '#7a9eb2', color2: '#5a7e92', weight: [0.1, 0.5], chance: 30, locations: ['pond'] },
  { name: 'Perch', rarity: 'common', value: 10, difficulty: 1.5, size: 28, color1: '#8ba', color2: '#6a8', weight: [0.5, 2], chance: 22, locations: ['pond'] },
  { name: 'Minnow', rarity: 'common', value: 3, difficulty: 1, size: 14, color1: '#9ab8c8', color2: '#7a98a8', weight: [0.05, 0.3], chance: 20, locations: ['pond'] },
  { name: 'Bluegill', rarity: 'uncommon', value: 20, difficulty: 2, size: 24, color1: '#4477aa', color2: '#335588', weight: [0.3, 1.5], chance: 12, locations: ['pond'] },
  { name: 'Crayfish', rarity: 'uncommon', value: 15, difficulty: 2.5, size: 18, color1: '#cc4422', color2: '#aa3311', weight: [0.2, 1], chance: 8, locations: ['pond'] },
  { name: 'Pond Turtle', rarity: 'rare', value: 60, difficulty: 3.5, size: 30, color1: '#556b2f', color2: '#2e4a1a', weight: [2, 6], chance: 4, locations: ['pond'] },
  { name: 'Albino Frog', rarity: 'epic', value: 150, difficulty: 5, size: 20, color1: '#ffe0e0', color2: '#ffaaaa', weight: [0.5, 2], chance: 2, locations: ['pond'] },
  { name: 'Golden Koi', rarity: 'legendary', value: 500, difficulty: 7, size: 40, color1: '#ffd700', color2: '#ff8c00', weight: [2, 8], chance: 1, locations: ['pond'] },
  // River (10 fish)
  { name: 'Trout', rarity: 'common', value: 15, difficulty: 2, size: 32, color1: '#8a9a6a', color2: '#6a7a4a', weight: [1, 4], chance: 25, locations: ['river'] },
  { name: 'Chub', rarity: 'common', value: 12, difficulty: 1.5, size: 26, color1: '#9a8a6a', color2: '#7a6a4a', weight: [0.5, 3], chance: 18, locations: ['river'] },
  { name: 'Bass', rarity: 'uncommon', value: 25, difficulty: 2.5, size: 36, color1: '#4a7a4a', color2: '#3a5a3a', weight: [1, 5], chance: 15, locations: ['river'] },
  { name: 'Catfish', rarity: 'uncommon', value: 40, difficulty: 3, size: 44, color1: '#8a7a5a', color2: '#6a5a3a', weight: [2, 8], chance: 12, locations: ['river'] },
  { name: 'Pike', rarity: 'uncommon', value: 35, difficulty: 3.5, size: 50, color1: '#5a7a3a', color2: '#3a5a2a', weight: [3, 10], chance: 10, locations: ['river'] },
  { name: 'Salmon', rarity: 'rare', value: 75, difficulty: 4, size: 48, color1: '#e87070', color2: '#c85050', weight: [3, 12], chance: 7, locations: ['river'] },
  { name: 'Rainbow Trout', rarity: 'rare', value: 90, difficulty: 4.5, size: 38, color1: '#ee7799', color2: '#77ccaa', weight: [2, 8], chance: 5, locations: ['river'] },
  { name: 'Electric Eel', rarity: 'epic', value: 200, difficulty: 6, size: 55, color1: '#ddcc00', color2: '#aaaa00', weight: [5, 15], chance: 3, locations: ['river'] },
  { name: 'River King', rarity: 'legendary', value: 600, difficulty: 7.5, size: 56, color1: '#2288aa', color2: '#115577', weight: [10, 25], chance: 1, locations: ['river'] },
  // Ocean (10 fish)
  { name: 'Mackerel', rarity: 'common', value: 20, difficulty: 2.5, size: 34, color1: '#5588aa', color2: '#336688', weight: [1, 5], chance: 22, locations: ['ocean'] },
  { name: 'Flounder', rarity: 'common', value: 18, difficulty: 2, size: 30, color1: '#aa9966', color2: '#887744', weight: [1, 4], chance: 18, locations: ['ocean'] },
  { name: 'Red Snapper', rarity: 'uncommon', value: 45, difficulty: 3.5, size: 40, color1: '#cc4444', color2: '#aa2222', weight: [2, 10], chance: 14, locations: ['ocean'] },
  { name: 'Barracuda', rarity: 'uncommon', value: 55, difficulty: 4, size: 52, color1: '#8899aa', color2: '#667788', weight: [3, 12], chance: 10, locations: ['ocean'] },
  { name: 'Tuna', rarity: 'rare', value: 90, difficulty: 4.5, size: 52, color1: '#4455aa', color2: '#223388', weight: [5, 20], chance: 8, locations: ['ocean'] },
  { name: 'Manta Ray', rarity: 'rare', value: 110, difficulty: 5, size: 60, color1: '#334455', color2: '#1a2a3a', weight: [8, 25], chance: 6, locations: ['ocean'] },
  { name: 'Swordfish', rarity: 'epic', value: 150, difficulty: 5.5, size: 60, color1: '#6a6aaa', color2: '#4a4a8a', weight: [10, 30], chance: 4, locations: ['ocean'] },
  { name: 'Blue Marlin', rarity: 'epic', value: 200, difficulty: 6, size: 65, color1: '#2244aa', color2: '#112266', weight: [15, 40], chance: 3, locations: ['ocean'] },
  { name: 'Hammerhead', rarity: 'legendary', value: 800, difficulty: 8, size: 70, color1: '#667788', color2: '#445566', weight: [30, 60], chance: 0.8, locations: ['ocean'] },
  // Swamp (8 fish)
  { name: 'Mudfish', rarity: 'common', value: 12, difficulty: 2, size: 26, color1: '#6a5a3a', color2: '#4a3a1a', weight: [0.5, 3], chance: 28, locations: ['swamp'] },
  { name: 'Swamp Eel', rarity: 'common', value: 18, difficulty: 2.5, size: 40, color1: '#4a5a2a', color2: '#3a4a1a', weight: [1, 5], chance: 22, locations: ['swamp'] },
  { name: 'Snapping Turtle', rarity: 'uncommon', value: 35, difficulty: 3.5, size: 34, color1: '#5a6a3a', color2: '#3a4a2a', weight: [3, 10], chance: 15, locations: ['swamp'] },
  { name: 'Gar', rarity: 'uncommon', value: 50, difficulty: 4, size: 55, color1: '#7a8a5a', color2: '#5a6a3a', weight: [5, 15], chance: 12, locations: ['swamp'] },
  { name: 'Bullfrog King', rarity: 'rare', value: 80, difficulty: 4.5, size: 28, color1: '#2a8a2a', color2: '#1a6a1a', weight: [2, 6], chance: 8, locations: ['swamp'] },
  { name: 'Alligator Gar', rarity: 'rare', value: 120, difficulty: 5.5, size: 65, color1: '#5a6a4a', color2: '#3a4a2a', weight: [10, 30], chance: 5, locations: ['swamp'] },
  { name: 'Swamp Hydra', rarity: 'epic', value: 300, difficulty: 7, size: 60, color1: '#2a5a1a', color2: '#1a3a0a', weight: [15, 40], chance: 3, locations: ['swamp'] },
  { name: 'Bayou Beast', rarity: 'legendary', value: 700, difficulty: 8.5, size: 75, color1: '#3a2a1a', color2: '#1a1a0a', weight: [40, 80], chance: 0.7, locations: ['swamp'] },
  // Deep Sea (10 fish)
  { name: 'Lanternfish', rarity: 'common', value: 30, difficulty: 3, size: 22, color1: '#2a2a55', color2: '#1a1a44', weight: [0.5, 2], chance: 22, locations: ['deepsea'] },
  { name: 'Anglerfish', rarity: 'uncommon', value: 55, difficulty: 4, size: 36, color1: '#333355', color2: '#222244', weight: [2, 8], chance: 18, locations: ['deepsea'] },
  { name: 'Viperfish', rarity: 'uncommon', value: 70, difficulty: 4.5, size: 30, color1: '#2a2a4a', color2: '#1a1a3a', weight: [1, 5], chance: 12, locations: ['deepsea'] },
  { name: 'Giant Squid', rarity: 'rare', value: 120, difficulty: 5, size: 64, color1: '#882244', color2: '#661133', weight: [15, 40], chance: 10, locations: ['deepsea'] },
  { name: 'Goblin Shark', rarity: 'rare', value: 150, difficulty: 5.5, size: 58, color1: '#996677', color2: '#775566', weight: [10, 30], chance: 8, locations: ['deepsea'] },
  { name: 'Oarfish', rarity: 'epic', value: 200, difficulty: 6, size: 72, color1: '#aaaacc', color2: '#8888aa', weight: [20, 50], chance: 6, locations: ['deepsea'] },
  { name: 'Vampire Squid', rarity: 'epic', value: 300, difficulty: 7, size: 44, color1: '#550022', color2: '#330011', weight: [5, 15], chance: 3, locations: ['deepsea'] },
  { name: 'Colossal Octopus', rarity: 'epic', value: 350, difficulty: 7.5, size: 68, color1: '#663344', color2: '#442233', weight: [25, 60], chance: 2, locations: ['deepsea'] },
  { name: 'Leviathan', rarity: 'legendary', value: 1000, difficulty: 9, size: 80, color1: '#8a2be2', color2: '#4b0082', weight: [50, 100], chance: 0.5, locations: ['deepsea'] },
  // Arctic (8 fish)
  { name: 'Arctic Char', rarity: 'common', value: 25, difficulty: 3, size: 32, color1: '#aabbcc', color2: '#8899aa', weight: [1, 5], chance: 25, locations: ['arctic'] },
  { name: 'Ice Cod', rarity: 'common', value: 20, difficulty: 2.5, size: 28, color1: '#99aacc', color2: '#7788aa', weight: [0.5, 4], chance: 22, locations: ['arctic'] },
  { name: 'Narwhal', rarity: 'uncommon', value: 80, difficulty: 4.5, size: 60, color1: '#8899bb', color2: '#667799', weight: [10, 30], chance: 15, locations: ['arctic'] },
  { name: 'Frost Salmon', rarity: 'uncommon', value: 55, difficulty: 3.5, size: 42, color1: '#aaddff', color2: '#88bbdd', weight: [3, 10], chance: 12, locations: ['arctic'] },
  { name: 'Polar Eel', rarity: 'rare', value: 110, difficulty: 5, size: 50, color1: '#ccddee', color2: '#aabbcc', weight: [5, 15], chance: 8, locations: ['arctic'] },
  { name: 'Glacier Whale', rarity: 'rare', value: 160, difficulty: 6, size: 75, color1: '#6688aa', color2: '#446688', weight: [30, 70], chance: 5, locations: ['arctic'] },
  { name: 'Frost Wyrm', rarity: 'epic', value: 400, difficulty: 7.5, size: 70, color1: '#bbddff', color2: '#88aadd', weight: [20, 50], chance: 3, locations: ['arctic'] },
  { name: 'Ice Titan', rarity: 'legendary', value: 1200, difficulty: 9, size: 85, color1: '#ddeeff', color2: '#aaccff', weight: [60, 120], chance: 0.6, locations: ['arctic'] },
  // Volcano (8 fish)
  { name: 'Lava Goby', rarity: 'common', value: 30, difficulty: 3.5, size: 24, color1: '#cc5522', color2: '#aa3311', weight: [0.5, 3], chance: 25, locations: ['volcano'] },
  { name: 'Magma Crab', rarity: 'common', value: 25, difficulty: 3, size: 20, color1: '#dd4411', color2: '#bb2200', weight: [0.3, 2], chance: 20, locations: ['volcano'] },
  { name: 'Ember Eel', rarity: 'uncommon', value: 65, difficulty: 4.5, size: 45, color1: '#ff6622', color2: '#cc4400', weight: [3, 10], chance: 15, locations: ['volcano'] },
  { name: 'Obsidian Bass', rarity: 'uncommon', value: 75, difficulty: 5, size: 40, color1: '#2a2a2a', color2: '#1a1a1a', weight: [5, 15], chance: 12, locations: ['volcano'] },
  { name: 'Pyroclast Ray', rarity: 'rare', value: 140, difficulty: 6, size: 55, color1: '#ff4400', color2: '#dd2200', weight: [8, 25], chance: 8, locations: ['volcano'] },
  { name: 'Inferno Shark', rarity: 'rare', value: 180, difficulty: 6.5, size: 62, color1: '#ee3300', color2: '#aa1100', weight: [15, 35], chance: 5, locations: ['volcano'] },
  { name: 'Molten Leviathan', rarity: 'epic', value: 500, difficulty: 8, size: 74, color1: '#ff8800', color2: '#ff4400', weight: [30, 70], chance: 3, locations: ['volcano'] },
  { name: 'Phoenix Fish', rarity: 'legendary', value: 2000, difficulty: 9.5, size: 80, color1: '#ffdd00', color2: '#ff6600', weight: [40, 100], chance: 0.5, locations: ['volcano'] },
  // Mystic Lake (10 fish)
  { name: 'Wisp Minnow', rarity: 'common', value: 25, difficulty: 3, size: 18, color1: '#bbccff', color2: '#99aadd', weight: [0.2, 1], chance: 20, locations: ['mystic'] },
  { name: 'Spirit Fish', rarity: 'uncommon', value: 60, difficulty: 4, size: 38, color1: '#aaeeff', color2: '#77ccdd', weight: [1, 5], chance: 18, locations: ['mystic'] },
  { name: 'Fae Trout', rarity: 'uncommon', value: 80, difficulty: 4.5, size: 34, color1: '#cc99ff', color2: '#aa77dd', weight: [2, 6], chance: 14, locations: ['mystic'] },
  { name: 'Moonbeam Bass', rarity: 'rare', value: 120, difficulty: 5.5, size: 42, color1: '#eeeeff', color2: '#ccccff', weight: [3, 10], chance: 10, locations: ['mystic'] },
  { name: 'Phantom Eel', rarity: 'rare', value: 160, difficulty: 6, size: 56, color1: '#9966cc', color2: '#774499', weight: [5, 15], chance: 8, locations: ['mystic'] },
  { name: 'Crystal Carp', rarity: 'epic', value: 400, difficulty: 7.5, size: 48, color1: '#ccddff', color2: '#99aadd', weight: [3, 10], chance: 5, locations: ['mystic'] },
  { name: 'Enchanted Jellyfish', rarity: 'epic', value: 350, difficulty: 7, size: 40, color1: '#ff88ff', color2: '#cc55cc', weight: [2, 8], chance: 4, locations: ['mystic'] },
  { name: 'Dragon Fish', rarity: 'legendary', value: 1500, difficulty: 9.5, size: 76, color1: '#ff4400', color2: '#cc2200', weight: [20, 60], chance: 1.5, locations: ['mystic'] },
  { name: 'The Ancient One', rarity: 'legendary', value: 3000, difficulty: 10, size: 90, color1: '#ffd700', color2: '#8a2be2', weight: [80, 150], chance: 0.3, locations: ['mystic'] },
  // Coral Reef (10 fish)
  { name: 'Clownfish', rarity: 'common', value: 30, difficulty: 3, size: 18, color1: '#ff6622', color2: '#ffffff', weight: [0.2, 1], chance: 25, locations: ['coral'] },
  { name: 'Parrotfish', rarity: 'common', value: 35, difficulty: 3.5, size: 32, color1: '#22cc88', color2: '#1188dd', weight: [1, 5], chance: 20, locations: ['coral'] },
  { name: 'Sea Anemone', rarity: 'uncommon', value: 55, difficulty: 4, size: 22, color1: '#ff44aa', color2: '#cc2288', weight: [0.5, 3], chance: 15, locations: ['coral'] },
  { name: 'Moorish Idol', rarity: 'uncommon', value: 70, difficulty: 4.5, size: 28, color1: '#ffdd00', color2: '#222222', weight: [1, 4], chance: 12, locations: ['coral'] },
  { name: 'Lionfish', rarity: 'rare', value: 130, difficulty: 5.5, size: 36, color1: '#cc2222', color2: '#ffeeee', weight: [2, 8], chance: 8, locations: ['coral'] },
  { name: 'Napoleon Wrasse', rarity: 'rare', value: 180, difficulty: 6, size: 58, color1: '#2266bb', color2: '#44aadd', weight: [10, 35], chance: 6, locations: ['coral'] },
  { name: 'Mantis Shrimp', rarity: 'epic', value: 350, difficulty: 7, size: 24, color1: '#ff2288', color2: '#22ff88', weight: [1, 4], chance: 4, locations: ['coral'] },
  { name: 'Blue Ring Octopus', rarity: 'epic', value: 450, difficulty: 7.5, size: 20, color1: '#ffcc00', color2: '#0044ff', weight: [0.5, 2], chance: 3, locations: ['coral'] },
  { name: 'Reef Serpent', rarity: 'legendary', value: 1800, difficulty: 9, size: 70, color1: '#00ddaa', color2: '#ff4488', weight: [15, 50], chance: 0.8, locations: ['coral'] },
  { name: 'Coral Guardian', rarity: 'legendary', value: 2500, difficulty: 9.5, size: 80, color1: '#ff88cc', color2: '#88ffcc', weight: [30, 80], chance: 0.4, locations: ['coral'] },
  // The Abyss (10 fish)
  { name: 'Shadow Minnow', rarity: 'common', value: 40, difficulty: 4, size: 16, color1: '#1a1a2a', color2: '#0a0a1a', weight: [0.1, 1], chance: 22, locations: ['abyss'] },
  { name: 'Phantom Jellyfish', rarity: 'common', value: 50, difficulty: 4.5, size: 30, color1: '#2a1a4a', color2: '#1a0a3a', weight: [1, 4], chance: 18, locations: ['abyss'] },
  { name: 'Abyss Crawler', rarity: 'uncommon', value: 90, difficulty: 5, size: 38, color1: '#0a0a2a', color2: '#050515', weight: [3, 10], chance: 15, locations: ['abyss'] },
  { name: 'Void Eel', rarity: 'uncommon', value: 120, difficulty: 5.5, size: 52, color1: '#1a0a3a', color2: '#0a0018', weight: [5, 18], chance: 12, locations: ['abyss'] },
  { name: 'Biolume Shark', rarity: 'rare', value: 200, difficulty: 6.5, size: 60, color1: '#002244', color2: '#00ffaa', weight: [15, 40], chance: 8, locations: ['abyss'] },
  { name: 'Kraken Spawn', rarity: 'rare', value: 280, difficulty: 7, size: 55, color1: '#330022', color2: '#660044', weight: [10, 30], chance: 6, locations: ['abyss'] },
  { name: 'Abyssal Worm', rarity: 'epic', value: 500, difficulty: 8, size: 80, color1: '#1a0a1a', color2: '#3a1a3a', weight: [30, 70], chance: 4, locations: ['abyss'] },
  { name: 'Deep Horror', rarity: 'epic', value: 650, difficulty: 8.5, size: 74, color1: '#220022', color2: '#440044', weight: [25, 60], chance: 2.5, locations: ['abyss'] },
  { name: 'Eldritch Leviathan', rarity: 'legendary', value: 2500, difficulty: 9.5, size: 90, color1: '#1a0a3a', color2: '#00ff66', weight: [60, 140], chance: 0.5, locations: ['abyss'] },
  { name: 'The Devourer', rarity: 'legendary', value: 4000, difficulty: 10, size: 95, color1: '#000000', color2: '#330033', weight: [100, 200], chance: 0.2, locations: ['abyss'] },
  // Lost Paradise (10 fish)
  { name: 'Paradise Guppy', rarity: 'common', value: 45, difficulty: 3.5, size: 16, color1: '#44ddff', color2: '#22aacc', weight: [0.2, 1], chance: 22, locations: ['paradise'] },
  { name: 'Tropical Angel', rarity: 'common', value: 55, difficulty: 4, size: 30, color1: '#ffaa22', color2: '#ff6600', weight: [1, 5], chance: 18, locations: ['paradise'] },
  { name: 'Jade Turtle', rarity: 'uncommon', value: 100, difficulty: 5, size: 40, color1: '#22aa44', color2: '#118833', weight: [5, 15], chance: 14, locations: ['paradise'] },
  { name: 'Sun Ray', rarity: 'uncommon', value: 130, difficulty: 5.5, size: 50, color1: '#ffdd44', color2: '#ffaa00', weight: [8, 20], chance: 11, locations: ['paradise'] },
  { name: 'Island Marlin', rarity: 'rare', value: 220, difficulty: 6.5, size: 62, color1: '#2288ff', color2: '#0044aa', weight: [15, 40], chance: 8, locations: ['paradise'] },
  { name: 'Golden Seahorse', rarity: 'rare', value: 300, difficulty: 7, size: 24, color1: '#ffd700', color2: '#ffaa00', weight: [1, 4], chance: 6, locations: ['paradise'] },
  { name: 'Emerald Whale', rarity: 'epic', value: 600, difficulty: 8, size: 85, color1: '#22aa66', color2: '#116633', weight: [50, 100], chance: 4, locations: ['paradise'] },
  { name: 'Rainbow Serpent', rarity: 'epic', value: 750, difficulty: 8.5, size: 70, color1: '#ff4488', color2: '#44ff88', weight: [20, 55], chance: 2.5, locations: ['paradise'] },
  { name: 'Poseidon Bass', rarity: 'legendary', value: 3000, difficulty: 9.5, size: 78, color1: '#0088ff', color2: '#ffd700', weight: [40, 90], chance: 0.6, locations: ['paradise'] },
  { name: 'Island Deity', rarity: 'legendary', value: 5000, difficulty: 10, size: 92, color1: '#ffd700', color2: '#00ffaa', weight: [80, 170], chance: 0.2, locations: ['paradise'] },
  // Eternal Storm (10 fish)
  { name: 'Storm Sardine', rarity: 'common', value: 50, difficulty: 4, size: 20, color1: '#5566aa', color2: '#334488', weight: [0.3, 2], chance: 22, locations: ['storm'] },
  { name: 'Thunder Bass', rarity: 'common', value: 60, difficulty: 4.5, size: 36, color1: '#6677aa', color2: '#445588', weight: [2, 8], chance: 18, locations: ['storm'] },
  { name: 'Lightning Eel', rarity: 'uncommon', value: 110, difficulty: 5.5, size: 50, color1: '#ffff00', color2: '#aaaa00', weight: [5, 15], chance: 14, locations: ['storm'] },
  { name: 'Tempest Ray', rarity: 'uncommon', value: 140, difficulty: 6, size: 55, color1: '#3344aa', color2: '#2233cc', weight: [8, 25], chance: 11, locations: ['storm'] },
  { name: 'Cyclone Shark', rarity: 'rare', value: 250, difficulty: 7, size: 65, color1: '#445577', color2: '#223355', weight: [20, 50], chance: 8, locations: ['storm'] },
  { name: 'Ball Lightning Fish', rarity: 'rare', value: 320, difficulty: 7.5, size: 30, color1: '#ffffff', color2: '#ffff00', weight: [2, 8], chance: 6, locations: ['storm'] },
  { name: 'Hurricane Kraken', rarity: 'epic', value: 700, difficulty: 8.5, size: 78, color1: '#223355', color2: '#112244', weight: [40, 80], chance: 3.5, locations: ['storm'] },
  { name: 'Thor Whale', rarity: 'epic', value: 900, difficulty: 9, size: 88, color1: '#4455cc', color2: '#ffdd00', weight: [60, 120], chance: 2, locations: ['storm'] },
  { name: 'Storm Titan', rarity: 'legendary', value: 4000, difficulty: 9.5, size: 90, color1: '#2233aa', color2: '#ffff44', weight: [70, 150], chance: 0.5, locations: ['storm'] },
  { name: 'Thundergod Serpent', rarity: 'legendary', value: 6000, difficulty: 10, size: 95, color1: '#ffff00', color2: '#4444ff', weight: [100, 200], chance: 0.2, locations: ['storm'] },
  // The Void (10 fish)
  { name: 'Void Wisp', rarity: 'common', value: 60, difficulty: 4.5, size: 14, color1: '#3a1a5a', color2: '#1a0a3a', weight: [0.1, 0.5], chance: 20, locations: ['void'] },
  { name: 'Nebula Fish', rarity: 'common', value: 75, difficulty: 5, size: 28, color1: '#5533aa', color2: '#3322cc', weight: [1, 5], chance: 18, locations: ['void'] },
  { name: 'Starlight Trout', rarity: 'uncommon', value: 140, difficulty: 6, size: 36, color1: '#aabbff', color2: '#6677cc', weight: [3, 10], chance: 14, locations: ['void'] },
  { name: 'Cosmic Jellyfish', rarity: 'uncommon', value: 180, difficulty: 6.5, size: 40, color1: '#cc44ff', color2: '#8822cc', weight: [2, 8], chance: 11, locations: ['void'] },
  { name: 'Dimension Eel', rarity: 'rare', value: 300, difficulty: 7.5, size: 58, color1: '#4400aa', color2: '#aa00ff', weight: [10, 30], chance: 8, locations: ['void'] },
  { name: 'Galaxy Ray', rarity: 'rare', value: 400, difficulty: 8, size: 64, color1: '#110033', color2: '#ff88ff', weight: [15, 45], chance: 5, locations: ['void'] },
  { name: 'Singularity Squid', rarity: 'epic', value: 800, difficulty: 9, size: 70, color1: '#000011', color2: '#ff00ff', weight: [30, 70], chance: 3.5, locations: ['void'] },
  { name: 'Reality Bender', rarity: 'epic', value: 1200, difficulty: 9.5, size: 76, color1: '#2a0a4a', color2: '#00ffff', weight: [40, 90], chance: 2, locations: ['void'] },
  { name: 'Cosmic Wyrm', rarity: 'legendary', value: 6000, difficulty: 10, size: 92, color1: '#aa00ff', color2: '#00ffaa', weight: [80, 180], chance: 0.4, locations: ['void'] },
  { name: 'The Eternal', rarity: 'legendary', value: 10000, difficulty: 10, size: 100, color1: '#ffffff', color2: '#000000', weight: [150, 300], chance: 0.1, locations: ['void'] }
];

Fish.rollFish = function(luckBonus, locationId) {
  locationId = locationId || 'pond';
  let pool = Fish.TYPES.filter(f => f.locations.includes(locationId));
  if (pool.length === 0) pool = Fish.TYPES.filter(f => f.locations.includes('pond'));
  let sorted = pool.slice().sort((a, b) => a.chance - b.chance);
  let boosted = sorted.map(f => {
    let c = f.chance;
    if (f.rarity === 'legendary') c += luckBonus * 3;
    else if (f.rarity === 'epic') c += luckBonus * 2;
    else if (f.rarity === 'rare') c += luckBonus * 1.5;
    else if (f.rarity === 'uncommon') c += luckBonus * 0.5;
    return { ...f, boostedChance: c };
  });
  let total = boosted.reduce((s, f) => s + f.boostedChance, 0);
  let roll = Math.random() * total;
  let acc = 0;
  for (let t of boosted) {
    acc += t.boostedChance;
    if (roll < acc) {
      let w = t.weight[0] + Math.random() * (t.weight[1] - t.weight[0]);
      let valueBonus = Math.round(t.value * (luckBonus * 0.03));
      return new Fish({ ...t, weight: Math.round(w * 10) / 10, value: t.value + valueBonus });
    }
  }
  return new Fish({ ...pool[0], weight: 0.3 });
};