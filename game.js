import * as THREE from 'three';
import SFX from './sounds.js';

// ============================================================ config
const W = 960, D = 960, H = 28;      // world size (x, z, height) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â 2.5x the old map
const CH = 32;                       // region size along x/z (edited regions are rebuilt as a whole)
const AIR = 0, GRASS = 1, DIRT = 2, STONE = 3, WOOD = 4, LEAVES = 5, SAND = 6, WATER = 7, MEAT = 8, CACTUS = 9, TALL_GRASS = 10, SKATE = 11, DRONE = 12, COMP = 13;   // SKATE is an item/entity only ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â never written into the blocks array
const WL = 6;                        // water level ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â water fills y <= WL where terrain is lower

// player
const EYE = 1.62, PHEIGHT = 1.8, PHALF = 0.3;
const GRAVITY = 26, JUMP_V = 8.4, WALK_SPEED = 4.4, SPRINT_MULT = 1.55;
// swimming (simplified Minecraft): slower horizontal speed in water, weak gravity,
// Space floats you back to the surface, Shift makes you dive down
const SWIM_SPEED_MULT = 0.62,   // swim speed vs land walk (vanilla-ish "much slower")
      WATER_GRAV_MULT = 0.35,   // scaled-down gravity while any part of the body is in water
      WATER_FALL_CAP = -4.2,    // max sink speed passively ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â falling into water never hurts / kills
      SWIM_RISE_SPEED = 2.9;    // upward velocity you accelerate toward while holding Space
const REACH = 6;
// ============================================================ settings (persisted to localStorage, applied live)
const DRAW_DISTS = [ { far: 72, label: 'Short' }, { far: 120, label: 'Normal' }, { far: 240, label: 'Far' }, { far: 480, label: 'Ultra' } ];
const SET = { drawFar: 120, sens: 1.0, fov: 67, vol: 0.55, invertY: false, particles: true, debug: true };   // debug = top-left fps/pos readout
(function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('cubeworld.settings') || '{}');
    if (typeof s.drawFar === 'number' && DRAW_DISTS.some(d => d.far === s.drawFar)) SET.drawFar = s.drawFar;
    if (typeof s.sens === 'number')   SET.sens      = Math.max(0.1, Math.min(3, s.sens));
    if (typeof s.fov === 'number')    SET.fov       = Math.max(45, Math.min(110, s.fov));
    if (typeof s.vol === 'number')    SET.vol       = Math.max(0, Math.min(1, s.vol));
    if (typeof s.invertY === 'boolean')   SET.invertY   = s.invertY;
    if (typeof s.particles === 'boolean') SET.particles = s.particles;
      if (typeof s.debug === 'boolean')     SET.debug     = s.debug;
  } catch {}      // storage unavailable -> defaults
})();
function saveSettings() { try { localStorage.setItem('cubeworld.settings', JSON.stringify(SET)); } catch {} }
// apply settings to the running game - everything takes effect immediately, no "Apply" button needed
function applyFogBase() {
  const sub = _wasSubmerged === true;      // keep the tight blue fog while submerged until we surface again
  scene.fog.near = sub ? 2 : SET.drawFar * 0.4;
  scene.fog.far = sub ? 60 : SET.drawFar;
}
function applyFov() { camera.fov = SET.fov; camera.updateProjectionMatrix(); }
// dynamic FOV (runs every frame in the main loop, on top of the settings value):
//   - riding a skateboard: locked wide at SKATE_RIDE_FOV, whatever SET.fov is - reverts to SET.fov on dismount / crash-buck
//   - on foot while sprinting: +SPRINT_FOV_BOOST, eased in/out so it never snaps
const SKATE_RIDE_FOV = 100;      // skateboard camera width (overrides the user's FOV setting for the duration of the ride)
const DRONE_FLIGHT_FOV = 96;   // wide FPV-goggles width while piloting the quad (reverts to SET.fov on exit/detonation)
  const SPRINT_FOV_BOOST = 8;      // subtle widen while sprinting on foot
const FOV_SMOOTH_K = 7;          // how fast the live FOV chases its target (~1/FOV_SMOOTH_K s time constant)
let dynFov = null;               // current smoothed value; starts at the target on the first frame
function applyDynamicFov(dt) {
  const sprintingOnFoot = player.sprinting && !activeRide && !mlrs.active && !_pilotDrone;
  const target = activeRide ? SKATE_RIDE_FOV : _pilotDrone ? DRONE_FLIGHT_FOV : SET.fov + (sprintingOnFoot ? SPRINT_FOV_BOOST : 0);
  if (dynFov === null) dynFov = target;                                   // first frame: start where the target is
  else {
    dynFov += (target - dynFov) * Math.min(1, dt * FOV_SMOOTH_K);         // exponential ease toward the target
    if (Math.abs(target - dynFov) < 0.01) dynFov = target;                // settle exactly, no endless creep
  }
  if (camera.fov !== dynFov) { camera.fov = dynFov; camera.updateProjectionMatrix(); }
}
function applyParticles() { particlePoints.visible = SET.particles; }

// ============================================================ sound hooks
const STEP_DIST = 2.1;      // world units travelled per footstep
let stepAccum = 0;
function surfaceUnderFoot() {
  const fy = Math.floor(player.pos.y - EYE - 0.2);     // block just under the soles (feet rest ~0.02 above the surface)
  for (const [ox, oz] of [[0, 0], [0.25, 0], [-0.25, 0], [0, 0.25], [0, -0.25]]) {
    const id = blockAt(Math.floor(player.pos.x + ox), fy, Math.floor(player.pos.z + oz));
    if (id !== AIR && id !== TALL_GRASS) return id;   // walk-through grass is not "solid underfoot"
  }
  return DIRT;                                          // no solid underfoot ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â treat as dirt
}

// ============================================================ seeded rng (stable world per load)
let seedState = 90210;
function rnd() {
  seedState |= 0; seedState = (seedState + 0x6D2B79F5) | 0;
  let t = Math.imul(seedState ^ (seedState >>> 15), 1 | seedState);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// ============================================================ value noise for terrain
function hash2(x, z) { const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function vnoise(x, z) {
  const xi = Math.floor(x), zi = Math.floor(z);
  const fx = x - xi, fz = z - zi;
  const sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
  const a = hash2(xi, zi), b = hash2(xi + 1, zi), c = hash2(xi, zi + 1), d = hash2(xi + 1, zi + 1);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}

// 3D value noise (for caves)
function hash3(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); }
function vnoise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const fx = x - xi, fy = y - yi, fz = z - zi;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), sz = fz * fz * (3 - 2 * fz);
  let r = 0;
  for (let dz = 0; dz < 2; dz++) for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
    const w = (dx ? sx : 1 - sx) * (dy ? sy : 1 - sy) * (dz ? sz : 1 - sz);
    r += w * hash3(xi + dx, yi + dy, zi + dz);
  }
  return r;
}

// ============================================================ world storage
const blocks = new Uint8Array(W * H * D);
const idx = (x, y, z) => (z * W + x) * H + y;
function inBounds(x, y, z) { return x >= 0 && x < W && z >= 0 && z < D && y >= 0 && y < H; }
function blockAt(x, y, z) { return inBounds(x, y, z) ? blocks[idx(x, y, z)] : AIR; }
// --- sand physics (simple): the only block that "falls", and it animates. Removing a block whose cell
//     above is sand marks it dirty; each frame every unsupported dirty sand leaves the grid and becomes
//     an animated box in `fallingSand` (see updateFallingSand) which drops with gravity down its column
//     and bakes back into the world when it lands. The AIR write re-marks whatever sat on its old spot,
//     so whole stacks pour through one break. ---
const SAND_GRAVITY = 45;            // much quicker than player gravity - sand shouldn't float like a feather
const sandDirty = new Set();        // cell keys (idx) pending a fall check
function setBlockRaw(x, y, z, id) {
  if (!inBounds(x, y, z)) return;
  blocks[idx(x, y, z)] = id;
  if (id === AIR && inBounds(x, y + 1, z) && blocks[idx(x, y + 1, z)] === SAND) sandDirty.add(idx(x, y + 1, z));   // sand resting on the removed cell starts falling
  else if (id === SAND && !supportsSandBelow(x, y, z)) sandDirty.add(idx(x, y, z));                                // placed with no floor under it: sink on the next tick too
}
function supportsSandBelow(x, y, z) {
  if (!inBounds(x, y - 1, z)) return true;    // base layer / off-map holds
  const b = blocks[idx(x, y - 1, z)];
  return b !== AIR && b !== WATER;            // air and water give no support (sand sinks through)
}
// anything solid-ish a grain can rest on (tall grass doesn't hold it up either)
function holdsSand(x, y, z) { const b = blockAt(x, y, z); return b !== AIR && b !== WATER && b !== TALL_GRASS; }
const fallingSand = [];                 // animated grains: { ix, iz, y (float bottom edge), vy, mesh }
let _sandBoxGeo = null;                 // one shared unit cube for every grain
function sandTick() {                   // grid -> entity conversion. Called once per frame from animate().
  if (!sandDirty.size) return;
  const cells = [...sandDirty];         // snapshot: the AIR writes below re-mark dirty entries as they go
  sandDirty.clear();
  const regions = new Set();
  for (const i of cells) {
    const y = i % H, xz = (i - y) / H, z = Math.floor(xz / W), x = xz % W;
    if (blockAt(x, y, z) !== SAND || supportsSandBelow(x, y, z)) continue;   // now supported, or already converted this tick
    setBlockRaw(x, y, z, AIR);         // leaves the grid -> becomes an animated grain (re-marks the sand above it)
    if (!_sandBoxGeo) {
      // materials use vertexColors (baked brightness from chunk meshes), so the grain needs its own color attribute or it renders black
      _sandBoxGeo = new THREE.BoxGeometry(1, 1, 1);
      const vCount = _sandBoxGeo.getAttribute('position').count;
      _sandBoxGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(vCount * 3).fill(1), 3));   // full-bright: pure texture
    }
    const mesh = new THREE.Mesh(_sandBoxGeo, materials.sand);
    scene.add(mesh);
    fallingSand.push({ ix: x, iz: z, y: y + 0.98, vy: -1.2, mesh });   // start a hair above the vacated cell with a tiny kick so it visibly leaves
    regions.add(Math.floor(x / CH) + ',' + Math.floor(z / CH));        // x/z never change, so one region per conversion
  }
  if (regions.size) {
    for (const k of regions) { const [a, b] = k.split(','); buildChunk(+a, +b); }
    rebuildWater();
  }
}
function updateFallingSand(dt) {        // entity -> grid. Each grain free-falls straight down its column and bakes in at the first solid below.
  if (!fallingSand.length) return;
  const landedRegions = new Set();
  for (let i = fallingSand.length - 1; i >= 0; i--) {
    const e = fallingSand[i];
    e.vy -= SAND_GRAVITY * dt;
    e.y += e.vy * dt;
    // deepest open cell we may rest on: topmost solid in our column at or below where we are now (base layer always holds)
    let restY = 0;
    for (let y = Math.min(H - 1, Math.floor(e.y)); y >= 0; y--) if (holdsSand(e.ix, y, e.iz)) { restY = y + 1; break; }
    if (e.vy <= 0 && e.y <= restY) {                                        // hit the floor of its column: try to bake in at the first open cell from restY up
      let done = false;
      for (let ly = Math.max(restY, 0); ly < H && !done; ly++) {
        const b = blocks[idx(e.ix, ly, e.iz)];
        if (b === AIR || b === WATER || b === TALL_GRASS) {
          setBlockRaw(e.ix, ly, e.iz, SAND);   // back into the world (re-marks any sand sitting on top of it again)
          landedRegions.add(Math.floor(e.ix / CH) + ',' + Math.floor(e.iz / CH));
          scene.remove(e.mesh);
          fallingSand.splice(i, 1);
          done = true;
        }
      }
      if (!done) e.y = restY;                // column somehow full right now: hold position and retry next frame
    }
    e.mesh.position.set(e.ix + 0.5, e.y + 0.5, e.iz + 0.5);   // still alive: follow the grain (position set after a possible bake above is harmless)
  }
  if (landedRegions.size) {                  // rebuild landed regions once per frame, then re-merge world water
    for (const k of landedRegions) { const [a, b] = k.split(','); buildChunk(+a, +b); }
    rebuildWater();
  }
}
// solid for physics: treat the void outside the map as walls so you can't fall off
function solidForPhysics(x, y, z) {
  if (y < 0 || y >= H) return false;
  if (x < 0 || x >= W || z < 0 || z >= D) return true;
  const b = blocks[idx(x, y, z)];
  if (b === TALL_GRASS) return false;        // tall grass: no hitbox, you can walk through it
  return b !== AIR && b !== WATER;           // water is walk-through for now (no swimming yet)
}

// ============================================================ terrain generation
function heightAt(x, z) {
  // gentle plains base
  let h = 8 + vnoise(x * 0.05 + 37.2, z * 0.05 + 11.9) * 4.5   // broad rolling
           + vnoise(x * 0.16 + 91.4, z * 0.16 + 53.8) * 2;     // detail bumps
  // small mountains: a mask picks the regions, ridged noise shapes the peaks
  const mm = vnoise(x * 0.035 + 7.7, z * 0.035 + 91.3);
  if (mm > 0.58) {
    const t = (mm - 0.58) / 0.42;
    const ridge = 1 - Math.abs(2 * vnoise(x * 0.09 + 13.7, z * 0.09 + 41.2) - 1);
    h += Math.pow(t, 1.6) * (5 + 13 * ridge);
  }
  // lakes: broad depressions that drop below the water level
  const lm = vnoise(x * 0.028 + 53.1, z * 0.028 + 7.9);
  if (lm > 0.66) h -= Math.pow((lm - 0.66) / 0.34, 1.4) * 6;
  return Math.max(2, Math.min(H - 8, Math.floor(h)));
}

// sandy beaches around the water + patchy dune areas on the plains
function isSandy(x, z, h) {
  if (h <= WL + 1) return true;              // shoreline / beach ring
  const dm = vnoise(x * 0.045 + 23.5, z * 0.045 + 67.3);
  return dm > 0.68 && h < 15;                // dune patches
}

// ---- biomes beyond the plains -------------------------------------------
// desert: a broad inland region of sand with cacti (no trees) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â separate noise field
function desertAt(x, z) { return vnoise(x * 0.02 + 61.8, z * 0.02 + 37.4); }

// forest: dense tree cover in noisy clusters (the old "grass is full of trees" look, now an
// actual biome). All other land is plains ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â open ground with few scattered trees and tall grass.
function forestAt(x, z) { return vnoise(x * 0.017 + 42.6, z * 0.017 + 83.9); }
const FOREST_CUTOFF = 0.58;

// ocean: a meandering coastline along one edge of the map; past it the seafloor sinks.
// The wavy coast makes bays and peninsulas ("half islands"), plus real open water off the edge.
function seaDepthAt(x, z) {
  const coast = D * (0.62 + 0.42 * vnoise(x * 0.016 + 31.4, z * 0.016 + 9.7)); // ~0.62D .. 1.04D
  return Math.max(0, Math.min(13, (z - coast) * 0.38));                        // depth beyond the shore
}

// islands: a few noise-bumped rises standing up out of the open sea
const ISLANDS = [];
{
  let tries = 0;
  while (ISLANDS.length < 4 && tries++ < 600) {
    const x = Math.floor(rnd() * W), z = Math.floor(rnd() * D);
    if (seaDepthAt(x, z) < 5) continue;                       // must stand in genuinely deep water
    let tooClose = false;
    for (const o of ISLANDS) if (Math.hypot(o.x - x, o.z - z) < 100) { tooClose = true; break; }
    if (tooClose) continue;
    ISLANDS.push({ x, z, r: 9 + rnd() * 12, bump: 5 + rnd() * 6 });
  }
}

// river: winds edge-to-edge across the map along x ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â its centreline meanders via noise
function riverZ(x)     { return D * 0.46 + vnoise(x * 0.013 + 71.3, 8.9) * D * 0.22; }
function riverHalfW(x) { return 2.5 + vnoise(x * 0.02 + 15.6, 44.7) * 3.5; }

function setBlockRawIfAir(x, y, z, id) { if (inBounds(x, y, z) && blocks[idx(x, y, z)] === AIR) blocks[idx(x, y, z)] = id; }

function plantTree(x, y, z) {
  const trunkH = 4 + Math.floor(rnd() * 2); // 4ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ5
  for (let i = 0; i < trunkH && y + i < H - 3; i++) setBlockRaw(x, y + i, z, WOOD);
  const topY = y + trunkH - 1;
  const putLeaves = (ly, r, cornerChance) => {
    for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
      if (dx === 0 && dz === 0) continue;               // keep the trunk line clear
      const corner = Math.abs(dx) === r && Math.abs(dz) === r;
      if (corner && rnd() > cornerChance) continue;
      setBlockRawIfAir(x + dx, ly, z + dz, LEAVES);
    }
  };
  putLeaves(topY - 1, 2, 0.45);
  putLeaves(topY, 2, 0.8);
  putLeaves(topY + 1, 1, 0.6);
}

// final terrain height of every column - caves/entrances/trees need the CARVED heights, not heightAt()
const surfH = new Uint8Array(W * D);

function plantCactus(x, y, z) {
  const ch = 2 + Math.floor(rnd() * 3);          // 2-4 tall, like vanilla cacti
  for (let i = 0; i < ch && y + i < H - 1; i++) setBlockRawIfAir(x, y + i, z, CACTUS);
}

function generateWorld() {
  for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
    let h = heightAt(x, z);
    const desert = desertAt(x, z) > 0.62 && h > WL + 1;

    // river: carve a meandering channel edge-to-edge - deep mid-channel, sandy shallow edges
    const dzR = Math.abs(z - riverZ(x)), hw = riverHalfW(x);
    let bankSandy = false;
    if (dzR < hw) {
      h = Math.min(h, Math.floor(WL - 1 - (1 - dzR / hw) * 3));   // bed ~4 below water mid-channel
    } else if (dzR < hw + 2 && h > WL) bankSandy = true;          // sandy banks on both sides

    // ocean: sink everything past the coastline under the water level - bays, peninsulas & open sea
    const sd = seaDepthAt(x, z);
    if (sd > 0) h = Math.max(0, Math.min(h, WL - 1 - Math.floor(sd)));

    // islands: domed rises standing up out of the deep sea (beach fringe via isSandy's shoreline ring)
    for (const isl of ISLANDS) {
      const dx = x - isl.x, dz2 = z - isl.z;
      const r2 = isl.r * isl.r;
      if (dx * dx + dz2 * dz2 < r2) {
        const f = Math.sqrt(1 - (dx * dx + dz2 * dz2) / r2);       // 1 at dome centre -> 0 at its edge
        h = Math.max(h, WL + 1 + Math.pow(f, 1.6) * isl.bump + vnoise(x * 0.25 + isl.x, z * 0.25 + isl.z) * 2);
      }
    }

    const sandy = bankSandy || desert || isSandy(x, z, h);
    surfH[z * W + x] = h;
    for (let y = 0; y <= h; y++) {
      let id;
      if (y === h)                  id = sandy ? SAND : GRASS;   // top layer
      else if (y >= h - (desert ? 4 : 2))  id = sandy ? SAND : DIRT;  // sub-surface band (deeper sand in desert)
      else                           id = STONE;
      blocks[idx(x, y, z)] = id;
    }
    if (h < WL) for (let y = h + 1; y <= WL; y++) blocks[idx(x, y, z)] = WATER;
  }

  // caves ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â carve pockets and tunnels below the surface with 3D noise
  for (let z = 1; z < D - 1; z++) for (let x = 1; x < W - 1; x++) {
    const h = surfH[z * W + x];      // the CARVED surface (rivers/ocean lowered some columns)
    for (let y = 2; y < h - 1; y++) {   // keep a thin shell under the surface layer
      const n = vnoise3(x * 0.09, y * 0.13, z * 0.09) + 0.45 * vnoise3(x * 0.2, y * 0.28, z * 0.2);
      if (n > 1.0) blocks[idx(x, y, z)] = AIR;
    }
  }

  // surface cave entrances ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â find a nearby cave column and dig a shaft down to it
  const nEntrances = 36;   // tripled (was 12) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â map got bigger
  for (let e = 0; e < nEntrances; e++) {
    let ax, az, ah, tries = 0;
    do {
      ax = 8 + Math.floor(rnd() * (W - 16));
      az = 8 + Math.floor(rnd() * (D - 16));
      ah = surfH[az * W + ax];
      tries++;
    } while ((ah <= WL || isSandy(ax, az, ah)) && tries < 20); // only on dry, non-sand land
    let ex = -1, ez = -1;
    for (let r = 0; r <= 24 && ex < 0; r++) {      // ring search for a cave column
      for (let dz = -r; dz <= r && ex < 0; dz++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        const cx2 = ax + dx, cz2 = az + dz;
        if (!inBounds(cx2, 3, cz2)) continue;
        const h2 = surfH[cz2 * W + cx2];
        let hasCave = false;
        for (let y = Math.max(2, h2 - 14); y < h2 - 1; y++) {
          if (blockAt(cx2, y, cz2) === AIR) { hasCave = true; break; }
        }
        if (hasCave) { ex = cx2; ez = cz2; }
      }
    }
    if (ex < 0) continue;                          // no cave nearby ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â skip this entrance
    const h = surfH[ez * W + ex];
    let y = h;
    for (; y >= 2; y--) {                          // dig the shaft down to the cave
      setBlockRaw(ex, y, ez, AIR);
      if (blockAt(ex, y - 1, ez) === AIR) break;   // reached a cave
    }
    for (let dy = 0; dy <= 2; dy++)                // open up the mouth on the surface
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++)
        setBlockRaw(ex + dx, h - dy, ez + dz, AIR);
    if (blockAt(ex, y - 1, ez) === AIR)            // widen where the shaft meets the cave
      for (let dy = -1; dy <= 1; dy++)
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++)
          setBlockRaw(ex + dx, y + dy, ez + dz, AIR);
  }

  // vegetation ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â only on grass, away from the edges:
  // dense woods where forestAt is high; elsewhere open plains with just a few trees and tall grass
  // where the player will end up spawning - findSpawn is deterministic, so calling it here (after caves are carved) gives the same cell as later; +10 matches SPAWN_Z_OFF below
  const [spawnCX, spawnCZ] = findSpawn();
  const spClearX = spawnCX, spClearZ = spawnCZ + 10;
  let cactusRing = [];                           // desert-sand cells on the ~28-41 block outskirts ring around spawn - only a few get planted from these

  for (let z = 3; z < D - 3; z++) for (let x = 3; x < W - 3; x++) {
    const h = surfH[z * W + x];
    if (h <= WL) continue;                       // nothing grows in water columns
    const topId = blockAt(x, h, z);
    if (topId === GRASS) {
      const forest = forestAt(x, z) > FOREST_CUTOFF;
      if (rnd() < (forest ? 0.022 : 0.004)) plantTree(x, h + 1, z);
      else if (rnd() < (forest ? 0.05 : 0.16)) setBlockRawIfAir(x, h + 1, z, TALL_GRASS);   // walk-through tall grass, denser on the plains
    }
    else if (topId === SAND && desertAt(x, z) > 0.62 && h >= WL + 3) {                      // cacti in the desert only
      const ddx = x - spClearX, ddz = z - spClearZ;
      const d2 = ddx * ddx + ddz * ddz;
      if (d2 < 28 * 28) continue;                                  // clear zone around spawn / the parked MLRS & skateboard test space: no cacti at all
      if (d2 < 41 * 41) { cactusRing.push(x, h + 1, z); }           // outskirts ring of the mini desert - held back, only a few planted below
      else if (rnd() < 0.0108) plantCactus(x, h + 1, z);            // normal desert density beyond the ring (rate reduced before by 40%: 0.018 -> 0.0108)
    }
  }

  // just a handful of cacti in the spawn area - on the outskirts of the mini desert, spaced out so they don't wall off movement
  {
    let placed = 0; const px2 = [], pz2 = [];
    for (let i = 0; i < cactusRing.length && placed < 4; i += 3) {
      const cx2 = cactusRing[i], cy2 = cactusRing[i + 1], cz2 = cactusRing[i + 2];
      let ok = true;
      for (let k = 0; k < px2.length; k++) { const ddx = px2[k] - cx2, ddz = pz2[k] - cz2; if (ddx * ddx + ddz * ddz < 9 * 9) { ok = false; break; } }
      if (ok) { plantCactus(cx2, cy2, cz2); px2.push(cx2); pz2.push(cz2); placed++; }
    }
  }
}

// ============================================================ procedural pixel textures (16x16 canvases)
function makeTex(pxFn) {
  const c = document.createElement('canvas'); c.width = c.height = 16;
  const g = c.getContext('2d');
  const img = g.createImageData(16, 16);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    const [r, gr, b, a] = pxFn(x, y);
    const i = (y * 16 + x) * 4;
    img.data[i] = r; img.data[i + 1] = gr; img.data[i + 2] = b; img.data[i + 3] = a === undefined ? 255 : a;   // pxFn may return an alpha (cut-out textures)
  }
  g.putImageData(img, 0, 0);
  return c;
}
const vary = (base, amt) => base.map(v => Math.max(0, Math.min(255, Math.round(v + (rnd() * 2 - 1) * amt))));

function woodTopPx(x, y) {
  const d = Math.hypot(x - 7.5, y - 7.5);
  return vary(d < 1 ? [86, 66, 38] : (Math.floor(d) % 2 === 0 ? [152, 124, 80] : [116, 90, 54]), 7);
}

const texCanvases = {
  grassTop:  makeTex(() => vary([108, 173, 72], 15)),
  dirt:      makeTex(() => vary([134, 99, 70], 13)),
  grassSide: makeTex((x, y) => { const edge = 3 + (rnd() < 0.5 ? 0 : 1); return y < edge || (y === edge && rnd() < 0.6) ? vary([98, 162, 64], 15) : vary([134, 99, 70], 13); }),
  stone:     makeTex(() => { const base = rnd() < 0.07 ? [104, 104, 108] : [126, 126, 130]; return vary(base, 10); }),
  woodSide:  makeTex((x) => { const col = Math.sin(x * 3.1 + (x % 3) * 1.7) * 0.5 + 0.5; return vary([84 + col * 36, 62 + col * 26, 34 + col * 14], 8); }),
  woodTop:   makeTex(woodTopPx),
  leaves:    makeTex(() => { const base = rnd() < 0.1 ? [38, 78, 30] : [52, 106, 44]; return vary(base, 18); }),
  tallgrass: makeTex((x, y) => {   // MC-style blade cluster on a transparent background (alphaTest cut-out)
    if (hash2(x * 13.7, 9.2) < 0.3) return [0, 0, 0, 0];           // gaps between blades
    const hgt = 5 + Math.floor(hash2(x * 7.31, 3.7) * 10);          // blade tip height (6..15 rows from the bottom)
    if (y < 15 - hgt) return [0, 0, 0, 0];                          // above the tips: see-through
    const t = (15 - y) / hgt;                                       // 0 at the base -> 1 at the tip
    const j = hash2(x * 3.17, y * 5.9);                             // per-pixel grain
    return [Math.round(46 + t * 36 + j * 18), Math.round(110 + t * 72 + j * 24), Math.round(36 + t * 24 + j * 12)];
  }),
  sand:      makeTex(() => vary([221, 208, 162], 11)),
  water:     makeTex(() => vary([52, 108, 196], 14)),
  meat:      makeTex((x, y) => { const m = (Math.sin(x * 2.3 + y * 1.7) > 0.5); return vary(m ? [196, 74, 58] : [214, 120, 96], 12); }),
  cactus:    makeTex((x, y) => { if (rnd() < 0.07) return vary([216, 234, 200], 8);   // pale spine fleck
                     const band = (Math.sin(x * Math.PI / 2.5) > 0.15);             // vertical ribbing like a real cactus
                     return vary(band ? [86, 164, 70] : [52, 124, 46], 9); }),
    skate:   makeTex((x, y) => {   // pixel-art skateboard (top view) on a transparent background
      const inWheelRow = (y >= 3 && y <= 5) || (y >= 10 && y <= 12);
      if (x === 1 || x === 2 || x === 13 || x === 14) return inWheelRow ? [72, 74, 84] : [0, 0, 0, 0];   // peaking-out wheels
      if (y >= 1 && y <= 14 && x >= 4 && x <= 11) {
        const grain = Math.sin(y * 2.1 + x) > 0 ? 10 : -8;           // wood grain bands along the deck
        if (x === 4 || x === 11) return [96, 72, 42];                // dark rail edge
        if (x >= 7 && x <= 8)    return y < 3 || y > 12 ? [150, 122, 82] : [66, 58, 48];   // grip tape + kicktails
        return [140 + grain, 108 + grain, 66 + Math.round(grain / 2)];
      }
      return [0, 0, 0, 0];
    }),
  drone:   makeTex((x, y) => {   // pixel-art quadcopter (top view) on transparent - hash2 only (deterministic), so the world seed is untouched
    const cx = x - 7.5, cy = y - 7.5;
    let rd = 1e9;                                        // squared dist to the nearest prop corner
    for (const [ox, oy] of [[-4.3,-4.3],[4.3,-4.3],[-4.3,4.3],[4.3,4.3]]) { const dd = (cx - ox) * (cx - ox) + (cy - oy) * (cy - oy); if (dd < rd) rd = dd; }
    if (rd < 9.5) return hash2(x * 7.91, y * 5.37) < 0.2 ? [36, 40, 48] : [58, 64, 76];   // four prop discs with dark blade flecks
    if (Math.abs(Math.abs(cx) - Math.abs(cy)) < 1.1 && rd < 30) return [96, 104, 58];      // olive X-frame struts along the diagonals
    if (Math.abs(cx) < 2.2 && Math.abs(cy) < 3.0) {                                       // body hull (longer along flight axis)
      if (cy <= -1.8) return [196, 66, 47];                                               // red camera nose at the top of the icon
      if (Math.abs(cx) < 0.75 && Math.abs(cy - 0.6) < 0.75) return [205, 215, 228];        // status light
      return hash2(x * 3.1, y * 4.7) < 0.12 ? [70, 82, 60] : [84, 98, 54];
    }
    return [0, 0, 0, 0];
  }),
  computer: makeTex((x, y) => {   // pixel-art arcade-style computer (front view) on a transparent background - hash2 only, world seed untouched
    if (x < 3 || x > 12 || y < 1 || y > 14) return [0, 0, 0, 0];              // overall silhouette: tall cabinet with a flat top
    const j = hash2(x * 5.13, y * 6.9);                                       // per-pixel grain
    if (y === 1) return [74, 82, 98];                                         // marquee strip along the very top
    if (x >= 4 && x <= 11 && y >= 2 && y <= 7) {                              // lit screen on a dark bezel edge
      const border = (x === 4 || x === 11 || y === 2 || y === 7);
      return border ? [30, 36, 48] : vary([214, 228, 236], 9);
    }
    if (y >= 9 && y <= 10) {                                                  // console counter with a keycap row
      if (x >= 5 && x <= 10 && j < 0.5) return [178, 186, 204];               // bright keys
      return [96, 104, 124];                                                  // counter surface between the keys
    }
    if (y === 8) return [60, 67, 84];                                         // lip between screen and keys
    return vary([52 + j * 8, 58 + j * 8, 72 + j * 10], 6);                    // cabinet body
  }),
};

function toTexture(c) {
  const t = new THREE.CanvasTexture(c);
  // Our UV tables assume v=0 at the top of the image, so disable three's default vertical flip.
  t.flipY = false;
  // Mipmapping kills the distance shimmering; nearest-mip sampling keeps pixels crisp.
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.LinearMipmapNearestFilter;
  t.generateMipmaps = true;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ============================================================ face / material setup
// corners are unit-cube coords (0/1); each quad winds so its normal points outward.
const FACES = [
  { n: [1, 0, 0], c: [[1,0,0],[1,1,0],[1,1,1],[1,0,1]], uv: [[0,1],[0,0],[1,0],[1,1]], b: 0.62 }, // +x
  { n: [-1,0,0], c: [[0,0,1],[0,1,1],[0,1,0],[0,0,0]], uv: [[1,1],[1,0],[0,0],[0,1]], b: 0.62 }, // -x
  { n: [0, 1, 0], c: [[0,1,1],[1,1,1],[1,1,0],[0,1,0]], uv: [[0,1],[1,1],[1,0],[0,0]], b: 1.0  }, // +y
  { n: [0,-1, 0], c: [[0,0,0],[1,0,0],[1,0,1],[0,0,1]], uv: [[0,0],[1,0],[1,1],[0,1]], b: 0.5  }, // -y
  { n: [0, 0, 1], c: [[0,0,1],[1,0,1],[1,1,1],[0,1,1]], uv: [[0,1],[1,1],[1,0],[0,0]], b: 0.82 }, // +z
  { n: [0, 0,-1], c: [[1,0,0],[0,0,0],[0,1,0],[1,1,0]], uv: [[1,1],[0,1],[0,0],[1,0]], b: 0.82 }, // -z
];

function materialKey(id, fi) {
  if (id === GRASS) return fi === 2 ? 'grassTop' : fi === 3 ? 'dirt' : 'grassSide';
  if (id === WOOD)  return (fi === 2 || fi === 3) ? 'woodTop' : 'woodSide';
  if (id === DIRT) return 'dirt';
  if (id === STONE) return 'stone';
  if (id === LEAVES) return 'leaves';
  if (id === SAND) return 'sand';
  if (id === WATER) return 'water';
  if (id === MEAT) return 'meat';
  if (id === CACTUS) return 'cactus';   // all faces the same prickly green
  return 'dirt';
}

const materials = {};
for (const [name, canvas] of Object.entries(texCanvases)) {
  const opts = { map: toTexture(canvas), vertexColors: true };
  if (name === 'water') { opts.transparent = true; opts.opacity = 0.62; opts.side = THREE.DoubleSide; }   // see-through blue water; DoubleSide so the surface underside is visible when submerged
  if (name === 'tallgrass') { opts.side = THREE.DoubleSide; opts.alphaTest = 0.5; }   // cross quads seen from either side; cut-out, no sorting needed
  materials[name] = new THREE.MeshBasicMaterial(opts);
}


// ============================================================ renderer & scene
const renderer = (() => {
  // No MSAA (nearest-filtered pixel textures don't benefit from it) and a capped
  // pixel ratio so high-DPI screens stop rendering up to 4x the CSS-resolution pixels.
  const r = new THREE.WebGLRenderer({ powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  r.setSize(window.innerWidth, window.innerHeight);
  document.body.prepend(r.domElement);
  return r;
})();

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcfe9fb, SET.drawFar * 0.4, SET.drawFar);

// gradient sky dome (fog-exempt so it stays crisp)
let skyDome;
{
  // 2400 (was 380): the map is much bigger now and fog-exempt clouds can sit far from the camera - the dome must stay behind them all but inside the camera's far plane (2500)
const g = new THREE.SphereGeometry(2400, 24, 14);
  const posAttr = g.attributes.position;
  const colors = new Float32Array(posAttr.count * 3);
  const top = new THREE.Color(0x3f8fe0), horizon = new THREE.Color(0xcfe9fb);
  for (let i = 0; i < posAttr.count; i++) {
    const hNorm = posAttr.getY(i) / 2500;                 // -1 .. 1
    // stay exactly at the horizon color near eye level so it blends seamlessly with the fog band
    const t = Math.max(0, Math.min(1, (hNorm + 0.12) / 0.95));
    const f = t * t;
    const c = horizon.clone().lerp(top, f);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  skyDome = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
  skyDome.renderOrder = -1;
  scene.add(skyDome);
}

let sun;
// square sun with layered square glow
{
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(255,242,178,0.30)'; g.fillRect(6, 6, 116, 116);   // outer glow
  g.fillStyle = 'rgba(255,247,200,0.90)'; g.fillRect(24, 24, 80, 80);   // inner glow
  g.fillStyle = 'rgb(255,253,240)';      g.fillRect(36, 36, 56, 56);   // square core
  const t = new THREE.CanvasTexture(c);
  sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false }));
  sun.scale.setScalar(260 * 0.65);   // 35% smaller
  scene.add(sun);
}

// clouds ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â soft flat box clusters drifting on the x axis. Placed as a jittered GRID across the
// whole map (the map is now 2.5x bigger than these clouds were designed for), so there are always
// some overhead no matter where you spawn or stand, and they drift/wrap over the full width.
const cloudGroup = new THREE.Group();
{
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, fog: false }); // crisp even in the distance (MC-style)
  const CCOLS = Math.max(8, Math.round(W / 90)), CROWS = Math.max(5, Math.round(D / 136)); // cell size shrunk by ~sqrt(2) (was W/128, D/192) -> ~2x clouds for a denser sky
  for (let j = 0; j < CROWS; j++) for (let i = 0; i < CCOLS; i++) {
    const cl = new THREE.Group();
    const nPuffs = 3 + Math.floor(rnd() * 3);
    for (let p = 0; p < nPuffs; p++) {
      const wBox = 7 + rnd() * 9, dBox = 5 + rnd() * 6, hBox = 1.4 + rnd() * 1.2;
      const puff = new THREE.Mesh(new THREE.BoxGeometry(wBox, hBox, dBox), mat);
      puff.position.set((rnd() - 0.5) * 9, (rnd() - 0.5) * 0.8, (rnd() - 0.5) * 6);
      cl.add(puff);
    }
    cl.position.set((i + 0.15 + rnd() * 0.7) * W / CCOLS, H + 9 + rnd() * 7, (j + 0.15 + rnd() * 0.7) * D / CROWS);
    cloudGroup.add(cl);
  }
  scene.add(cloudGroup);
}

// ============================================================ chunk meshing
const chunkMeshes = new Map(); // "cx,cz" -> THREE.Group
const chunkWater = new Map(); // "cx,cz" -> per-chunk water geometry arrays (or null)

// All chunks' water is merged into ONE mesh: one transparent draw call per frame
// instead of three.js depth-sorting hundreds of per-chunk water buckets.
const waterMesh = new THREE.Mesh(new THREE.BufferGeometry(), materials.water);
waterMesh.renderOrder = 1;   // blend after the opaque terrain
waterMesh.visible = false;
scene.add(waterMesh);

function rebuildWater() {
 const parts = []; let np = 0, ni = 0;
 for (const d of chunkWater.values()) if (d && d.pos.length) { parts.push(d); np += d.pos.length; ni += d.idxArr.length; }
 const pos = new Float32Array(np), col = new Float32Array(np), uv = new Float32Array((np / 3) * 2);
 const ia  = new Uint32Array(ni);
 let pOff = 0, iOff = 0, vBase = 0;   // vBase: vertex offset of this part inside the merged mesh
 for (const d of parts) {
  pos.set(d.pos, pOff); col.set(d.col, pOff); uv.set(d.uv, (pOff / 3) * 2);
  for (let k = 0; k < d.idxArr.length; k++) ia[iOff + k] = d.idxArr[k] + vBase;
  iOff += d.idxArr.length; vBase += d.pos.length / 3; pOff += d.pos.length;
 }
 const geo = new THREE.BufferGeometry();
 if (ni) {
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.Float32BufferAttribute(col, 3));
  geo.setAttribute('uv',       new THREE.Float32BufferAttribute(uv, 2));
  // note: setIndex() only wraps plain JS arrays - a raw typed array needs an explicit BufferAttribute.
  geo.setIndex(new THREE.BufferAttribute(ia, 1));
 }
 waterMesh.geometry.dispose();
 waterMesh.geometry = geo;
 waterMesh.visible = ni > 0;
}

function neighborIdForFaces(x, y, z) {
  if (y < 0) return STONE;            // don't render the underside of the world
  if (!inBounds(x, y, z)) return AIR; // show side walls at map edges
  return blocks[idx(x, y, z)];
}

function buildChunk(cx, cz) {
 const key = cx + ',' + cz;
 const old = chunkMeshes.get(key);
 if (old) {
  scene.remove(old);
  old.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
  chunkMeshes.delete(key);
 }

 const x0 = cx * CH, z0 = cz * CH;
 // materialKey -> geometry arrays
 const buckets = {};
  let wB;   // this chunk's water part, or null if the chunk has no water
 for (let z = z0; z < Math.min(z0 + CH, D); z++)
for (let x = x0; x < Math.min(x0 + CH, W); x++)
  for (let y = 0; y < H; y++) {
   const id = blocks[idx(x, y, z)];
   if (id === AIR) continue;
   if (id === TALL_GRASS) {   // walk-through tall grass: two crossed vertical strips (MC style), no cube faces
    const nA = neighborIdForFaces(x, y + 1, z);
    if (nA !== AIR && nA !== WATER && nA !== TALL_GRASS) continue;            // fully hidden under a solid block above
    let gB = buckets['tallgrass'];
    if (!gB) gB = buckets['tallgrass'] = { pos: [], col: [], uv: [], idxArr: [] };
    const hh = 0.875;   // blades occupy the bottom ~3/4 of the cell, like vanilla tall grass
    const quads = [   // each: (bottomL, bottomR, topR, topLeft) with matching uvs - v=1 at the blade roots
      [x, y, z,     x + 1, y, z + 1,   x + 1, y + hh, z + 1,  x,     y + hh, z],
      [x + 1, y, z, x,     y, z + 1,   x,     y + hh, z + 1,  x + 1, y + hh, z] ];
    for (const q of quads) {
      const base2 = gB.pos.length / 3;
      for (let k = 0; k < 4; k++) { gB.pos.push(q[k * 3], q[k * 3 + 1], q[k * 3 + 2]); gB.col.push(1, 1, 1); }   // full-bright like top faces
      gB.uv.push(0, 1, 1, 1, 1, 0, 0, 0);
      gB.idxArr.push(base2, base2 + 1, base2 + 2, base2, base2 + 2, base2 + 3);
    }
    continue;
   }
   for (let fi = 0; fi < 6; fi++) {
    const f = FACES[fi];
    let nId = neighborIdForFaces(x + f.n[0], y + f.n[1], z + f.n[2]);
    if (nId === TALL_GRASS) nId = AIR;   // cross-plants never occlude: faces under/around tall grass must still render
    if (id !== WATER && nId !== AIR && nId !== WATER) continue; // solid against solid - hidden
    if (id === WATER && nId !== AIR) continue;                  // water only shows faces against air
    const mk = materialKey(id, fi);
     // water faces go to the shared world-wide mesh (rebuilt by rebuildWater);
     // solid-block faces stay in this chunk's group as before.
     let b;
     if (mk === 'water') {
       if (!wB) wB = { pos: [], col: [], uv: [], idxArr: [] };
       b = wB;
     } else {
       b = buckets[mk];
       if (!b) b = buckets[mk] = { pos: [], col: [], uv: [], idxArr: [] };
     }
    const base = b.pos.length / 3;
    for (let k = 0; k < 4; k++) {
     b.pos.push(x + f.c[k][0], y + f.c[k][1], z + f.c[k][2]);
     b.col.push(f.b, f.b, f.b);          // baked directional shading
     b.uv.push(f.uv[k][0], f.uv[k][1]);
    }
    b.idxArr.push(base, base + 1, base + 2, base, base + 2, base + 3);
   }
  }

     chunkWater.set(key, wB);   // null if this chunk has no water

 const group = new THREE.Group();
 for (const [mk, data] of Object.entries(buckets)) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(data.pos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(data.col, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(data.uv, 2));
  geo.setIndex(data.idxArr);
  group.add(new THREE.Mesh(geo, materials[mk]));
 }
 group.userData.cx = cx;
 group.userData.cz = cz;
 scene.add(group);
 chunkMeshes.set(key, group);
}

function rebuildAllChunks() {
  for (let cz = 0; cz < D / CH; cz++) for (let cx = 0; cx < W / CH; cx++) buildChunk(cx, cz);
  rebuildWater();
}

// Rebuild the chunk containing (x,z) plus edge neighbors when needed.
function rebuildAround(x, z) {
  const set = new Set();
  const add = (cx, cz) => { if (cx >= 0 && cx < W / CH && cz >= 0 && cz < D / CH) set.add(cx + ',' + cz); };
  const cx = Math.floor(x / CH), cz = Math.floor(z / CH);
  add(cx, cz);
  const lx = x - cx * CH, lz = z - cz * CH;
  if (lx === 0) add(cx - 1, cz);
  if (lx === CH - 1) add(cx + 1, cz);
  if (lz === 0) add(cx, cz - 1);
  if (lz === CH - 1) add(cx, cz + 1);
  for (const k of set) { const [a, b] = k.split(','); buildChunk(+a, +b); }
  rebuildWater();   // merge per-chunk water parts into the one world mesh
}

// Distance culling: fog swallows everything past its far plane, so skip drawing
// regions entirely outside that radius (checked per frame - cheap at ~150 regions).
// region culling radius follows the draw-distance setting (the fog swallows everything past it)
function cullD2() { const d = SET.drawFar + CH * 1.6; return d * d; }   // region half-diagonal with slack
// Big map: a region is built the first time it gets close enough to render (the fog hides everything else),
// so walking across the world streams regions in instead of waiting for one giant initial build.
function ensureNearChunks(ax, az) {
 let built = false;
 const nX = W / CH, nZ = D / CH;
 for (let cz = 0; cz < nZ; cz++) for (let cx = 0; cx < nX; cx++) {
   const key = cx + ',' + cz;
   if (chunkMeshes.has(key)) continue;
   const dx = cx * CH + CH / 2 - ax, dz = cz * CH + CH / 2 - az;
   if (dx * dx + dz * dz < cullD2()) { buildChunk(cx, cz); built = true; }
 }
 if (built) rebuildWater();   // merge the new regions' water parts into the shared world mesh
}

function cullRegions() {
 const px = camera.position.x, pz = camera.position.z;
 for (const g of chunkMeshes.values()) {
  const dx = g.userData.cx * CH + CH / 2 - px, dz = g.userData.cz * CH + CH / 2 - pz;
  g.visible = dx * dx + dz * dz < cullD2();
 }
}

// ============================================================ camera & player
const camera = new THREE.PerspectiveCamera(SET.fov, window.innerWidth / window.innerHeight, 0.1, 2500);
camera.rotation.order = 'YXZ';

generateWorld();
// NOTE: regions are built lazily around the player (see ensureNearChunks) - the map is now too big to mesh it all up front

function topSolidY(x, z) { for (let y = H - 1; y >= 0; y--) { const b = blocks[idx(x, y, z)]; if (b !== AIR && b !== TALL_GRASS) return y; } return -1; }   // tall grass is walk-through: not "solid" for spawn/mob ground checks

// Find a spawn spot: prefer the map center, spiraling outward until we find
// grass with six clear blocks of headroom (so trees can't spawn inside you).
function findSpawn() {
  const cx = W >> 1, cz = D >> 1;
  for (let r = 0; r <= 9; r++) {
    const cand = [];
    if (r === 0) cand.push([cx, cz]);
    else for (let a = -r; a <= r; a++) cand.push([cx + a, cz + r], [cx + a, cz - r], [cx + r, cz + a], [cx - r, cz + a]);
    for (const [x, z] of cand) {
      if (x < 2 || x >= W - 2 || z < 2 || z >= D - 2) continue;
      const y = topSolidY(x, z);
      if (y < 1 || blockAt(x, y, z) === WATER) continue;   // stay on dry land
      let clear = true;
      for (let dy = 1; dy <= 6; dy++) { const b = blockAt(x, y + dy, z); if (b !== AIR && b !== TALL_GRASS) { clear = false; break; } }   // walk-through grass is not an obstruction
      if (clear) return [x, z];
    }
  }
  return [cx, cz];
}

const SPAWN_Z_OFF = 10;   // stand ~8-9 blocks further out than before (was +3) - clear open ground well away from the parked HIMARS
const spawnXZ = findSpawn();
// fixed in world space: exactly due EAST (bearing 90ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°) from the spawn point
sun.position.set(spawnXZ[0] + 750.5, 380, spawnXZ[1] + 0.5);
ensureNearChunks(spawnXZ[0], spawnXZ[1]);   // build only the regions near the player; the rest stream in as you explore (see animate)
const player = {
  pos: new THREE.Vector3(spawnXZ[0] + 0.5, topSolidY(spawnXZ[0], spawnXZ[1] + SPAWN_Z_OFF) + 1 + EYE + 0.02, spawnXZ[1] + SPAWN_Z_OFF + 0.5), // eye position (offset by SPAWN_Z_OFF)
  yaw: Math.PI * 0.78, pitch: -0.12,
  vy: 0, onGround: false,
};

const keys = Object.create(null);
let locked = false;

function collides(p) {
  const minx = p.x - PHALF, maxx = p.x + PHALF;
  const miny = p.y - EYE,    maxy = p.y - EYE + PHEIGHT;
  const bx0 = Math.floor(minx), bx1 = Math.floor(maxx - 1e-7);
  const by0 = Math.floor(miny), by1 = Math.floor(maxy - 1e-7);
  const bz0 = Math.floor(p.z - PHALF), bz1 = Math.floor(p.z + PHALF - 1e-7);
  for (let y = by0; y <= by1; y++)
    for (let z = bz0; z <= bz1; z++)
      for (let x = bx0; x <= bx1; x++)
        if (solidForPhysics(x, y, z)) return true;
  // the HIMARS is solid too: simple footprint box around the scaled body (mlrsInBox) - you can't walk through it
  if (mlrsTruck && maxy > mlrsTruck.pos.y && miny < mlrsTruck.pos.y + 3.4 && mlrsInBox(p.x, p.z, PHALF)) return true;   // feet-to-roof band of the x1.5 body
    // computers are solid too: a simple square footprint you can't walk through (rotation-agnostic box around the cabinet center) - skip the one we're seated at
    if (comps.length) for (const cc of comps) {
      if (cc === _comp) continue;   // sitting at this machine - our own seat must not push us out
      if (maxy > cc.pos.y && miny < cc.pos.y + 2.1 && Math.abs(p.x - cc.pos.x) < 0.5 + PHALF && Math.abs(p.z - cc.pos.z) < 0.5 + PHALF) return true;   // feet-to-roof band of the ~2-block cabinet
    }
    // chests: solid footprint too - decorative for now but they occupy space like any other placed machine
    if (chests.length) for (const c of chests) {
      if (maxy > c.pos.y && miny < c.pos.y + CHEST_H && Math.abs(p.x - c.pos.x) < CHEST_W / 2 + PHALF && Math.abs(p.z - c.pos.z) < CHEST_D / 2 + PHALF) return true;
    }
  return false;
}

function collidesAt(axis, val) {
  const p = player.pos;
  const saved = p[axis];
  p[axis] = val;
  const hit = collides(p);
  p[axis] = saved;
  return hit;
}

// Move along one axis with binary-search snap-back. Returns true if blocked.
function moveAxis(axis, to) {
  const from = player.pos[axis];
  if (from === to) return false;
  if (!collidesAt(axis, to)) { player.pos[axis] = to; return false; }
  let lo = from, hi = to;
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2;
    if (collidesAt(axis, mid)) hi = mid; else lo = mid;
  }
  player.pos[axis] = lo;
  return true;
}

const DRONE_CAM_PITCH_BIAS = Math.PI / 12;   // ~15deg-up bias on the FPV view so forward flight doesn't keep staring at the ground
function syncCamera() {
  camera.position.copy(player.pos);
  camera.rotation.set(player.pitch + (_pilotDrone ? DRONE_CAM_PITCH_BIAS : 0), player.yaw, _pilotDrone ? (_pilotDrone.roll || 0) : 0);   // the view IS the body in acro - roll shows straight through (drone gets a ~15deg-up camera bias)
}

// ============================================================ first-person arm (Minecraft style)
scene.add(camera); // required so the camera's children (the arm) get rendered

// tiny pixel textures for skin + shirt cuff (local rng so world seed is untouched)
function makeArmTex(base, amt) {
  const c = document.createElement('canvas'); c.width = c.height = 8;
  const g = c.getContext('2d');
  let rs = 4242;
  const r = () => { rs |= 0; rs = (rs + 0x6D2B79F5) | 0; let t = Math.imul(rs ^ (rs >>> 15), 1 | rs);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const img = g.createImageData(8, 8);
  for (let i = 0; i < 64; i++) {
    const o = i * 4;
    img.data[o]     = Math.max(0, Math.min(255, base[0] + (r() * 2 - 1) * amt));
    img.data[o + 1] = Math.max(0, Math.min(255, base[1] + (r() * 2 - 1) * amt));
    img.data[o + 2] = Math.max(0, Math.min(255, base[2] + (r() * 2 - 1) * amt));
    img.data[o + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return toTexture(c);
}
// depth test OFF so the hand is always drawn in front of the world (like vanilla MC's separate hand pass)
const skinMat   = new THREE.MeshBasicMaterial({ map: makeArmTex([228, 179, 145], 9),  fog: false, depthTest: false, depthWrite: false, transparent: true }); // in transparent pass (renderOrder) so it draws after water and never gets blended into
const sleeveMat = new THREE.MeshBasicMaterial({ map: makeArmTex([100, 180, 235], 12), fog: false, depthTest: false, depthWrite: false, transparent: true }); // same as skinMat ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â drawn after water in the transparent pass

// clones of the world materials for the held item (same textures, but never depth-occluded)
const armMats = {};
for (const k in materials) { const m = materials[k].clone(); m.depthTest = false; m.depthWrite = false; m.fog = false; m.transparent = true; m.opacity = 1; armMats[k] = m; } // held item drawn after water too, fully opaque

// the arm: a cuff at the bottom-right corner, a skin forearm, a hand ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â steep diagonal
// from the corner up toward view center, like vanilla MC (root sits just off-screen)
const armRoot = new THREE.Group();
// point the hand almost straight forward: ~horizontal, tilted 20 deg right of view center and slightly up (like vanilla MC)
const _handYaw = 30 * Math.PI / 180;
const _handElev = 25 * Math.PI / 180; // above horizontal - "almost pointing forward"
const ARM_BASE_Q  = new THREE.Quaternion().setFromUnitVectors(
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(Math.sin(_handYaw) * Math.cos(_handElev), Math.sin(_handElev), -Math.cos(_handYaw) * Math.cos(_handElev))
);
const ARM_SWING_Q = new THREE.Quaternion();   // per-frame pitch (swing/bob), applied in camera space on top of base pose
const _AXIS_X     = new THREE.Vector3(1, 0, 0);
armRoot.position.set(0.90, -1.20, -0.9);
camera.add(armRoot); // parent to the camera so it stays fixed in view space

function addArmBox(w, h, d, x, y, z, mat, order) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.renderOrder = order;
  armRoot.add(m);
  return m;
}
addArmBox(0.34, 0.30, 0.34, 0, 0.15, 0,    sleeveMat, 100); // shirt cuff in the corner
addArmBox(0.26, 0.80, 0.26, 0, 0.70, 0,    skinMat,   100); // forearm
addArmBox(0.26, 0.82, 0.26, 0, 0.70, 0.04, skinMat,   100); // hand (slightly toward camera)

// held item ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â a block in front of the hand, brighter than world faces (hand items get their own light)
let heldMesh = null;
let heldSkMats = null;
let heldItemId = null;
function setHeldItem(id) {
  if (id === heldItemId) return;            // no-op (also covers empty hand -> empty hand)
  heldItemId = id;
  if (heldMesh) {                            // dispose the previous item (cube OR skate group)
    armRoot.remove(heldMesh);
    if (heldMesh.isGroup) heldMesh.traverse(o => { if (o.geometry) o.geometry.dispose(); });
    else heldMesh.geometry.dispose();
    heldMesh = null;
  }
  if (!id) return;                          // empty hand, nothing to show
  if (id === SKATE) {   // silly and correct: carry the actual board as your viewmodel
    const b = buildSkateMesh(true);
    b.g.scale.setScalar(0.42);
    b.g.rotation.set(-1.05, -0.35, 0.28);
    b.g.position.set(0.16, 1.32, 0.26);
    heldMesh = b.g; heldSkMats = b.mats;
    armRoot.add(heldMesh);
    return;
  }
  if (id === DRONE) {   // carry a scaled-down copy of the real craft as your viewmodel
    const b = buildDroneMesh(true);
    b.g.scale.setScalar(0.55);
    b.g.rotation.set(-0.12, -0.3, 0.18);
    b.g.position.set(0.16, 1.34, 0.3);
    heldMesh = b.g; heldSkMats = b.mats;
    armRoot.add(heldMesh);
    return;
  }
    if (id === COMP) {   // carry a scaled-down copy of the machine as your viewmodel
      const b = buildCompMesh(true);
      b.g.scale.setScalar(0.42);
      b.g.rotation.set(-0.15, -0.32, 0.16);
      b.g.position.set(0.16, 1.26, 0.3);
      heldMesh = b.g; heldSkMats = b.mats;
      armRoot.add(heldMesh);
      return;
    }
  const geo = new THREE.BoxGeometry(0.252, 0.252, 0.252); // 40% smaller than before
  const bright = [0.85, 0.72, 1.0, 0.6, 0.95, 0.8]; // +x -x +y -y +z -z
  const col = new Float32Array(72);
  for (let f = 0; f < 6; f++) for (let v = 0; v < 4; v++) { const o = (f * 4 + v) * 3; col[o] = col[o + 1] = col[o + 2] = bright[f]; }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  heldMesh = new THREE.Mesh(geo, [0, 1, 2, 3, 4, 5].map(fi => armMats[materialKey(id, fi)]));
  heldMesh.position.set(0.16, 1.35, 0.18); // just past the fingertips, slightly toward camera
  heldMesh.renderOrder = 101;
  armRoot.add(heldMesh);
}
// survival: the hand starts empty - items only come from what you mine
heldItemId = null;

// ---- arm animation: mining swing, break strike, place poke, walk bob + idle breathing
let mineT = 0, breakAnimT = 99, placeAnimT = 99, armBobPhase = 0, armClock = 0;
function triggerArmSwing(kind) { if (kind === 'break') breakAnimT = 0; else placeAnimT = 0; }

const ARM_BASE_Y = -1.20;
function updateArm(dt) {
  armRoot.visible = locked && !mlrs.active && !_pilotDrone && !_comp;   // no viewmodel hand while staring out of the drone either   // no viewmodel hand while staring down the MLRS net
  if (!locked) return;
  armClock += dt;

  const mv = player._moveAmt || 0;
  armBobPhase += mv * 2.9;
  const speedF = Math.min(1, mv / 0.055);
  const bobY = Math.sin(armBobPhase) * 0.024 * speedF + Math.sin(armClock * 1.6) * 0.005;

  let swingX = -0.05; // slight resting tilt
  if (mouseState.left || eatHeld) {   // mining OR eating share the same continuous hand swing
    mineT += dt;
    swingX += 0.44 * Math.sin(mineT * 23.5) + 0.12;   // continuous mining swing ~3.7 Hz
  } else mineT = 0;
  if (breakAnimT < 0.16) { breakAnimT += dt; swingX -= 0.8 * Math.sin(Math.PI * breakAnimT / 0.16); }  // quick strike down
  if (placeAnimT < 0.12) { placeAnimT += dt; swingX -= 0.5 * Math.sin(Math.PI * placeAnimT / 0.12); }  // short poke forward

    const swingTotal = swingX + Math.sin(armBobPhase) * 0.03 * speedF + ((mouseState.left || eatHeld) ? 0.05 * Math.sin(mineT * 23.5 + 1.3) : 0);
    armRoot.quaternion.copy(ARM_SWING_Q.setFromAxisAngle(_AXIS_X, swingTotal)).multiply(ARM_BASE_Q);
  armRoot.position.y = ARM_BASE_Y + bobY;
}

// ============================================================ voxel raycast (Amanatides & Woo DDA)
function raycastVoxel(origin, dir, maxDist = REACH) {
  let x = Math.floor(origin.x), y = Math.floor(origin.y), z = Math.floor(origin.z);
  const hitSolid = (bx, by, bz) => { const id = blockAt(bx, by, bz); return id !== AIR && id !== WATER; };
  if (hitSolid(x, y, z)) return { x, y, z, nx: 0, ny: 1, nz: 0 }; // started inside a solid block

  const stepX = dir.x > 0 ? 1 : -1, stepY = dir.y > 0 ? 1 : -1, stepZ = dir.z > 0 ? 1 : -1;
  const tDX = dir.x !== 0 ? Math.abs(1 / dir.x) : Infinity;
  const tDY = dir.y !== 0 ? Math.abs(1 / dir.y) : Infinity;
  const tDZ = dir.z !== 0 ? Math.abs(1 / dir.z) : Infinity;
  let tMaxX = dir.x > 0 ? (x + 1 - origin.x) * tDX : dir.x < 0 ? (origin.x - x) * tDX : Infinity;
  let tMaxY = dir.y > 0 ? (y + 1 - origin.y) * tDY : dir.y < 0 ? (origin.y - y) * tDY : Infinity;
  let tMaxZ = dir.z > 0 ? (z + 1 - origin.z) * tDZ : dir.z < 0 ? (origin.z - z) * tDZ : Infinity;

  for (let i = 0; i < 256; i++) {
    if (tMaxX <= tMaxY && tMaxX <= tMaxZ) {
      if (tMaxX > maxDist) return null;
      const px = x, py = y, pz = z;   // cell we're leaving = placement target
      x += stepX; tMaxX += tDX;
      if (hitSolid(x, y, z)) return { x, y, z, nx: px - x, ny: 0, nz: 0 };
    } else if (tMaxY <= tMaxZ) {
      if (tMaxY > maxDist) return null;
      const px = x, py = y, pz = z;
      y += stepY; tMaxY += tDY;
      if (hitSolid(x, y, z)) return { x, y, z, nx: 0, ny: py - y, nz: 0 };
    } else {
      if (tMaxZ > maxDist) return null;
      const px = x, py = y, pz = z;
      z += stepZ; tMaxZ += tDZ;
      if (hitSolid(x, y, z)) return { x, y, z, nx: 0, ny: 0, nz: pz - z };
    }
  }
  return null;
}

// ============================================================ block interaction
function collapseCactusAbove(x, y, z) {      // MC-style support loss: cacti stacked on a cell we just emptied lose their footing -> whole vertical run breaks into item drops (no-op when nothing cactus is above, e.g. breaking only the top block)
  let by = y + 1;
  while (blockAt(x, by, z) === CACTUS) by++;
  if (by > y + 1) for (let cy = y + 1; cy < by; cy++) {
    setBlockRaw(x, cy, z, AIR);
    spawnDrop(x + 0.5, cy + 0.35, z + 0.5, CACTUS);
    spawnBreakParticles(x, cy, z, CACTUS, null);
  }
}

function doBreak(hit) {
  if (!hit || hit.y <= 0) return false;   // keep the base layer unbreakable
  const id = blockAt(hit.x, hit.y, hit.z);
  setBlockRaw(hit.x, hit.y, hit.z, AIR);
  collapseCactusAbove(hit.x, hit.y, hit.z);
  rebuildAround(hit.x, hit.z);
  if (id !== TALL_GRASS) spawnDrop(hit.x + 0.5, hit.y + 0.35, hit.z + 0.5, id);   // survival: it drops to the ground (tall grass drops nothing)
  spawnBreakParticles(hit.x, hit.y, hit.z, id, hit);                             // MC-style debris puff in the block's own colors
  SFX.breakBlock(id);
  triggerArmSwing('break');
  return true;
}

function aabbOverlapsCell(bx, by, bz) {
  const p = player.pos;
  return bx + 1 > p.x - PHALF && bx < p.x + PHALF &&
         by + 1 > p.y - EYE    && by < p.y - EYE + PHEIGHT &&
         bz + 1 > p.z - PHALF && bz < p.z + PHALF;
}

function doPlace(hit) {
  if (!hit) return false;
  const st = inventory[selIndex];
  if (st && st.id === SKATE) return placeSkateAt(hit);   // the skateboard is an entity, not a block - drops where you aim
    if (st && st.id === DRONE) return placeDroneAt(hit);   // same deal: it lands on whatever floor sits below your aim point
      if (st && st.id === COMP) return placeCompAt(hit);   // the computer is a placed machine - drops where you aim it

  if (!st || !ITEM_INFO[st.id] || ITEM_INFO[st.id].noPlace) return false;   // empty hand / non-placeable item (meat etc.)
  const tx = hit.x + hit.nx, ty = hit.y + hit.ny, tz = hit.z + hit.nz;
  if (!inBounds(tx, ty, tz)) return false;
  { const cur = blockAt(tx, ty, tz); if (cur !== AIR && cur !== WATER) return false; } // solids may displace water
  if (aabbOverlapsCell(tx, ty, tz)) return false; // don't place inside yourself
  setBlockRaw(tx, ty, tz, st.id);
  rebuildAround(tx, tz);
  SFX.place(st.id);
  removeOneSelected();                          // one block out of the hand per placement
  triggerArmSwing('place');
  return true;
}

function aimHit() {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  return raycastVoxel(camera.position, dir);
}

// ============================================================ hold-to-mine (progress + crack overlay)
const BREAK_TIME = { [GRASS]: 0.7, [DIRT]: 0.5, [STONE]: 1.4, [WOOD]: 1.0, [LEAVES]: 0.35, [SAND]: 0.4, [CACTUS]: 0.6, [TALL_GRASS]: 0.005 };   // tall grass breaks instantly (first frame of the hold)

const CRACK_STAGES = 10;
// Blocky pixelated cracks like real Minecraft: an 8x8 grid of 2px cells on a
// 16x16 canvas (NearestFilter => hard pixels). Cracks are axis-aligned random
// walks seeded ONCE, so every stage draws the same pattern with more of it.
function makeCrackTexture(stage) {
  const c = document.createElement('canvas'); c.width = c.height = 16;
  const g = c.getContext('2d');
  let rs = 1337;
  const r = () => { rs |= 0; rs = (rs + 0x6D2B79F5) | 0; let t = Math.imul(rs ^ (rs >>> 15), 1 | rs);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

  const CELL = 2, GRID = 8;                        // 8x8 cells of 2px on a 16px canvas
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // cardinal steps only => blocky lines
  const spines = [];
  const N_CRACKS = 8;
  for (let i = 0; i < N_CRACKS; i++) {
    let x = 3 + Math.floor(r() * 2), y = 3 + Math.floor(r() * 2);   // start near center
    const cells = [[x, y]];
    const steps = 6 + Math.floor(r() * 5);
    let dir = -1;
    for (let k = 0; k < steps; k++) {              // zigzagging random walk outward
      let d;
      do { d = DIRS[Math.floor(r() * 4)]; }
      while (dir >= 0 && r() < 0.6 && d[0] === DIRS[dir][0] && d[1] === DIRS[dir][1]);
      dir = DIRS.indexOf(d);
      x = Math.max(0, Math.min(GRID - 1, x + d[0]));
      y = Math.max(0, Math.min(GRID - 1, y + d[1]));
      cells.push([x, y]);
    }
    spines.push(cells);
  }

  // each stage reveals a growing fraction of EVERY crack at once (like MC's stages)
  const f = (stage + 1) / CRACK_STAGES;
  g.fillStyle = 'rgba(0,0,0,0.55)';
  for (const cells of spines) {
    const n = Math.min(cells.length, Math.max(1, Math.round(cells.length * f)));
    for (let k = 0; k < n; k++) g.fillRect(cells[k][0] * CELL, cells[k][1] * CELL, CELL, CELL);
  }

  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter;
  return t;
}
const crackMats = Array.from({ length: CRACK_STAGES }, (_, i) =>
  new THREE.MeshBasicMaterial({ map: makeCrackTexture(i), transparent: true, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
// slightly larger cube so the crack texture is drawn on ALL SIX faces of the block
const crackMesh = new THREE.Mesh(new THREE.BoxGeometry(1.004, 1.004, 1.004), crackMats[0]);
crackMesh.visible = false;
crackMesh.renderOrder = 10;
scene.add(crackMesh);

let mining = null;   // { x, y, z, id }
let miningT = 0;     // 0..1 progress on the current target
let crackStage = -1;

function hideCracks() {
  crackMesh.visible = false;
  crackStage = -1;
}

function updateMining(dt) {
  if (mouseState.left && !activeRide && (aimedSkate(4) || _comp)) { mining = null; miningT = 0; hideCracks(); return; }   // a board under the crosshair soaks up the click
  if ((_comp || !locked || !mouseState.left || _pilotDrone)) { mining = null; miningT = 0; hideCracks(); return; }   // the pilot has no hands free for a pickaxe
  const hit = aimHit();
  const id = hit ? blockAt(hit.x, hit.y, hit.z) : AIR;
  const canBreak = !!hit && id !== AIR && hit.y > 0;   // base layer stays unbreakable
  if (!canBreak || !mining || mining.x !== hit.x || mining.y !== hit.y || mining.z !== hit.z
      || blockAt(mining.x, mining.y, mining.z) !== mining.id) {
    mining = canBreak ? { x: hit.x, y: hit.y, z: hit.z, id } : null;
    miningT = 0;
  }
  if (!mining) { hideCracks(); return; }

  miningT += dt / (BREAK_TIME[mining.id] || 1);
  if (miningT >= 1) {
    doBreak(mining);
    mouseState.lastAct = performance.now();
    mining = null; miningT = 0; hideCracks();
    return;
  }

  // center the crack cube on the block being mined (cracks show on every face)
  crackMesh.position.set(hit.x + 0.5, hit.y + 0.5, hit.z + 0.5);
  const stage = Math.min(CRACK_STAGES - 1, Math.floor(miningT * CRACK_STAGES));
  if (stage !== crackStage) { crackMesh.material = crackMats[stage]; crackStage = stage; SFX.mineTick(mining.id, stage, CRACK_STAGES); }
  crackMesh.visible = true;
}

// ============================================================ survival inventory
// The hotbar IS the whole bag for now: 8 slots, stacks up to 64. You spawn with
// an empty hand; mine a block and it drops on the ground - pick it up to stack it here.
const INV_SIZE = 8, STACK_MAX = 64;      // hotbar row width / stack cap
const BAG_ROWS = 3, INV_TOTAL = INV_SIZE * (BAG_ROWS + 1);   // Tab panel: 24 bag slots above the hotbar -> 32 total
const ITEM_INFO = {
    [SKATE]:   { name: 'Skateboard', tex: 'skate' },   // rideable entity - never written into the blocks array
    [DRONE]:   { name: 'FPV Drone', tex: 'drone' },      // piloted suicide drone - entity, never written into the blocks array
      [COMP]:   { name: 'Computer', tex: 'computer' },   // arcade-style computer machine - entity, never written into the blocks array

  [GRASS]:  { name: 'Grass', tex: 'grassSide' },
  [DIRT]:   { name: 'Dirt',  tex: 'dirt' },
  [STONE]:  { name: 'Stone', tex: 'stone' },
  [WOOD]:   { name: 'Wood',  tex: 'woodSide' },
  [LEAVES]: { name: 'Leaves',tex: 'leaves' },
  [SAND]:   { name: 'Sand',  tex: 'sand' },
    [MEAT]:   { name: 'Meat',  tex: 'meat', noPlace: true },
    [CACTUS]: { name: 'Cactus', tex: 'cactus' },
};

const inventory = new Array(INV_TOTAL).fill(null);   // slot -> null | { id, count }; slots 0..7 are the hotbar row, 8+ the bag
let selIndex = 0;

function addItem(id, n) {                            // returns true if everything fit in the bag
  if (!ITEM_INFO[id]) return false;                  // unstackable (water etc.) - not pickable
  let left = (n === undefined ? 1 : n);
  for (let i = 0; i < INV_TOTAL && left > 0; i++) {  // top up existing stacks anywhere in the bag first
    const st = inventory[i];
    if (st && st.id === id && st.count < STACK_MAX) {
      const a = Math.min(STACK_MAX - st.count, left); st.count += a; left -= a;
    }
  }
  for (let i = 0; i < INV_TOTAL && left > 0; i++)    // then open slots (hotbar first, spilling into the bag)
    if (!inventory[i]) { const a = Math.min(STACK_MAX, left); inventory[i] = { id, count: a }; left -= a; }
  renderInventory(); updateHeldItem();   // refresh held item (picked up into the selected slot?)
  return left === 0;
}

function removeOneSelected() {                       // one block out of the held slot (placing)
  const st = inventory[selIndex];
  if (!st) return;
  st.count--;
  if (st.count <= 0) inventory[selIndex] = null;
  renderInventory(); updateHeldItem();
}

function updateHeldItem() { setHeldItem(inventory[selIndex] ? inventory[selIndex].id : null); }

// ---- hotbar DOM: one canvas + stack count per slot, built once and redrawn on change
const hotbarEl = document.getElementById('hotbar');
const slotEls = [];
for (let i = 0; i < INV_SIZE; i++) {
  const s = document.createElement('div'); s.className = 'slot';
  const c = document.createElement('canvas'); c.width = c.height = 16;
  const cnt = document.createElement('span'); cnt.className = 'count';
  s.append(c, cnt);
  hotbarEl.appendChild(s);
  slotEls.push({ el: s, canvas: c, count: cnt });
}
let blankTile;      // precomputed transparent 16x16 tile to clear slot canvases with
function paintSlot(canvas, cntEl, st) {          // shared by the bottom hotbar, every Tab-panel slot and the drag ghost
  if (!blankTile) { const bc = document.createElement('canvas'); bc.width = bc.height = 16; blankTile = bc.getContext('2d').createImageData(16, 16); }
  const g = canvas.getContext('2d');
  g.putImageData(blankTile, 0, 0);
  if (st) {
    g.drawImage(texCanvases[ITEM_INFO[st.id].tex], 0, 0);
    cntEl.textContent = st.count > 1 ? st.count : '';
  } else cntEl.textContent = '';
}
function renderInventory() {
  for (let i = 0; i < INV_SIZE; i++) paintSlot(slotEls[i].canvas, slotEls[i].count, inventory[i]);   // the 8-slot bottom hotbar HUD
  for (const rec of panelCells) paintSlot(rec.canvas, rec.count, rec.arr[rec.i]);                  // every Tab-panel cell (chest contents + player bag/hotbar rows)
  for (let k = 0; k < INV_SIZE; k++) { const s = invSlotEls[k]; if (s) s.el.classList.toggle('selected', k === selIndex); }   // panel hotbar row mirrors the highlight
}

const selnameEl = document.getElementById('selname');
function selectSlot(i) {
  selIndex = ((i % INV_SIZE) + INV_SIZE) % INV_SIZE;
  slotEls.forEach((s, k) => s.el.classList.toggle('selected', k === selIndex));
  const st = inventory[selIndex];
  selnameEl.textContent = st ? ITEM_INFO[st.id].name : '\u00A0';   // nbsp keeps the layout height stable
  selnameEl.classList.remove('pop'); void selnameEl.offsetWidth; selnameEl.classList.add('pop');
  renderInventory(); updateHeldItem();
}

// ---- full backpack panel (Tab): 3 bag rows above the hotbar, drag & drop between any slot
const invEl = document.getElementById('inventory');        // #inventory panel in index.html
const gridEl = document.getElementById('invGrid');
const ghostEl = document.getElementById('invGhost');
const ghostCanvas = document.getElementById('invGhostCanvas');
const ghostCount = document.getElementById('invGhostCount');

// one clickable slot cell in the shared grid; each cell mirrors a specific array + index so chest contents and the
// player's bag sit side by side in #invGrid and can be dragged across. `rec` is kept for re-painting on every change.
function makeCellSlot(arr, i) {
  const sl = document.createElement('div'); sl.className = 'islot'; sl._arr = arr; sl._i = i;
  const cvc = document.createElement('canvas'); cvc.width = cvc.height = 16;
  const cntc = document.createElement('span'); cntc.className = 'count';
  sl.append(cvc, cntc);
  paintSlot(cvc, cntc, arr[i]);
  panelCells.push({ el: sl, canvas: cvc, count: cntc, arr: arr, i: i });
  if (arr === inventory) invSlotEls[i] = { el: sl, canvas: cvc, count: cntc };   // player-indexed alias render/select use
  sl.addEventListener('mousedown', e => {             // LMB = whole stack, RMB = half (if >1) - then drag to another slot and release
    if (!invOpen || dragStack) return;
    if (arr === inventory && i < INV_SIZE && e.button === 0) selectSlot(i);   // hotbar row inside the panel also selects it
    startDrag({ arr: arr, i: i }, e.button, e.clientX, e.clientY);
  });
  return sl;
}
let activeChest = null;                                 // the chest whose contents share this panel (null for a plain Tab open)
let invOpen = false;
const invSlotEls = [];                                  // player-panel slots indexed by inventory slot (rebuilt each open)
let panelCells = [];                                    // every grid cell (chest + player), each remembers which array it mirrors
// rebuild the whole grid: chest contents on top (when a chest is open), then bag rows and the hotbar row last - mirrors the bottom HUD
function buildPanelGrid() {
  gridEl.innerHTML = '';
  invSlotEls.length = 0; panelCells.length = 0;
  const box = (label) => {                     // a self-contained labelled "box" holding a group of slot rows
    const b = document.createElement('div'); b.className = 'invbox';
    if (label) { const h = document.createElement('div'); h.className = 'panel-hd'; h.textContent = label; b.appendChild(h); }
    return b;
  };
  if (activeChest && activeChest.items) {     // two separate boxes: chest contents on top, the player's bag below
    const items = activeChest.items;
    const cbox = box('Chest');
    for (let r = 0; r * CHEST_COLS < items.length; r++) {
      const row = document.createElement('div'); row.className = 'invrow';
      for (let c = 0; c < CHEST_COLS && r * CHEST_COLS + c < items.length; c++)
        row.appendChild(makeCellSlot(items, r * CHEST_COLS + c));
      cbox.appendChild(row);
    }
    gridEl.appendChild(cbox);
    const pbox = box('Inventory');            // the player's bag in its own box under the chest
    for (let r = 0; r < BAG_ROWS + 1; r++) {
      const row = document.createElement('div'); row.className = 'invrow' + (r === BAG_ROWS ? ' hot' : '');
      for (let c = 0; c < INV_SIZE; c++) {
        const i = r === BAG_ROWS ? c : (r + 1) * INV_SIZE + c;   // bag row r holds slots (r+1)*8 .. (r+2)*8-1, left to right
        row.appendChild(makeCellSlot(inventory, i));
      }
      pbox.appendChild(row);
    }
    gridEl.appendChild(pbox);
  } else {                                     // plain Tab open: just the bag rows, no chest box (unchanged look)
    for (let r = 0; r < BAG_ROWS + 1; r++) {
      const row = document.createElement('div'); row.className = 'invrow' + (r === BAG_ROWS ? ' hot' : '');
      for (let c = 0; c < INV_SIZE; c++) {
        const i = r === BAG_ROWS ? c : (r + 1) * INV_SIZE + c;
        row.appendChild(makeCellSlot(inventory, i));
      }
      gridEl.appendChild(row);
    }
  }
  invEl.classList.toggle('chestopen', !!(activeChest && activeChest.items));   // hide the generic title when showing two boxes
}
gridEl.addEventListener('contextmenu', e => e.preventDefault());   // RMB drag grabs half a stack - no browser menu on top of it
function openInventory(chest) {
  if (invOpen || !locked) return;
  SFX.click(); clearInput();
  activeChest = chest || null;
  invOpen = true;
  document.body.classList.add('invopen');                 // hides #menu in CSS + dims the bottom HUD while the panel is up
  buildPanelGrid();
  renderInventory();
  invEl.classList.add('show');
  if (document.exitPointerLock) document.exitPointerLock();   // frees the pointer; on lock loss openMenu() is skipped by the || invOpen check
}
function closeInventory() {
  if (!invOpen) return;
  if (dragStack) finishDrag(-1);                            // an unfinished drag goes back where it started
  SFX.click();
  invOpen = false; activeChest = null;
  document.body.classList.remove('invopen');
  invEl.classList.remove('show');
  const p = renderer.domElement.requestPointerLock ? renderer.domElement.requestPointerLock() : null;
  if (p && typeof p.catch === 'function') p.catch(() => openMenu());   // Chrome may refuse a re-lock right after the unlock - land on pause screen instead
}
document.addEventListener('keydown', e => {                // Tab opens (only while locked & not in cockpit/drone/computer), Tab or Esc closes
  if (!invOpen && !(e.code === 'Tab' && !e.ctrlKey && !e.altKey)) return;
  e.preventDefault();
  if (e.repeat) return;                                   // key auto-repeat must not toggle it
  if (invOpen) closeInventory();
  else if (locked && !mlrs.active && !_pilotDrone && !_comp) openInventory();
});
// Chest panels close on right-click too: a RMB that did NOT grab onto a stack releases the panel. Each slot's own mousedown
// runs first during bubbling, so by the time this fires a RMB half-grab has already set dragStack and we bail without closing.
document.addEventListener('mousedown', e => {
  if (!invOpen || !activeChest || e.button !== 2) return;
  if (dragStack) return;
  e.preventDefault();
  closeInventory();
});
// drag & drop: a grabbed stack is lifted out of its slot, shown as a ghost under the cursor, and placed on mouseup. Cells are
// { arr, i } so drags work across both the chest and the player's bag; plain numbers still address "player inventory slot".
let dragStack = null, dragFrom = null;
function startDrag(cellOrIdx, button, cx, cy) {
  const cell = (typeof cellOrIdx === 'object') ? cellOrIdx : { arr: inventory, i: cellOrIdx };   // numbers (tests/API) -> player bag
  const st = cell.arr[cell.i];
  if (!st || !ITEM_INFO[st.id]) return;
  const take = (button === 2 && st.count > 1) ? Math.ceil(st.count / 2) : st.count;   // RMB grabs half, LMB the whole stack
  dragFrom = cell; dragStack = { id: st.id, count: take };
  if (take >= st.count) cell.arr[cell.i] = null; else st.count -= take;
  paintSlot(ghostCanvas, ghostCount, dragStack);
  if (typeof cx === 'number' && typeof cy === 'number') { ghostEl.style.left = (cx + 14) + 'px'; ghostEl.style.top = (cy + 12) + 'px'; }
  ghostEl.classList.add('show');
  SFX.click(); renderInventory(); updateHeldItem();          // held-item preview updates live as you move the selected stack around
}
function putIn(cellOrIdx, id, n) {                            // place up to a full stack into cell; returns whatever did not fit
  const cell = (typeof cellOrIdx === 'object') ? cellOrIdx : { arr: inventory, i: cellOrIdx };   // numbers (tests/API) -> player bag
  const st = cell.arr[cell.i]; let left = n;
  if (st && st.id === id && st.count < STACK_MAX) { const a = Math.min(STACK_MAX - st.count, left); st.count += a; left -= a; }   // merge onto same item
  else if (!st) { const a = Math.min(STACK_MAX, left); cell.arr[cell.i] = { id: id, count: a }; left -= a; }                        // empty slot
  return left;
}
// throwing items away: Q from the selected hotbar slot, or releasing a drag outside the panel grid.
function dropToGround(id, n) {                          // spawns real ground pickups - the same entity pool breaks already use
  if (!ITEM_INFO[id] || !(n > 0)) return;
  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);   // forward in xz is (-sy, -cy) (same convention as stepPhysics)
  for (let k = 0; k < n; k++) {                         // one pickup entity per item, spread into a small pile just ahead of the feet
    const a2 = Math.random() * Math.PI * 2, r = Math.sqrt(Math.min(1, k / Math.max(1, n))) * 0.45;
    spawnDrop(player.pos.x - sy * 1.1 + Math.cos(a2) * r, player.pos.y - 1.35, player.pos.z - cy * 1.1 + Math.sin(a2) * r, id, DROP_NOPICK);   // brief no-pickup window
  }
}
function throwDragAway() {                              // a stack released outside the panel goes to the ground, never lost
  const h = dragStack;
  dragStack = null; ghostEl.classList.remove('show');
  if (!h) return;
  dropToGround(h.id, h.count);
  SFX.click(); renderInventory(); updateHeldItem();
}
document.addEventListener('keydown', e => {             // Q: throw one item from the selected hotbar slot (Shift+Q = whole stack)
  if (e.code !== 'KeyQ' || e.repeat || !locked || invOpen || mlrs.active || _pilotDrone || _comp) return;
  const st = inventory[selIndex];
  if (!st) return;
  e.preventDefault();
  const n = e.shiftKey ? st.count : Math.min(1, st.count);
  dropToGround(st.id, n);
  st.count -= n;
  if (st.count <= 0) inventory[selIndex] = null;
  SFX.click(); renderInventory(); updateHeldItem();
});
function finishDrag(toOrIdx) {
  const h = dragStack;
  dragStack = null; ghostEl.classList.remove('show');
  if (!h) return;
  let tcell;                                              // released outside a slot (or -1/void) -> back where it started
  if (typeof toOrIdx === 'number') tcell = (toOrIdx < 0 || toOrIdx >= INV_TOTAL) ? dragFrom : { arr: inventory, i: toOrIdx };
  else tcell = (toOrIdx && toOrIdx.arr) ? toOrIdx : dragFrom;
  let left = putIn(tcell, h.id, h.count);                        // empty / same item: place + merge
  const homeFree = !dragFrom.arr[dragFrom.i];
  if (left > 0 && !(tcell.arr === dragFrom.arr && tcell.i === dragFrom.i)) {   // target occupied by another item: whole-stack swap when home is free...
    const c = tcell.arr[tcell.i];
    if (homeFree) { tcell.arr[tcell.i] = null; dragFrom.arr[dragFrom.i] = c; left -= putIn(tcell, h.id, left); }   // occupant moves out FIRST so our stack always fits
    else left = putIn(dragFrom, h.id, left);                 // ...otherwise send the leftover back home (merges with a half-grab remainder)
  }
  SFX.click(); renderInventory(); updateHeldItem();
}
window.addEventListener('mousemove', e => { if (!dragStack) return; ghostEl.style.left = (e.clientX + 14) + 'px'; ghostEl.style.top = (e.clientY + 12) + 'px'; });
window.addEventListener('mouseup', e => {
  if (!invOpen || !dragStack) return;
  const el = (e.target && e.target.closest) ? e.target.closest('.islot') : null;   // dropped on a panel slot or outside the grid entirely
  if (!el) throwDragAway();                        // outside the bounds of the inventory UI -> item goes to the ground in front of you
  else finishDrag({ arr: el._arr, i: el._i });
});
buildPanelGrid();   // build the player panel once at load so its slot DOM exists before the first open (mirrors hotbar highlight + tests)
// ============================================================ hearts HUD + damage
const MAX_HEALTH = 20, HEART_COUNT = 10;      // each heart is worth 2 health (like vanilla)
let health = MAX_HEALTH;
let hurtFlashT = 0;                           // >0 while the red "hit" vignette fades out

const HEART_ROWS = [                          // pixel heart, 9x7
  '.##...##.',
  '#########',
  '#########',
  '.#######.',
  '..#####..',
  '...###...',
  '....#....',
];
function drawHeart(canvas, frac) {            // frac: 0 (empty) .. 1 (full) heart of 2 HP
  const px = 4;                               // texel scale -> 36x28 canvas
  if (canvas.width !== HEART_ROWS[0].length * px || canvas.height !== HEART_ROWS.length * px) {
    canvas.width = HEART_ROWS[0].length * px; canvas.height = HEART_ROWS.length * px;
  }
  const g = canvas.getContext('2d');
  for (let y = 0; y < HEART_ROWS.length; y++) {
    const row = HEART_ROWS[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== '#') continue;
      let on;
      if (frac >= 1) on = true;
      else if (frac <= 0.02) on = false;
      else on = x < 4;                        // half heart: left lobe lit, right side dark
      g.fillStyle = on ? '#e6392f' : '#3d1e1c';
      g.fillRect(x * px, y * px, px, px);
    }
  }
}
const heartsEl = document.getElementById('hearts');
const heartCanvases = [];
for (let i = 0; i < HEART_COUNT; i++) { const hc = document.createElement('canvas'); heartsEl.appendChild(hc); heartCanvases.push(hc); }
function renderHearts() {
  for (let i = 0; i < HEART_COUNT; i++) drawHeart(heartCanvases[i], Math.max(0, Math.min(2, health - i * 2)) / 2);
}
renderHearts();

// ---- hunger HUD (placeholder: always full, no gameplay effect yet)
const HUNGER_COUNT = 10;
const MEAT_ROWS = [                          // pixel drumstick, 8x7 (M meat, B bone)
  '......B.',
  '.MMM.BBB',
  'MMMMMM..',
  '.MMMMMM.',
  '.MMMMMM.',
  '..MMMM..',
  '...MM...',
];
function drawMeat(canvas, lit = true) {
  const px = 4;                              // texel scale -> 32x28 canvas
  canvas.width = MEAT_ROWS[0].length * px; canvas.height = MEAT_ROWS.length * px;
  const g = canvas.getContext('2d');
  for (let y = 0; y < MEAT_ROWS.length; y++) {
    const row = MEAT_ROWS[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === '.') continue;
      g.fillStyle = lit ? (ch === 'B' ? '#e8ddbf' : '#cf7c2a') : '#3d3d44';   // dimmed slot when that bar is empty
      g.fillRect(x * px, y * px, px, px);
    }
  }
}
const hungerEl = document.getElementById('hunger');
for (let i = 0; i < HUNGER_COUNT; i++) {
  const mc = document.createElement('canvas'); drawMeat(mc); hungerEl.appendChild(mc);
}

// ---- oxygen HUD (MC-style bubbles above the hunger row, shown only while submerged)
const OXYGEN_MAX = 10;
let oxygen = OXYGEN_MAX;      // remaining bubbles (integer, like vanilla)
let o2DrainT = 0;             // accumulator: drops one bubble per interval
let drownDmgT = 0;            // out-of-air damage timer
const BUBBLE_ROWS = [          // pixel bubble, 9x7 (H=highlight sparkle)
'.#######.',
'#HH#####.',
'#.####..#',
'#.......#',
'#...##..#',
'#.......#',
'.#######.'
];
function drawBubble(canvas, lit) {
  const px = 4;                // -> 36x28 canvas, same as hearts/hunger row icons
  if (canvas.width !== BUBBLE_ROWS[0].length * px || canvas.height !== BUBBLE_ROWS.length * px) { canvas.width = BUBBLE_ROWS[0].length * px; canvas.height = BUBBLE_ROWS.length * px; }
  const g = canvas.getContext('2d');
  for (let y = 0; y < BUBBLE_ROWS.length; y++) { const row = BUBBLE_ROWS[y]; for (let x = 0; x < row.length; x++) { const ch = row[x]; if (ch === '.') continue;
    g.fillStyle = ch === 'H' ? '#eaf7ff' : (lit ? '#63c6ff' : '#2b3a49');   // lit bubble vs empty slot
    g.fillRect(x * px, y * px, px, px); } }
}
const oxygenEl = document.getElementById('oxygen');
const bubbleCanvases = [];
for (let i = 0; i < OXYGEN_MAX; i++) { const bc = document.createElement('canvas'); drawBubble(bc, true); oxygenEl.appendChild(bc); bubbleCanvases.push(bc); }
function renderOxygen() { for (let i = 0; i < OXYGEN_MAX; i++) drawBubble(bubbleCanvases[i], i < oxygen); }
renderOxygen();

const O2_DRAIN_SEC = 1, DROWN_SEC = 1;   // one bubble every second (doubled drain vs. before); once empty: one heart of damage per second
function updateOxygen(dt) {
  const headBlock = blockAt(Math.floor(camera.position.x), Math.floor(camera.position.y), Math.floor(camera.position.z));
  const sub = locked && headBlock === WATER;   // fully under water (head below surface); hidden in menus like the arm
  oxygenEl.classList.toggle('show', sub);
  if (!sub) { if (oxygen !== OXYGEN_MAX) { oxygen = OXYGEN_MAX; o2DrainT = 0; drownDmgT = 0; renderOxygen(); } return; }   // refill on the surface, like vanilla's fast recovery
  o2DrainT += dt;
  let changed = false;
  while (o2DrainT >= O2_DRAIN_SEC && oxygen > 0) { o2DrainT -= O2_DRAIN_SEC; oxygen--; changed = true; }   // count down one bubble at a time
  if (changed) renderOxygen();
  if (oxygen <= 0) { drownDmgT += dt; while (drownDmgT >= DROWN_SEC && health > 0) { drownDmgT -= DROWN_SEC; takeDamage(2); SFX.hurt(); } }   // 2 HP = one heart per second (with a hurt oof)
}
  // ---- hunger: drains over time, faster when moving / sprinting; refilled by eating meat
  const HUNGER_MAX = 10;                       // one bar per unit (== HUNGER_COUNT icons)
  let hunger = HUNGER_MAX;                     // fractional 0..HUNGER_MAX -> bars drop off one by one as it falls
  const HUNGER_DRAIN = { idle: HUNGER_MAX/3600, walk: HUNGER_MAX/1200, run: HUNGER_MAX/600 };   // full->empty in ~1h / ~20min / ~10min
  let hungerMode = 'idle';                     // set each frame from stepPhysics based on actual movement
  
  function renderHunger() { for (let i = 0; i < HUNGER_COUNT; i++) drawMeat(hungerEl.children[i], i < hunger); }
  function updateHunger(dt) {
    if (!locked || health <= 0) return;
    const before = hunger;
    hunger = Math.max(0, hunger - HUNGER_DRAIN[hungerMode] * dt);
    if (Math.floor(before) !== Math.floor(hunger)) renderHunger();   // repaint only when a bar crosses an integer boundary
  }
  
  // ---- eating meat: hold right-click for EAT_TIME while holding meat in the selected slot -> +EAT_GAIN bars
  const EAT_TIME = 1.5, EAT_GAIN = 2;
  let eatT = 0;                                // seconds of continuous hold so far
  let munchT = 0;                              // cadence timer for the repeated chewing sounds while holding food
  const MUNCH_INTERVAL = 0.2;                  // one chew bite every ~0.2s -> ~8 chews over a full 1.5s eat
  let eatHeld = false;                         // drives the arm's "eating" hand swing in updateArm
  function updateEat(dt) {
    if (!locked || health <= 0) { eatT = 0; munchT = 0; eatHeld = false; return; }
    const st = inventory[selIndex];
    const canEat = mouseState.right && st && st.id === MEAT && hunger < HUNGER_MAX - 1e-6;   // holding meat and not already full
    if (canEat) {
      eatHeld = true;                          // swing the hand just like while mining / breaking blocks
      eatT += dt;
      munchT += dt;                            // chew continuously WHILE holding, so you hear it as it happens
      while (munchT >= MUNCH_INTERVAL) { munchT -= MUNCH_INTERVAL; SFX.chew(); }
      if (eatT >= EAT_TIME) {
        hunger = Math.min(HUNGER_MAX, hunger + EAT_GAIN); renderHunger();
        removeOneSelected();                   // consume one meat from the held slot (updates hand + hotbar)
        triggerArmSwing('break');              // a little strike as it lands in your mouth
        eatT = 0; munchT = 0;
      }
    } else { eatT = 0; munchT = 0; eatHeld = false; }
  }

  
const hurtEl = document.getElementById('hurt');
function takeDamage(n) {
  if (health <= 0) return;
  health = Math.max(0, health - n);
  hurtFlashT = 0.5;
  renderHearts();
  if (health <= 0) die();
}

const deadEl = document.getElementById('deadmsg');
function respawnPlayer() {
  const [rx, rz] = findSpawn();   // same SPAWN_Z_OFF shift as the initial spawn (stay clear of the HIMARS)
  const sz = rz + SPAWN_Z_OFF;
  player.pos.set(rx + 0.5, topSolidY(rx, sz) + 1 + EYE + 0.02, sz + 0.5);
  player.vy = 0;
}
function die() {
  deadEl.classList.remove('show'); void deadEl.offsetWidth; deadEl.classList.add('show');
    if (_comp) unmountComp();   // stand up from a machine before respawning (screen powers off, body goes home)

  health = MAX_HEALTH; renderHearts();        // respawn at full (items kept - keep it friendly)
  if (!inventory.some(st => st && st.id === SKATE)) addItem(SKATE);   // always roll back onto a fresh board - only tops up if you died without one
    if (!inventory.some(st => st && st.id === DRONE)) { inventory[0] = { id: DRONE, count: 5 }; renderInventory(); }   // re-arm a stack of FPV drones in hotbar slot 1 too (same treatment as the skate)
    if (!inventory.some(st => st && st.id === COMP)) addItem(COMP);   // and a computer, same housekeeping

  respawnPlayer();
  syncCamera();
}

// ============================================================ item drops (ground pickups)
const dropGeo = (() => {
  const g = new THREE.BoxGeometry(0.28, 0.28, 0.28);
  const bright = [0.9, 0.76, 1.0, 0.65, 0.98, 0.85];   // +x -x +y -y +z -z (item-ish lighting)
  const col = new Float32Array(72);
  for (let f = 0; f < 6; f++) for (let v = 0; v < 4; v++) { const o = (f * 4 + v) * 3; col[o] = col[o+1] = col[o+2] = bright[f]; }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
})();
const dropMatsCache = {};                     // id -> per-face material array (shared by every drop of that block)
function dropMats(id) { return dropMatsCache[id] ??= [0,1,2,3,4,5].map(fi => materials[materialKey(id, fi)]); }

const drops = [];                             // { x,y,z, vy, rest, age, id, mesh }
const MAX_DROPS = 512;
const DROP_NOPICK = 2.0;                      // fresh drops ignore pickup for this long - vanilla-style drop cooldown so Q/drag-throws don't bounce straight back into the bag
function spawnDrop(x, y, z, id, noPick = 0) {           // noPick = seconds the drop ignores pickup (thrown items land right in reach; without this they'd be re-collected next frame)
  if (!ITEM_INFO[id]) return;                 // unstackable blocks just vanish
  if (drops.length >= MAX_DROPS) removeDrop(0);   // oldest despawns - keeps memory bounded
  const mesh = new THREE.Mesh(dropGeo, dropMats(id));
  scene.add(mesh);
  drops.push({ x, y, z, vy: -1.5, rest: false, age: 0, noPick, id, mesh });
}
function removeDrop(i) {
  const d = drops[i]; if (!d) return;
  scene.remove(d.mesh);                       // geometry + materials are shared - never dispose here
  drops.splice(i, 1);
}
function updateDrops(dt) {
  for (let i = drops.length - 1; i >= 0; i--) {
    const d = drops[i];
    d.age += dt; if (d.noPick > 0) d.noPick -= dt;   // freshly thrown drops ignore pickup for a moment (vanilla-style drop cooldown)

    // pickup: drop near the player's mid-body AND room in the bag -> add it
    const fx = player.pos.x, fy = player.pos.y - EYE + 0.5, fz = player.pos.z;
    let dxp = fx - d.x, dyp = fy - d.y, dzp = fz - d.z;
    const dist = Math.hypot(dxp, dyp, dzp);
    if (d.noPick <= 0 && dist < 1.5) { if (addItem(d.id)) removeDrop(i); continue; }   // walk-over pickup: within ~1.5 blocks; just-thrown drops also wait out noPick first

    if (!d.rest) {
      // fall under gravity until something solid catches us
      d.vy -= GRAVITY * dt; if (d.vy < -30) d.vy = -30;
      const ny = d.y + d.vy * dt;
      const bx = Math.floor(d.x), bz = Math.floor(d.z);
      const byCell = Math.floor(ny - 0.14);
      if (d.vy < 0 && solidForPhysics(bx, byCell, bz)) {
        let sy = Math.min(H - 2, Math.floor(d.y - 0.14));
        for (; sy > 0 && !solidForPhysics(bx, sy, bz); sy--);   // nearest support below us
        d.y = sy + 1 + 0.15;                               // sit on top of that solid block
        d.vy = 0; d.rest = true;
      } else d.y = ny;
    } else if (d.age > 1.2 && d.noPick <= 0 && dist < 2.0) {   // gentle magnet only when you're almost on top of it - no more flying to you from across the room
      // settled for a moment: drift gently toward the player until pickup range
      const sp = Math.min(dist, 7 * dt);
      d.x += dxp / dist * sp; d.y += dyp / dist * sp; d.z += dzp / dist * sp;
    }

    d.mesh.position.set(d.x, d.y + (d.rest ? Math.sin(d.age * 2.8 + i) * 0.04 : 0), d.z);  // classic idle bob
    d.mesh.rotation.y += dt * 1.7;
  }
}

  // ============================================================ block-break particles (Minecraft-style)
  // A few tiny squares in the block's own texture color pop off when a block breaks,
  // fly outward with drag + gentle gravity, settle on solids and die after ~0.5s.
  const MAX_PARTICLES = 480;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES * 3), 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES * 3), 3));
  pGeo.setDrawRange(0, 0);
  const particlePoints = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.13, vertexColors: true }));
  particlePoints.frustumCulled = false;   // positions are written by hand each frame
  scene.add(particlePoints);

  // sample real pixels from the block's texture so particles match its exact palette (grass => green+brown mix, etc.)
  const pxDatas = {};
  function particlePixels(key) {
    let px = pxDatas[key]; if (px) return px;
    const FALLBACKS = { grassTop: [[108,173,72]], dirt: [[134,99,70]], grassSide: [[98,162,64],[134,99,70]], stone: [[126,126,130]], woodSide: [[102,76,42],[120,88,48]],
      woodTop: [[152,124,80],[116,90,54]], leaves: [[52,106,44],[38,78,30]], tallgrass: [[96,158,58]], sand: [[221,208,162]], water: [[52,108,196]], meat: [[196,74,58],[214,120,96]], cactus: [[86,164,70],[52,124,46]] };
    const g = texCanvases[key] && texCanvases[key].getContext ? texCanvases[key].getContext('2d') : null;
    if (g && typeof g.getImageData === 'function') {
      const d = g.getImageData(0, 0, 16, 16).data;
      px = []; for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 128) px.push([d[i], d[i + 1], d[i + 2]]);   // skip cut-out alpha pixels
    }
    if (!px || !px.length) px = FALLBACKS[key] || [[150, 150, 150]];
    pxDatas[key] = px; return px;
  }

  const particles = [];                    // { x,y,z, vx,vy,vz, life, r,g,b, rest }
  function killParticle(i) {               // swap-remove keeps the list compact (index === buffer slot)
    const last = particles.length - 1;
    if (i !== last) particles[i] = particles[last];
    particles.pop();
  }
  function spawnBreakParticles(bx, by, bz, id, hit) {
    const px = particlePixels(materialKey(id, 4));   // side texture: grass blocks give the green/dirt mix like MC
    const n = (id === TALL_GRASS ? 10 : id === LEAVES || id === SAND ? 22 : 16) + ((Math.random() * 5) | 0);
    for (let i = 0; i < n; i++) {
      if (particles.length >= MAX_PARTICLES) killParticle((Math.random() * particles.length) | 0);   // recycle a random one, stays fast
      const col = px[(Math.random() * px.length) | 0];
      const bright = 0.85 + Math.random() * 0.3;
      particles.push({
        x: bx + 0.12 + Math.random() * 0.76, y: by + 0.12 + Math.random() * 0.76, z: bz + 0.12 + Math.random() * 0.76,
        vx: (Math.random() - 0.5) * 3.0 + (hit && hit.nx ? hit.nx * 1.3 : 0),
        vy: (Math.random() - 0.3) * 2.4 + 0.9 + (hit && hit.ny ? hit.ny * 1.3 : 0),
        vz: (Math.random() - 0.5) * 3.0 + (hit && hit.nz ? hit.nz * 1.3 : 0),
        life: 0.35 + Math.random() * 0.45, rest: false,
        r: col[0] / 255 * bright, g: col[1] / 255 * bright, b: col[2] / 255 * bright,
      });
    }
  }
  function updateBreakParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {           // physics + culling
      const p = particles[i];
      if (!p.rest) {
        p.life -= dt;
        if (p.life <= 0) { killParticle(i); continue; }
        p.vy -= GRAVITY * 0.55 * dt;                            // slower fall than items ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â MC particles float a bit
        const drag = Math.max(0, 1 - dt * 2.4);                 // quick air drag so they puff out and slow down
        p.vx *= drag; p.vz *= drag;
        let t = p.x + p.vx * dt;
        if (solidForPhysics(Math.floor(t), Math.floor(p.y), Math.floor(p.z))) p.vx *= -0.35; else p.x = t;   // bounce off walls
        t = p.z + p.vz * dt;
        if (solidForPhysics(Math.floor(p.x), Math.floor(p.y), Math.floor(t))) p.vz *= -0.35; else p.z = t;
        t = p.y + p.vy * dt;
        if (p.vy < 0 && solidForPhysics(Math.floor(p.x), Math.floor(t), Math.floor(p.z))) {                 // landed: settle on top of the support
          let syc = Math.max(1, Math.floor(p.y));
          for (; syc > 0 && !solidForPhysics(Math.floor(p.x), syc, Math.floor(p.z)); syc--);
          p.y = syc + 1.04; p.vy = 0; p.rest = true; p.life = Math.min(p.life, 0.3);   // resting ones fade out a bit sooner
        } else p.y = t;
        if (p.x < -2 || p.z < -2 || p.x > W + 2 || p.z > D + 2 || p.y < -2) { killParticle(i); continue; }  // out of the world
      } else {
        p.life -= dt * 2.5;                                     // resting particles die quicker
        if (p.life <= 0) { killParticle(i); continue; }
        p.vx *= Math.max(0, 1 - dt * 6); p.vz *= Math.max(0, 1 - dt * 6);   // skid to a stop where they landed
      }
    }
    const pos = pGeo.attributes.position.array, col = pGeo.attributes.color.array;   // fill the buffer
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i], o = i * 3;
      pos[o] = p.x; pos[o + 1] = p.y - 0.05; pos[o + 2] = p.z;   // nudge down so resting ones don't clip the ground
      col[o] = p.r; col[o + 1] = p.g; col[o + 2] = p.b;
    }
    pGeo.setDrawRange(0, particles.length);
    pGeo.attributes.position.needsUpdate = true;
    pGeo.attributes.color.needsUpdate = true;
  }


// red vignette flash when taking damage
let lastHurtOpacity = -1;
function updateHurtFlash(dt) {
  if (hurtFlashT > 0) hurtFlashT -= dt;
  const o = Math.max(0, Math.min(1, hurtFlashT / 0.5)) * 0.8;
  if (o !== lastHurtOpacity) { hurtEl.style.opacity = String(o); lastHurtOpacity = o; }
}

// ============================================================ input
// ============================================================ mobs (friendly passives: cow, sheep, chicken)
const MOBS = [];
const _mv = new THREE.Vector3();   // reused view-direction vector

const MOB_TYPES = {
  cow:     { w:0.9,  h:1.5, len:1.7, half:0.42, hp:24, jump:4.2, speed:[1.1,2.1], meat:3, bodyC:0xded2bd, headC:0xb0946f },
  sheep:   { w:0.85, h:1.2, len:1.3, half:0.40, hp:18, jump:5.0, speed:[1.0,1.9], meat:2, bodyC:0xf1ece0, headC:0xcbb48f },
  chicken: { w:0.5,  h:0.7, len:0.6, half:0.26, hp:8,  jump:7.0, speed:[1.3,2.5], meat:1, bodyC:0xf3d24b, headC:0xe9c23e },
};

function makeMobMesh(type) {
  const T = MOB_TYPES[type];
  const g = new THREE.Group();
  const parts = [];   // every coloured box we can flash on a hit
  const addBox = (w, h, d, x, y, z, c) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: c }));
    m.position.set(x, y, z); g.add(m); parts.push({ m, base: c }); return m;
  };

  // ---- cow: two-tone body (cream belly / dark brown back), head with snout, ears, eyes, hooves and a tail
  if (type === 'cow') {
    const patch = 0x6e4f33;                                     // the dark coat patches
    for (const [ox, oz] of [[-0.26,-0.48],[0.26,-0.48],[-0.26,0.48],[0.26,0.48]]) {  // four legs + hooves
      addBox(0.18, 0.56, 0.18, ox, 0.34, oz, 0xa78a5f);
      addBox(0.20, 0.10, 0.20, ox, 0.07, oz, 0x322b24);
    }
    addBox(0.86, 0.54, T.len * 0.72, 0, 0.62, 0, T.bodyC);      // lower torso (cream)
    addBox(0.90, 0.30, T.len * 0.75, 0, 1.00, 0, patch);        // back band (brown)
    addBox(0.92, 0.26, 0.45,   0, 0.66, -0.20, patch);          // flank patch
    addBox(0.40, 0.36, 0.40,   0, 1.10, 0.85, T.headC);         // head (meets the body -> neck)
    addBox(0.30, 0.18, 0.14,   0, 0.96, 1.08, 0xd9c39a);        // light snout on the front
    for (const sx of [-1, 1]) {                                 // ears + eyes
      addBox(0.10, 0.12, 0.22, sx * 0.25, 1.26, 0.80, patch);
      addBox(0.05, 0.09, 0.06, sx * 0.21, 1.13, 0.98, 0x201a15);
    }
    addBox(0.05, 0.34, 0.07,   0, 1.02, -0.76, patch);          // tail
    addBox(0.10, 0.16, 0.12,   0, 0.80, -0.79, 0x3a2d1e);       // dark tail tuft
  }

  // ---- sheep: lumpy wool (several same-colour boxes for a clumpy silhouette), short tan legs, small face with ears + eyes
  else if (type === 'sheep') {
    const fleece = T.bodyC;                                     // the fluffy white coat
    for (const [ox, oz] of [[-0.24,-0.34],[0.24,-0.34],[-0.24,0.34],[0.24,0.34]]) {   // four legs + hooves
      addBox(0.16, 0.40, 0.16, ox, 0.20, oz, 0xa98a63);
      addBox(0.17, 0.08, 0.17, ox, 0.05, oz, 0x3d342b);
    }
    addBox(0.72, 0.56, T.len * 0.68, 0, 0.64, 0, fleece);       // main wool mass
    addBox(0.78, 0.16, 0.34,         0, 0.95, -0.20, fleece);   // lumps along the back...
    addBox(0.78, 0.16, 0.34,         0, 0.95,  0.20, fleece);   // ...and rump
    for (const sx of [-1, 1])                                   // fluffs down the sides -> rounded look
      addBox(0.14, 0.44, 0.60, sx * 0.40, 0.60, 0, fleece);
    addBox(0.28, 0.30, 0.30,   0, 0.92, 0.60, T.headC);         // small tan head
    addBox(0.30, 0.10, 0.18,   0, 1.09, 0.50, fleece);          // wool tuft on the crown
    for (const sx of [-1, 1]) {                                 // droopy ears + eyes
      addBox(0.16, 0.07, 0.20, sx * 0.19, 0.94, 0.58, 0xb3946a);
      addBox(0.04, 0.08, 0.05, sx * 0.148, 0.95, 0.62, 0x201a15);
    }
  }

  // ---- chicken: plump body with wings and a fanned tail, tiny legs & feet, head with three-bump comb, two-part beak, wattle and eyes
  else if (type === 'chicken') {
    const accent = 0xcfa12f;                                    // deeper gold for wing / tail feathers
    for (const sx of [-1, 1]) {                                 // thin legs + little feet
      addBox(0.05, 0.16, 0.05, sx * 0.09, 0.08, 0.02, 0xd8a44a);
      addBox(0.05, 0.03, 0.14, sx * 0.09, 0.015, 0.07, 0xd8a44a);
    }
    addBox(0.44, 0.30, T.len * 0.60, 0, 0.32, -0.03, T.bodyC);  // plump body
    for (const sx of [-1, 1])                                   // wings hugging the sides
      addBox(0.05, 0.18, 0.26, sx * 0.245, 0.35, -0.04, accent);
    addBox(0.30, 0.12, 0.16,   0, 0.47, -0.26, T.bodyC);        // fanned tail (lower + upper feather)
    addBox(0.20, 0.10, 0.12,   0, 0.55, -0.24, accent);
    addBox(0.20, 0.19, 0.20,   0, 0.57, 0.24, T.headC);         // head (overlaps the chest -> neck)
    addBox(0.06, 0.11, 0.06,   0, 0.71, 0.20, 0xe23b2e);        // comb: tall centre bump...
    for (const sx of [-1, 1]) addBox(0.05, 0.08, 0.05, sx * 0.055, 0.69, 0.20, 0xe23b2e);   // ...+ two smaller
    addBox(0.10, 0.045, 0.12,  0, 0.585, 0.40, 0xf2a93b);       // beak (upper...
    addBox(0.07, 0.035, 0.10,  0, 0.545, 0.39, 0xf2a93b);       // ...+ lower part)
    addBox(0.05, 0.06, 0.04,   0, 0.50, 0.36, 0xe23b2e);        // little red wattle under the beak
    for (const sx of [-1, 1]) addBox(0.035, 0.07, 0.045, sx * 0.108, 0.60, 0.30, 0x201a15); // eyes
  }

  g.userData.parts = parts;
  return g;
}

function addMob(type, x, y, z) {
  const T = MOB_TYPES[type];
  const group = makeMobMesh(type);
  group.position.set(x, y, z);
  scene.add(group);
  MOBS.push({
    type, pos: new THREE.Vector3(x, y, z), vy: 0,
    dirAngle: Math.random() * Math.PI * 2, speed: 0, faceYaw: 0,
    half: T.half, radius: Math.max(T.w, T.len) / 2 + 0.18, height: T.h, meat: T.meat,
    hp: T.hp, alive: true, airborne: false, hitT: 0, wanderT: Math.random() * 2, idleT: 0, group, parts: group.userData.parts,
  });
}

function spawnMobs(count) {
  const types = ['cow', 'sheep', 'chicken'];
  // scatter over most of the map, not just one corner around the player spawn
  const spread = Math.min(150, W / 2 - 6);
  let made = 0, tries = 0;
  while (made < count && tries < count * 400) {   // wide area + land-only filter means lots of rejects
    tries++;
    const tx = Math.floor(spawnXZ[0] + (Math.random() * 2 - 1) * spread);
    const tz = Math.floor(spawnXZ[1] + (Math.random() * 2 - 1) * spread);
    if (!inBounds(tx, 3, tz)) continue;
    const hgt = topSolidY(tx, tz);
    if (hgt < WL + 1) continue;                                  // land only, above the water level
    const surf = blockAt(tx, hgt, tz);
    if (surf !== GRASS && surf !== DIRT && surf !== SAND) continue;   // dry ground
    let crowded = false;                                         // keep a minimum distance apart -> no herds in one spot
    for (const o of MOBS) if (o.alive && Math.abs(o.pos.x - (tx + 0.5)) < 14 && Math.abs(o.pos.z - (tz + 0.5)) < 14) { crowded = true; break; }
    if (crowded) continue;
    addMob(types[made % types.length], tx + 0.5, hgt + 1 + 0.02, tz + 0.5);
    made++;
  }
}

function killMob(m) {
  if (!m.alive) return;
  m.alive = false;
  scene.remove(m.group);
  for (const ch of m.group.children) ch.geometry.dispose();
  // drop its meat - falls to the ground and can be picked up like any other item
  for (let i = 0; i < m.meat; i++)
    spawnDrop(m.pos.x + (Math.random() - 0.5) * 0.8, m.pos.y + 0.4, m.pos.z + (Math.random() - 0.5) * 0.8, MEAT);
}

// would standing at (x,z) clip a wall/tree or step into the water?
function mobBlocked(m, x, z) {
  const r = m.half;
  for (const [ox, oz] of [[-r,-r],[r,-r],[-r,r],[r,r]]) {
    const bx = Math.floor(x + ox), bz = Math.floor(z + oz);
    if (!inBounds(bx, 0, bz)) return true;                       // treat the map edge as a wall
    // a one-block step up is climbable (the vertical easing below handles it) - only higher terrain blocks
    const climbsOver = topSolidY(bx, bz) + 1 > m.pos.y + 1.05;
    if ((solidForPhysics(bx, Math.floor(m.pos.y + 0.2), bz) || solidForPhysics(bx, Math.floor(m.pos.y + m.height * 0.5), bz)) && climbsOver) return true;
  }
  if (blockAt(Math.floor(x), Math.floor(m.pos.y), Math.floor(z)) === WATER) return true;   // don't wade in
  return false;
}

function updateMobs(dt) {
  for (const m of MOBS) {
    if (!m.alive) continue;

    // pick a heading: wander around, pausing now and then to stand still
    m.wanderT -= dt;
    if (m.idleT > 0) { m.idleT -= dt; m.speed = 0; }
    else if (m.wanderT <= 0) {
      if (Math.random() < 0.12) m.idleT = 0.4 + Math.random() * 1.6;   // shorter, rarer pauses -> more on the move
      else {
        m.dirAngle = Math.random() * Math.PI * 2;
        const T = MOB_TYPES[m.type];
        m.speed = T.speed[0] + Math.random() * (T.speed[1] - T.speed[0]);
        m.wanderT = 3 + Math.random() * 5;   // longer walks before re-picking a heading
      }
    }

    // horizontal: axis by axis, bounce the heading if we'd clip something
    const ca = Math.cos(m.dirAngle), sa = Math.sin(m.dirAngle);
    if (m.speed > 0) {
      const nx = m.pos.x + ca * m.speed * dt;
      if (!mobBlocked(m, nx, m.pos.z)) m.pos.x = nx; else m.dirAngle += (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 2 + Math.random());   // steer around the obstacle instead of re-rolling a random heading
      const nz = m.pos.z + sa * m.speed * dt;
      if (!mobBlocked(m, m.pos.x, nz)) m.pos.z = nz; else m.dirAngle += (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 2 + Math.random());   // steer around the obstacle instead of re-rolling a random heading
    }

    // vertical: ease onto the terrain; use gravity only for genuine falls into gaps
    const fx = Math.floor(m.pos.x), fz = Math.floor(m.pos.z);
    const surfY = inBounds(fx, 0, fz) ? topSolidY(fx, fz) + 1 : m.pos.y;
    if (m.airborne) {   // hit-hop: gravity until it settles back onto the terrain
        m.vy -= GRAVITY * dt; if (m.vy < -28) m.vy = -28;
        let ny = m.pos.y + m.vy * dt;
        if (ny <= surfY) { ny = surfY; m.vy = 0; m.airborne = false; }
        m.pos.y = ny;
      } else if (surfY - m.pos.y > 1.05) {
      m.vy = 0;                                             // can't rise more than one block: no floating up walls / tree trunks
    } else {
      m.pos.y += (surfY - m.pos.y) * Math.min(1, dt * 12);   // step up (max 1 block) / sink down smoothly
      m.vy = 0;
    }

    // face the way we're moving, with a little turn-inertia
    const targetYaw = Math.atan2(ca, sa);
    let dyaw = ((targetYaw - m.faceYaw + Math.PI) % (Math.PI * 2)) - Math.PI;
    m.faceYaw += dyaw * Math.min(1, dt * 6);

    // hit flash: tint red briefly, then ease back to the base colours
    if (m.hitT > 0) { m.hitT -= dt; const on = m.hitT > 0; for (const p of m.parts) p.m.material.color.setHex(on ? 0xff5346 : p.base); }
    else for (const p of m.parts) if (p.m.material.color.getHex() !== p.base) p.m.material.color.setHex(p.base);

    m.group.position.copy(m.pos);
    m.group.rotation.y = m.faceYaw;
  }
}

// which mob is the crosshair over? (nearest along the view ray within reach)
const MOB_REACH = 5;
function targetedMob() {
  camera.getWorldDirection(_mv);   // normalised world-space view direction (-z)
  let best = null, bestT = Infinity;
  for (const m of MOBS) {
    if (!m.alive) continue;
    const cx = m.pos.x - camera.position.x, cy = m.pos.y + m.height * 0.5 - camera.position.y, cz = m.pos.z - camera.position.z;
    const dist = Math.hypot(cx, cy, cz);
    if (dist > MOB_REACH || dist < 0.01) continue;
    const dot = (cx * _mv.x + cy * _mv.y + cz * _mv.z) / dist;          // cosine of the aim angle
    if (dist * Math.sqrt(Math.max(0, 1 - dot * dot)) > m.radius) continue;   // crosshair off-target -> miss
    const tproj = cx * _mv.x + cy * _mv.y + cz * _mv.z;                 // distance along the ray
    if (tproj < bestT) { bestT = tproj; best = m; }
  }
  return best;
}

function attackMob() {   // one swing at whatever's being aimed at. true on a hit
  const m = targetedMob();
  if (!m) return false;
  m.hp -= 5; m.hitT = 0.18;
  SFX.mobHurt(m.type);                       // each species yelps differently
  {                                          // little hop - only when standing on the ground
    const gY = inBounds(Math.floor(m.pos.x), 0, Math.floor(m.pos.z)) ? topSolidY(Math.floor(m.pos.x), Math.floor(m.pos.z)) + 1 : m.pos.y;
    if (!m.airborne && m.pos.y <= gY + 0.25) { m.vy = MOB_TYPES[m.type].jump; m.airborne = true; }
  }
  triggerArmSwing('break');
  if (m.hp <= 0) killMob(m);
  return true;
}

spawnMobs(60);   // tripled (was 20) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â spread across most of the map, kept well apart (see spawnMobs for the anti-crowd rule)

const mouseState = { left: false, right: false, lastAct: 0, lastAttack: 0 };

document.addEventListener('keydown', e => {
  if (e.code === 'Escape' && _comp) { unmountComp(); return; }   // the pointer is free while seated at a screen, so Esc has to stand us back out itself
  if (e.code === 'Space') e.preventDefault();
  keys[e.code] = true;
  const m = /^Digit([1-8])$/.exec(e.code);
  if (m) selectSlot(+m[1] - 1);
});
document.addEventListener('keyup', e => { keys[e.code] = false; });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function clearInput() {
  for (const k of Object.keys(keys)) delete keys[k];
  mouseState.left = false; mouseState.right = false;
}

// ============================================================ pause / main menu (screens live in index.html)
let hasPlayed = false;      // start screen before first play, pause menu after that
const $m = id => document.getElementById(id);
function $$q(sel) { try { return [...document.querySelectorAll(sel)]; } catch { return []; } }   // headless stubs have no querySelectorAll
const setToggle = (el, on) => { el.textContent = on ? 'ON' : 'OFF'; try { el.classList.toggle('on', !!on); } catch {} };   // label + visual state for the settings switches
function showScreen(name) {
  for (const sc of $$q('#menu .screen')) sc.classList.toggle('show', sc.id === 'screen-' + name);
}
function refreshSettingsUI() {   // sync every control with the current values
  for (const b of $$q('#ddGroup .mcbtn')) b.classList.toggle('active', +b.dataset.far === SET.drawFar);
  $m('ddVal').textContent = SET.drawFar + ' blocks';
  const sensPct = Math.round(SET.sens * 100), volPct = Math.round(SET.vol * 100);
  $m('sensRange').value = sensPct; $m('sensVal').textContent = sensPct + '%';
  $m('fovRange').value = SET.fov;   $m('fovVal').textContent = SET.fov + 'Ã‚Â°';
  $m('volRange').value = volPct;    $m('volVal').textContent = volPct + '%';
  setToggle($m('btnInvertY'), SET.invertY);
  setToggle($m('btnParticles'), SET.particles);

  setToggle($m('btnDebug'), SET.debug);
  }
function openMenu() {   // runs every time pointer lock is lost
  if (locked) return;
  showScreen(hasPlayed ? 'pause' : 'start');
  refreshSettingsUI();
}
let _uiLock = false;   // last reconciled pointer-lock state (per-frame safety net for browsers whose
                       // pointerlockchange is flaky or delayed - e.g. Chromium/Edge
function syncMenuToLock() {
  const now = !!(document.pointerLockElement === renderer.domElement);
  if (now === _uiLock) return;         // no change since last check - cheap no-op
  _uiLock = now; locked = now;
  document.body.classList.toggle('locked', now);   // drives `body.locked #menu { opacity:0 }` -> hides/shows the menu
  if (!now) clearInput();
  if (!now && mlrs.active) exitMlrs();
  if (!now && _pilotDrone) exitDrone();   // Esc mid-flight drops the drone where it is (left-click once grounded to reclaim)
  if (_comp || invOpen) return;        // pointer intentionally released - no pause/start menu over the display/panel
  openMenu();                          // start screen before first play, pause menu after
}
function requestGameLock() {
  const el = renderer.domElement;
  if (!el || !el.requestPointerLock) return false;
  // Chromium (Chrome/Edge) only honours requestPointerLock from a *focused, engaged* document -
  // unfocused windows get silently refused. Make sure we are front-most before asking.
  try { if (window.focus) window.focus(); } catch {}
  let p;
  try { p = el.requestPointerLock(); } catch (err) { console.warn('[lock] request rejected:', err && ((err.name||'')+' '+(err.message||''))); return false; }
  if (p && typeof p.catch === 'function') { p.catch(err => console.warn('[lock] request rejected:', err && ((err.name||'')+' '+(err.message||'')))); }
  return true;
}
function resumeGame() {
  hasPlayed = true; SFX.unlock(); SFX.click();
  if (document.pointerLockElement === renderer.domElement) return;   // already in the game
  requestGameLock();   // Chromium often refuses the very first attempt after a fresh load / Esc - retry briefly below
  let _tries = 0;
  const _retryLock = () => {
    if (document.pointerLockElement === renderer.domElement) return;   // engaged - done
    if (++_tries >= 4 || !hasPlayed) return;                           // give up after a handful of tries
    requestGameLock();
    setTimeout(_retryLock, _tries * 90 + 60);                          // ~150 / 240 / 330 ms apart
  };
  setTimeout(_retryLock, 80);
}
$m('btnStart').addEventListener('click', resumeGame);
$m('btnResume').addEventListener('click', resumeGame);
const toSub = name => () => { SFX.unlock(); SFX.click(); showScreen(name); };
$m('btnStartSettings').addEventListener('click', toSub('settings'));
$m('btnPauseSettings').addEventListener('click', toSub('settings'));
$m('btnStartControls').addEventListener('click', toSub('controls'));
$m('btnPauseControls').addEventListener('click', toSub('controls'));
const goBack = () => { SFX.click(); showScreen(hasPlayed ? 'pause' : 'start'); };
$m('btnCtrlBack').addEventListener('click', goBack);
$m('btnSetBack').addEventListener('click', goBack);
// settings wiring - everything applies live and is saved immediately
for (const b of $$q('#ddGroup .mcbtn')) {
  b.addEventListener('click', () => { SFX.click(); SET.drawFar = +b.dataset.far; saveSettings(); applyFogBase(); refreshSettingsUI(); });
}
$m('sensRange').addEventListener('input', e => { SET.sens = +e.target.value / 100; saveSettings(); $m('sensVal').textContent = Math.round(SET.sens * 100) + '%'; });
$m('fovRange').addEventListener('input',  e => { SET.fov = +e.target.value; applyFov(); saveSettings(); $m('fovVal').textContent = SET.fov + 'Ã‚Â°'; });
$m('volRange').addEventListener('input',  e => { SET.vol = +e.target.value / 100; SFX.setVolume(SET.vol); saveSettings(); $m('volVal').textContent = Math.round(SET.vol * 100) + '%'; });
$m('btnInvertY').addEventListener('click',   () => { SFX.click(); SET.invertY = !SET.invertY; saveSettings(); setToggle($m('btnInvertY'), SET.invertY); });
$m('btnParticles').addEventListener('click', () => { SFX.click(); SET.particles = !SET.particles; applyParticles(); saveSettings(); setToggle($m('btnParticles'), SET.particles); });

  $m('btnDebug').addEventListener('click', () => { SFX.click(); SET.debug = !SET.debug; if (!SET.debug) debugEl.textContent = ''; saveSettings(); setToggle($m('btnDebug'), SET.debug); });
  window.addEventListener('pointerlockchange', syncMenuToLock);   // + per-frame poll in animate() covers flaky Chromium delivery

document.addEventListener('mousemove', e => {
    if (mlrs.active) {   // in the cockpit the mouse only pans the bullseye (view stays locked top-down, no tilt/rotate)
              const k = MLRS_PAN_PER_PX, sy = Math.sin(mlrs.yaw), cy = Math.cos(mlrs.yaw);   // screen-right=(cy,0,-sy), screen-down=-forward
        mlrs.tx += (cy * e.movementX + sy * e.movementY) * k;
        mlrs.tz += (-sy * e.movementX + cy * e.movementY) * k;
        mlrs.tx = THREE.MathUtils.clamp(mlrs.tx, 4, W - 5);
        mlrs.tz = THREE.MathUtils.clamp(mlrs.tz, 4, D - 5);
      return;
    }
  if (!locked) return;
    if (_comp) return;   // seated at a computer - the mouse belongs to the screen, not the view
if (_pilotDrone) {   // acro mode: the mouse IS the stick - feed rotation-rate commands that decay, never steer the view directly
        const sk = 0.014 * SET.sens;   // was 0.02 (originally 0.05) - another ~30% cut since it still felt too twitchy
        _pilotDrone.stickX = THREE.MathUtils.clamp((_pilotDrone.stickX || 0) + e.movementX * sk, -1, 1);   // X stick -> yaw turn-rate command
        _pilotDrone.stickY = THREE.MathUtils.clamp((_pilotDrone.stickY || 0) + e.movementY * sk, -1, 1);   // Y stick -> pitch rate command
        return;   // no FPS look while piloted - the body's attitude is the view and it keeps whatever you give it
    }
  const _k = 0.0022 * SET.sens;
    player.yaw -= e.movementX * _k;
  player.pitch -= e.movementY * 0.0022;
  const lim = Math.PI / 2 - 0.01;
  player.pitch = Math.max(-lim, Math.min(lim, player.pitch));
});

document.addEventListener('contextmenu', e => { if (locked || _comp) e.preventDefault(); });   // RMB is dismount-at-the-screen, not the browser menu

function tryAct(button, now) {
  if (activeRide && button !== 0) return false;   // no placing blocks while riding (mining still works)
  const hit = aimHit();
  const ok = button === 0 ? doBreak(hit) : doPlace(hit);
  if (ok) mouseState.lastAct = now;
}

document.addEventListener('mousedown', e => {
      if (_comp) {   // seated at a computer screen: the mouse roams over the display (desktop icons take their own clicks), RMB stands back out
        if (e.button === 2) unmountComp();
        return;
      }
    if (mlrs.active) {   // in the cockpit LMB arms the salvo, RMB ALWAYS exits - no block interaction of any kind
      if (e.button === 0) mouseState.left = true;
      else if (e.button === 2) exitMlrs();
      return;
    }
  if (!locked) return;
  if (e.button === 0) {   // hold to mine as before - unless a board is under the crosshair
    const drAimed = _pilotDrone ? null : aimedDrone(5);   // reclaiming a grounded drone beats everything else under the crosshair
    const skAimed = _pilotDrone ? null : aimedSkate(4)                        // whacking placed boards beats mining/attacking
    mouseState.left = true;
    if (_pilotDrone) {
      mining = null; miningT = 0;   // no hands in FPV - LMB is flight only
    } else if (!(drAimed && pickupDrone(drAimed))) {   // left-click on a grounded drone pops it back into the bag
      const coAimed = aimedComp(4);   // a computer under the crosshair soaks up the click - nothing to mine through it
        if (coAimed) { /* mount with RMB instead */ }
        else if (skAimed && skAimed !== activeRide) hitSkate(skAimed);
      else if (!attackMob()) { mining = null; miningT = 0; }
    }
  }
  if (e.button === 2) {   // board interaction takes priority over block placement
    const skAimed = _pilotDrone ? null : aimedSkate(REACH);   // boards are never aimable from inside a drone (same as mobs)
    const drAimed = _pilotDrone ? null : aimedDrone(REACH)
      const coAimed = _pilotDrone ? null : aimedComp(REACH);   // a computer under the crosshair you can seat yourself at
      const chAimed = _pilotDrone ? null : aimedChest(REACH);  // a chest under the crosshair opens its contents

    let usedBoard = false;
    mouseState.right = true;
    if (activeRide)       { dismountSkate();     usedBoard = true; }   // right-click again to step off
    else if (_pilotDrone)  { exitDrone();         usedBoard = true; }   // RMB in flight drops the craft in place and restores the body at takeoff point
    else if (drAimed)     { enterDrone(drAimed); usedBoard = true; }   // right-click a grounded drone to fly it first-person
      else if (coAimed && mountComp(coAimed)) { usedBoard = true; }   // right-click a computer to sit down at its screen
      else if (chAimed) { openInventory(chAimed); usedBoard = true; }   // right-click a chest to open it (RMB / Tab closes again)
        else if (mountMlrs()) { usedBoard = true; }   // step into the MLRS cockpit - proximity, no aiming needed
    else if (skAimed)     { mountSkate(skAimed); usedBoard = true; }   // hop on
    if (!usedBoard) tryAct(2, performance.now());
  }
});
document.addEventListener('mouseup', e => {
  if (e.button === 0) { const relMlrs = mlrs.active && mouseState.left; mouseState.left = false; if (relMlrs) mlrsReleaseFire(); }
  if (e.button === 2) mouseState.right = false;
});

window.addEventListener('wheel', e => {
  selectSlot(selIndex + (e.deltaY > 0 ? 1 : -1));
}, { passive: true });

// ============================================================ skateboard (silly, but it works)
// Spawn with one in hotbar slot 2. Right-click to drop it where you're aiming; right-click a
// placed board while aiming and you hop on; left-click a placed board SKATE_BREAK_HITS times
// and it pops back into your inventory. While riding: W throttle, S brake/reverse, A/D steer,
// Space ollie. The mouse is a free-look camera only - board heading NEVER follows the view.
const SKATE_MAX_SPD = 8.74;     // m/s top speed - a 5% trim below the old 9.2
const SKATE_REV_SPD = -3.23;    // reverse creep (same 5% trim)
const SKATE_ACCEL   = 15;       // throttle ramp-up
const SKATE_BRAKE   = 22;       // hard brake / engaging reverse
const SKATE_COAST   = 2.0;      // rolling resistance when coasting (skates glide!)
const SKATE_TURN    = 2.3;      // rad/s steering authority, ramps up with speed
const SKATE_OLLIE_V = 7.6;      // Space jump pop while on the ground
const SKATE_RIDER_EYE = EYE + 0.18;   // rider's eye height above the wheels' contact point
const SKATE_BREAK_HITS = 3;     // left-clicks to smash a placed board back into an item
const SKATE_CONTACTS = [[-0.30, -0.40], [0.30, -0.40], [-0.30, 0.40], [0.30, 0.40], [0, 0]];   // collision footprint is roughly the wheelbase (kicktails may visually graze)
const SKATE_HALF_X = 0.32, SKATE_HALF_Z = 0.42;   // half-extents of the full collision box - same spread as the floor samples
const SKATE_CRASH_SPD = 4;        // min speed at which a wall hit dismounts you - slower bumps just stop with a soft scrape
const SKATE_TRICK_VY   = 13.2;      // Shift+Space trick pop - low & far arc (~3.3 blocks up, ~1s hang on flat ground): full flips want a hill/ledge for the extra airtime
const SKATE_TRICK_ROT  = 6.0;     // rad/s the deck tumbles with while holding shift in the air (W/S flip, A/D roll)
const SKATE_LAND_TOL   = 0.7;    // rad (~40ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°) of forgiveness when a trick lands mostly flat - lenient on purpose, anything past this is clearly not straight
const TAU = Math.PI * 2;          // full circle - "mostly straight" means the total tumble is within SKATE_LAND_TOL of whole spins
let skates = [];                // every board in the world: { pos, yaw, spd, vy, onGround, riding, hits, shakeT, mesh }
let activeRide = null;          // the board currently under our feet (or null)

// deck + kicktails + trucks + wheels. forHand builds always-visible viewmodel materials.
function buildSkateMesh(forHand) {
  const opts = forHand ? { depthTest: false, depthWrite: false, fog: false, transparent: true } : {};
  const deckMat  = new THREE.MeshBasicMaterial({ map: toTexture(texCanvases.woodSide), ...opts });
  const wheelMat = new THREE.MeshBasicMaterial({ color: 0x26262c, ...opts });
  const truckMat = new THREE.MeshBasicMaterial({ color: 0x9aa0a8, ...opts });
  const g = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.055, 1.04), deckMat); deck.position.y = 0.145;
  const tailF = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.05, 0.26), deckMat); tailF.position.set(0, 0.17, -0.58); tailF.rotation.x =  0.30;   // front kicktail (nose is local -z)
  const tailB = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.05, 0.26), deckMat); tailB.position.set(0, 0.17,  0.58); tailB.rotation.x = -0.30;   // rear kicktail
  g.add(deck, tailF, tailB);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.045, 12), wheelMat);
    wheel.rotation.z = Math.PI / 2;                              // axles across the deck (x axis)
    wheel.position.set(sx * 0.13, 0.055, sz * 0.36);
    const truck = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.075, 0.22), truckMat);
    truck.position.set(0, 0.10, sz * 0.36);
    g.add(wheel, truck);
  }
  if (forHand) g.traverse(o => { o.renderOrder = 101; });
  return { g, mats: [deckMat, wheelMat, truckMat] };
}

// highest surface the wheels can rest on below a board position (-999 when there's no floor)
const SKATE_SAMPLES = [[-0.32, -0.42], [0.32, -0.42], [-0.32, 0.42], [0.32, 0.42], [0, 0]];
// per-column floor tops under the five probe points (integer surface levels; columns with no floor are simply absent)
function skateColumnTops(px, pz, fromY) {
  const tops = [];
  for (const [ox, oz] of SKATE_SAMPLES) {
    const x = Math.floor(px + ox), z = Math.floor(pz + oz);
    if (!inBounds(x, 0, z)) continue;
    for (let y = fromY; y >= 0; y--) {
      const b = blockAt(x, y, z);
      if (b !== AIR && b !== WATER && b !== TALL_GRASS) { tops.push(y + 1); break; }
    }
  }
  return tops;
}

// surface an airborne / newly-grounded board can settle on: the HIGHEST level with a real majority (>=3 votes). A lone
// probe parked over an obstacle column must not fake support for the whole deck (the slow-bump drop-through bug), and no
// level may win on 1-2 votes - that's mid-straddle, i.e. free-falling off a ledge.
function pickSkateSurface(tops) {
  if (!tops.length) return -999;
  let best = -999;
  for (const t of tops) if (t > best && tops.filter(v => v === t).length >= 3) best = t;
  return best;
}

// highest surface the wheels can rest on below a board position (-999 when there's no floor); used by placeSkateAt
function skateSurfaceY(px, pz, fromY) {
  return pickSkateSurface(skateColumnTops(px, pz, fromY));
}




// sample points of SKATE_CONTACTS that clip a solid (0 = clear) - separates light corner scratches from real wall hits
function skateContacts(px, pz, py) {
  const yBot = Math.floor(py + 0.02), yTop = Math.floor(py + 0.3);   // band from just above wheel contact to the top of the board body: solids here clip us unless airborne above them
  let n = 0;                                                        // sample points classify the hit (1 = light corner scratch, >=2 = real wall hit)
  for (const [ox, oz] of SKATE_CONTACTS) {
    const x = Math.floor(px + ox), z = Math.floor(pz + oz);
    for (let y = yBot; y <= yTop; y++) if (solidForPhysics(x, y, z)) { n++; break; }
  }
  if (n > 0) return n;
  // full footprint sweep: the old point-only test left seams between samples that let bodies slip through walls. The box
  // matches the floor-sample spread exactly, so a board parked tight against an obstacle can never leave one of its
  // floor probes inside the obstacle column (that is what fooled skateSurfaceY into dropping it).
  const x0 = Math.floor(px - SKATE_HALF_X), x1 = Math.floor(px + SKATE_HALF_X - 1e-7);
  const z0 = Math.floor(pz - SKATE_HALF_Z), z1 = Math.floor(pz + SKATE_HALF_Z - 1e-7);
  for (let y = yBot; y <= yTop; y++)                          // tail/kicktail regions the points miss still stop us dead
    for (let x = x0; x <= x1; x++)
      for (let z = z0; z <= z1; z++) if (solidForPhysics(x, y, z)) return 2;   // box overlap is REAL contact - a 1 would never reach the crash threshold
  return 0;
}




function createSkate(x, y, z, yaw) {
  const mesh = buildSkateMesh(false).g;
  const s = { pos: new THREE.Vector3(x, y, z), yaw, spd: 0, vy: 0, onGround: true, groundY: y, riding: false, hits: 0, shakeT: 0, scrapeCd: 0, trick: false, trickRx: 0, trickRz: 0, mesh };
  syncSkateMesh(s, 0);
  scene.add(mesh);
  skates.push(s);
  return s;
}

// copy physics state onto the visual (nose tilt from vertical speed + hit shake)
function syncSkateMesh(s, dt) {
  if (dt > 0 && s.shakeT > 0) s.shakeT -= dt;
  let rx = THREE.MathUtils.clamp(s.vy * 0.035, -0.28, 0.42);   // nose down on landing, up in the air
  if (s.riding && Math.abs(s.spd) > 1.5 && (keys['KeyA'] || keys['KeyD'])) rx += keys['KeyD'] ? 0.16 : -0.16;   // lean into carves
  if (s.shakeT > 0) { rx += (Math.random() - 0.5) * 0.2; }
  s.mesh.rotation.set(rx + (s.trick ? s.trickRx : 0), s.yaw, s.trick ? s.trickRz : 0);   // during an airborne trick the deck tumbles freely; otherwise just the ollie nose-tilt
  s.mesh.position.copy(s.pos);
}

// right-click while holding the skateboard: drop it on the aimed cell (same rules as placing a block)
function placeSkateAt(hit) {
  if (!hit) return false;
  const tx = hit.x + hit.nx, ty = hit.y + hit.ny, tz = hit.z + hit.nz;
  if (!inBounds(tx, ty, tz)) return false;
  const cur = blockAt(tx, ty, tz); if (cur !== AIR && cur !== WATER) return false;
  if (aabbOverlapsCell(tx, ty, tz)) return false;   // don't spawn it inside yourself
  const x = tx + 0.5, z = tz + 0.5;
  const surf = skateSurfaceY(x, z, Math.min(H - 2, ty));
  if (surf === -999) return false;                  // no floor down this column - can't float it
  createSkate(x, surf, z, player.yaw);              // faces where you're looking so W feels natural at once
  SFX.place(SKATE);
  removeOneSelected();
  triggerArmSwing('place');
  return true;
}

const _skateNDC = new THREE.Vector2(0, 0);
const _skateRay = new THREE.Raycaster();
function aimedSkate(maxDist) {   // the board straight under the crosshair (nearest wins), or null
  if (!skates.length) return null;
  _skateRay.setFromCamera(_skateNDC, camera);
  let best = null, bd = maxDist || REACH;
  for (const s of skates) {
    const h = _skateRay.intersectObject(s.mesh, true);
    if (h.length && h[0].distance < bd) { bd = h[0].distance; best = s; }
  }
  return best;
}

function mountSkate(s) {   // hop on - from here the rider is carried by the board's physics
  const ddx = s.pos.x - player.pos.x, ddz = s.pos.z - player.pos.z;
  if (Math.hypot(ddx, ddz) > 2.4 || Math.abs(s.pos.y - (player.pos.y - EYE)) > 3) return false;   // only boards within reach get ridden (no pit teleports)
  activeRide = s; s.riding = true; s.hits = 0; s.trick = false; s.trickRx = 0; s.trickRz = 0;
  syncPlayerToSkate(); escapeGeometry();                   // never mount the rider inside a block (board parked tight to a wall)
  SFX.click();
  triggerArmSwing('place');
}

function syncPlayerToSkate() {   // teleport the eye onto the deck (the board is our collider while riding)
  const s = activeRide; if (!s) return;
  player.pos.x = s.pos.x;
  player.pos.y = s.pos.y + SKATE_RIDER_EYE;
  player.pos.z = s.pos.z;
  player.vy = s.vy;
  player.onGround = s.onGround;
}

function dismountSkate() {   // right-click while riding, or the board breaks out from under you
  if (!activeRide) return false;
  const s = activeRide;
  s.riding = false; activeRide = null;
  player.pos.y += 0.15;                        // headroom so we don't spawn inside geometry
  escapeGeometry();                            // wall bumps can leave our AABB clipped into a block - never stay embedded
  player.vy = s.vy < 0 ? s.vy : 0;             // keep falling momentum, never gain upward pop
  SFX.click();
  return true;
}

// Nudge the rider out of any solid geometry they overlap. Headroom first (as before), then step out sideways -
// a wall hit leaves our 0.6-wide AABB clipping up to ~30cm into the block, so going UP alone can never clear it.
function escapeGeometry() {
  const p = player.pos; let guard = 0;
  while (collides(p) && guard++ < 8) p.y += 0.2;                     // headroom first, exactly as before
  if (!collides(p)) return;                                         // clear - done
  const sx = p.x, sy = p.y, sz = p.z;                               // still clipped into a wall: find the nearest open spot sideways
  for (const d of [0.35, 0.7, 1.05]) {
    for (const [tx, tz] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      p.x = sx + tx * d; p.y = sy; p.z = sz + tz * d;
      if (!collides(p)) return;                                     // open spot found - gravity takes it from here
    }
  }
  p.x = sx; p.y = sy; p.z = sz;                                     // fully boxed in: stand on the column top rather than stay inside blocks
  const surf = topSolidY(Math.floor(sx), Math.floor(sz));
  if (surf > -900) { p.y = surf + 1 + EYE + 0.02; guard = 0; while (collides(p) && guard++ < 8) p.y += 0.25; }
}

// one left-click on a placed board: SKATE_BREAK_HITS of them pops it back into the inventory
function hitSkate(s) {
  s.hits++; s.shakeT = 0.2;
  SFX.mineTick(SKATE, Math.min(1, s.hits - 1), 2);
  triggerArmSwing('break');
  if (s.riding) dismountSkate();               // a whack mid-ride bounces you off first
  if (s.hits >= SKATE_BREAK_HITS) {
    scene.remove(s.mesh);
    s.mesh.traverse(o => { if (o.geometry) o.geometry.dispose(); });
    const i = skates.indexOf(s); if (i >= 0) skates.splice(i, 1);
    addItem(SKATE);                            // right back in the bag where it all started
    SFX.breakBlock(4);                         // wooden snap
  }
}

// riding into a wall/cliff at speed ends the ride: bucked off + crash sound
  function crashSkate() {
    const s = activeRide; if (!s) return false;
    dismountSkate();                        // hops us clear with headroom (SFX.click, then the big one below)
    s.spd = 0;                             // dead stop - no sliding back into the same wall on later frames
    s.shakeT = 0.25;                       // rattle as it settles against the block face
    SFX.crash();                           // wheel screech + deck thud
    return true;
  }

// did a trick landing come down mostly flat? Whole spins count as straight - anything else is a wipeout that bucks the rider off
  const _tM = new THREE.Matrix4(), _tUp = new THREE.Vector3(), _tFwd = new THREE.Vector3();
  function settleTrick(s, canInput) {
    if (!s.trick) return;
    s.trick = false;
    // judged on the ACTUAL deck orientation (same Euler-XYZ as the mesh renders): "flat" means the wheels still
    // point down - a pure yaw spin is fine. So a combo flip that lands straight but nose-reversed counts too!
    _tM.makeRotationFromEuler(new THREE.Euler(s.trickRx, s.yaw, s.trickRz));
    _tUp.set(0, 1, 0).applyMatrix4(_tM);   // where the deck's "up" is after the tumble...
    const flat = Math.acos(THREE.MathUtils.clamp(_tUp.y, -1, 1)) <= SKATE_LAND_TOL;   // ...and how close it still points at world up
    s.trickRx = 0; s.trickRz = 0;          // deck snaps back under the wheels as it settles (it's a game, not physics!)
    if (!canInput) return;                 // already dismounted mid-air: the board just lands quietly
    if (flat) {                            // straight landing - and where the NOSE ended up becomes the heading, so a fakie flip lands you fakie
      _tFwd.set(0, 0, -1).applyMatrix4(_tM);
      let dy = Math.atan2(-_tFwd.x, -_tFwd.z) - s.yaw;   // same fx=-sin(yaw)/fz=-cos(yaw) convention as the travel code
      while (dy > Math.PI) dy -= TAU; while (dy <= -Math.PI) dy += TAU;
      s.yaw += dy;                          // bake in the net spin
      SFX.click(); showTrickMsg('TRICK!');
    }
    else crashSkate();                     // busted it - wipeout screech + bucked off
  }

  let _trickEl = null, _trickTimer = 0;
  function showTrickMsg(txt) {   // floating one-liner over the hotbar (built on first use)
    if (!_trickEl) {
      _trickEl = document.createElement('div');
      _trickEl.style.cssText = "position:fixed;left:50%;top:32%;transform:translate(-50%,-50%);z-index:16;pointer-events:none;font-family:'Segoe UI',system-ui,sans-serif;font-size:26px;font-weight:700;letter-spacing:.08em;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.85);opacity:0;transition:opacity .2s ease";
      document.body.appendChild(_trickEl);
    }
    _trickEl.textContent = txt;
    requestAnimationFrame(() => { _trickEl.style.opacity = '1'; });
    clearTimeout(_trickTimer);
    _trickTimer = setTimeout(() => { _trickEl.style.opacity = '0'; }, 1400);
  }

// one frame of board physics. Only the ridden board reads input; parked ones just sit (and fall if you mine out their floor)
function stepSkateBoard(s, dt) {
  const canInput = s.riding;
  if (s.scrapeCd > 0) s.scrapeCd -= dt;   // scrape-sound cooldown
  const shiftDown = canInput && (keys['ShiftLeft'] || keys['ShiftRight']);
  if (canInput && keys['Space'] && s.onGround) {
    if (shiftDown) { s.vy = SKATE_TRICK_VY; s.trick = true; s.trickRx = 0; s.trickRz = 0; SFX.jump(); showTrickMsg('FLIP! W/S nose-over, A/D roll - land it FLAT or bust'); }   // trick jump: hold shift to tumble the deck in mid-air
    else if (keys['KeyW']) { s.vy = SKATE_OLLIE_V; SFX.jump(); }   // regular ollie, exactly as before
  }
  // space-then-shift: grabbing shift while still climbing from a jump converts it into a trick (same result as shift-then-space)
  if (canInput && !s.onGround && !s.trick && shiftDown && s.vy > 0) {
    s.vy = Math.max(s.vy, SKATE_TRICK_VY); s.trick = true; s.trickRx = 0; s.trickRz = 0; SFX.jump(); showTrickMsg('FLIP! W/S nose-over, A/D roll - land it FLAT or bust');
  }

  // throttle / brake / coast along the heading
  let target = 0, rate = SKATE_COAST;
  const tricking = canInput && s.trick && !s.onGround;   // airborne after a shift-jump: WSAD becomes tumble controls, board coasts on momentum
  if (canInput && !tricking && keys['KeyW'])      { target = SKATE_MAX_SPD; rate = SKATE_ACCEL; }
  else if (canInput && !tricking && keys['KeyS']) { target = SKATE_REV_SPD; rate = SKATE_BRAKE; }
  if (target > s.spd)      s.spd = Math.min(target, s.spd + rate * dt);
  else if (target < s.spd) s.spd = Math.max(target, s.spd - rate * dt);

  // steering: A/D turn the board. Never the mouse. Authority ramps up with speed so stops don't pivot like a tank
  const steerBase = (keys['KeyD'] ? -1 : 0) + (keys['KeyA'] ? 1 : 0);
  const steer = (canInput && !tricking) ? (s.spd < 0 ? -steerBase : steerBase) : 0;   // no carving while tumbling; reversing flips A/D like backing up a car
  if (steer && Math.abs(s.spd) > 0.3) s.yaw += steer * SKATE_TURN * Math.min(1, Math.abs(s.spd) / 4) * dt;
  // free tumble - only while shift is HELD in the air (release it and the deck holds its pose until landing): W/S pitches nose over tail, A/D rolls left to right
  if (tricking && shiftDown) {
    if (keys['KeyW']) s.trickRx += SKATE_TRICK_ROT * dt;
    if (keys['KeyS']) s.trickRx -= SKATE_TRICK_ROT * dt;
    if (keys['KeyA']) s.trickRz += SKATE_TRICK_ROT * dt;
    if (keys['KeyD']) s.trickRz -= SKATE_TRICK_ROT * dt;
  }

  // horizontal travel with wall checks
  const fx = -Math.sin(s.yaw), fz = -Math.cos(s.yaw);   // same convention as camera forward: nose is local -z
  const mvx = fx * s.spd * dt, mvz = fz * s.spd * dt;
  let skContact = 0;                                          // sample points the attempted move would clip: 1 is a corner scratch, >=2 is real contact
  const skImpact = Math.abs(s.spd);                           // pre-dampen speed at impact - decides if it's a dismount or just a stop
  if (mvx) { const nx = s.pos.x + mvx; const c = skateContacts(nx, s.pos.z, s.pos.y); if (!c) s.pos.x = nx; else { skContact = Math.max(skContact, c); s.spd *= -0.3; } }   // smack a wall: little bounce-back
  if (mvz) { const nz = s.pos.z + mvz; const c = skateContacts(s.pos.x, nz, s.pos.y); if (!c) s.pos.z = nz; else { skContact = Math.max(skContact, c); s.spd *= -0.3; } }
  if (skContact && canInput) { if (skImpact >= SKATE_CRASH_SPD && skContact >= 2) { s.trick = false; s.trickRx = 0; s.trickRz = 0; crashSkate(); } else if (s.scrapeCd <= 0) { SFX.mineTick(SKATE, 1, 3); s.scrapeCd = 0.25; } }   // solid hit at real speed = wipeout + sound; corner scratch / slow bump = quiet scrape and stop

  // vertical: gravity, then snap back onto the surface under the wheels (small landing corrections only - no auto-climbing)
  const wasGround = s.onGround;
  s.vy -= GRAVITY * dt; if (s.vy < -42) s.vy = -42;
  let ny = s.pos.y + s.vy * dt;
  // hysteresis: a GROUNDED board keeps the surface it is riding on (s.groundY) for as long as ANY floor probe still
// reports that level - a flat deck then slides off step-downs with its tail overhanging, never clipping the edge block
// row and never getting "stuck" or bucked off by contact. Only once every wheel has cleared must support be re-proven
// by majority (pickSkateSurface), which is what keeps a lone wall-adjacent probe from faking floor (drop-through bug).
const cols = skateColumnTops(s.pos.x, s.pos.z, Math.min(H - 2, Math.ceil(s.pos.y + 0.5)));
let surf;
if (s.onGround && typeof s.groundY === 'number' && cols.indexOf(s.groundY) >= 0) surf = s.groundY;   // still on the surface we were riding on
else surf = pickSkateSurface(cols);                                                                                     // airborne / fully cleared: need a real majority
  s.onGround = false;
  if (surf > -900 && ny <= surf && s.vy <= 0) {
    if (surf - s.pos.y <= 0.5) {                      // landing precision only - NEVER auto-climb onto an obstacle top
      if (!wasGround && -s.vy > 7) SFX.land((-s.vy - 7) / 25);   // hard landings thud like walking does
      s.vy = 0; ny = surf; s.onGround = true; s.groundY = surf;
      settleTrick(s, canInput);   // touchdown after a shift-jump: mostly flat = clean landing, anything else bucks the rider off
    }
  }
  if (ny < -24) ny = -24;                                // map floor, same as the player's own safety net
  s.pos.y = ny;
  syncSkateMesh(s, dt);
}

// park physics for every non-ridden board (they fall if their floor is mined out)
function stepParkedSkates(dt) {
  for (const s of skates) if (s !== activeRide) stepSkateBoard(s, dt);
}
// ============================================================ MLRS rocket launcher truck
// Parked near spawn: a box-built military truck with a rotating launch pod (6 tubes x 4 rounds).
// Right-click within reach of it to climb into the cockpit -> near-top-down aerial targeting view
// straight down over the terrain: WASD flies the bullseye, the mouse steers/tilts it, HOLD LMB arms
// the full salvo and releasing fires at the reticle. Right-click ALWAYS exits. A 20 s reload follows
// every launch. Rockets arc in from the pod and blast real craters out of blocks on impact - you can
// bail out with RMB mid-volley and watch them hit normally from the ground.
const MLRS_TUBES = 3, MLRS_ROUNDS_PER_TUBE = 4;   // 6 launch tubes x 4 rounds (matches the HUD pips)
const MLRS_RELOAD_MS = 15000;          // cooldown between salvos
const MLRS_ARM_TIME = 0.55;            // how long LMB must be held to arm a volley
const MLRS_CAM_H = 62;                 // cockpit: horizontal-ish distance from camera to bullseye (drives pull-back via tau)
const MLRS_CAM_Y = 80;                 // cockpit camera's FIXED world altitude (~2x the cloud layer at H+9..H+16) - pan doesn't bob with terrain
const MLRS_ROCKET_SPD = 28;           // flight speed, m/s (was 70 - slowed 60% so salvos arc nicer
const MLRS_PAN_PER_PX = 0.09;         // cockpit: world metres the bullseye moves per mouse pixel
const MLRS_CRATER_R = 6.8;             // blast radius at ground level (was 3.4 - doubled destructive power)

// --- the truck model ---------------------------------------------------------
function buildMlrsTruck() {
  const body   = new THREE.MeshBasicMaterial({ color: 0x51603a });
  const dark   = new THREE.MeshBasicMaterial({ color: 0x39422a });
  const metal  = new THREE.MeshBasicMaterial({ color: 0x8b9097 });
  const wheelM = new THREE.MeshBasicMaterial({ color: 0x1d1e22 });
  const tubeM  = new THREE.MeshBasicMaterial({ color: 0x232619 });
  const glass  = new THREE.MeshBasicMaterial({ color: 0x9fc4dd });
  const light  = new THREE.MeshBasicMaterial({ color: 0xf5ecc0 });

  const root = new THREE.Group();
  // wheels (3 per side), axles along x
  for (const sz of [-1.28, -0.05, 1.18]) for (const sx of [-0.78, 0.78]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.34, 18), wheelM);   // tire - a touch thicker so it reads as rubber, not a flat disc
    w.rotation.z = Math.PI / 2; w.position.set(sx, 0.36, sz); root.add(w);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.4, 14), metal);   // raised metal hubcap so the wheel is no longer all black
    hub.rotation.z = Math.PI / 2; hub.position.set(sx, 0.36, sz); root.add(hub);
  }
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.42, 3.5), body);   chassis.position.y = 0.78;
  const cab     = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 1.2),  body);   cab.position.set(0, 1.38, -1.0);
  const roof    = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.12, 1.1), dark);  roof.position.set(0, 1.96, -1.0);
  const windsh  = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.5, 0.08), glass); windsh.position.set(0, 1.42, -1.60);
  // cab side glazing: a front door pane + rear quarter pane on each side, split by a body pillar so it reads as windows not one flat wall
  for (const sx of [-0.82, 0.82]) {
    const winF = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.5), glass);   winF.position.set(sx, 1.5, -1.22); root.add(winF);   // front door window
    const winR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.34), glass);  winR.position.set(sx, 1.5, -0.62); root.add(winR);   // rear quarter window
  }
  const bumper  = new THREE.Mesh(new THREE.BoxGeometry(1.74, 0.22, 0.16), metal);bumper.position.set(0, 0.56, -1.84);
  for (const sx of [-0.6, 0.6]) { const hl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.06), light); hl.position.set(sx, 0.58, -1.93); root.add(hl); }
  const bed     = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 1.7), dark);   bed.position.set(0, 1.04, 0.65);
  for (const sx of [-0.82, 0.82]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 1.7), dark); rail.position.set(sx, 1.24, 0.65); root.add(rail); }
  root.add(chassis, cab, roof, windsh, bumper, bed);

  // rotating launch platform on the back: base plate + three rows of two pods facing local +Z (firing direction)
  const turret = new THREE.Group(); turret.position.set(0, 1.06, 0.65);
  const plate  = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 1.9), dark);   plate.position.y = 0.1;
  turret.add(plate);
  for (let t = 0; t < MLRS_TUBES; t++) {
    const rowZ = 0.72 - t * 0.62;                            // rows from nose to tail
    for (const sx of [-0.34, 0.34]) {
      const pod  = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.5, 1.9), body);  pod.position.set(sx, 0.52, rowZ - 0.05);
      const face = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.54, 0.08), dark); face.position.set(sx, 0.52, rowZ + 0.92);   // nose plate the tubes poke out of
      for (const ox of [-0.13, 0.13]) { const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.1, 10), tubeM); tube.rotation.x = Math.PI / 2; tube.position.set(sx + ox, 0.52, rowZ + 0.97); }
      turret.add(pod, face);
    }
  }
  root.add(turret);
  root.scale.setScalar(1.5);   // model size: original build x2, trimmed 25% (wheels touch the ground at scale origin)

  // fixed parking spot in block cell ~460,477 (moved by hand so spawn stays well clear of the truck); wheels rest on local terrain
  const px = 460.5, pz = 477.5;
  const pos = new THREE.Vector3(px, topSolidY(Math.floor(px), Math.floor(pz)) + 1, pz);   // +1 = wheels rest ON the ground surface (top of the block), not sunk into it
  let yaw = Math.atan2(-(player.pos.x - px), -(player.pos.z - pz));   // face the player (model forward = local -Z)
  root.position.copy(pos); root.rotation.y = yaw; turret.rotation.y = 0;
  scene.add(root);
  return { root, turret, pos, yaw };
}

const mlrsTruck = buildMlrsTruck();
  // spawn view: look straight at the HIMARS so the player sees it immediately
  {
    const _dx = mlrsTruck.pos.x - player.pos.x, _dz = mlrsTruck.pos.z - player.pos.z;
    const _dy = (mlrsTruck.pos.y + 2.0) - player.pos.y;   // aim at the launch pod, not the wheels
    player.yaw = Math.atan2(-_dx, -_dz);
    player.pitch = THREE.MathUtils.clamp(Math.atan2(_dy, Math.hypot(_dx, _dz)), -Math.PI / 2 + 0.01, Math.PI / 2 - 0.01);
  }
// --- simple solid footprint of the scaled body (the "hitbox") -----------------------------------
const MLRS_BOX_LX = 0.85, MLRS_BOX_LZ = 2.0;   // unscaled model's local half-extents (x ~ body width/2, z covers nose-to-just-past-tail)
function mlrsInBox(x, z, inflate) {            // point inside the truck's rotated footprint, grown by `inflate` metres every side?
  const a = mlrsTruck.yaw, s = mlrsTruck.root.scale.x;
  const dx = x - mlrsTruck.pos.x, dz = z - mlrsTruck.pos.z;
  const c = Math.cos(a), sn = Math.sin(a);
  return Math.abs(c * dx - sn * dz) <= MLRS_BOX_LX * s + inflate &&    // three's Y-rotation inverted -> body-local offset (side / length)
         Math.abs(sn * dx + c * dz) <= MLRS_BOX_LZ * s + inflate;
}
function mlrsKickOut() {                        // never leave the gunner inside their own hitbox - nudge out along the nearer local axis with a small margin
  const p = player.pos;
  if (!mlrsInBox(p.x, p.z, PHALF)) return;
  const a = mlrsTruck.yaw, s = mlrsTruck.root.scale.x;
  const dx = p.x - mlrsTruck.pos.x, dz = p.z - mlrsTruck.pos.z;
  const c = Math.cos(a), sn = Math.sin(a);
  const lx = c * dx - sn * dz, lz = sn * dx + c * dz;
  if ((MLRS_BOX_LX * s + PHALF + 0.4) - Math.abs(lx) <= (MLRS_BOX_LZ * s + PHALF + 0.4) - Math.abs(lz)) {
    const w = (Math.sign(lx) || 1) * ((MLRS_BOX_LX * s + PHALF + 0.4) - Math.abs(lx));   // slide out through the side -> world delta (c*w, -sn*w)
    p.x += c * w; p.z -= sn * w;
  } else {
    const w = (Math.sign(lz) || 1) * ((MLRS_BOX_LZ * s + PHALF + 0.4) - Math.abs(lz));   // slide out nose/tail        -> world delta (sn*w, c*w)
    p.x += sn * w; p.z += c * w;
  }
}

  // ============================================================ spawn chest (decorative: solid hitbox only - contents/opening come later)
  const CHEST_W = 0.78, CHEST_H = 0.84, CHEST_D = 0.62;   // a hair smaller than one block so it can be hopped onto/over
      const CHEST_COLS = INV_SIZE, CHEST_ROWS = BAG_ROWS + 1, CHEST_SLOTS = CHEST_COLS * CHEST_ROWS;   // chest matches the bag layout: same rows/cols as the player panel (4x8)
  function makeChestItems() {                            // fresh contents - currently 10 spare FPV drones in one stack
    const items = new Array(CHEST_SLOTS).fill(null);
    items[0] = { id: DRONE, count: 10 };
    return items;
  }
  function aimedChest(maxDist) {                         // the chest straight under the crosshair (nearest wins), or null - same ray trick as aimedComp
    if (!chests.length) return null;
    _coRay.setFromCamera(_coNDC, camera);
    let best = null, bd = maxDist || REACH;
    for (const c of chests) {
      const h = _coRay.intersectObject(c.mesh, true);
      if (h.length && h[0].distance < bd) { bd = h[0].distance; best = c; }
    }
    return best;
  }
  const chests = [];                                      // { pos (Vector3 at bottom-centre), mesh, items[] }

  const chestSideCnv = makeTex((x, y) => {               // warm planking for side/top/bottom/back faces (vanilla-chest look)
    return (y & 7) === 0 ? [128, 88, 40] : vary([172, 121, 58], 10);
  });
  const chestFrontCnv = makeTex((x, y) => {              // front face: same planks + lid-seam band + metal latch pixels (the little 3D latch sits over it)
    if (y === 8 || y === 9) return vary([104, 68, 30], 8);
    if (x >= 6 && x <= 9 && y >= 9 && y <= 13) return vary([152, 156, 162], 14);   // latch plate area
    return (y & 7) === 0 ? [128, 88, 40] : vary([172, 121, 58], 10);
  });

  function buildChestMesh() {                            // planked box + protruding latch; front (latch side) faces local -Z like the truck model
    const g = new THREE.Group();
    const sideM  = new THREE.MeshBasicMaterial({ map: toTexture(chestSideCnv) });
    const frontM = new THREE.MeshBasicMaterial({ map: toTexture(chestFrontCnv) });
    const box = new THREE.Mesh(new THREE.BoxGeometry(CHEST_W, CHEST_H, CHEST_D), [sideM, sideM, sideM, sideM, sideM, frontM]);   // +x,-x,+y(top),-y(bottom),+z(back),-z(front=latch)
    box.position.y = CHEST_H / 2;
    const latch = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.30, 0.07), new THREE.MeshBasicMaterial({ color: 0x9aa0a6 }));   // small metal clasp proud of the seam
    latch.position.set(0, CHEST_H * 0.42, -CHEST_D / 2 - 0.015);
    g.add(box, latch); return g;
  }

  function spawnChest() {                                // park one on flat clear ground a few blocks off the MLRS truck, latch facing spawn
    const tx = Math.floor(mlrsTruck.pos.x), tz = Math.floor(mlrsTruck.pos.z);
      const cands = [[6, -3], [8, 3], [-7, -3], [9, -5], [-7, 5], [3, 8], [-10, -5], [12, 1]];   // ring of candidate cells around the truck (a few blocks further out than before)
    for (const [ox, oz] of cands) {
      const cx = tx + ox, cz = tz + oz;
      if (!inBounds(cx, 1, cz)) continue;                // inBounds only range-checks
      const surf = topSolidY(cx, cz);                    // surface = TOP of the topmost solid block (chest base sits ON it)
      if (surf < 0 || surf + 2 >= H) continue;
      const b1 = blockAt(cx, surf + 1, cz), b2 = blockAt(cx, surf + 2, cz);
      const free = b => b === AIR || b === TALL_GRASS;   // grass is fine to sit in
      if (!(free(b1) && free(b2))) continue;
      if (mlrsInBox(cx + 0.5, cz + 0.5, 1.2)) continue;  // not on the truck's own footprint

      const pos = new THREE.Vector3(cx + 0.5, surf + 1, cz + 0.5);
      const yaw = Math.atan2(-(player.pos.x - pos.x), -(player.pos.z - pos.z));   // latch side faces the spawn point
      const mesh = buildChestMesh();
      mesh.position.copy(pos); mesh.rotation.y = yaw;
      scene.add(mesh);
      chests.push({ pos, mesh, items: makeChestItems() }); return true;
    }
    return false;   // no clear spot found (should not happen with the candidate ring)
  }
  if (!spawnChest()) console.warn('spawnChest: no placement found near the MLRS truck');

// --- rockets / puffs / blast flashes (world effects - keep simulating after exit) --
const rockets = [];   // { mesh, mats, S, E, dur, t (negative while staged in the tube), arcH, puffT }
const _rkNext = new THREE.Vector3(), _m0 = new THREE.Vector3();
function makeRocketMesh() {
  const bodyM  = new THREE.MeshBasicMaterial({ color: 0xd8dcd2 });
  const tipM   = new THREE.MeshBasicMaterial({ color: 0x8f4a35 });
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.5, 8), bodyM);  b.rotation.x = Math.PI / 2;   // +Z is the flight direction (lookAt)
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.22, 8), tipM);            tip.rotation.x = Math.PI / 2; tip.position.z = 0.36;
  g.add(b, tip);
  return { g, mats: [bodyM, tipM] };
}

// smoke-puff pool for rocket exhaust (own material per sprite so opacity is individual)
const puffCanv = document.createElement('canvas'); puffCanv.width = puffCanv.height = 32;
{
  const g = puffCanv.getContext('2d');
  const grd = g.createRadialGradient(16, 16, 2, 16, 16, 15);
  grd.addColorStop(0, 'rgba(240,242,238,0.9)'); grd.addColorStop(1, 'rgba(240,242,238,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 32, 32);
}
const puffTexT = new THREE.CanvasTexture(puffCanv);
const puffs = [];   // { s, t, life, base, on }
for (let i = 0; i < 70; i++) {
  const mat = new THREE.SpriteMaterial({ map: puffTexT, transparent: true, opacity: 0, depthWrite: false });
  const s = new THREE.Sprite(mat); s.visible = false; scene.add(s);
  puffs.push({ s, t: 0, life: 1, base: 0.4, on: false });
}
function spawnPuff(x, y, z, base) {
  for (const p of puffs) if (!p.on) {
    p.on = true; p.t = 0; p.base = base;
    p.life = 0.5 + Math.random() * 0.4;
    p.s.position.set(x, y, z); p.visible = true;
    return;
  }
}
function updatePuffs(dt) {
  for (const p of puffs) if (p.on) {
    p.t += dt;
    const u = p.t / p.life;
    if (u >= 1) { p.on = false; p.s.visible = false; continue; }
    p.s.position.y += dt * 0.6;                 // smoke drifts up
    p.s.scale.setScalar(p.base * (1 + u * 2.4));
    p.s.material.opacity = 0.5 * (1 - u);
  }
}

const blasts = [];   // { m, t }  expanding fireball at each impact
function addBlast(x, y, z) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffb35c, transparent: true, opacity: 0.85 }));
  m.position.set(x, y, z); scene.add(m); blasts.push({ m, t: 0 });
}
function updateBlasts(dt) {
  for (let i = blasts.length - 1; i >= 0; i--) {
    const b = blasts[i]; b.t += dt / 0.35;
    if (b.t >= 1) { scene.remove(b.m); b.m.geometry.dispose(); b.m.material.dispose(); blasts.splice(i, 1); continue; }
    b.m.scale.setScalar(MLRS_CRATER_R * (0.3 + b.t * 2.1));
    b.m.material.opacity = 0.85 * (1 - b.t);
  }
}

// blast a crater out of the terrain at the impact point (the y=0 base layer stays unbreakable, like by hand)
function explodeAt(ix, iy, iz, R = MLRS_CRATER_R) {   // R overrides the crater radius (the drone payload digs a smaller hole than one HIMARS round)
  const r2 = R * R;
  const x0 = Math.floor(ix - R), x1 = Math.ceil(ix + R);
  const z0 = Math.floor(iz - R), z1 = Math.ceil(iz + R);
  let n = 0;
  for (let y = 1; y < H; y++)
    for (let x = x0; x <= x1; x++) { const dxr = x + 0.5 - ix, dxr2 = dxr * dxr; if (dxr2 > r2) continue;
      for (let z = z0; z <= z1; z++) {
        const dzr = z + 0.5 - iz, dyr = y + 0.5 - iy;
        if (dxr2 + dzr * dzr + dyr * dyr > r2) continue;
        const id = blockAt(x, y, z);
        if (id === AIR) continue;
        setBlockRaw(x, y, z, AIR); n++;
        if ((n & 3) === 0 || id === WATER) spawnBreakParticles(x, y, z, id === WATER ? DIRT : id, { nx: 0, ny: -1, nz: 0 });   // debris kicks down-and-out of the crater
      }
    }
  if (n > 0) rebuildBBox(x0, x1, z0, z1);
  // the blast does not just chew terrain - anything living caught in it takes a serious beating too
  {
    const REACH = R + 2.5;   // reaches a little past the crater lip so grazed mobs still get nicked
    for (const m of MOBS) {
      if (!m.alive) continue;
      const dx = m.pos.x - ix, dz = m.pos.z - iz, dy = m.pos.y - iy;
      const d3 = Math.sqrt(dx * dx + dz * dz + dy * dy);
      if (d3 > REACH) continue;
      const dmg = Math.max(10, Math.round(40 * (1 - d3 / REACH)));   // heavy at the centre, tapering to a solid hit at the edge
      m.hp -= dmg; m.hitT = 0.28; SFX.mobHurt(m.type);
      if (m.hp <= 0) killMob(m);   // dead mobs drop their meat just like any other takedown
    }
  }
  addBlast(ix, iy + 0.3, iz);
  for (let i = 0; i < 5; i++) spawnPuff(ix + (Math.random() - 0.5) * 3, iy + Math.random() * 1.5, iz + (Math.random() - 0.5) * 3, 1.4);
  SFX.explosion(camera.position.distanceTo(_rkNext.set(ix, iy, iz)));   // boom scaled by how far the gunner is from it
}

// rebuild every region a bounding box touches (craters span more than one cell / edge)
function rebuildBBox(x0, x1, z0, z1) {
  const set = new Set();
  for (let cz = Math.floor(z0 / CH); cz <= Math.floor(z1 / CH); cz++)
    for (let cx = Math.floor(x0 / CH); cx <= Math.floor(x1 / CH); cx++)
      if (cx >= 0 && cx < W / CH && cz >= 0 && cz < D / CH) set.add(cx + ',' + cz);
  for (const k of set) { const [a, b] = k.split(','); buildChunk(+a, +b); }
  rebuildWater();
}

// --- cockpit state -----------------------------------------------------------------
const mlrs = {
  active: false, saved: null,
  tx: 0, tz: 0,          // the bullseye (screen centre) in world x/z
  yaw: 0,                // view rotation around the bullseye
  tau: 0.15,             // tilt away from perfectly vertical (small = top-down bird's-eye)
  charge: 0, beepT: 0, cdUntil: 0, hudAcc: 0,
};

function mountMlrs() {   // right-click near the truck climbs into the cockpit
  if (mlrs.active) return true;
  const p = player.pos, t = mlrsTruck.pos;
  if (!mlrsInBox(p.x, p.z, 1.6) || Math.abs((p.y - EYE) - t.y) > 4) return false;   // anywhere on foot at the (scaled-up) body - no more reaching inside the cab for it to register
  mlrs.active = true;
  mlrs.saved = p.clone();
  const dx = t.x - player.pos.x, dz = t.z - player.pos.z;
  const d = Math.max(1e-3, Math.hypot(dx, dz));        // look where the player came from so familiar ground fills the screen
  mlrs.yaw = Math.atan2(-dx / d, -dz / d);
    mlrs.tx = THREE.MathUtils.clamp(t.x, 4, W - 5);   // start dead above the truck itself
    mlrs.tz = THREE.MathUtils.clamp(t.z, 4, D - 5)
    mlrs.tau = THREE.MathUtils.degToRad(2);           // ~locked top-down (tiny tilt only keeps the camera up-vector sane)
  mlrs.charge = 0;
  document.body.classList.remove('armed');
  document.body.classList.add('mlrs');                 // reveals the cockpit HUD (#mlrs in index.html)
  mouseState.left = false; mouseState.right = false;   // don't bleed cockpit clicks into mine/place logic
  SFX.mlrsEnter();
  return true;
}

function exitMlrs() {   // right-click ALWAYS exits the system, no questions asked
  if (!mlrs.active) return false;
  mlrs.active = false;
  document.body.classList.remove('mlrs', 'armed');
  _setCharge('0deg');
  player.pos.copy(mlrs.saved);
  player.pos.y += 0.15;                                // headroom, then shake loose of any clipping geometry (the cab)
  mlrsKickOut();                                       // never leave the gunner inside their own solid hitbox
  escapeGeometry();
  mlrs.charge = 0;
  mouseState.left = false; mouseState.right = false;
  syncCamera();
  SFX.mlrsExit();
  return true;
}

// world position the rockets leave their tubes from (nose of the launch platform)
function _mlrsMuzzle(out) {
  const a = mlrsTruck.turret.rotation.y;               // +Z of the turret is the firing direction
  out.set(mlrsTruck.pos.x + Math.sin(a) * 2.55, mlrsTruck.pos.y + 2.43, mlrsTruck.pos.z + Math.cos(a) * 2.55);   // x1.5 with the scaled truck
  return out;
}

function fireVolley() {   // every round in the magazine, staggered down the line of tubes
  const now = performance.now();
  mlrs.cdUntil = now + MLRS_RELOAD_MS;
  _mlrsMuzzle(_m0);
  for (let t = 0; t < MLRS_TUBES; t++) {
    for (let r = 0; r < MLRS_ROUNDS_PER_TUBE; r++) {
      const sx = mlrs.tx + (Math.random() - 0.5) * 4.6, sz = mlrs.tz + (Math.random() - 0.5) * 4.6;   // impact spread around the bullseye
      const ex = THREE.MathUtils.clamp(sx, 1, W - 2), ez = THREE.MathUtils.clamp(sz, 1, D - 2);
      const ey = Math.max(1.5, topSolidY(Math.floor(ex), Math.floor(ez)) + 0.45);
      const dist = Math.hypot(ex - _m0.x, ez - _m0.z);
      const rm = makeRocketMesh(); scene.add(rm.g); rm.g.position.copy(_m0);
      rockets.push({ mesh: rm.g, mats: rm.mats, S: _m0.clone(), E: new THREE.Vector3(ex, ey, ez),
        dur: THREE.MathUtils.clamp(0.9 + dist / 24, 1.6, 9),   // slower, lofted flight - gives you time to bail out and watch it come down
        t: -(t * 0.16 + r * 0.07 + Math.random() * 0.03), arcH: THREE.MathUtils.clamp(dist * 0.30 + 15, 22, 48), puffT: 0 });   // arcH = how high the rocket lofts above launch before it drops in
      _mlrsPip(t, r).classList.remove('on');           // the stock graph lights out as each tube fires
    }
  }
  SFX.rocketLaunch(0); SFX.rocketLaunch(1.2);         // two overlapping salvo thumps cover the whole burst
}

function mlrsReleaseFire() {   // LMB release: launch if fully armed & not reloading, else a deny buzz
  const now = performance.now();
  if (now < mlrs.cdUntil || mlrs.charge < 1) SFX.mlrsDeny();
  else fireVolley();
  mlrs.charge = 0;
}

const _RK_UP = 0.32;   // fraction of the flight spent climbing to peak altitude before the dive-down begins
function _rkArcY(sy, ey, arcH, u) {   // ballistic-ish loft: climb fast to a high point, then accelerate back down onto the target
  const pk = sy + arcH;               // apex height (launch altitude + the loft amount chosen at fire time)
  if (u <= _RK_UP) { const k = u / _RK_UP; return sy + (pk - sy) * (1 - Math.pow(1 - k, 3)); }   // ease-out climb up to the apex
  const k = (u - _RK_UP) / (1 - _RK_UP); return pk + (ey - pk) * (k * k);                        // ease-in dive back down onto the ground
}
function updateRockets(dt) {
  for (let i = rockets.length - 1; i >= 0; i--) {
    const rk = rockets[i];
    if (rk.t < 0) { rk.t += dt; continue; }            // staged in the tube, waiting its turn
    rk.t += dt;
    const u = rk.t / rk.dur;
    if (u >= 1) {                                      // impact: crater + debris + boom
      explodeAt(rk.E.x, rk.E.y, rk.E.z);
      scene.remove(rk.mesh); rk.mats.forEach(m => m.dispose()); rk.mesh.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      rockets.splice(i, 1); continue;
    }
    const x = rk.S.x + (rk.E.x - rk.S.x) * u;
    const z = rk.S.z + (rk.E.z - rk.S.z) * u;
    const y = _rkArcY(rk.S.y, rk.E.y, rk.arcH, u);   // loft up to altitude first, then dive onto the target (see _rkArcY)
    rk.mesh.position.set(x, y, z);
    const ue = Math.min(1, u + 0.04 / rk.dur);         // tangent for nose orientation
    _rkNext.set(rk.S.x + (rk.E.x - rk.S.x) * ue, _rkArcY(rk.S.y, rk.E.y, rk.arcH, ue), rk.S.z + (rk.E.z - rk.S.z) * ue);
    rk.mesh.lookAt(_rkNext);
    if ((rk.puffT -= dt) <= 0) {                       // exhaust trail puffs behind the nose
      rk.puffT = 0.045;
      spawnPuff(x - (_rkNext.x - x) * 1.6, y - (_rkNext.y - y) * 1.6, z - (_rkNext.z - z) * 1.6, 0.3 + u * 0.25);
    }
  }
}

function updateMlrsFx(dt) {   // world-side effects keep running after the gunner bails out mid-volley
  updateRockets(dt); updatePuffs(dt); updateBlasts(dt);
}

// --- cockpit HUD wiring --------------------------------------------------------------
const _mlrsStatusEl = document.getElementById('mlrsStatus');
const _mlrsXYEl     = document.getElementById('mlrsTgtXY');
const _mlrsRangeEl  = document.getElementById('mlrsRange');
const _mlrsTgtEl    = document.getElementById('mlrsTgt');
const _mlrsCdWrap   = document.getElementById('mlrsCdWrap');
const _mlrsCdBar    = document.getElementById('mlrsCdBar');
const _mlrsRetEl    = document.getElementById('mlrsRet');
const _mlrsTele     = document.getElementById('mlrsTele');
const _teleCtx      = _mlrsTele ? _mlrsTele.getContext('2d') : null;
function _setCharge(deg) { const s = _mlrsRetEl && _mlrsRetEl.style; if (s && typeof s.setProperty === 'function') s.setProperty('--charge', deg + 'deg'); }   // charge ring around the bullseye
// stock pips: build the 6 tubes x 4 rounds grid into #mlrsStock and keep refs for firing/reload
const _mlrsPipGrid = [];
{
  const host = document.getElementById('mlrsStock');
  for (let t = 0; t < MLRS_TUBES; t++) {
    const tube = document.createElement('div'); tube.className = 'mlrtube';
    const row = [];
    for (let r = 0; r < MLRS_ROUNDS_PER_TUBE; r++) {
      const c = document.createElement('div'); c.className = 'mlrcell on';
      tube.appendChild(c); row.push(c);
    }
    _mlrsPipGrid.push(row); host.appendChild(tube);
  }
}
function _mlrsPip(t, r) { return _mlrsPipGrid[t][r]; }

// height -> minimap colour (blue water, then green rising to brown on the hills)
const _HCOL = [];
for (let y = 0; y < H; y++) {
  if (y <= WL)        _HCOL.push(`rgb(36,92,${Math.max(80, 165 - Math.min(80, (WL - y + 1) * 9))})`);
  else { const f = Math.max(0, Math.min(1, (y - WL - 1) / (H - WL))); _HCOL.push(`rgb(${52 + f * 88 | 0},${132 - f * 46 | 0},44)`); }
}

function mlrsDrawTele(now) {   // telemetry strip: minimap around the bullseye + N-S elevation profile with a sweeping scanline
  if (!_teleCtx) return;
  const g = _teleCtx, CW = 214, HH = 52;
  g.clearRect(0, 0, CW, HH);
  // -- minimap (left square), ~3.7 m per pixel of live terrain height
  const MP = 3.7;
  for (let py = 0; py < HH; py++) {
    const wz = Math.round(mlrs.tz + (py - HH / 2) * MP); if (wz < 0 || wz >= D) continue;
    for (let px = 0; px < HH; px++) {
      const wx = Math.round(mlrs.tx + (px - HH / 2) * MP); if (wx < 0 || wx >= W) continue;
      g.fillStyle = _HCOL[Math.max(0, Math.min(H - 1, topSolidY(wx, wz)))];
      g.fillRect(px, py, 1, 1);
    }
  }
  const mx = (mlrsTruck.pos.x - mlrs.tx) / MP + HH / 2, mz = (mlrsTruck.pos.z - mlrs.tz) / MP + HH / 2;   // the truck on the map
  g.fillStyle = '#f2e9c8'; if (mx > -4 && mx < HH + 4 && mz > -4 && mz < HH + 4) g.fillRect(mx - 2, mz - 2, 5, 5);
  g.strokeStyle = 'rgba(255,90,70,.95)';
  g.strokeRect(HH / 2 - 3.5, HH / 2 - 3.5, 7, 7);          // bullseye at the centre of the map
  // -- elevation profile (right side): terrain height along a north-south line through the target
  const px0 = HH + 6, pw = CW - px0 - 2, SPAN = 80;        // metres of ground shown per side
  g.beginPath(); g.moveTo(px0, HH);
  for (let i = 0; i <= 40; i++) {
    const zz = Math.round(THREE.MathUtils.clamp(mlrs.tz + (i / 40 - 0.5) * SPAN * 2, 0, D - 1));
    const h = topSolidY(Math.min(W - 1, Math.max(0, Math.floor(mlrs.tx))), zz);
    g.lineTo(px0 + (i / 40) * pw, HH - ((h + 4) / (H + 2)) * HH);
  }
  g.lineTo(px0 + pw, HH); g.closePath();
  g.fillStyle = 'rgba(130,255,140,.22)'; g.fill();
  g.strokeStyle = 'rgba(170,255,180,.6)'; g.stroke();
  const sxp = px0 + ((now / 900) % 1) * pw;                // sweeping return scanline
  g.fillStyle = 'rgba(190,255,200,.35)'; g.fillRect(sxp - 1, 0, 2, HH);
}

function mlrsHudTick(now) {   // DOM readouts (throttled from updateMlrsView)
  const rem = Math.max(0, mlrs.cdUntil - now);             // reload countdown remaining, ms
  const inCd = rem > 0;
  if (inCd && !mouseState.left)       { _mlrsStatusEl.textContent = `RELOADING ${(rem / 1000).toFixed(1)} s`;      _mlrsStatusEl.className = 'warn'; }
  else if (mouseState.left && mlrs.charge >= 1) { _mlrsStatusEl.textContent = 'READY TO LAUNCH - RELEASE LMB';    _mlrsStatusEl.className = 'bad'; }
  else if (mouseState.left)               { _mlrsStatusEl.textContent = `ARMING ${Math.round(mlrs.charge * 100)}%`; _mlrsStatusEl.className = 'warn'; }
  else                                    { _mlrsStatusEl.textContent = inCd ? '' : 'SYSTEM READY - AWAITING TARGET'; _mlrsStatusEl.className = ''; }
  if (inCd) { _mlrsCdWrap.classList.add('show'); _mlrsCdBar.style.width = `${(100 * rem / MLRS_RELOAD_MS).toFixed(1)}%`; }   // striped bar drains as the magazines re-clip
  else      { _mlrsCdWrap.classList.remove('show'); if (!mouseState.left) document.body.classList.remove('armed'); }
  _mlrsXYEl.textContent = `X ${Math.round(mlrs.tx)}  Z ${Math.round(mlrs.tz)}`;
  const rng = Math.hypot(mlrsTruck.pos.x - mlrs.tx, mlrsTruck.pos.z - mlrs.tz);
  _mlrsRangeEl.textContent = `RNG ${Math.round(rng)} m`;
  const brg = (Math.atan2(-(mlrs.tx - mlrsTruck.pos.x), -(mlrs.tz - mlrsTruck.pos.z)) * 180 / Math.PI + 360) % 360;
  _mlrsTgtEl.textContent = `BRG ${String(Math.round(brg)).padStart(3, '0')}Ã‚Â° Ã‚Â· RANGE ${Math.round(rng)} m`;
  mlrsDrawTele(now);
}

function updateMlrsView(dt) {   // cockpit mode: flies the bullseye, arms the salvo, drives camera + HUD
  const now = performance.now();
  hungerMode = 'idle';                        // gunning a rocket barrage doesn't burn calories

  // WASD flies the bullseye over the ground plane relative to view heading (Shift doubles speed)
  const spd = 34 * ((keys['ShiftLeft'] || keys['ShiftRight']) ? 2.1 : 1);
  const sy = Math.sin(mlrs.yaw), cy = Math.cos(mlrs.yaw);
  let dx = 0, dz = 0;
  if (keys['KeyW']) { dx += -sy; dz += -cy; }
  if (keys['KeyS']) { dx +=  sy; dz +=  cy; }
  if (keys['KeyD']) { dx +=  cy; dz += -sy; }   // right = forward rotated +90ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°, same convention as ground strafing
  if (keys['KeyA']) { dx += -cy; dz +=  sy; }
  const len = Math.hypot(dx, dz);
  if (len > 0) { mlrs.tx += (dx / len) * spd * dt; mlrs.tz += (dz / len) * spd * dt; }
  mlrs.tx = THREE.MathUtils.clamp(mlrs.tx, 4, W - 5);
  mlrs.tz = THREE.MathUtils.clamp(mlrs.tz, 4, D - 5);

  // the turret keeps grinding around to track the reticle while we fly it (shortest path)
  const aimA = Math.atan2(mlrs.tx - mlrsTruck.pos.x, mlrs.tz - mlrsTruck.pos.z);
  let dA = aimA - mlrsTruck.turret.rotation.y;
  while (dA >  Math.PI) dA -= TAU; while (dA < -Math.PI) dA += TAU;
  mlrsTruck.turret.rotation.y += dA * Math.min(1, dt * 5);

  // arming: hold LMB to charge the salvo; release fires it (or buzzes if not ready / reloading)
  if (mouseState.left && now >= mlrs.cdUntil) {
    const was = mlrs.charge;
    mlrs.charge = Math.min(1, mlrs.charge + dt / MLRS_ARM_TIME);
    _setCharge(`${Math.round(mlrs.charge * 360)}deg`);   // the orange ring fills around the bullseye
    document.body.classList.toggle('armed', mlrs.charge > 0.05);
    if ((mlrs.beepT -= dt) <= 0) { mlrs.beepT = 0.17; SFX.mlrsBeep(820 + mlrs.charge * 820); }   // targeting ticks rise in pitch as the lock completes
    if (was < 1 && mlrs.charge >= 1) SFX.click();                              // hard "locked" blip on completion
  } else {
    if (mlrs.charge !== 0 || document.body.classList.contains('armed')) {
      mlrs.charge = 0; _setCharge('0deg'); document.body.classList.remove('armed');
    }
  }

  // the aerial view: camera at a FIXED world altitude (MLRS_CAM_Y), pulled back by tau from vertical (small tau = bird's-eye top-down)
  const bgY = Math.max(1.5, topSolidY(Math.floor(mlrs.tx), Math.floor(mlrs.tz)) + 0.6);   // look-at still sits on the ground under the bullseye so it stays dead centre even over valleys/hills
  const pull = MLRS_CAM_H * Math.tan(Math.min(mlrs.tau, 1.3));   // horizontal camera pull-back toward the viewer side of the bullseye
  player.pos.set(mlrsTruck.pos.x, mlrsTruck.pos.y + EYE, mlrsTruck.pos.z);   // park the body in the cab (only the camera matters from here)
  camera.position.set(mlrs.tx + sy * pull, MLRS_CAM_Y, mlrs.tz + cy * pull);   // fixed world altitude - panning no longer bobs with the terrain under the bullseye
  camera.lookAt(mlrs.tx, bgY, mlrs.tz);

  mlrs.hudAcc += dt;
  if (mlrs.hudAcc >= 0.08) { mlrs.hudAcc = 0; mlrsHudTick(now); }   // ~12 Hz DOM/telemetry refresh is plenty for a scope readout
}


// ============================================================ FPV suicide drone
// Starts in hotbar slot 1. Right-click the ground to set one down (it parks on the floor like a
// skateboard). Right-click it again and you're IN IT - true FPV / ACRO flight (no auto-leveling):
// W/S push the throttle; everything else is the mouse - a minicopter-style scheme: drag X to turn the nose
// (yaw), drag Y to point it up/down (pitch). Both are decaying virtual sticks that recenter themselves;
// thrust always points along the tilted body-up; pitch/yaw are HELD on release (no auto-leveling) but throttle dumps and the bank re-levels.
// Any contact with terrain fires the payload - a 40%-strength HIMARS-class blast that craters real blocks;
// the body is restored where you took off (a suicide drone takes its payload - not you). Right-click or Esc in flight drops
const DRONE_GRAV     = 20;      // game-scale gravity while piloted - snappier than player GRAVITY
const DRONE_MAX_T    = 56;      // thrust at full W (level hover sits around a third of the throttle)
const DRONE_DRAG     = 1.6;     // linear air drag - caps top speed, damps over-aggressive oscillation
const DRONE_THR_RAMP = 1.75;    // W ramps the throttle to FULL while held (~0.6s to max - was 2.5, ~30% gentler climb)
const DRONE_THR_DROP = 6;       // releasing it dumps the throttle back to zero hard (~1/6s from full)
const DRONE_ROLL_RATE = 1.28;    // A/D bank rate while a key is held (rad/s, ~73 deg/s - was 3.2/~185: 2.5x slower ramp to max tilt)
const DRONE_ROLL_LIM  = 0.7;    // max bank either side - capped at ~40 degrees (was ~80): a firm lean, never a hard tilt
const DRONE_RATE_YAW    = 3.5;   // rad/s of yaw turn rate at a fully-deflected X stick (drag left/right to steer)
const DRONE_RATE_PITCH  = 4.5;   // rad/s of pitch rate at a fully-deflected Y stick (drag up/down to point the nose)
const DRONE_STICK_TAU   = 0.13; // virtual-stick decay (s) - the mouse behaves like an analog stick that recenters itself
const DRONE_REST_H = 0.16;     // hovering height above the floor where a parked drone settles (kept clear of its own collision box)
const DRONE_BLAST_R = MLRS_CRATER_R * 0.5;   // suicide payload: ~25% stronger than before (was 0.4, now 0.5 of a HIMARS round)

let drones = [];               // every drone in the world: { pos, vel, onGround, home, spinA, mesh, spinners }
let _pilotDrone = null;        // the drone we're currently flying (null when on foot)

  // ---- Betaflight-style FPV overlay (#droneosd in index.html) + prop wash ------------------
  // While piloting: the 3D craft is hidden from our own view, corner props are drawn as an OSD
  // frame instead, and a continuous buzz (SFX.droneStart/stop/setDrone) tracks the throttle.
  let _osdOn = false;
  const dsdAltEl = document.getElementById('dsdAlt');
  const dsdVsEl  = document.getElementById('dsdVs');
  const dsdSpdEl = document.getElementById('dsdSpd');
  const dsdThrEl = document.getElementById('dsdThrBar');
  const dsdHdgEl = document.getElementById('dsdHdg');
  const dsdHorEl = document.getElementById('dsdHor');
  let osdT = 0;                                    // text readouts refresh ~12 Hz (the horizon ladder glides per-frame)
  function syncPilotOsd() {                        // keep overlay + prop buzz in step with _pilotDrone (runs every frame, cheap when unchanged)
    const on = !!_pilotDrone;
    if (on === _osdOn) return;
    _osdOn = on;
    document.body.classList.toggle('drone', on);   // reveals #droneosd, dims the survival HUD, hides the walking crosshair
    if (on) SFX.droneStart(); else SFX.stopDrone();
  }
  function updateDroneOsd(dt, thr) {               // thr = current motor load 0..1 from updateDronePiloted
    const d = _pilotDrone; if (!d) return;
    if (dsdHorEl) dsdHorEl.style.transform = `translate(-50%,-50%) translateY(${(player.pitch * 150).toFixed(1)}px)`;   // horizon sinks as the nose rises, like a real attitude ladder
    osdT += dt;
    if (osdT < 0.083) return; osdT = 0;
    const surf = droneSurfaceY(d.pos.x, d.pos.z, Math.ceil(d.pos.y + 0.6));
    dsdAltEl.textContent = surf === -999 ? '   --.- m' : (d.pos.y - surf).toFixed(1) + ' m';
    const vs = d.vel.y;
    dsdVsEl.textContent = `${vs >= 0 ? '\u25B2' : '\u25BC'} ${Math.abs(vs).toFixed(1)} m/s`;   // climbing / diving arrow
    dsdSpdEl.textContent = Math.hypot(d.vel.x, d.vel.y, d.vel.z).toFixed(1) + ' m/s';
    if (dsdThrEl) dsdThrEl.style.width = `${Math.round(thr * 100)}%`;
    const bearing = ((Math.atan2(-Math.sin(player.yaw), Math.cos(player.yaw)) * 180 / Math.PI + 360) % 360);
    dsdHdgEl.textContent = `HDG ${String(Math.round(bearing)).padStart(3, '0')}Ã‚Â° ${COMPASS[Math.round(bearing / 45) % 8]}`;
  }


function buildDroneMesh(forHand) {   // box-built quadcopter; forward is local -z (same convention as skateboard + camera)
    const opts = forHand ? { depthTest: false, depthWrite: false, fog: false, transparent: true } : {};
    const hullMat  = new THREE.MeshBasicMaterial({ color: 0x59623c, ...opts });   // olive body
    const frameMat = new THREE.MeshBasicMaterial({ color: 0x31343a, ...opts });   // dark X-frame + motor pods
    const noseMat  = new THREE.MeshBasicMaterial({ color: 0xd8422f, ...opts });   // red camera pod - easy to spot in FPV
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x15171d, ...opts });
    const g = new THREE.Group();
    g.rotation.order = 'YXZ';                                        // same order as the camera, so copying view yaw/pitch matches our gaze exactly
    const body  = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.20, 0.62), hullMat);
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 1.05), frameMat);   plate.position.y = 0.07;
    const nose  = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.13, 0.24), noseMat);    nose.position.set(0, -0.02, -0.40);
    g.add(body, plate, nose);
    const spinners = [];
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const pod = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.17, 0.15), frameMat);   pod.position.set(sx * 0.42, 0.16, sz * 0.48);
      g.add(pod);
      const spin = new THREE.Group();
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.02, 0.1), rotorMat);
      const b2 = b1.clone();   b2.rotation.y = Math.PI / 2;               // crossed blades (shared geometry disposes fine via traverse)
      spin.add(b1, b2);
      spin.position.set(sx * 0.42, 0.30, sz * 0.48);
      g.add(spin); spinners.push(spin);
    }
    if (forHand) g.traverse(o => { o.renderOrder = 101; });
    return { g, mats: [hullMat, frameMat, noseMat, rotorMat], spinners };
}

function createDrone(x, y, z, yaw) {
    const bm = buildDroneMesh(false);
      const d = { pos: new THREE.Vector3(x, y, z), vel: new THREE.Vector3(), onGround: true, home: null, spinA: 0, mesh: bm.g, spinners: bm.spinners, roll: 0, thr: 0, stickX: 0, stickY: 0, armedHover: false };   // roll/thr/sticks = the acro flight state
    d.mesh.position.set(x, y, z);
    d.mesh.rotation.set(0, yaw, 0);
    scene.add(d.mesh);
    drones.push(d);
    return d;
}

// highest solid floor below a point (-999 when the column is empty all the way down)
function droneSurfaceY(px, pz, fromY) {
    const x = Math.floor(px), z = Math.floor(pz);
    if (!inBounds(x, 0, z)) return -999;
    for (let y = Math.min(H - 1, Math.ceil(fromY)); y >= 0; y--) {
      const b = blockAt(x, y, z);
      if (b !== AIR && b !== WATER && b !== TALL_GRASS) return y + 1;
    }
    return -999;
}

// right-click while holding a drone: drop it where you aim (same rules as placing a board, needs a floor below)
function placeDroneAt(hit) {
    if (!hit) return false;
    const tx = hit.x + hit.nx, ty = hit.y + hit.ny, tz = hit.z + hit.nz;
    if (!inBounds(tx, ty, tz)) return false;
    const cur = blockAt(tx, ty, tz); if (cur !== AIR && cur !== WATER) return false;
    if (aabbOverlapsCell(tx, ty, tz)) return false;   // don't spawn it inside yourself
    const x = tx + 0.5, z = tz + 0.5;
    const surf = droneSurfaceY(x, z, Math.min(H - 2, ty));
    if (surf === -999) return false;                  // no floor down this column - can't float it
    createDrone(x, surf + DRONE_REST_H, z, player.yaw);   // faces where you're looking so W feels natural at once
    SFX.place(DRONE);
    removeOneSelected();
    triggerArmSwing('place');
    return true;
}

const _drNDC = new THREE.Vector2(0, 0);
const _drRay = new THREE.Raycaster();
function aimedDrone(maxDist) {   // the drone straight under the crosshair (nearest wins), or null - never aims at the one we're in
    if (_pilotDrone || !drones.length) return null;
    _drRay.setFromCamera(_drNDC, camera);
    let best = null, bd = maxDist || REACH;
    for (const d of drones) {
      const h = _drRay.intersectObject(d.mesh, true);
      if (h.length && h[0].distance < bd) { bd = h[0].distance; best = d; }
    }
    return best;
}

// one left-click on a grounded drone pops it back into the bag
function pickupDrone(d) {
    if (!d || _pilotDrone === d || !d.onGround) return false;   // only resting drones can be reclaimed (no snagging mid-fall)
    removeDroneEntity(d);
    addItem(DRONE);
    SFX.click(); triggerArmSwing('break');
    return true;
}

function enterDrone(d) {   // right-click a grounded drone: take FPV control of it from its viewpoint
    if (_pilotDrone || !d.onGround) return false;
    _pilotDrone = d;
    d.home = { pos: player.pos.clone(), yaw: player.yaw, pitch: player.pitch };   // where the body returns when the run ends (exit OR detonation)
d.roll = 0; d.thr = DRONE_GRAV / DRONE_MAX_T; d.stickX = 0; d.stickY = 0; d.armedHover = true;   // dead-steady hover until you touch the throttle (grace window) - aiming first can't kill you
      player.pitch = 0;                                     // the view is now the drone's own frame, so take off dead-level (home pose above already saved)
    d.vel.set(0, 0, 0);
    player.pos.copy(d.pos);                    // eye IS the drone from here on - syncCamera follows it every frame
    d.mesh.visible = false;                    // we're INSIDE it now - hide our own hull/props (the OSD corner props stand in for them)
    syncCamera();
    mouseState.left = false; mouseState.right = false;   // don't bleed takeoff clicks into mine/place logic mid-flight
    SFX.click(); triggerArmSwing('place');
    return true;
}

function exitDrone() {   // right-click / Esc while piloting: the craft drops in place, body teleports back to the takeoff point
    const d = _pilotDrone; if (!d) return false;
    _pilotDrone = null;
    d.mesh.visible = true;                     // back to being a normal parked craft again
d.roll = 0; d.thr = 0; d.stickX = 0; d.stickY = 0;   // it's a parked craft now, not your body - level out and spin the props down
      d.mesh.rotation.set(0, d.mesh.rotation.y, 0);        // drop from wherever you bailed with its heading kept
    mouseState.left = false; mouseState.right = false;
    d.onGround = false;                    // parked physics drops it from wherever we bailed - pick it back up once it lands
    restorePlayerToHome(d);
    SFX.click();
    return true;
}

function removeDroneEntity(d) {
    scene.remove(d.mesh);
    d.mesh.traverse(o => { if (o.geometry) o.geometry.dispose(); });
    const i = drones.indexOf(d); if (i >= 0) drones.splice(i, 1);
    if (_pilotDrone === d) _pilotDrone = null;
}

function restorePlayerToHome(d) {   // put the body back where the pilot stood at takeoff and shake loose of any clipped geometry
    player.pos.copy(d.home.pos);
    player.yaw = d.home.yaw; player.pitch = d.home.pitch;
    player.vy = 0;
    escapeGeometry();
    syncCamera();
}

// hit something in flight -> suicide payload (40% of a HIMARS round). The craft is gone for good.
function detonateDrone(d, ix, iy, iz) {
    removeDroneEntity(d);
    explodeAt(ix, iy, iz, DRONE_BLAST_R);
}

// small box around the core (rotor tips may visually graze - forgiving, like the skateboard's kicktails). Out-of-map reads as wall.
function droneCollidesAt(x, y, z) {
    const bx0 = Math.floor(x - 0.28), bx1 = Math.floor(x + 0.28);
    const by0 = Math.floor(y - 0.14), by1 = Math.floor(y + 0.16);
    const bz0 = Math.floor(z - 0.28), bz1 = Math.floor(z + 0.28);
    for (let yy = by0; yy <= by1; yy++)
      for (let zz = bz0; zz <= bz1; zz++)
        for (let xx = bx0; xx <= bx1; xx++)
          if (solidForPhysics(xx, yy, zz)) return true;
    return false;
}

const _drEul = new THREE.Euler(0, 0, 0, 'YXZ');   // scratch body-attitude euler + quaternion (same axes as camera/mesh: x=pitch, y=yaw, z=roll)
const _drQ   = new THREE.Quaternion();
const _drUp  = new THREE.Vector3();
function updateDronePiloted(dt) {   // TRUE FPV / ACRO flight: body attitude IS the view and nothing levels it for you.
    const d = _pilotDrone; if (!d) return;
    hungerMode = 'idle';                                // piloting burns no calories

    // ---- attitude: the mouse sticks decay back to neutral on release (rotation eases off), but every
    //      degree of tilt / pitch / yaw you built up is KEPT - acro holds, it never trims itself home.
    const decay = Math.exp(-dt / DRONE_STICK_TAU);
    d.stickX *= decay; if (Math.abs(d.stickX) < 0.002) d.stickX = 0;
    d.stickY *= decay; if (Math.abs(d.stickY) < 0.002) d.stickY = 0;

    // ---- mount pad: right after boarding the craft hovers dead-steady at level until you press W or S - no steering,
    //      no sinking, no self-destruct. The first gas input hands over full control for real.
    if (d.armedHover && (keys['KeyW'] || keys['KeyS'])) d.armedHover = false;

    if (!d.armedHover) {
        player.yaw      += -d.stickX * DRONE_RATE_YAW * dt;             // drag left/right turns the nose, unwrapped and held while deflected
        player.pitch   += -d.stickY * DRONE_RATE_PITCH * dt;          // stick forward (mouse up) -> nose up... and it stays there
        // ---- bank: A/D tilt the craft left/right up to ~80 deg, then it eases back toward level when released (no 360 rolls).
        if (keys['KeyA'])          d.roll += DRONE_ROLL_RATE * dt;
        else if (keys['KeyD'])     d.roll -= DRONE_ROLL_RATE * dt;
        else                       d.roll *= Math.max(0, 1 - dt * 2.5);   // nothing held: ease back to level gently (~3x slower than the old factor 7)
        d.roll = THREE.MathUtils.clamp(d.roll, -DRONE_ROLL_LIM, DRONE_ROLL_LIM);
    }

    _drEul.set(player.pitch, player.yaw, d.roll);                   // world-space body-up (tilted by all three axes)
    _drQ.setFromEuler(_drEul);
    _drUp.set(0, 1, 0).applyQuaternion(_drQ);

    // ---- throttle: MOMENTARY - W ramps to full while held; release it (or press S) and it dumps hard back to zero.
    if (d.armedHover) d.thr = DRONE_GRAV / DRONE_MAX_T;             // mount pad: exact hover, the craft stays dead-still in place
    else if (keys['KeyW'] && !keys['KeyS']) d.thr = Math.min(1, d.thr + DRONE_THR_RAMP * dt);
    else                                                   d.thr = Math.max(0, d.thr - DRONE_THR_DROP * dt);   // no idle floor: at zero throttle the craft is a falling body

    // ---- rigid body: thrust along the tilted body-up plus gravity and air drag is ALL of the physics.
    const T = d.thr * DRONE_MAX_T;
    d.vel.x += (_drUp.x * T - DRONE_DRAG * d.vel.x) * dt;
    d.vel.y += (_drUp.y * T - DRONE_GRAV - DRONE_DRAG * d.vel.y) * dt;
    d.vel.z += (_drUp.z * T - DRONE_DRAG * d.vel.z) * dt;

    // ---- integrate with substeps so top-speed dives can't skip a thin wall between collision samples
    const steps = Math.max(1, Math.min(8, Math.ceil(d.vel.length() * dt / 0.4)));
    for (let i = 0; i < steps && _pilotDrone === d; i++) {
        const sd = dt / steps;
        const nx = d.pos.x + d.vel.x * sd, ny = d.pos.y + d.vel.y * sd, nz = d.pos.z + d.vel.z * sd;
        if (droneCollidesAt(nx, ny, nz)) {     // hit something - the payload goes off and the run is over
            detonateDrone(d, (d.pos.x + nx) / 2, (d.pos.y + ny) / 2, (d.pos.z + nz) / 2);
            restorePlayerToHome(d);
            return;
        }
        d.pos.set(nx, ny, nz);
    }

    player.pos.copy(d.pos);                 // eye IS the drone - camera follows it exactly
    d.mesh.position.copy(d.pos);
    d.mesh.rotation.set(player.pitch, player.yaw, d.roll);          // YXZ (set at build) so the model matches our gaze
    d.spinA += dt * (10 + 85 * d.thr);      // props blur up with real throttle load
    for (const s of d.spinners) s.rotation.y = d.spinA;

    SFX.setDrone(d.thr);                                 // prop wash now tracks the actual motor throttle
    updateDroneOsd(dt, d.thr);                           // refresh the Betaflight-style overlay (throttled inside)
}
// dropped / parked drones: gravity + settle onto the floor below (fall if their floor is mined out, like a parked board)
function stepParkedDrone(d, dt) {
    d.vel.x = 0; d.vel.z = 0;                                            // no horizontal momentum when not piloted
    d.vel.y -= GRAVITY * dt; if (d.vel.y < -42) d.vel.y = -42;
    const ny = d.pos.y + d.vel.y * dt;
    const rest = droneSurfaceY(d.pos.x, d.pos.z, Math.min(H - 1, Math.ceil(d.pos.y + 0.5))) + DRONE_REST_H;
    if (rest > -900 && ny <= rest && d.vel.y <= 0 && rest - d.pos.y < 0.6) {   // landing correction only - never auto-climb
      const wasAir = !d.onGround;
      d.pos.y = rest; d.vel.set(0, 0, 0); d.onGround = true;
        if (wasAir && (Math.abs(d.mesh.rotation.x) > 1e-3 || Math.abs(d.mesh.rotation.z) > 1e-3)) d.mesh.rotation.set(0, d.mesh.rotation.y, 0);   // settle level on touchdown (keeps its heading)
    } else {
      d.pos.y = Math.max(ny, -24 + DRONE_REST_H);                          // map floor, same safety net as the player
      d.onGround = false;
    }
    d.mesh.position.copy(d.pos);
}

function stepParkedDrones(dt) {   // every drone we're not currently inside
    for (const d of drones) if (d !== _pilotDrone) stepParkedDrone(d, dt);
}
// ============================================================ computer (arcade-style machine)
// You spawn with one in hotbar slot 3. Right-click a floor to set a machine down - it's an entity like
// boards/drones, never written into the blocks array. Right-click it again and you're SEATED AT ITS SCREEN:
// view locks onto the monitor (the display powers up white), LMB is a normal mouse click on that display
// (for now; ray -> UV so real screen UI can be drawn there later), RMB or Esc stands you back out and kills power.
let comps = [];                 // every machine in the world: { pos, yaw, vy, home, powered, lastClick, mesh, screenMesh, scrCtx, scrTex }
let _comp = null;               // the machine we're currently mounted to (null when on foot)

function buildCompMesh(forHand) {   // box-built arcade-style computer; front (screen + keys) faces local -z. Hand copy is depth-test-off like the other viewmodels
    const opts = forHand ? { depthTest: false, depthWrite: false, fog: false, transparent: true } : {};
    const skirtMat  = new THREE.MeshBasicMaterial({ color: 0x1c1f26, ...opts });   // dark base skirt
    const bodyMat   = new THREE.MeshBasicMaterial({ color: 0x343a48, ...opts });   // cabinet + monitor shell
    const shelfMat  = new THREE.MeshBasicMaterial({ color: 0x59627a, ...opts });   // console counter + marquee strip
    const keysMat   = new THREE.MeshBasicMaterial({ color: 0xbfc7d8, ...opts });   // bright keycaps
    let scrTex = null, scrCtx = null;
    const screenMesh = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.46, 0.03),
      forHand ? new THREE.MeshBasicMaterial({ color: 0xffffff, ...opts })   // viewmodel's display stays lit white (no state)
              : (() => { const canvas = document.createElement('canvas'); canvas.width = canvas.height = 16;
                          scrCtx = canvas.getContext('2d');
                          scrTex = toTexture(canvas);                       // nearest-filtered so future screen art stays crisp pixels
                          return new THREE.MeshBasicMaterial({ map: scrTex }); })());
    const g = new THREE.Group();
    const skirt    = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.16, 0.72), skirtMat);  skirt.position.set(0, 0.08, 0);
    const cabinet  = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.14, 0.66), bodyMat);   cabinet.position.set(0, 0.73, 0);
    const shelf    = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.1, 0.56),  shelfMat);  shelf.position.set(0, 1.0, -0.48);
    const keys     = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.3),   keysMat);   keys.position.set(0, 1.09, -0.42);
    const spacebar = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.09),   keysMat);   spacebar.position.set(0, 1.095, -0.6);
    const head     = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.6, 0.34),   bodyMat);   head.position.set(0, 1.55, -0.28);
    screenMesh.position.set(0, 1.55, -0.465);                                          // face of the monitor (just proud of the shell)
    const marquee  = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.08),   shelfMat);  marquee.position.set(0, 1.91, -0.3);
    g.add(skirt, cabinet, shelf, keys, spacebar, head, screenMesh, marquee);
    if (forHand) g.traverse(o => { o.renderOrder = 101; });
    return { g, screen: screenMesh, scrCtx, scrTex, mats: [skirtMat, bodyMat, shelfMat, keysMat] };
}

function setCompScreen(c) {   // repaint a machine's display: white while powered on (mounted), dark slate otherwise
    if (!c.scrCtx) return;                                       // hand-viewmodel copies have no state to paint
    c.scrCtx.fillStyle = c.powered ? '#ffffff' : '#171a20';
    c.scrCtx.fillRect(0, 0, 16, 16);
    if (c.powered) { /* later: draw the real screen UI into this canvas - for now it's a plain white screen */ }
    c.scrTex.needsUpdate = true;
}

function createComp(x, surfY, z, yaw) {
    const bm = buildCompMesh(false);
    const c = { pos: new THREE.Vector3(x, surfY, z), yaw, vy: 0, home: null, powered: false, lastClick: null,
                mesh: bm.g, screenMesh: bm.screen, scrCtx: bm.scrCtx, scrTex: bm.scrTex };
    setCompScreen(c);                                             // starts with a dark display
    c.mesh.position.copy(c.pos);
    c.mesh.rotation.set(0, yaw, 0);
    scene.add(c.mesh); comps.push(c);
    return c;
}

// right-click while holding one: drop the machine where you aim (same rules as boards/drones - needs a floor below)
function placeCompAt(hit) {
    if (!hit) return false;
    const tx = hit.x + hit.nx, ty = hit.y + hit.ny, tz = hit.z + hit.nz;
    if (!inBounds(tx, ty, tz)) return false;
    const cur = blockAt(tx, ty, tz); if (cur !== AIR && cur !== WATER) return false;
    if (aabbOverlapsCell(tx, ty, tz)) return false;   // don't drop it inside yourself
    const x = tx + 0.5, z = tz + 0.5;
    const surf = droneSurfaceY(x, z, Math.min(H - 2, ty));
    if (surf === -999) return false;                  // no floor down this column - can't float it
    createComp(x, surf, z, player.yaw + Math.PI);     // screen faces whoever set it down
    SFX.place(COMP);
    removeOneSelected();
    triggerArmSwing('place');
    return true;
}

const _coNDC = new THREE.Vector2(0, 0);
const _coRay = new THREE.Raycaster();
function aimedComp(maxDist) {   // the machine straight under the crosshair (nearest wins), or null - never aims at the one we're seated in
    if (_comp || !comps.length) return null;
    _coRay.setFromCamera(_coNDC, camera);
    let best = null, bd = maxDist || REACH;
    for (const c of comps) {
      const h = _coRay.intersectObject(c.mesh, true);
      if (h.length && h[0].distance < bd) { bd = h[0].distance; best = c; }
    }
    return best;
}

// seated pose: eye ~1.14 blocks in front of the screen face (~40% closer than the old 1.6), staring straight at its center
function compSeatPose(c) {
    const s = Math.sin(c.yaw), co = Math.cos(c.yaw);   // three.js Y-rotation: (x,z) -> (x*co + z*s, -x*s + z*co), origin at c.pos
    const lw = (lx, ly, lz) => new THREE.Vector3(c.pos.x + lx * co + lz * s, c.pos.y + ly, c.pos.z - lx * s + lz * co);
    const p = lw(0, 1.52, -1.14), t = lw(0, 1.58, -0.49);   // seat distance was 1.6 - pulled in ~40% so the screen fills more of the view   // eye spot / screen center (local coords)
    return { pos: p, yaw: Math.atan2(-(t.x - p.x), -(t.z - p.z)), pitch: Math.atan2(t.y - p.y, Math.hypot(t.x - p.x, t.z - p.z)) };
}

// where the display's center sits in world space (drives the seated aim)
function compScreenCenter(c) {
    const s = Math.sin(c.yaw), co = Math.cos(c.yaw);   // same Y-rotation convention as compSeatPose, for local point (0, 1.58, -0.49)
    return new THREE.Vector3(c.pos.x - 0.49 * s, c.pos.y + 1.58, c.pos.z - 0.49 * co);
}

// yaw/pitch that stares at the screen center from wherever our eye currently is (re-aim after a collision nudge)
function compAimFrom(c) {
    const t2 = compScreenCenter(c);
    const dx = t2.x - player.pos.x, dy = t2.y - player.pos.y, dz = t2.z - player.pos.z;
    return { yaw: Math.atan2(-dx, -dz), pitch: Math.max(-1.5, Math.min(1.5, Math.atan2(dy, Math.hypot(dx, dz)))) };
}

// seated mode is a REAL cursor session: pointer lock comes OFF so the mouse can roam over the display, and gets re-grabbed when we stand back up (stub-safe)
function setCompUi(on) {   // toggle the desktop-OS overlay on screen (CSS body.comp) - headless stubs have no real classList to speak of
  try { document.body && document.body.classList.toggle('comp', !!on); } catch {}
}
function pelicanBench(open) {   // open/close the Pelican Bench app window on the desktop overlay (CSS .open on #pbWin) - stub-safe
  try { const w = $m('pbWin'); if (w && w.classList) w.classList.toggle('open', !!open); } catch {}
    if (open) terrainria(false);   // one app window at a time - the two windows would stack on top of each other
}
// ---- Terrainria: a tiny Terraria-ish side-scroller that runs inside its app window ------------------------------------
// The ONLY controls are A/D move, W/Space jump and S fast-fall. Small fixed map drawn to the #trGame canvas, ticked from
// animate() while seated at a computer with the window open. Stub-safe no-ops like the rest of the desktop UI bits.
const TR_COLS = 40, TR_ROWS = 22, TR_T = 8;        // map in tiles + px per tile (canvas is 320x176)
const TR_PW = 5, TR_PH = 7;                        // player AABB in px - a little smaller than a tile so he fits the pits
let trOpen = false;                                // window open -> animate() ticks and draws the game each frame
const trKeys = new Set();                          // held keys right now (only A/D/W/S/Space are ever read)
let trPrevJump = false, trPrevOnG = true;          // edge/latch trackers so jumps + landings fire once, not per-frame
const TRS = { grid: null, x: 0, y: 0, vy: 0, onG: false, face: 1, coins: [], got: 0, won: false, flagY: 18 };

function trSolidAt(px, py) {                       // off-map left/right = wall; below the map is open (we respawn if we get there)
  const cx = Math.floor(px / TR_T), cy = Math.floor(py / TR_T);
  if (cx < 0 || cx >= TR_COLS) return true;
  if (cy < 0 || cy >= TR_ROWS) return false;
  return TRS.grid[cy * TR_COLS + cx] > 0;
}
function trHits(x, y) {                            // any of the player's 4 corners inside a solid tile?
  for (const px of [x + 0.5, x + TR_PW - 0.5])
    for (const py of [y + 0.5, y + TR_PH - 0.5]) if (trSolidAt(px, py)) return true;
  return false;
}
function trStep(axis, amt) {                       // travel up to `amt` px along one axis in <=0.75px substeps; returns actual distance moved
  let moved = 0;
  while (Math.abs(moved) < Math.abs(amt)) {
    const s = Math.max(-0.75, Math.min(0.75, amt - moved));   // final sliver so we never overshoot the request
    if (trHits(TRS.x + (axis === 'x' ? s : 0), TRS.y + (axis === 'y' ? s : 0))) break;   // terrain in the way
    if (axis === 'x') TRS.x += s; else TRS.y += s; moved += s;
  }
  return moved;
}
function trTopRow(x) {                             // first solid row scanning down a column (spawning / flag planting)
  for (let y = 0; y < TR_ROWS; y++) if (TRS.grid[y * TR_COLS + x] > 0) return y;
  return TR_ROWS - 1;
}

function trBuild() {                               // one small hand-rolled map: rolling ground, two pits, ledges, coins and the goal flag at the right edge
  const g = new Uint8Array(TR_COLS * TR_ROWS);     // 1=grass top / 2=dirt / 3=stone (rest is air)
  for (let x = 0; x < TR_COLS; x++) {
    if ((x >= 14 && x <= 15) || (x >= 27 && x <= 28)) continue;   // two jumpable pits
    const top = 15 + Math.round(3 * Math.sin(x * 0.5));           // rolling ground, tops wander between rows ~12 and 18
    for (let y = top; y < TR_ROWS - 1; y++) g[y * TR_COLS + x] = y === top ? 1 : (y <= top + 3 ? 2 : 3);
  }
  for (const [x0, w, row] of [[8, 4, 10], [19, 5, 9], [31, 4, 11]])   // floating ledges to park on / hop up
    for (let x = x0; x < x0 + w && x < TR_COLS; x++) g[row * TR_COLS + x] = 3;
  const coins = [];                                // stashed over the pits and around the ledges
  for (const [cx, cy] of [[14, 12], [15, 10], [10, 8], [21, 7], [27, 12], [28, 10], [32, 9], [36, 13]])
    if (!g[cy * TR_COLS + cx]) coins.push({ x: cx, y: cy });
  TRS.grid = g; TRS.coins = coins; TRS.got = 0; TRS.won = false; TRS.vy = 0; TRS.onG = true; TRS.face = 1;
  TRS.flagY = trTopRow(37);                        // the goal flag plants itself in the ground at the right edge
  const top2 = trTopRow(2);                        // spawn standing on dry ground near the left edge
  TRS.x = 2 * TR_T + 1.5; TRS.y = top2 * TR_T - TR_PH - 0.5;
}

function terrainria(open) {   // open/close the Terrainria app window (CSS .open on #trWin); each launch starts a fresh run - stub-safe
  try { const w = $m('trWin'); if (w && w.classList) w.classList.toggle('open', !!open); } catch {}
  trOpen = !!open; trKeys.clear();
  if (trOpen) trBuild();
}

function updateTerrainria(dt) {   // called from animate() every frame - only alive while seated at a computer with the window open
  if (!trOpen || !_comp || !TRS.grid) return;
  let g2d = null, cv = $m('trGame'); try { g2d = cv && cv.getContext ? cv.getContext('2d') : null; } catch {}
  if (!g2d) return;

  const jump = trKeys.has('KeyW') || trKeys.has('Space');   // fresh-press edge: only meaningful for (re)starting at the flag
  const jumpedNow = jump && !trPrevJump;
  trPrevJump = jump;

  try {
    if (TRS.won) {                                   // standing at the goal flag - Space starts a brand-new run
      if (jumpedNow) { trBuild(); SFX.click(); }
    } else {
      const left = trKeys.has('KeyA'), right = trKeys.has('KeyD');
      const vx = left ? -120 : right ? 120 : 0;      // instant stop, arcade-style - no inertia for a toy
      if (left) TRS.face = -1; else if (right) TRS.face = 1;
      if (jump && TRS.onG) { TRS.vy = -175; SFX.jump(); }   // ~3.6 tiles of jump: clears the pits and the ledges comfortably
      TRS.vy += 480 * dt + ((trKeys.has('KeyS') && !TRS.onG) ? 900 * dt : 0);   // S = fast fall, only while airborne
      if (TRS.vy > 320) TRS.vy = 320;
      { const rx = vx * dt, mx = trStep('x', rx);
        if (Math.abs(mx) < Math.abs(rx) - 1e-6 && TRS.onG && !trHits(TRS.x, TRS.y - TR_T)) {   // bumped into a 1-tile step -> hop up onto it first (Terraria-style auto-step)
          TRS.y -= TR_T; trStep('x', rx);
        } }
      const dy = TRS.vy * dt, movedY = trStep('y', dy), blockedY = Math.abs(movedY) < Math.abs(dy);
      if (blockedY && dy > 0 && !trPrevOnG && TRS.vy > 140) SFX.land(0.35);    // hard landings thud like in the big world
      if (blockedY) { TRS.onG = dy > 0; TRS.vy = 0; }   // landed / bonked an underside while rising -> airborne again
      else if (dy < 0) TRS.onG = false;                 // free rise
      for (const c of TRS.coins) {                      // coin pickup: plain AABB overlap in pixel space
        if (!c.t && TRS.x < (c.x + 1) * TR_T && TRS.x + TR_PW > c.x * TR_T && TRS.y < (c.y + 1) * TR_T && TRS.y + TR_PH > c.y * TR_T) { c.t = true; TRS.got++; SFX.click(); }
      }
      if (TRS.won !== true && TRS.x + TR_PW >= 37 * TR_T - 1) { TRS.won = true; SFX.click(); }   // reached the flag wall at the right edge
      if (TRS.y > TR_ROWS * TR_T + 24) {                // fell into a pit: back to the spawn, nothing else punished
        const t3 = trTopRow(2); TRS.x = 2 * TR_T + 1.5; TRS.y = t3 * TR_T - TR_PH - 0.5; TRS.vy = 0;
      }
    }
    trPrevOnG = TRS.onG;
    trDraw(g2d);   // render this frame (its own try/catch keeps the fake-GL/fake-canvas harnesses happy)
  } catch {}
}

function trDraw(g) {   // one frame of the mini-world onto the app-window canvas (internal resolution 320x176)
  const t = performance.now() * 0.001;
  g.fillStyle = '#8fd0f2'; g.fillRect(0, 0, TR_COLS * TR_T, TR_ROWS * TR_T);   // sky
  g.fillStyle = 'rgba(255,247,196,.5)'; g.beginPath(); g.arc(300, 26, 13, 0, 6.283); g.fill();   // sun up right
  g.fillStyle = 'rgba(255,255,255,.9)';                                       // two lazy clouds
  g.beginPath(); g.arc(70, 34, 7, 0, 6.283); g.fill(); g.beginPath(); g.arc(82, 31, 8, 0, 6.283); g.fill();
  g.beginPath(); g.arc(190, 52, 6, 0, 6.283); g.fill(); g.beginPath(); g.arc(200, 49, 7, 0, 6.283); g.fill();
  for (let y = 0; y < TR_ROWS; y++)                              // terrain: one fill per tile + cheap top highlight / bottom shade
    for (let x = 0; x < TR_COLS; x++) {
      const v = TRS.grid[y * TR_COLS + x]; if (!v) continue;
      g.fillStyle = v === 1 ? '#5cae48' : v === 2 ? '#7a5533' : '#8b939c';
      g.fillRect(x * TR_T, y * TR_T, TR_T, TR_T);
      if (y === 0 || !TRS.grid[(y - 1) * TR_COLS + x]) { g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(x * TR_T, y * TR_T, TR_T, 2); }
      if (y === TR_ROWS - 1 || !TRS.grid[(y + 1) * TR_COLS + x]) { g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(x * TR_T, (y + 1) * TR_T - 2, TR_T, 2); }
      if (v > 1 && (x * 7 + y * 13) % 5 === 0) { g.fillStyle = 'rgba(0,0,0,.14)'; g.fillRect(x * TR_T + 3, y * TR_T + 4, 2, 2); }   // dirt/stone speckle
    }
  for (const c of TRS.coins) { if (c.t) continue;                 // coins: shimmer by width like a spinning coin
    const w = Math.max(1.5, 4 * Math.abs(Math.cos(t * 3 + c.x)));
    g.fillStyle = '#a07d10'; g.fillRect((c.x + .5) * TR_T - w / 2, (c.y + .5) * TR_T - 3.5, w, 8);
    g.fillStyle = '#ffd43b'; g.fillRect((c.x + .5) * TR_T - w / 2 + .75, (c.y + .5) * TR_T - 3.5 + 1, Math.max(0.5, w - 1.5), 6);
  }
  const fy = TRS.flagY, fxp = 37 * TR_T;                           // goal flag: pole planted in the ground + a wavering pennant
  g.fillStyle = '#cfd6dd'; g.fillRect(fxp + 5, (fy - 4) * TR_T, 2, 4 * TR_T);
  const wob = Math.sin(t * 4) * 1.5;
  g.fillStyle = '#e33f37'; g.beginPath(); g.moveTo(fxp + 7, (fy - 4) * TR_T + 2);
  g.lineTo(fxp + 16, (fy - 4) * TR_T + 5 + wob * .4); g.lineTo(fxp + 7, (fy - 4) * TR_T + 8); g.closePath(); g.fill();
  const pxr = Math.round(TRS.x), pyr = Math.round(TRS.y);         // the little guy: boots / shirt / head / one eye (face hints direction)
  g.fillStyle = '#5a4630'; g.fillRect(pxr + 1, pyr + 5, 2, 2); g.fillRect(pxr + 3, pyr + 5, 2, 2);
  g.fillStyle = '#d94a3d'; g.fillRect(pxr, pyr + 3, 5, 3);
  g.fillStyle = '#ffcf9e'; g.fillRect(pxr, pyr, 5, 3);
  g.fillStyle = '#1b1f27'; g.fillRect(pxr + (TRS.face > 0 ? 3 : 1), pyr + 1, 1, 1);
  g.font = 'bold 8px monospace'; g.textBaseline = 'top';          // coin tally top-left (dark pass first for the outline)
  const msg = 'coins ' + TRS.got + '/' + TRS.coins.length;
  g.fillStyle = '#000000'; g.fillText(msg, 3.75, 2.75);
  g.fillStyle = '#ffffff'; g.fillText(msg, 3, 2);
  if (TRS.won) {                                                  // win overlay: the run is over, Space plays again
    g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(0, 0, TR_COLS * TR_T, TR_ROWS * TR_T);
    g.textAlign = 'center';
    g.font = 'bold 14px monospace';
    g.fillStyle = '#000000'; g.fillText('FLAG REACHED!', 161, 73);
    g.fillStyle = '#ffffff'; g.fillText('FLAG REACHED!', 160, 72);
    g.font = 'bold 8px monospace';
    g.fillStyle = '#000000'; g.fillText(msg + '   -   SPACE: play again', 161.5, 93.5);
    g.fillStyle = '#ffffff'; g.fillText(msg + '   -   SPACE: play again', 160.5, 92.5);
    g.textAlign = 'left';
  }
}

// input for the mini-game: while seated with Terrainria open these are THE only keys it listens to (the big world already bails on _comp)
try {
  window.addEventListener('keydown', e => {
    if (!trOpen || !_comp) return;
    const c = e.code;
    if (c === 'KeyA' || c === 'KeyD' || c === 'KeyW' || c === 'KeyS' || c === 'Space') { trKeys.add(c); e.preventDefault(); }   // Space would otherwise scroll the page
  });
  window.addEventListener('keyup', e => {
    const c = e.code;
    if (c === 'KeyA' || c === 'KeyD' || c === 'KeyW' || c === 'KeyS' || c === 'Space') trKeys.delete(c);
  });
} catch {}   // headless harnesses have no window events - never let the pretty bits take the game down with them

function compPointerFree() { try { if (document.exitPointerLock) document.exitPointerLock(); } catch {} }
function compPointerBack() {   // called from a click/key gesture; if the browser balks, the pause menu is the fallback door back in
  try { const p = renderer.domElement.requestPointerLock ? renderer.domElement.requestPointerLock() : null;
        if (p && typeof p.catch === 'function') p.catch(() => { if (!_comp) openMenu(); }); } catch {}
}

function mountComp(c) {   // right-click a computer: sit down at its screen and power the display on
    if (_comp || !c) return false;
    const pose = compSeatPose(c);
    c.home = { pos: player.pos.clone(), yaw: player.yaw, pitch: player.pitch };   // where the body goes back when we stand up
    _comp = c;
    c.powered = true; setCompScreen(c);      // the monitor glows while it's up...
    setCompUi(true); compPointerFree();      // ...and the little desktop OS takes over, with a free-roaming mouse
    player.pos.copy(pose.pos);
    player.yaw = pose.yaw; player.pitch = Math.max(-1.5, Math.min(1.5, pose.pitch)); player.vy = 0;
    escapeGeometry();
    { const aim2 = compAimFrom(c);   // the nudge may have moved our eye - re-aim so we stare EXACTLY at screen center from wherever we landed
      player.yaw = aim2.yaw; player.pitch = aim2.pitch; }                        // shake loose of anything clipping the seat cell (slopes / walls behind)
    syncCamera();
    mouseState.left = false; mouseState.right = false;   // don't bleed the mount click into mine/place logic
    SFX.compOn(); triggerArmSwing('place');
    return true;
}

function unmountComp() {   // right-click / Esc while seated: stand back up and kill the screen
    const c = _comp; if (!c) return false;
    _comp = null;
    c.powered = false; setCompScreen(c);
    pelicanBench(false); terrainria(false);   // close any open app windows so the next session starts fresh
    setCompUi(false); compPointerBack();     // stand back up - hand the pointer lock to the world (pause menu if Chrome balks)
    mouseState.left = false; mouseState.right = false;
    player.pos.copy(c.home ? c.home.pos : new THREE.Vector3().copy(c.mesh.position));
    player.yaw = c.home ? c.home.yaw : 0; player.pitch = c.home ? c.home.pitch : 0;
    player.vy = 0;
    escapeGeometry(); syncCamera();
    SFX.compOff();
    return true;
}

const _coCorners = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];   // reusable, per-frame scratch
function updateCompOverlay() {   // while seated, glue the desktop-OS box onto the real monitor's black screen face (rough projected quad) instead of a full-screen fake bezel
    const c = _comp; if (!c || !c.screenMesh) return;
    let el = null; try { el = $m('compMonBezel'); } catch {} if (!el || !el.style) return;
    // front-face corners in the screen mesh's OWN local space (half-width/height, just proud of the glass so it lands on the black area)
    const hw = 0.32, hh = 0.23;   // matches BoxGeometry(0.64, 0.46, ..) => +/- half extents
    _coCorners[0].set(-hw, -hh, -0.017); _coCorners[1].set(hw, -hh, -0.017);
    _coCorners[2].set(hw,  hh, -0.017);  _coCorners[3].set(-hw,  hh, -0.017);
    const W = (renderer && renderer.domElement && renderer.domElement.clientWidth) || window.innerWidth;
    const H = (renderer && renderer.domElement && renderer.domElement.clientHeight) || window.innerHeight;
    let minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity, n = 0;
    for (let i = 0; i < 4; i++) {
      const v = _coCorners[i];
      c.screenMesh.localToWorld(v);   // the mesh's world matrix already bakes in the cabinet's position + yaw
      v.project(camera);              // -> NDC (-1..1), y up
      if (v.z > -1 && v.z < 1) {      // only count corners actually in front of the eye
        const px = (v.x * 0.5 + 0.5) * W, py = (0.5 - v.y * 0.5) * H;
        if (px < minx) minx = px; if (px > maxx) maxx = px;
        if (py < miny) miny = py; if (py > maxy) maxy = py; n++;
      }
    }
    if (n < 4) return;                // camera drifted off the face for a frame - keep last good placement rather than flash to origin
    const bw = el.offsetWidth || 1024, bh = el.offsetHeight || 768;   // base layout size (CSS transform doesn't affect these)
    el.style.transform = `translate(${minx.toFixed(1)}px,${miny.toFixed(1)}px) scale(${((maxx - minx) / bw).toFixed(4)},${((maxy - miny) / bh).toFixed(4)})`;
}

function clickCompScreen() {   // LMB while seated: a normal mouse click on the display (ray -> UV so future screen UI knows where you clicked)
    const c = _comp; if (!c) return false;
    _coRay.setFromCamera(_coNDC, camera);
    const h = _coRay.intersectObject(c.screenMesh, false);
    if (!h.length || !h[0].uv) { SFX.click(); return false; }   // clicked the bezel/cabinet instead of the display
    c.lastClick = { u: h[0].uv.x, v: 1 - h[0].uv.y };           // flip Y so v=0 is top-left like normal mouse/screen coords
    SFX.compClick();
    return true;
}

// ---- the little desktop OS on screen --------------------------------------------------------------
// Painted once at load: two super-basic pixel-art icons, a taskbar logo and a live clock. The icons are
// clickable but dormant for now (a satisfying press; the apps arrive later). Taskbar is show-only.
(function compDesktopUi() {
  try {
    const cv = id => { const el = $m(id); return el ? (id === 'compLogo' ? el : el.querySelector ? el.querySelector('canvas') : null) : null; };
    const ctx2d = c => (c && c.getContext ? c.getContext('2d') : null);
    // Pelican Bench: a white bird with an unreasonably big orange beak, facing right on 32x32
    { const g = ctx2d(cv('icPelican')); if (g) {
      const R = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x, y, w, h); };
      R(9, 5, 8, 7, '#ffffff');       // head
      R(6, 10, 12, 13, '#ffffff');    // body
      R(4, 13, 3, 7, '#f2f2f2');      // tail tip
      R(15, 8, 11, 3, '#ff9d2e');     // top of the bill
      R(16, 11, 8, 5, '#ef7c10');     // sagging pouch
      R(13, 7, 2, 2, '#181820');      // eye (very basic)
      R(9, 23, 2, 4, '#ff9d2e');      // legs, if you squint
      R(14, 23, 2, 4, '#ff9d2e');
    } }
    // Terrainria: one chunky block tile - grass band on top, speckled dirt below
    { const g = ctx2d(cv('icTerrainria')); if (g) {
      for (let x = 0; x < 32; x++) { g.fillStyle = ((x * 5 + 3) % 7) < 2 ? '#69b354' : '#58a047'; g.fillRect(x, 0, 1, 9); }   // grass w/ lighter blades
      for (let y = 9; y < 32; y++) for (let x = 0; x < 32; x++) {
        const n = (x * 7 + y * 13) % 19;                                    // deterministic speckle, world seed untouched
        g.fillStyle = n === 0 ? '#543a20' : (n === 1 ? '#86603b' : '#7a5533');   // dirt w/ dark pits and light pebbles
        g.fillRect(x, y, 1, 1);
      }
      g.fillStyle = '#4c3826'; g.fillRect(0, 9, 32, 1);                     // seam between grass and dirt
    } }
    // taskbar logo: a miniature of the machine itself - dark shell, lit teal screen
    { const g = ctx2d(cv('compLogo')); if (g) {
      g.fillStyle = '#2b3040'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#48e0e8'; g.fillRect(2, 2, 12, 9);                     // lit screen
      g.fillStyle = '#9fb4cc'; g.fillRect(3, 13, 10, 2);                    // keys
    } }
    // taskbar clock: real local time, refreshed once a second (harmless while hidden)
    { const tEl = $m('compTime'); if (tEl && window.setInterval) {
      const tickClock = () => { try {
        const d = new Date(); let h = d.getHours() % 12; if (!h) h = 12;
        tEl.textContent = String(h).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + (d.getHours() >= 12 ? ' PM' : ' AM'); } catch {} };
      tickClock(); window.setInterval(tickClock, 1000);
    } }
    // desktop icons: press squish + click SFX; each icon launches its own app window (Pelican Bench / Terrainria)
    { for (const id of ['icPelican', 'icTerrainria']) { const el = $m(id); if (!el || !el.addEventListener) continue;
      el.addEventListener('mousedown', e => { e.stopPropagation(); SFX.click();
        el.classList.add('pressed'); setTimeout(() => el.classList.remove('pressed'), 140);
        if (id === 'icPelican') pelicanBench(true); else terrainria(true);   // each icon launches its own app window (only one is ever open)
      }); } }
    { const cb = $m('pbClose'); if (cb && cb.addEventListener)
      cb.addEventListener('mousedown', e => { e.stopPropagation(); SFX.click(); pelicanBench(false); }); }   // the window's close button
      { const tc = $m('trClose'); if (tc && tc.addEventListener)
        tc.addEventListener('mousedown', e => { e.stopPropagation(); SFX.click(); terrainria(false); }); }   // Terrainria's close button
  } catch {}   // headless harnesses have a skeleton DOM - never let the pretty bits take the game down with them
})();

// machines don't hover: they follow the floor beneath them (fall if you mine it out), sitting flush when terrain fills in under them
function updateComps(dt) {
    if (!comps.length) return;
    for (const c of comps) {
      const x = Math.floor(c.pos.x), z = Math.floor(c.pos.z);
      let restY = 0;
      for (let y = Math.min(H - 1, Math.ceil(c.pos.y)); y >= 0; y--) if (holdsSand(x, y, z)) { restY = y + 1; break; }
      if (restY < c.pos.y - 1e-3) {                 // floor fell away: gravity until we're back on it
        c.vy -= GRAVITY * dt; if (c.vy < -30) c.vy = -30;
        const ny = c.pos.y + c.vy * dt;
        if (ny <= restY || c.vy <= 0) { c.pos.y = Math.max(restY, ny); if (c.pos.y === restY) c.vy = 0; } else c.pos.y = ny;
      } else { c.pos.y = restY; c.vy = 0; }         // floor rose up to/into it: sit flush on top
      c.mesh.position.copy(c.pos);
    }
}


// ============================================================ per-frame physics
function stepPhysics(dt) {

  if (!locked) { player.sprinting = false; return; }   // frozen until the mouse is captured

    // ---- riding the MLRS: cockpit mode takes over the camera, walking physics is fully replaced
    if (mlrs.active) { player.sprinting = false; updateMlrsView(dt); return; }   // cockpit mode: never "sprinting" for the FOV

      // ---- piloting the FPV drone: cockpit mode replaces walking physics entirely (WASD + Shift-to-climb / pitch-down-to-dive; mouse steers the view)
      if (_pilotDrone) { player.sprinting = false; updateDronePiloted(dt); syncCamera(); return; }   // drone cockpit: never "sprinting" for the FOV
      // ---- seated at a computer: the view is bolted onto its screen - walking physics fully skipped (the mouse belongs to the display)
      if (_comp) { player.sprinting = false; hungerMode = 'idle'; syncCamera(); return; }   // never "sprinting" while seated (FOV stays at SET.fov)


  // ---- riding a skateboard: board physics replaces walking entirely.
  // Mouse stays free-look ONLY - deck heading comes from WASD, never from where you aim.
  if (activeRide) {
  const ride = activeRide;   // local ref - crashSkate unmounts mid-step and nulls activeRide
  player.sprinting = false;  // riding is not sprinting (avoids a one-frame FOV bump right after a crash-buck dismount)
    const ox = player.pos.x, oz = player.pos.z;
    stepSkateBoard(ride, dt);
    if (activeRide === ride) {                            // wiped out mid-frame? dismount already placed the rider - do NOT snap them back onto the board against the wall
      syncPlayerToSkate();
      player._moveAmt = Math.hypot(player.pos.x - ox, player.pos.z - oz);   // arm bob keeps working at speed
      hungerMode = ride.spd > 2 ? 'run' : (player._moveAmt > 0.01) ? 'walk' : 'idle';
    }
  if (activeRide !== ride) { syncCamera(); return; }      // wiped out mid-frame - walking physics resumes next frame
    syncCamera();
    return;
  }

  const forward = keys['KeyW'], back = keys['KeyS'];
  const strafeL = keys['KeyA'], strafeR = keys['KeyD'];
  // ---- swimming state: is any part of our body in a water block? (simplified Minecraft)
  const swX = Math.floor(player.pos.x), swZ = Math.floor(player.pos.z);
  const bodyInWater = blockAt(swX, Math.floor(player.pos.y - EYE + 0.5), swZ) === WATER;   // torso/feet
  const headInWater = blockAt(swX, Math.floor(player.pos.y - 0.3), swZ) === WATER;        // head
  const inSwim = bodyInWater || headInWater;

  const sprinting = (keys['ShiftLeft'] || keys['ShiftRight']) && forward && !inSwim;   // no sprint underwater
  player.sprinting = sprinting;                // shared with the dynamic-FOV system (smooth +SPRINT_FOV_BOOST while ongoing)

  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);
  let dx = 0, dz = 0;
  if (forward) { dx += -sy; dz += -cy; }   // camera forward on the ground plane
  if (back)    { dx +=  sy; dz +=  cy; }
  if (strafeR) { dx +=  cy; dz += -sy; }   // right = forward ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â up... verified: (cos y, 0, -sin y)
  if (strafeL) { dx += -cy; dz +=  sy; }
  const len = Math.hypot(dx, dz);
  if (len > 0) { dx /= len; dz /= len; }

  const speed = inSwim ? WALK_SPEED * SWIM_SPEED_MULT : WALK_SPEED * (sprinting ? SPRINT_MULT : 1);   // much slower swimming underwater

  // horizontal: one axis at a time with snap-back collision
  const px = player.pos.x, pz = player.pos.z;
  moveAxis('x', player.pos.x + dx * speed * dt);
  moveAxis('z', player.pos.z + dz * speed * dt);
  player._moveAmt = Math.hypot(player.pos.x - px, player.pos.z - pz); // for the arm's walk bob
    hungerMode = sprinting ? 'run' : (player._moveAmt > 0.01) ? 'walk' : 'idle';   // drives the hunger drain rate

  // vertical
  if (inSwim) {
    // underwater: weak gravity, and sinking never gets faster than a gentle glide - falling in is safe
    player.vy -= GRAVITY * WATER_GRAV_MULT * dt;
    const diving = keys['ShiftLeft'] || keys['ShiftRight'];
    if (keys['Space']) {            // hold Space to swim up toward the surface
      player.vy += (SWIM_RISE_SPEED - player.vy) * Math.min(1, dt * 6);
    } else if (diving) {            // hold Shift to dive down to the bottom
      player.vy -= GRAVITY * 0.5 * dt;
      if (player.vy < WATER_FALL_CAP - 2) player.vy = WATER_FALL_CAP - 2;
    } else if (headInWater) {       // fully submerged with no input: buoyancy floats you back up
      player.vy = Math.min(player.vy + 2.5 * dt, 1.8);
    }
    if (player.vy < WATER_FALL_CAP) player.vy = WATER_FALL_CAP;
  } else {
    player.vy -= GRAVITY * dt;
    if (player.vy < -48) player.vy = -48;
  }
  if (keys['Space'] && player.onGround) { player.vy = JUMP_V; SFX.jump(); }   // a full jump also works in shallow water: hop out over ledges/banks

  const hitY = moveAxis('y', player.pos.y + player.vy * dt);
  player.onGround = false;
  if (hitY && player.vy <= 0) {
    const impact = -player.vy;                 // fall speed at the moment of landing
    player.onGround = true; player.vy = 0;
    if (impact > 7) SFX.land((impact - 7) / 28);   // hard landings thud + dust kick-up
    const fallen = impact * impact / (2 * GRAVITY);   // approx block count of the fall
    if (fallen > 4 && health > 0) takeDamage(Math.max(1, Math.round(fallen - 3)));  // safe up to a ~3-block drop, like vanilla
  }
  else if (hitY) player.vy = 0; // bonked head

  // footsteps: cadence follows distance travelled, so sprinting steps faster for free
  if (player.onGround && !inSwim) {   // no footstep sounds while wading/swimming
    stepAccum += Math.hypot(player.pos.x - px, player.pos.z - pz);
    if (stepAccum >= STEP_DIST) { stepAccum = 0; SFX.footstep(surfaceUnderFoot()); }
  } else stepAccum = 0;

  // safety: keep inside the map horizontally, respawn if we ever fall out of the world
  const p = player.pos;
  p.x = Math.max(PHALF + 0.01, Math.min(W - PHALF - 0.01, p.x));
  p.z = Math.max(PHALF + 0.01, Math.min(D - PHALF - 0.01, p.z));
  if (p.y < -20) { // fell out somehow ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â respawn somewhere safe
    takeDamage(999);          // the void is lethal - die() respawns at spawn with full hearts
    respawnPlayer();
  }

  syncCamera();
}

// hold-to-repeat mining/placing while the button is kept down
function heldActions() {
    if (mlrs.active || _pilotDrone || _comp) return;   // LMB hold is the arm charge in the cockpit / flight input on a drone, not mining or placing
  if (!locked) return;
  const now = performance.now();
  if (mouseState.left && !aimedSkate(4) && now - mouseState.lastAttack > 300) { if (attackMob()) mouseState.lastAttack = now; }   // hold to keep swinging at a mob
  if (mouseState.right && now - mouseState.lastAct > 240) tryAct(2, now);
}

// ============================================================ debug HUD (top-left)
const debugEl = document.getElementById('debug');
let fpsSmooth = 60, frameMs = 16.7, hudTimer = 0;
const COMPASS = ['N','NE','E','SE','S','SW','W','NW'];
function updateDebug(dt) {
  if (!SET.debug) {                                              // top-left readout off: clear any stale text once, then skip refreshes
    if (debugEl.textContent !== '') debugEl.textContent = '';
    return;
  }
  const inst = dt > 0 ? 1 / dt : 60;
  fpsSmooth += (Math.min(inst, 240) - fpsSmooth) * 0.1;      // light smoothing
  frameMs += (dt * 1000 - frameMs) * 0.1;
  hudTimer += dt;
  if (hudTimer < 0.1) return;                                  // refresh ~10x/s
  hudTimer = 0;
  const p = player.pos;
  const bearing = ((Math.atan2(-Math.sin(player.yaw), Math.cos(player.yaw)) * 180 / Math.PI + 360) % 360);
  const dir = COMPASS[Math.round(bearing / 45) % 8];
  const pitchDeg = player.pitch * 180 / Math.PI;
  debugEl.textContent =
    `fps: ${fpsSmooth.toFixed(0)}
` +
    `frame: ${frameMs.toFixed(2)} ms
` +
    `pos: ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${p.z.toFixed(1)}
` +
    `dir: ${dir} ${bearing.toFixed(0)}Ã‚Â°  pitch ${pitchDeg >= 0 ? '+' : ''}${pitchDeg.toFixed(0)}Ã‚Â°`;
}

// ---- cacti hurt like vanilla: solid blocks with normal collision, but touching/overlapping them takes one heart every 0.6 s cooldown
let lastCactusT = -1e9;
function cactusTick() {
  if (_pilotDrone) return;                     // the body has no physical location while we ride a drone
  const p = player.pos;
  if (health <= 0) return;
  // touch test: body box inflated a hair (snap-back collision can rest at micro-gaps from the face, and overshoots cross it) so any real contact counts
  const EPS = 0.05;
  const bx0 = Math.floor(p.x - PHALF - EPS), bx1 = Math.floor(p.x + PHALF + EPS);
  const by0 = Math.floor(p.y - EYE - EPS),   by1 = Math.floor(p.y - EYE + PHEIGHT + EPS);
  const bz0 = Math.floor(p.z - PHALF - EPS), bz1 = Math.floor(p.z + PHALF + EPS);
  let touching = false;
  outer: for (let y = by0; !touching && y <= by1; y++)
    for (let z = bz0; !touching && z <= bz1; z++)
      for (let x = bx0; !touching && x <= bx1; x++)
        if (blockAt(x, y, z) === CACTUS) touching = true;
  if (!touching) return;
  const now = performance.now();
  if (now - lastCactusT > 600) {         // 0.6 s thorn cooldown: standing in/against a cactus ticks one heart every half second
    lastCactusT = now;
    takeDamage(2);                       // one heart, like vanilla cacti
    SFX.cactusHurt();
  }   // no shove/hop: cacti are solid like any other block - normal collision keeps you out; the damage is purely from real overlap
}

// ============================================================ main loop
const clock = new THREE.Clock(); let _wasSubmerged = null;   // tracks whether the eye is in water (toggles blue fog / sky visibility)
function animate() {
  const dt = Math.min(clock.getDelta(), 0.05);
  syncMenuToLock();   // reconcile menu/pointer-lock UI every frame - the single source of truth (covers Edge's flaky pointerlockchange)
  syncPilotOsd();   // FPV overlay + prop buzz follow _pilotDrone (covers enter / exit / detonation / Esc in one place)

  stepPhysics(dt);
  stepParkedSkates(dt);   // parked boards fall if you mine out their floor
  stepParkedDrones(dt);   // grounded drones settle / drop down if their floor is mined out
    updateComps(dt);      // computers follow the floor beneath them (fall if you mine it out)

  cactusTick();
  heldActions();
      if (_comp) updateTerrainria(dt);   // on-screen mini-game: ticks only while seated with its window open
  if (targetedMob()) mining = null;   // don't crack the block you're swinging at over a mob
  updateMobs(dt);
  updateMining(dt);
  updateArm(dt);
  updateDrops(dt);
  updateBreakParticles(dt);
    updateMlrsFx(dt);   // rockets, exhaust puffs and blast flashes keep flying even after we bail out mid-volley
  updateHurtFlash(dt); updateOxygen(dt); updateEat(dt); updateHunger(dt);
  updateDebug(dt);

  for (const cl of cloudGroup.children) {         // drift the clouds and wrap them around
    cl.position.x += dt * 1.6;
    if (cl.position.x > W + 30) cl.position.x -= W + 60;   // wrap to the far side of the map, keeping coverage even
  }
  skyDome.position.copy(camera.position);        // keep the dome centered on the camera

  sandTick();                // falling-sand physics, part 1: unsupported grid sand becomes animated grains
  updateFallingSand(dt);     // part 2: grains drop with gravity and bake back into the world when they land
  ensureNearChunks(camera.position.x, camera.position.z);   // stream in regions as we walk toward them (big map)
  cullRegions();      // don't draw what the fog hides anyway
    // underwater look: blue fog filter + hide the sky when the eye is in water (the DoubleSide surface still shows above)
    const _sub = blockAt(Math.floor(camera.position.x), Math.floor(camera.position.y), Math.floor(camera.position.z)) === WATER;
    if (_sub !== _wasSubmerged) {
      _wasSubmerged = _sub;
      scene.fog.color.set(_sub ? 0x1a5ca8 : 0xcfe9fb);   // deep blue tint underwater
      scene.fog.near = _sub ? 2 : SET.drawFar * 0.4;                    // everything fades to blue quickly under water
      scene.fog.far   = _sub ? 60 : SET.drawFar;
      skyDome.visible = !_sub;                           // no pale sky while submerged
      sun.visible     = !_sub;
      cloudGroup.visible = !_sub; renderer.setClearColor(_sub ? 0x1a5ca8 : 0xcfe9fb);   // matches fog while sky dome is hidden
    }

  applyDynamicFov(dt);   // skateboard-wide FOV + smoothed sprint boost (runs before the projection is baked into this frame)
  renderer.render(scene, camera);
  updateCompOverlay();   // seated at a computer: re-project the desktop OS onto the real monitor face for this just-rendered frame
}
renderer.setAnimationLoop(animate);

inventory[1] = { id: SKATE, count: 1 };   // you spawn with a skateboard in hotbar slot 2
inventory[0] = { id: DRONE, count: 5 };   // the FPV suicide drone starts in hotbar slot 1 as a stack of 5 (the skate keeps slot 2)
  inventory[2] = { id: COMP, count: 1 };   // the computer machine starts in hotbar slot 3 (the skate keeps slot 2)
selectSlot(0);
applyParticles(); SFX.setVolume(SET.vol);   // apply saved settings to the live scene
showScreen('start'); refreshSettingsUI();
syncCamera();

// ============================================================ debug / test API (used by automated checks)
window.__game = {
  player, camera, blocks, W, D, H,
  skates, get activeSkate() { return activeRide; }, mountSkate, dismountSkate, hitSkate, placeSkateAt,
    mlrs, mlrsTruck, mountMlrs, exitMlrs, fireVolley, mlrsReleaseFire, rockets, explodeAt,
    drones, get activeDrone() { return _pilotDrone; }, placeDroneAt, enterDrone, exitDrone, pickupDrone, detonateDrone, droneSurfaceY, updateDrones: (dt) => { stepParkedDrones(dt); if (_pilotDrone) updateDronePiloted(dt); },
    chests, comps, get activeComp() { return _comp; }, placeCompAt, mountComp, unmountComp, clickCompScreen, setCompUi, pelicanBench, terrainria, trState: TRS, trKeys, get trOpen() { return trOpen; }, compPointerFree, compPointerBack, aimedComp, updateComps, selectSlot,

  inventory, drops, openInventory, closeInventory, getInvOpen() { return invOpen; }, panelSlotOrder() { const out = []; for (let r = 1; r <= BAG_ROWS; r++) for (let c = 0; c < INV_SIZE; c++) out.push(r * INV_SIZE + c); for (let c = 0; c < INV_SIZE; c++) out.push(c); return out; }, startDrag, finishDrag, putIn, dropToGround, openChest(ch) { openInventory(ch || null); }, getActiveChest() { return activeChest; }, ITEM_INFO, particles, spawnBreakParticles, updateBreakParticles,
  mobs: MOBS, attackMob, targetedMob, killMob, spawnMobs, updateMobs, MOB_TYPES,
  get health() { return health; },
  set health(v) { health = Math.max(0, Math.min(MAX_HEALTH, v)); renderHearts(); },
  blockAt: (x, y, z) => blockAt(x, y, z),
  topSolidY,
  setSelectedId(id, n) { return addItem(id, n); },   // test helper: give items directly
  takeDamage, spawnDrop, updateDrops, get oxygen() { return oxygen; }, set oxygen(v) { oxygen = Math.max(0, Math.min(OXYGEN_MAX, v)); renderOxygen(); },
  setView(x, y, z, yaw, pitch) {
    player.pos.set(x, y, z);
    if (yaw !== undefined) player.yaw = yaw;
    if (pitch !== undefined) player.pitch = pitch;
    syncCamera();
  },
  breakBlock: (x, y, z) => doBreak({ x, y, z, nx: 0, ny: 1, nz: 0 }),
    sandTick, updateFallingSand, fallingSand, get sandDirtyCount() { return sandDirty.size; }, get fallingSandCount() { return fallingSand.length; },   // falling-sand test hooks
  // test hooks (headless harness): collision checks + lock state, same spirit as the helpers above
  collides: p => collides(p), escapeGeometry, setLocked(v) { locked = v; }, skateContacts, skateSurfaceY, settings: SET, saveSettings, applyFogBase, get dynFov() { return dynFov; }, get sprinting() { return !!player.sprinting; },
  placeBlock(x, y, z) { const st = inventory[selIndex]; const id = st ? st.id : GRASS; setBlockRaw(x, y, z, id); rebuildAround(x, z); return blockAt(x, y, z) === id; },
  setSelected(i) { selectSlot(i); },
};


