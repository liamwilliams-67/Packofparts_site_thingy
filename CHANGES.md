# Site Changes: New Site vs. Old Site (packofparts.org)

This document records all verified differences between the redesigned site (this repository) and the original Wix-based site at https://www.packofparts.org/.

---

## Pages Present on Old Site

| Old Site URL | New Site Route | Status |
|---|---|---|
| / (Home) | / | ✅ Present – redesigned |
| /members | /members | ✅ Present – expanded |
| /join | /join | ✅ Present – redesigned |
| /contact | /contact | ✅ Present – redesigned |
| /stem-kits | /community/stem-kits | ✅ Present – moved under /community |
| /recycling | /community/recycling | ✅ Present – moved under /community |

## New Pages (not on old site)

| New Route | Description |
|---|---|
| /community | Community hub landing page |
| /community/meet-the-team | Meet the Team page (placeholder team members) |
| /summer-camps | Summer Camps page |
| /donate | Donate page |

---

## Content Differences by Page

### Home Page (/)

| Item | Old Site | New Site | Fixed? |
|---|---|---|---|
| Hero section | Static heading "Eastlake Robotics Club" | Scroll-expansion video hero with same heading | N/A (new feature) |
| Mission text | Matches | Matches | ✅ |
| About the team | Matches (2004, 22 years, 5 schools, 120 lb robot, 6 weeks) | Matches | ✅ |
| What is FRC? | "Championship in Houston, TX, and Detroit, MI" | Was "Houston, TX" only | **Fixed** |
| What is FIRST? | Matches | Matches | ✅ |
| Sponsors section | Listed sponsors without links | Sponsors listed with homepage links | N/A (enhancement) |

### Contact Page (/contact)

| Item | Old Site | New Site | Fixed? |
|---|---|---|---|
| General email | info@packofparts.org | Was `contact@packofparts.org` | **Fixed** |
| Mentor email | mentors@packofparts.org | Was missing | **Fixed** |
| Address | 400 228th AVE NE, Sammamish, WA 98074 | Was just "Sammamish, Washington" | **Fixed** |
| Shop room | Room D-125 (back of school) | Was missing | **Fixed** |
| Social media links | Not present on old site contact page | Were placeholder `#` links | **Fixed** (now use real URLs) |
| Contact form | Not present on old site | New feature | N/A (new feature) |
| FAQ section | Not present on old site | New feature | N/A (new feature) |

### Join Page (/join)

| Item | Old Site | New Site | Notes |
|---|---|---|---|
| Step 1: Interest Form | Not present | Added as step 01 | New step for 2025-2026 season |
| Step: Shop Permission Form | "Fill out form, have signed by parent/guardian" | Matches | ✅ |
| Step: Member Handbook | Matches | Matches | ✅ |
| Step: Club Contract | "After you've read the handbook, sign your member contract" | Matches | ✅ |
| Step: Parent/Guardian Info | "Document for parent/guardian to read" | Matches | ✅ |
| Step: Club Fees | "Pay club fees. NOTE: not yet ready to accept payments" | Matches | ✅ |
| Why Join section | Not present | New feature | N/A (new feature) |
| Who Can Join section | Not present | New feature | N/A (new feature) |
| FAQ section | Not present | New feature | N/A (new feature) |

### Members Page (/members)

| Item | Old Site | New Site | Notes |
|---|---|---|---|
| Content | "Here are a bunch of resources useful for Pack of Parts members." (sparse) | Expanded with resources, documents, safety info | Enhancement |

### STEM Kits Page (/community/stem-kits, was /stem-kits)

| Item | Old Site | New Site | Notes |
|---|---|---|---|
| STEMUnboxed description | Matches (NGSS-aligned, hands-on, classroom-ready) | Matches | ✅ |
| Crazy Catapult Kit | Listed | Listed with expanded description | ✅ |
| Contact email | packofparts@gmail.com | packofparts@gmail.com | ✅ |
| Get Involved section | Listed 3 options + donation | Matches with same 4 options | ✅ |

### Recycling Page (/community/recycling, was /recycling)

| Item | Old Site | New Site | Notes |
|---|---|---|---|
| 4th annual initiative | Matches | Matches | ✅ |
| Drop-off dates | Sat Jan 11 2–5pm, Mon Jan 13 7–9pm, Fri Jan 17 7–9pm | Matches | ✅ |
| Pick-up dates | Mon Jan 20 7–9pm, Wed Jan 22 7–9pm, Sat Jan 25 2–5pm | Matches | ✅ |
| Address | "Eastlake High School, 228th Ave NE, Sammamish WA" | Matches | ✅ |
| Instagram handle | @packofparts | Matches | ✅ |

---

## Summary of Fixes Applied in This PR

1. **Contact email corrected**: `contact@packofparts.org` → `info@packofparts.org` (with `mentors@packofparts.org` added)
2. **Full address added** to contact page: `400 228th AVE NE, Sammamish, WA 98074` and `Room D-125`
3. **FRC Championship location corrected**: "Houston, TX" → "Houston, TX, and Detroit, MI"
4. **Social media links fixed** in contact page: replaced `#` placeholders with real URLs

---

## Work Order: Site-Wide Updates (Feb 2026)

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
