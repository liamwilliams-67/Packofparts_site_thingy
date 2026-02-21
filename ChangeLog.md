# Pull Request (Current) – Sponsor Carousel Improvements

### Changes Made

#### 1. Smooth Infinite Sponsor Loop (No Jump)

Replaced the CSS `animate-marquee` approach with a JavaScript `requestAnimationFrame`-based animation in `App.tsx`. The CSS approach used `translateX(-50%)`, which computes percentage relative to the element's own rendered width. Because the flex strip is a block element (width = 100% of viewport), `-50%` translated by only half the viewport rather than half the strip content — causing sponsors to stop partway and then jump back. The new JS approach tracks scroll position in pixels and wraps seamlessly using modulo arithmetic.

#### 2. All Sponsor Logos Now Visible

With the JS carousel, the strip correctly cycles through all 10 sponsor logos before looping back.

#### 3. Left / Right Arrow Buttons

Two arrow buttons (`<` and `>`) have been added on each side of the sponsor strip. They do not overlap any sponsor logos — the strip is rendered inside a flex row between the two buttons.

**Arrow jump configuration:**
- The constant `SPONSOR_JUMP_FACTOR` (defined just above the `App` function in `src/App.tsx`) controls how many sponsor slots are skipped per click.
- Default value: `3` — both arrows use the same factor.
- To change the jump size, edit `const SPONSOR_JUMP_FACTOR = 3;` in `src/App.tsx`.

#### 4. Auto-Scroll Speed Configuration

- `SPONSOR_SCROLL_SPEED` (also above the `App` function) controls auto-scroll speed in pixels per animation frame (at ~60 fps).
- Default value: `0.5` px/frame ≈ 30 px/s.

#### 5. Pause on Hover

Hovering over the sponsor strip pauses the auto-scroll (same behaviour as before, now handled via `sponsorPausedRef`).

# Pull Request (Previous) – Contact Page Improvements

### Changes Made

#### 1. Contact Cards – 25% Wider
All four contact cards ("Email Us", "Location", "Home School", "Meeting Times") are now 25% wider horizontally. The container was changed from `max-w-2xl` (42 rem) to `max-w-[52.5rem]` (52.5 rem = 42 × 1.25).

#### 2. Location Card – Google Maps Embed
Added a Google Maps iframe embed to the Location card below the address details.

**To set the correct map URL:**
1. Go to [Google Maps](https://maps.google.com) and search for **Eastlake High School, 400 228th Ave NE, Sammamish, WA 98074**.
2. Click **Share → Embed a map → Copy HTML**.
3. In `src/contact.tsx`, find the `<iframe>` inside the Location card and replace the `src` value (`https://www.google.com/maps/embed?pb=PLACEHOLDER_EMBED_URL`) with the embed URL from Google Maps. It will look like:
   `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...`

#### 3. Meeting Times – Updated with Correct Schedule
The Meeting Times card now shows the full schedule copied from the Members page:
- **Build Season (January – February):** Mon, Wed, Fri, Sat — Mon–Fri 6:00–8:45 PM, Saturday 10:00 AM–5:00 PM
- **Off-Season (September – December):** Mon, Wed — 6:00–8:45 PM

#### 4. Home School Card – Removed "Representing 5 schools"
Removed the line "Representing 5 schools" from the Home School card.
# Fix npm install peer dependency conflict (2-20-2026)

### Problem

Running `npm install` failed with `ERESOLVE could not resolve` because `eslint-plugin-react-hooks@7.0.1` declares `eslint ^9.0.0` as a peer dependency, but the project uses `eslint@^10.0.1` (upgraded in the previous PR to fix security vulnerabilities).

### Fix

Added `.npmrc` with `legacy-peer-deps=true` so that `npm install` works without requiring `--legacy-peer-deps` flag. This is the standard workaround when upstream packages have not yet updated their peer dependency declarations. `eslint-plugin-react-hooks` works correctly with eslint 10 — only the declared peer range is outdated.

---

# Security Dependency Updates (2-20-2026)

### npm audit vulnerability fixes

Resolved **all 10 high-severity vulnerabilities** and reduced overall count from 11 to 0 actionable.

#### Changes

1. **Upgraded `eslint`** from `^9.39.1` to `^10.0.1` (major version bump)
   - eslint 10 uses `minimatch ^10.2.1` (patched) instead of the vulnerable `minimatch <10.2.1`
   - eslint 10 drops `@eslint/eslintrc` dependency which also pulled in vulnerable `ajv` and `minimatch`

2. **Upgraded `@eslint/js`** from `^9.39.1` to `^10.0.1` (to match eslint 10)

3. **Added `overrides` for `minimatch`** (`^10.2.1`) in `package.json`
   - Forces all transitive `minimatch` dependencies (including `@typescript-eslint/typescript-estree`) to use the patched version
   - Fixes [GHSA-3ppc-4f35-3m26](https://github.com/advisories/GHSA-3ppc-4f35-3m26) — ReDoS via repeated wildcards (high severity)

#### Remaining: `ajv` vulnerability (moderate, not fixable)

The `ajv <8.18.0` vulnerability ([GHSA-2g4f-4pwh-qvx6](https://github.com/advisories/GHSA-2g4f-4pwh-qvx6)) **cannot be resolved** at this time:
- eslint (all versions including v10) depends on `ajv ^6.12.4` for JSON Schema validation
- ajv v6 and v8 have incompatible APIs — forcing v8 would break eslint
- The vulnerability is **moderate severity** and only exploitable when using the `$data` option
- This is a **dev-only dependency** (eslint does not ship to production)
- Resolution requires the eslint team to migrate to ajv v8 upstream

#### Peer dependency note

`eslint-plugin-react-hooks@7.0.1` declares `eslint ^9.0.0` as a peer dependency and does not yet officially support eslint 10. However, the plugin works correctly with eslint 10 (verified via lint and build). The React team has not yet released a stable version with eslint 10 support.

---

# Pull Request (31) Merged (2-19-2026) 

### Changes Made

#### 1. Page Titles (All Pages)
Every page now sets `document.title` on mount to the format `[PageName] | Pack of Parts`:
- **App.tsx** → `Home | Pack of Parts`
- **contact.tsx** → `Contact | Pack of Parts`
- **Join.tsx** → `Join | Pack of Parts`
- **Community.tsx** → `Community | Pack of Parts`
- **MeetTheTeam.tsx** → `Meet the Team | Pack of Parts`
- **StemKits.tsx** → `STEM Kits | Pack of Parts`
- **Recycling.tsx** → `Recycling | Pack of Parts`
- **SummerCamps.tsx** → `Summer Camps | Pack of Parts`
- **Members.tsx** → `Members | Pack of Parts`
- **Donate.tsx** → `Donate | Pack of Parts`
- **NotFound.tsx** → `Not Found | Pack of Parts`

Each page uses a `useEffect(() => { document.title = '...'; }, [])` hook.

#### 2. ChiefDelphi Icon in All Footers
Added the ChiefDelphi social link (with `/chiefdelphi-logo.svg` icon) to the footer on all pages. Previously it was only present in `App.tsx`. Now added to: `contact.tsx`, `Join.tsx`, `Community.tsx`, `Donate.tsx`, `MeetTheTeam.tsx`, `StemKits.tsx`, `Recycling.tsx`, `SummerCamps.tsx`, `Members.tsx`, `NotFound.tsx`.

The icon links to: `https://www.chiefdelphi.com/u/1294_pack_of_parts/summary`

**Note on ChiefDelphi logo**: The current logo (`/public/chiefdelphi-logo.svg`) is a custom-made placeholder SVG (a lightning bolt with "CD" text). The actual ChiefDelphi brand logo would need to be sourced from ChiefDelphi directly if a more accurate representation is desired. The current SVG works as a recognizable placeholder.

#### 3. Header Text Gradients → Solid White
Changed the `.text-gradient` CSS class in both `src/index.css` and `src/MeetTheTeam.css` from gradient colors to solid white (`#FFFFFF`). Previously:
- `index.css` used `linear-gradient(135deg, #80D3EE 0%, #7FC3F2 50%, #FFFFFF 100%)` (light blue to white)
- `MeetTheTeam.css` used `linear-gradient(135deg, #00b4d8, #ffc107)` (cyan to gold)

Both now set `color: #FFFFFF` and `-webkit-text-fill-color: #FFFFFF` for consistent white text in hero sections.

#### 4. Community Page – Card Positioning Fix
Fixed the "Our Impact" stats section grid. The grid was set to `lg:grid-cols-4` but only contained 3 stat cards (a 4th card was previously removed). Changed to `lg:grid-cols-3` so the 3 remaining cards fill the row evenly. Also removed a stale debug comment (`// Does this need to be edited ?????`) from the Community Events section.

#### 5. Meet the Team – "Our Subteams" Title Color
The "Our Subteams" heading had `className="section-title text-white"`, but the `.section-title` CSS class in `MeetTheTeam.css` sets `color: #001f3f` (navy), which overrides the Tailwind `text-white` utility due to CSS specificity. Fixed by adding `style={{ color: 'white' }}` as an inline style to ensure the title renders white.

#### 6. Meet the Team – Subteams Updated to Match Join Page
Updated the "Our Subteams" section in `MeetTheTeam.tsx` to match the "Find Your Role" section in `Join.tsx`:

| Before (MeetTheTeam) | After (matches Join page) |
|---|---|
| Mechanical (Wrench icon) | Design (Wrench icon) |
| Programming (Code icon) | Programming (Code icon) |
| Electrical (Cpu icon) | Mechanical (Wrench icon) |
| Design/CAD (PenTool icon) | Electrical (Lightbulb icon) |
| Business (Megaphone icon) | Business & PR (Users icon) |
| Outreach (Heart icon) | Scouting (Users icon) |

Removed unused imports (`Cpu`, `PenTool`, `Megaphone`, `Heart`) and added `Lightbulb` import.

#### 7. Contact Page – Removed "Send Us a Message" Form
Removed the entire contact form section (form fields, submit button, success state) and resized the layout:
- Changed from a 2-column grid (`lg:grid-cols-5` with contact info in `lg:col-span-2` and form in `lg:col-span-3`) to a centered single-column layout (`max-w-2xl mx-auto`)
- Removed unused state variables (`formData`, `isSubmitting`, `submitStatus`), handler functions (`handleChange`, `handleSubmit`), and the `Send` icon import

#### 8. Contact Page – "Connect With Us" Social Links
Updated the "Connect With Us" section on the contact page to include all social media links:
- **Added**: LinkedIn (`https://linkedin.com/company/packofparts`) and ChiefDelphi (`https://www.chiefdelphi.com/u/1294_pack_of_parts/summary`)
- **Previously only had**: Instagram, Facebook, YouTube, GitHub
- Changed container from `flex gap-4` to `flex flex-wrap gap-4` to handle wrapping with the additional icons

### Verification Against packofparts.org (Recommendations)

Compared the new site content against https://www.packofparts.org/ on Feb 19, 2026. All existing content verified as matching. Recommendations documented below (no changes made per instructions):

| Page | Item | Current Site (packofparts.org) | New Site | Recommendation |
|---|---|---|---|---|
| Home | "22 years" reference | States "22 years" | Matches | ⚠️ Consider updating to current year count (team started 2004, now 2026 = 22 years, still accurate) |
| Home | Sponsors section | Shows sponsor logos with "contact us here" link | New site has sponsor logos with direct homepage links | No change needed (enhancement) |
| Contact | Shop location | "D-125 with access from the back of the high school across from the Renaissance school" | "Room D-125 (back of school)" | ⚠️ Consider adding "across from the Renaissance school" detail |
| Join | Interest Form step | Not on old site | Present in new site | No change needed (new for 2025-2026 season) |
| STEM Kits | Contact email | `packofparts@gmail.com` | `packofparts@gmail.com` | ✅ Matches |
| Recycling | Drop-off/pick-up dates | Jan 2025 dates listed | Same dates in new site | ⚠️ These dates are from Jan 2025 – verify if new dates exist for 2026 season |
| Meet the Team | Team member data | No equivalent page on old site | Uses placeholder names/photos | ⚠️ Replace placeholder team member names and photos with real data when available |
| Summer Camps | Pricing/details | No equivalent page on old site | Shows camp structure and pricing | ⚠️ Verify pricing is current before launch |
| Donate | Donation methods | No equivalent page on old site | Lists multiple donation methods | ⚠️ Verify donation links/methods are active before launch |

### Issues / Limitations Documented

1. **ChiefDelphi Logo**: The `/public/chiefdelphi-logo.svg` is a custom placeholder SVG, not the official ChiefDelphi logo. The official CD logo would need to be obtained from ChiefDelphi's branding resources if available. The current SVG is functional but not an exact brand match.

2. **Contact Form Removal**: The "Send Us a Message" form was removed as requested. If contact form functionality is desired in the future, a backend service (e.g., Formspree, EmailJS, or a custom API) would need to be integrated since the previous form was only a simulated submission.

3. **Subteam Leads Section**: The "Subteam Leads" section in MeetTheTeam.tsx still shows the old subteam names (Mechanical, Programming, Electrical, Design/CAD, Business, Outreach) in the lead member data. This data was not changed since it represents individual team member roles, but should be reviewed when real team member data is populated.

## Enhancements in New Site (Not on Old Site)

- Scroll-expansion video hero on home page
- Community hub page (`/community`)
- Meet the Team page (`/community/meet-the-team`) — currently uses placeholder team member data
- Summer Camps page (`/summer-camps`)
- Donate page (`/donate`)
- FAQ sections on join and contact pages
- Expanded Members page with resources and documents
- "Why Join" and "Who Can Join" sections on join page
- ChiefDelphi social link in all page footers
- Sponsor logos with homepage links (with marquee animation)
