# Performance Optimization Guide

This document identifies performance bottlenecks in the Pack of Parts website and describes the fixes applied, along with further recommendations.

---

## Issues Found & Fixes Applied

### 1. No Code Splitting (HIGH impact)

**Problem:** All 11 page components were eagerly imported in `main.tsx`, meaning visitors to the homepage would download the JavaScript for every page (Contact, Join, Donate, etc.) even though they only need the homepage code.

**Fix:** Converted all non-homepage route imports to `React.lazy()` with a `<Suspense>` boundary. This reduced the main bundle from ~130 KB to ~65 KB (50% reduction). Each page now loads its own chunk only when navigated to.

**File:** `src/main.tsx`

---

### 2. 99 MB Video File Loaded Eagerly (HIGH impact)

**Problem:** The hero section video (`/IMG_1496.mp4`, 99 MB) had no `preload` attribute, causing the browser to potentially download the entire file on page load. This is the single largest asset on the site.

**Fix:** Added `preload="metadata"` to both `<video>` tags in `scroll-expansion-hero.tsx`. The browser now only downloads video metadata (dimensions, duration, first frame) until playback actually starts.

**File:** `src/components/blocks/scroll-expansion-hero.tsx`

**Further recommendation:** Compress the video to a much smaller file size. A 99 MB video for a hero background is extremely large. Consider:
- Compressing with FFmpeg: `ffmpeg -i IMG_1496.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1920:-2 output.mp4`
- Target file size: under 5–10 MB for a background hero video
- Converting to WebM for better compression: `ffmpeg -i IMG_1496.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -vf scale=1920:-2 output.webm`
- Using a `<source>` element with both WebM and MP4 fallback for maximum browser compatibility

---

### 3. Images Missing `loading="lazy"` (MEDIUM impact — CLS)

**Problem:** None of the 30+ `<img>` tags across all pages had `loading="lazy"`. Every image was fetched eagerly on page load, even images far below the fold (sponsor logos, footer logos, team photos, etc.).

**Fix:** Added `loading="lazy"` to all below-the-fold images. Navigation logos remain eagerly loaded since they're above the fold.

**Files:** All page components (`App.tsx`, `contact.tsx`, `Join.tsx`, `Community.tsx`, `Members.tsx`, `Donate.tsx`, `SummerCamps.tsx`, `StemKits.tsx`, `MeetTheTeam.tsx`, `Recycling.tsx`, `NotFound.tsx`)

---

### 4. Images Missing `width`/`height` Attributes (MEDIUM impact — CLS)

**Problem:** No images had explicit `width` and `height` HTML attributes. Without these, the browser cannot reserve the correct amount of space before the image loads, causing Cumulative Layout Shift (CLS) when images pop in and push content around.

**Fix:** Added `width` and `height` attributes to all `<img>` tags. These values match the intrinsic or displayed dimensions so the browser can calculate the aspect ratio before loading.

**Files:** All page components

---

### 5. Render-Blocking Font Import (MEDIUM impact)

**Problem:** Google Fonts were loaded via a CSS `@import` in `index.css`, which is render-blocking. The browser must download and parse the CSS file before it can even discover the font URLs, adding a sequential network round-trip.

**Fix:**
- Removed the `@import url(...)` from `src/index.css`
- Added `<link rel="preconnect">` tags for `fonts.googleapis.com` and `fonts.gstatic.com` in all HTML entry points
- Added `<link rel="preload" as="style">` and `<link rel="stylesheet">` for the font CSS in all HTML entry points

This allows the browser to start connecting to Google's font servers in parallel with other resource loading.

**Files:** `index.html`, `contact.html`, `join.html`, `meet-the-team.html`, `stem-kits.html`, `recycling.html`, `members.html`, `summer-camps.html`, `not-found.html`, `src/index.css`

---

### 6. Scroll Event Handlers Re-Registered on Every State Change (MEDIUM impact)

**Problem:** The `scroll-expansion-hero.tsx` component registered 5 window event listeners (`wheel`, `scroll`, `touchstart`, `touchmove`, `touchend`) inside a `useEffect` that had `[scrollProgress, mediaFullyExpanded, touchStartY, hasAnimationCompleted]` in its dependency array. Every scroll event updated `scrollProgress`, which triggered a re-render, which removed and re-added all 5 event listeners. This happened many times per second during scrolling.

**Fix:** Refactored to use `useRef` to hold mutable state values that the event handlers read, combined with `useCallback` for stable handler references. The event listeners are now registered once and never re-registered. The refs are synced from state via `useEffect`.

**File:** `src/components/blocks/scroll-expansion-hero.tsx`

---

### 7. Hero Background Image Missing `fetchpriority` (LOW impact — LCP)

**Problem:** The hero background image (the Largest Contentful Paint element) loaded with default priority, meaning it competed with other resources for bandwidth.

**Fix:** Added `fetchpriority="high"` to the hero background `<img>` in `scroll-expansion-hero.tsx` to signal to the browser that this image should be prioritized.

**File:** `src/components/blocks/scroll-expansion-hero.tsx`

---

## Additional Recommendations (Not Yet Implemented)

### Oversized Image Files

Several images are much larger than needed for their display size:

| File | Size | Dimensions | Typical Display Size |
|------|------|-----------|---------------------|
| `team-photo-7.jpg` | 2.6 MB | 3024×4032 | ~600px wide |
| `team-photo-1.jpg` | 676 KB | 1920×1440 | ~300px wide |
| `team-photo-3.jpg` | 549 KB | 1920×2560 | ~300px wide |
| `logo.png` | 110 KB | 2400×2400 | 40–64px |

**Recommendation:**
- Resize images to 2× their maximum display size (e.g., 1200px wide for a 600px display)
- Convert JPEGs to WebP format for 25–35% smaller files with the same quality
- Convert `logo.png` to a much smaller size (128×128 would still be 2× the largest display) or to SVG
- Use `<picture>` elements with `srcset` to serve different sizes at different breakpoints

### Excessive Font Weights

The site loads 12 font variations (Open Sans: 6 weights, Orbitron: 6 weights). Most pages likely only use 2–3 weights of each.

**Recommendation:** Audit which weights are actually used and remove unused ones. For example:
- Open Sans: 400, 600, 700 likely covers most use cases
- Orbitron: 400, 600, 700 likely covers most use cases

### Sponsor Marquee Duplicates Images

The sponsor marquee in `App.tsx` uses `[...sponsors, ...sponsors]` to create an infinite scrolling effect, which renders 20 `<img>` tags (10 sponsors × 2). While `loading="lazy"` helps, this could be optimized with CSS-only infinite scroll techniques.

### Third-Party Dependencies

The site bundles large libraries. Consider whether all are needed:
- **Framer Motion** (~40 KB gzipped): Used only for a few fade-in animations in the hero. CSS animations or lighter alternatives could replace it.
- **Recharts**: Only needed on specific pages; already code-split via lazy loading.
- **Radix UI**: Many Radix components are imported but the component library footprint is significant.

### Consider Using a CDN for Static Assets

If not already using one, hosting images and videos on a CDN (like Cloudflare, AWS CloudFront, or Vercel's built-in CDN) would reduce server load and improve global load times through edge caching.
