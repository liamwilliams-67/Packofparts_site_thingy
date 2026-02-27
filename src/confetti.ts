// ─── Adjustable parameters ─────────────────────────────────────────────────
/** Base number of confetti particles per burst */
export const CONFETTI_BASE_PARTICLE_COUNT = 100;

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
export const CONFETTI_SPRAY_DURATION_MS = 1200;

/** Number of sub-bursts each detonator fires over the spray duration */
export const CONFETTI_SUB_BURSTS = 8;

/** Multiplier for how long particles stay alive */
export const CONFETTI_FLOAT_MULTIPLIER = 1.25;

/** Kept for API compatibility – not used by the custom renderer */
export const CONFETTI_DRIFT = 2;

const TEAM_COLORS = ['#182651', '#80D3EE', '#7FC3F2', '#ffffff'];

// Weighted color selection — reduce how often pure white fires (it reads as noise)
const COLOR_WEIGHTS = [3, 3, 3, 1]; // navy, light-blue, secondary-blue, white
const COLOR_POOL: string[] = TEAM_COLORS.flatMap((c, i) => Array(COLOR_WEIGHTS[i]).fill(c));

const TWO_PI = Math.PI * 2;
const OFFSCREEN_THRESHOLD = 80;

// ─── Dual-canvas layering ──────────────────────────────────────────────────
// FIX 2: Two canvases — bg sits below the modal so confetti feels 3D/layered.
// Adjust BG_Z_INDEX to match whatever z-index your modal sits at minus 1.
const FG_Z_INDEX = 9999;
const BG_Z_INDEX = 100; // ← set this just below your modal's z-index

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
  baseColor: { r: number; g: number; b: number };
  flip: number;
  flipSpeed: number;
  w: number;
  h: number;
  rotation: number;
  rotSpeed: number;
  gravity: number;
  decay: number;
  alpha: number;
  /** FIX 4: Base opacity — some particles start semi-transparent for depth */
  baseAlpha: number;
  age: number;
  maxAge: number;
  /** FIX 2: Which canvas this particle renders on */
  layer: 'fg' | 'bg';
}

let _fgCanvas: HTMLCanvasElement | null = null;
let _bgCanvas: HTMLCanvasElement | null = null;
let _fgCtx: CanvasRenderingContext2D | null = null;
let _bgCtx: CanvasRenderingContext2D | null = null;
let _particles: Particle[] = [];
let _rafId: number | null = null;

function makeCanvas(zIndex: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:${zIndex}`;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  return [canvas, canvas.getContext('2d')!];
}

function ensureCanvases(): void {
  if (_fgCanvas) return;
  [_fgCanvas, _fgCtx] = makeCanvas(FG_Z_INDEX);
  [_bgCanvas, _bgCtx] = makeCanvas(BG_Z_INDEX);
}

function teardownCanvases(): void {
  if (_rafId !== null) { cancelAnimationFrame(_rafId); _rafId = null; }
  _fgCanvas?.remove(); _fgCanvas = null; _fgCtx = null;
  _bgCanvas?.remove(); _bgCanvas = null; _bgCtx = null;
  _particles = [];
}

function tick(): void {
  if (!_fgCtx || !_fgCanvas || !_bgCtx || !_bgCanvas) return;

  _fgCtx.clearRect(0, 0, _fgCanvas.width, _fgCanvas.height);
  _bgCtx.clearRect(0, 0, _bgCanvas.width, _bgCanvas.height);

  const surviving: Particle[] = [];

  for (const p of _particles) {
    p.age++;
    if (p.age > p.maxAge || p.y > _fgCanvas.height + OFFSCREEN_THRESHOLD) continue;

    // Fade only in the last 30% of life — fully opaque until then
    const lifeRatio = p.age / p.maxAge;
    const fadeFactor = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1.0;
    p.alpha = fadeFactor;

    // ── Paper aerodynamics ──────────────────────────────────────────────
    // cosFlip tells us the face orientation of the paper.
    // flatness ≈ 1 → face-on (high air resistance, slow fall, wide sway).
    // flatness ≈ 0 → edge-on (low resistance, brief free-fall acceleration).
    const cosFlip = Math.cos(p.flip);
    const flatness = Math.abs(cosFlip);

    // Gravity is resisted more when the paper is face-on catching air
    const effectiveGravity = p.gravity * (0.4 + 0.6 * (1 - flatness * 0.7));

    // Drag is much higher when flat
    const effectiveDrag = p.decay - flatness * 0.018;

    p.vy += effectiveGravity;
    p.vy *= effectiveDrag;

    // Lateral rocking: side-to-side sway is strongest when face-on
    const sway = Math.sin(p.age * 0.045 + p.sinePhase) * 0.07 * flatness;
    const jitter = (Math.random() - 0.5) * 0.03;
    p.vx += sway + jitter;
    p.vx *= effectiveDrag;

    // Removed stallKick — was amplifying vx every frame causing particles to rocket sideways

    p.x += p.vx;
    p.y += p.vy;

    // Rotation slows when face-on (drag), speeds up when edge-on (free spin)
    p.rotSpeed *= 0.995;
    p.rotation += p.rotSpeed * (0.6 + flatness * 0.8);

    // Tumble accelerates with downward momentum (paper gains spin as it falls)
    const tumbleBoost = Math.min(Math.abs(p.vy) * 0.04, 0.15);
    p.flip += p.flipSpeed + tumbleBoost;

    surviving.push(p);

    // Pick the right canvas for this particle
    const ctx = p.layer === 'fg' ? _fgCtx : _bgCtx;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha); // fully opaque until fade zone, never negative

    const shimmer = Math.cos(p.flip);
    // brightness clamped to [0.75, 1.0] — no partial transparency from shimmer
    const brightness = Math.max(0.75, 0.85 + shimmer * 0.15);
    ctx.fillStyle = `rgb(${Math.round(p.baseColor.r * brightness)}, ${Math.round(p.baseColor.g * brightness)}, ${Math.round(p.baseColor.b * brightness)})`;

    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.scale(shimmer, 1);
    ctx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
    ctx.restore();
  }

  _particles = surviving;
  if (_particles.length === 0) { teardownCanvases(); return; }
  _rafId = requestAnimationFrame(tick);
}

const hexToRgb = (hex: string) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});

function spawnBurst(originX: number, count: number, isCenter: boolean): void {
  if (!_fgCanvas) return;
  const baseStartX = originX * _fgCanvas.width;
  const baseStartY = _fgCanvas.height;

  const spreadRad = (isCenter ? 30 : 24) * (Math.PI / 180);
  const baseSpeed = isCenter
    ? Math.sqrt(0.45 * _fgCanvas.height)
    : Math.sqrt(0.38 * _fgCanvas.height);

  for (let i = 0; i < count; i++) {
    const angle = (Math.random() - 0.5) * spreadRad;
    const speed = baseSpeed * (0.5 + Math.random() * 1.2);
    const vx = Math.sin(angle) * speed;
    const vy = -Math.cos(angle) * speed;
    const colorHex = COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];

    // Sizes increased 25% — random range so pieces vary naturally
    const w = (6.25 + Math.random() * 6.25) * (isCenter ? 1.3 : 1);
    const h = (3.75 + Math.random() * 5.0) * (isCenter ? 1.3 : 1);

    // FIX 2: ~40% of particles go to the background canvas
    const layer: 'fg' | 'bg' = Math.random() < 0.4 ? 'bg' : 'fg';

    // No transparency — paper is always fully opaque
    const baseAlpha = 1.0;

    _particles.push({
      x: baseStartX + (Math.random() - 0.5) * 15,
      y: baseStartY + (Math.random() * 20), // FIX 1: tighter spawn band (was 40)
      fallStartX: baseStartX,
      fallStartY: baseStartY,
      vx,
      vy,
      isFalling: false,
      sineAmplitude: 12 + Math.random() * 14,
      sineFrequency: 0.003 + Math.random() * 0.004,
      sinePhase: Math.random() * TWO_PI, // FIX (prior): full circle, no binary split
      color: colorHex,
      baseColor: hexToRgb(colorHex),
      flip: Math.random() * TWO_PI,
      flipSpeed: (Math.random() - 0.5) * 0.28,
      w,
      h,
      rotation: Math.random() * TWO_PI,
      rotSpeed: (Math.random() - 0.5) * 0.18,
      decay: 0.97 + Math.random() * 0.017,
      gravity: 0.08 + Math.random() * 0.09,
      alpha: baseAlpha,
      baseAlpha,
      age: 0,
      maxAge: Math.round((isCenter ? 300 : 200) * 3),
      layer,
    });
  }
}

/**
 * "Fountain Spray" confetti animation.
 * 7 evenly-spaced detonation points along the bottom of the viewport,
 * firing outside-in in pairs. Particles are split across two z-index layers
 * so some fall behind your modal for a sense of depth.
 */
export function fireFountainSpray(): void {
  const points = Array.from({ length: 7 }, (_, i) => ({
    x: (i + 1) / 8,
    isCenter: i === 3,
  }));

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
            ensureCanvases();
            spawnBurst(pt.x, particlesPerBurst, isCenter);
            if (_rafId === null) _rafId = requestAnimationFrame(tick);
          }, b * interval);
        }
      });
    }, pairIdx * CONFETTI_STAGGER_MS);
  });
}