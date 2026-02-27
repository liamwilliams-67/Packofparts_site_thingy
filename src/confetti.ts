// ─── Adjustable parameters ─────────────────────────────────────────────────
/** Base number of confetti particles per burst */
export const CONFETTI_BASE_PARTICLE_COUNT = 130;

/** Multiplier applied to the center detonation point */
export const CONFETTI_CENTER_DENSITY_MULTIPLIER = 2;

/** Base size of confetti (scalar for particle dimensions) */
export const CONFETTI_BASE_SIZE = 1.0;

/** Size multiplier for the center burst */
export const CONFETTI_CENTER_SIZE_MULTIPLIER = 1.3;

/** Delay in ms between successive detonation pairs */
export const CONFETTI_STAGGER_MS = 1200;

/** How long (in ticks / frames) each normal burst stays alive */
export const CONFETTI_BASE_TICKS = 200;

/** How long (in ticks / frames) the center burst stays alive */
export const CONFETTI_CENTER_TICKS = 300;

/** Duration in ms over which each detonator sprays its particles */
export const CONFETTI_SPRAY_DURATION_MS = 900;

/** Number of sub-bursts each detonator fires over the spray duration */
export const CONFETTI_SUB_BURSTS = 10;

/** Multiplier for how long particles stay alive */
export const CONFETTI_FLOAT_MULTIPLIER = 1.25;

/** Kept for API compatibility – not used by the custom renderer */
export const CONFETTI_DRIFT = 2;

// Team colors: navy + light-blue + secondary-blue + white accent
const TEAM_COLORS = ['#182651', '#80D3EE', '#7FC3F2', '#ffffff'];

const TWO_PI = Math.PI * 2;
/** How far below the bottom of the canvas (px) a particle can travel before being culled */
const OFFSCREEN_THRESHOLD = 80;

// ─── Custom sinusoidal-fall renderer ───────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  fallStartX: number;
  fallStartY: number;
  vx: number;
  vy: number;
  isFalling: boolean;
  sineAmplitude: number;
  sineFrequency: number;
  sinePhase: number;
  color: string;
  // --- Ensure these three are here ---
  baseColor: { r: number; g: number; b: number }; 
  flip: number;
  flipSpeed: number;
  // ------------------------------------
  w: number;
  h: number;
  rotation: number;
  rotSpeed: number;
  gravity: number;
  decay: number;
  alpha: number;
  age: number;
  maxAge: number;
}

let _canvas: HTMLCanvasElement | null = null;
let _ctx: CanvasRenderingContext2D | null = null;
let _particles: Particle[] = [];
let _rafId: number | null = null;

function ensureCanvas(): void {
  if (_canvas) return;
  _canvas = document.createElement('canvas');
  _canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999';
  _canvas.width = window.innerWidth;
  _canvas.height = window.innerHeight;
  document.body.appendChild(_canvas);
  _ctx = _canvas.getContext('2d');
}

function teardownCanvas(): void {
  if (_rafId !== null) {
    cancelAnimationFrame(_rafId);
    _rafId = null;
  }
  _canvas?.remove();
  _canvas = null;
  _ctx = null;
  _particles = [];
}

function tick(): void {
  if (!_ctx || !_canvas) return;
  _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

  const surviving: Particle[] = [];

  for (const p of _particles) {
    p.age++;
    if (p.age > p.maxAge || p.y > _canvas.height + OFFSCREEN_THRESHOLD) continue;

    p.alpha = p.age / p.maxAge > 0.8 ? 1 - (p.age / p.maxAge - 0.8) / 0.2 : 1.0;

    // 10% Faster Gravity
    p.vy = p.vy * p.decay + p.gravity; 

    if (!p.isFalling) {
      p.vx *= 0.99;
      p.x += p.vx + (CONFETTI_DRIFT * 0.1);
      p.y += p.vy;
      if (p.vy >= 0) {
        p.isFalling = true;
        p.fallStartX = p.x;
        p.fallStartY = p.y;
      }
    } else {
      p.y += p.vy;
      const d = p.y - p.fallStartY;
      
      // NATURAL SWAY: Combined large sway + micro-flutter
      const sway = p.sineAmplitude * Math.sin(p.sineFrequency * d + p.sinePhase);
      const flutter = (p.sineAmplitude * 0.2) * Math.sin(p.sineFrequency * 5 * d);
      
      p.fallStartX += (CONFETTI_DRIFT * 0.15);
      p.x = p.fallStartX + sway + flutter;
    }

    p.rotation += p.rotSpeed;
    p.flip += p.flipSpeed;
    surviving.push(p);

    _ctx.save();
    _ctx.globalAlpha = p.alpha;
    
    // SHIMMER EFFECT: Change brightness based on flip angle
    const shimmer = Math.cos(p.flip);
    const brightness = 0.9 + (shimmer * 0.1); 
    _ctx.fillStyle = `rgb(${p.baseColor.r * brightness}, ${p.baseColor.g * brightness}, ${p.baseColor.b * brightness})`;

    _ctx.translate(p.x, p.y);
    _ctx.rotate(p.rotation);
    _ctx.scale(shimmer, 1); 
    
    _ctx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
    _ctx.restore();
  }

  _particles = surviving;
  if (_particles.length === 0) {
    teardownCanvas();
    return;
  }
  _rafId = requestAnimationFrame(tick);
}

// Add this helper function above spawnBurst to handle the colors
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

function spawnBurst(originX: number, count: number, isCenter: boolean): void {
  if (!_canvas) return;
  const baseStartX = originX * _canvas.width;
  const baseStartY = _canvas.height;

  const spreadRad = (isCenter ? 25 : 20) * (Math.PI / 180); 
  const baseSpeed = isCenter
    ? Math.sqrt(0.28 * _canvas.height)   
    : Math.sqrt(0.24 * _canvas.height);  

  for (let i = 0; i < count; i++) {
    const angle = (Math.random() - 0.5) * spreadRad;
    
    // Define speed as a local variable first
    const speed = baseSpeed * (0.4 + Math.random() * 1.0); 
    const vx = Math.sin(angle) * speed;
    const vy = -Math.cos(angle) * speed;
    const colorHex = TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)];

    _particles.push({
      x: baseStartX + (Math.random() - 0.5) * 15,
      y: baseStartY + (Math.random() * 40), 
      fallStartX: baseStartX,
      fallStartY: baseStartY,
      vx,
      vy,
      isFalling: false,
      sineAmplitude: 10 + Math.random() * 12,           
      sineFrequency: 0.003 + Math.random() * 0.004,  
      sinePhase: Math.random() > 0.5 ? 0 : Math.PI,     
      color: colorHex,
      // Fixes the "missing property" errors
      baseColor: hexToRgb(colorHex),
      flip: Math.random() * TWO_PI,
      flipSpeed: (Math.random() - 0.5) * 0.25,
      w: (5 + Math.random() * 5) * (isCenter ? 1.3 : 1),
      h: (3 + Math.random() * 4) * (isCenter ? 1.3 : 1),
      rotation: Math.random() * TWO_PI,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      decay: 0.97 + Math.random() * 0.02, 
      gravity: 0.06 + Math.random() * 0.08, 
      alpha: 1,
      age: 0,
      maxAge: Math.round((isCenter ? 300 : 200) * 1.5),
    });
  }
}
/**
 * "Fountain Spray" confetti animation.
 *
 * 7 evenly-spaced detonation points along the bottom of the viewport.
 * Points fire in pairs from the outside in (left-most & right-most first),
 * each pair separated by CONFETTI_STAGGER_MS.  The center (4th) point has
 * 2× density, slightly larger pieces, and a longer lifetime.
 *
 * Each particle rises with fountain physics then falls in a sinusoidal
 * x = sin(y) path for a natural swaying descent.
 */
export function fireFountainSpray(): void {
  // 7 evenly spaced x-positions — index 0 = far-left, 6 = far-right, 3 = center
  const points = Array.from({ length: 7 }, (_, i) => ({
    x: (i + 1) / 8,
    isCenter: i === 3,
  }));

  // Pair order: (0,6) → (1,5) → (2,4) → (3)  — outside-in
  const pairs: number[][] = [[0, 6], [1, 5], [2, 4], [3]];

  pairs.forEach((pair, pairIdx) => {
    setTimeout(() => {
      pair.forEach((ptIdx) => {
        const pt = points[ptIdx];
        const isCenter = pt.isCenter;

        const totalParticles = isCenter
          ? CONFETTI_BASE_PARTICLE_COUNT * CONFETTI_CENTER_DENSITY_MULTIPLIER
          : CONFETTI_BASE_PARTICLE_COUNT;

        const particlesPerBurst = Math.ceil(totalParticles / CONFETTI_SUB_BURSTS);
        const interval = CONFETTI_SPRAY_DURATION_MS / CONFETTI_SUB_BURSTS;

        for (let b = 0; b < CONFETTI_SUB_BURSTS; b++) {
          setTimeout(() => {
            ensureCanvas();
            spawnBurst(pt.x, particlesPerBurst, isCenter);
            if (_rafId === null) {
              _rafId = requestAnimationFrame(tick);
            }
          }, b * interval);
        }
      });
    }, pairIdx * CONFETTI_STAGGER_MS);
  });
}
