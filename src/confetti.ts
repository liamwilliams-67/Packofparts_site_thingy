import confetti from 'canvas-confetti';

// ─── Adjustable parameters ─────────────────────────────────────────────────
/** Base number of confetti particles per burst */
export const CONFETTI_BASE_PARTICLE_COUNT = 96;

/** Multiplier applied to the center detonation point */
export const CONFETTI_CENTER_DENSITY_MULTIPLIER = 2;

/** Base size of confetti (scalar passed to canvas-confetti) */
export const CONFETTI_BASE_SIZE = 1.0;

/** Size multiplier for the center burst */
export const CONFETTI_CENTER_SIZE_MULTIPLIER = 1.3;

/** Delay in ms between successive detonation pairs */
export const CONFETTI_STAGGER_MS = 750;

/** How long (in ticks) each normal burst stays alive */
export const CONFETTI_BASE_TICKS = 200;

/** How long (in ticks) the center burst stays alive */
export const CONFETTI_CENTER_TICKS = 300;

/** Duration in ms over which each detonator sprays its particles (avoids instant burst) */
export const CONFETTI_SPRAY_DURATION_MS = 250;

/** Number of sub-bursts each detonator fires over the spray duration */
export const CONFETTI_SUB_BURSTS = 5;

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

        const totalParticles = isCenter
          ? CONFETTI_BASE_PARTICLE_COUNT * CONFETTI_CENTER_DENSITY_MULTIPLIER
          : CONFETTI_BASE_PARTICLE_COUNT;

        // Spray particles over CONFETTI_SPRAY_DURATION_MS in sub-bursts
        const particlesPerBurst = Math.ceil(totalParticles / CONFETTI_SUB_BURSTS);
        const interval = CONFETTI_SPRAY_DURATION_MS / CONFETTI_SUB_BURSTS;

        for (let b = 0; b < CONFETTI_SUB_BURSTS; b++) {
          setTimeout(() => {
            confetti({
              particleCount: particlesPerBurst,
              angle: 90,                             // straight up from all points
              spread: isCenter ? 18 : 12,            // center has 15% more spread
              startVelocity: isCenter ? 69 : 56,     // 25% taller fire
              scalar: isCenter
                ? CONFETTI_BASE_SIZE * CONFETTI_CENTER_SIZE_MULTIPLIER
                : CONFETTI_BASE_SIZE,
              ticks: isCenter ? CONFETTI_CENTER_TICKS : CONFETTI_BASE_TICKS,
              gravity: 0.8,
              origin: { x: pt.x, y: 1.2 },          // further below viewport to hide gap
              colors: TEAM_COLORS,
            });
          }, b * interval);
        }
      });
    }, pairIdx * CONFETTI_STAGGER_MS);
  });
}
