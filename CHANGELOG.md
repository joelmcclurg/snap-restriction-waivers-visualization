# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.1.5] - 2026-02-03

### Fixed
- Added cache-busting timestamp to waivers.json fetch to prevent stale data from browser/CDN caches
  - Issue: After deploying v1.1.3 status corrections, browsers continued showing cached data
  - 4 states (Idaho, Oklahoma, Louisiana, Florida) were incorrectly displaying as blue (implemented) instead of green (approved)
  - Solution: Added `?v=${Date.now()}` query parameter to force fresh data fetch on every page load
  - Ensures users always see current state status and implementation date data
  - Location: js/map.js:13

## [1.1.4] - 2026-02-03

### Fixed
- Fixed state highlighting mismatch in category statistics hover interaction
  - Updated categoryMap to include all semantic variants of restriction types
  - Soda/soft drinks now includes: sweetened_drinks, sweetened_beverages, unhealthy_drinks, taxable_foods
  - Previously, Texas, Missouri, Virginia, and Iowa were incorrectly fading when hovering "Soda/Soft Drinks" statistic
  - All 18 states now correctly highlight when hovering "100% restrict soda/soft drinks"
- Corrected candy statistics: 13 states (72%) → 11 states (61%)
- Corrected energy drinks statistics: 9 states (50%) → 6 states (33%)
- All category statistics now match the exact number of states that highlight on hover

## [1.1.3] - 2026-02-03

### Fixed
- Updated implementation dates for 5 states to match official USDA target dates
  - Colorado: 03/01/26 → 04/30/26
  - Florida: 01/01/26 → 04/20/26
  - Idaho: 01/01/26 → 02/15/26
  - Louisiana: 01/15/26 → 02/18/26
  - Oklahoma: 01/01/26 → 02/15/26
- Updated status for 4 states from "implemented" to "approved" (future implementation dates)
  - Florida, Idaho, Louisiana, Oklahoma
- Re-verified all 18 state statuses to ensure correct color coding (blue=implemented, green=approved)
- Source: https://www.fns.usda.gov/snap/waivers/foodrestriction (verified 02/03/26)

### Added
- Disclaimer note explaining that implementation dates are targets and may differ from USDA effective dates

## [1.1.2] - 2026-02-03

### Fixed
- Fixed timezone parsing bug in date formatting causing implementation dates to display one day earlier
  - All modal popup dates (application, approval, implementation) now display correctly
  - Fixed: States with "2026-01-01" dates were showing as "Dec 31, 2025"
  - Solution: Parse ISO 8601 dates as UTC to prevent timezone-related date shifts
- Fixed implementation timeline color gradient to use timezone-safe date parsing
- Fixed approval date sorting to use timezone-safe date parsing
- Affects users in negative UTC offset timezones (Americas)

## [1.1.1] - 2026-02-02

### Fixed
- Corrected Colorado's status from "implemented" to "approved"
  - Implementation date is March 1, 2026 (future date)
  - Status field now accurately reflects waiver is approved but not yet in effect
  - Fixes incorrect blue (implemented) coloring, now correctly shows green (approved)
- Ensures visualization accurately represents state of waivers as of February 2, 2026

## [1.1.0] - 2026-02-02

### Changed
- Updated all 18 states' restriction text with official USDA waiver language
  - Replaced generic summaries (e.g., "Soda, soft drinks, energy drinks") with exact official terminology
  - Example: Nebraska now shows "Restricts purchase of soda, 'soft drinks,' and energy drinks."
  - Preserves special formatting and punctuation from official sources
  - Better represents each state's unique policy approach
- Updated state URLs to point to specific USDA waiver pages (e.g., `/snap/waivers/foodrestriction/nebraska`)
- Updated attribution text to include Propel's AI Residency in footer

### Technical Details
- Modified: `data/waivers.json` (all 18 state entries)
- Commits: 58654bd (attribution), e3538fe (restriction text)

## [1.0.0] - 2026-02-02

### Added
- Interactive scrollytelling visualization of SNAP food restriction waivers
- D3.js-powered US map with 18 states highlighted
- Modal dialogs showing state-specific waiver details
- Responsive design for mobile and desktop
- Comprehensive timeline of waiver applications and approvals
- Status legend explaining blue (implemented) and green (approved) state colors
- State comparison features
- Accessibility features (keyboard navigation, screen reader support)
- 5-file documentation suite
  - `README.md` - Technical documentation
  - `PROJECT-SUMMARY.md` - Complete project overview
  - `QUICKSTART.md` - 30-second setup guide
  - `VISUALIZATION-GUIDE.md` - Section-by-section walkthrough
  - `INDEX.md` - Documentation navigation

### Data
- 18 state waivers tracked with complete information
- Application dates, approval dates, implementation dates
- Restriction categories and official text for each state
- 2-year waiver durations
- USDA reference URLs for all states

### Technical Implementation
- Modular JavaScript architecture (4 files: map.js, animations.js, interactions.js, scroll-controller.js)
- D3.js v7 for map rendering
- TopoJSON v3 for state boundary geometry
- Scrollama v3.2 for scroll-triggered animations
- Responsive CSS with mobile, tablet, and desktop breakpoints
- Automated test suite (test-visualization.sh)
- Zero build tools required - runs directly in browser
