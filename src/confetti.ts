// ─── Adjustable parameters ─────────────────────────────────────────────────
/** Base number of confetti particles per burst */
export const CONFETTI_BASE_PARTICLE_COUNT = 96;

/** Multiplier applied to the center detonation point */
export const CONFETTI_CENTER_DENSITY_MULTIPLIER = 2;

/** Base size of confetti (scalar for particle dimensions) */
export const CONFETTI_BASE_SIZE = 1.0;

/** Size multiplier for the center burst */
export const CONFETTI_CENTER_SIZE_MULTIPLIER = 1.3;

/** Delay in ms between successive detonation pairs */
export const CONFETTI_STAGGER_MS = 750;

/** How long (in ticks / frames) each normal burst stays alive */
export const CONFETTI_BASE_TICKS = 200;

/** How long (in ticks / frames) the center burst stays alive */
export const CONFETTI_CENTER_TICKS = 300;

/** Duration in ms over which each detonator sprays its particles */
export const CONFETTI_SPRAY_DURATION_MS = 250;

/** Number of sub-bursts each detonator fires over the spray duration */
export const CONFETTI_SUB_BURSTS = 5;

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
  /** x recorded when the particle begins falling */
  fallStartX: number;
  /** y recorded when the particle begins falling */
  fallStartY: number;
  vx: number;
  vy: number;
  isFalling: boolean;
  /** Horizontal amplitude of the sinusoidal fall path (px) */
  sineAmplitude: number;
  /** Angular frequency of the sinusoidal fall path (rad / px) */
  sineFrequency: number;
  /** Initial phase of the sinusoidal fall path (rad) */
  sinePhase: number;
  color: string;
  w: number;
  h: number;
  rotation: number;
  rotSpeed: number;
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

    // Fade out over the last 20% of lifetime
    p.alpha = p.age / p.maxAge > 0.8 ? 1 - (p.age / p.maxAge - 0.8) / 0.2 : 1.0;

    // Vertical physics: gravity acceleration with air-resistance decay
    p.vy = p.vy * p.decay + 0.12;

    if (!p.isFalling) {
      // Rising phase: carry horizontal spread, integrate velocity
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      if (p.vy >= 0) {
        // Particle has peaked — lock in the fall origin, switch to sine path
        p.isFalling = true;
        p.fallStartX = p.x;
        p.fallStartY = p.y;
      }
    } else {
      // Falling phase: x = fallStartX + A · sin(ω · distanceFallen + φ)
      p.y += p.vy;
      const d = p.y - p.fallStartY;
      p.x = p.fallStartX + p.sineAmplitude * Math.sin(p.sineFrequency * d + p.sinePhase);
    }

    p.rotation += p.rotSpeed;
    surviving.push(p);

    // Draw confetti piece as a small rotated rectangle
    _ctx.save();
    _ctx.globalAlpha = p.alpha;
    _ctx.translate(p.x, p.y);
    _ctx.rotate(p.rotation);
    _ctx.fillStyle = p.color;
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

function spawnBurst(
  originX: number,  // 0–1 fraction of canvas width
  count: number,
  isCenter: boolean,
): void {
  if (!_canvas) return;
  const startX = originX * _canvas.width;
  const startY = _canvas.height;  // launch from bottom edge

  const spreadRad = (isCenter ? 18 : 12) * (Math.PI / 180);
  const baseSpeed = isCenter ? 40 : 32;
  const maxAge = Math.round(
    (isCenter ? CONFETTI_CENTER_TICKS : CONFETTI_BASE_TICKS) * CONFETTI_FLOAT_MULTIPLIER,
  );
  const scalar = isCenter
    ? CONFETTI_BASE_SIZE * CONFETTI_CENTER_SIZE_MULTIPLIER
    : CONFETTI_BASE_SIZE;

  for (let i = 0; i < count; i++) {
    const angle = (Math.random() - 0.5) * spreadRad;
    const speed = baseSpeed * (0.6 + Math.random() * 0.6);
    const vx = Math.sin(angle) * speed;
    const vy = -Math.cos(angle) * speed;  // negative = upward

    _particles.push({
      x: startX,
      y: startY,
      fallStartX: startX,
      fallStartY: startY,
      vx,
      vy,
      isFalling: false,
      sineAmplitude: 10 + Math.random() * 17,        // 10–27 px horizontal swing (3× smaller)
      sineFrequency: 0.018 + Math.random() * 0.012,  // ~2–3 full waves while falling
      sinePhase: Math.random() * TWO_PI,         // random starting phase
      color: TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)],
      w: (5 + Math.random() * 5) * scalar,
      h: (3 + Math.random() * 3) * scalar,
      rotation: Math.random() * TWO_PI,
      rotSpeed: (Math.random() - 0.5) * 0.18,
      decay: 0.988 + Math.random() * 0.008,
      alpha: 1,
      age: 0,
      maxAge,
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
