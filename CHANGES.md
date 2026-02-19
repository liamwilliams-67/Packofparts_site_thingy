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

## Enhancements in New Site (Not on Old Site)

- Scroll-expansion video hero on home page
- Community hub page (`/community`)
- Meet the Team page (`/community/meet-the-team`) — currently uses placeholder team member data
- Summer Camps page (`/summer-camps`)
- Donate page (`/donate`)
- Contact form on contact page
- FAQ sections on join and contact pages
- Expanded Members page with resources and documents
- "Why Join" and "Who Can Join" sections on join page
- ChiefDelphi social link in home page footer
- Sponsor logos with homepage links (with marquee animation)
