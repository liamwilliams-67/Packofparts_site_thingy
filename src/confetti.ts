import confetti from 'canvas-confetti';

// ─── Adjustable parameters ─────────────────────────────────────────────────
/** Base number of confetti particles per burst */
export const CONFETTI_BASE_PARTICLE_COUNT = 60;

/** Multiplier applied to the center detonation point */
export const CONFETTI_CENTER_DENSITY_MULTIPLIER = 2;

/** Base size of confetti (scalar passed to canvas-confetti) */
export const CONFETTI_BASE_SIZE = 1.0;

/** Size multiplier for the center burst */
export const CONFETTI_CENTER_SIZE_MULTIPLIER = 1.3;

/** Delay in ms between successive detonation pairs */
export const CONFETTI_STAGGER_MS = 500;

/** How long (in ticks) each normal burst stays alive */
export const CONFETTI_BASE_TICKS = 200;

/** How long (in ticks) the center burst stays alive */
export const CONFETTI_CENTER_TICKS = 300;

// Team colors: navy + light-blue + secondary-blue + white accent
const TEAM_COLORS = ['#182651', '#80D3EE', '#7FC3F2', '#ffffff'];

/**
 * "Fountain Spray" confetti animation.
 *
 * 7 evenly-spaced detonation points along the bottom of the viewport.
 * Points fire in pairs from the outside in (left-most & right-most first),
 * each pair separated by CONFETTI_STAGGER_MS.  The center (4th) point has
 * 2× density, slightly larger pieces, and a longer lifetime.
 */
export function fireFountainSpray(): void {
  // 7 evenly spaced x-positions (0-based index)
  // index 0 = far-left, index 6 = far-right, index 3 = center
  const points = Array.from({ length: 7 }, (_, i) => ({
    x: (i + 1) / 8,          // spread across viewport
    isCenter: i === 3,
  }));

  // Pair order: (0,6) → (1,5) → (2,4) → (3)  — outside-in
  const pairs: number[][] = [
    [0, 6],
    [1, 5],
    [2, 4],
    [3],
  ];

  pairs.forEach((pair, pairIdx) => {
    setTimeout(() => {
      pair.forEach((ptIdx) => {
        const pt = points[ptIdx];
        const isCenter = pt.isCenter;

        confetti({
          particleCount: isCenter
            ? CONFETTI_BASE_PARTICLE_COUNT * CONFETTI_CENTER_DENSITY_MULTIPLIER
            : CONFETTI_BASE_PARTICLE_COUNT,
          angle: 270 + (pt.x - 0.5) * -40,   // spray upward, angled outward
          spread: isCenter ? 70 : 55,
          startVelocity: isCenter ? 55 : 45,
          scalar: isCenter
            ? CONFETTI_BASE_SIZE * CONFETTI_CENTER_SIZE_MULTIPLIER
            : CONFETTI_BASE_SIZE,
          ticks: isCenter ? CONFETTI_CENTER_TICKS : CONFETTI_BASE_TICKS,
          gravity: 0.8,
          origin: { x: pt.x, y: 1.05 },       // just below viewport bottom
          colors: TEAM_COLORS,
          disableForReducedMotion: true,
        });
      });
    }, pairIdx * CONFETTI_STAGGER_MS);
  });
}
