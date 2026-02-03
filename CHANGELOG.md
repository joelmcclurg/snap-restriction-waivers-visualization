# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
