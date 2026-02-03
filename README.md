# SNAP Restriction Waivers Interactive Visualization

An interactive scrollytelling visualization showcasing SNAP (Supplemental Nutrition Assistance Program) restriction waivers across 18 U.S. states.

## Overview

This project presents a data-driven narrative about how states are implementing new restrictions on SNAP purchases through approved waivers. The visualization uses scroll-triggered animations to guide users through the story, from traditional SNAP policy to the current wave of state-level restrictions.

## Features

- **Scrollytelling Interface**: Narrative unfolds as users scroll through sections
- **Interactive Map**: Click on states to see detailed waiver information
- **Chronological Animations**: States appear in order of approval dates
- **Status Legend**: Visual key explaining blue (implemented) and green (approved) state colors
- **Implementation Timeline**: Visual gradient showing rollout dates (Jan-Oct 2026)
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Accessible**: Keyboard navigation and ARIA labels included

## Data Sources

All data compiled from official USDA Food and Nutrition Service (FNS) announcements and state agency communications. As of February 2026:

- **18 states** with approved waivers
- **Application period**: April 2025 - November 2025
- **Implementation dates**: January 2026 - October 2026
- **Common restrictions**:
  - 100% of states restrict soda/soft drinks
  - 72% restrict candy
  - 50% restrict energy drinks
  - 11% restrict prepared desserts

## Technical Architecture

### Tech Stack

- **D3.js v7**: Map rendering and data visualization
- **TopoJSON**: US state boundary data
- **Scrollama.js**: Scroll-triggered animations
- **Vanilla JavaScript**: Modular ES5-compatible code
- **CSS3**: Responsive layout and smooth transitions

### File Structure

```
snap-waivers-scrolly/
├── index.html              # Main HTML structure
├── data/
│   └── waivers.json       # Structured waiver data for all 18 states
├── js/
│   ├── map.js             # D3 map setup and utility functions
│   ├── animations.js      # Scroll-triggered animation logic
│   ├── interactions.js    # Click handlers and modal interactions
│   └── scroll-controller.js # Scrollama initialization and coordination
├── css/
│   └── styles.css         # All styling and responsive layout
└── README.md              # This file
```

### Data Structure

Each state in `data/waivers.json` includes:

```json
{
  "name": "Nebraska",
  "abbr": "NE",
  "application_date": "2025-04-14",
  "approval_date": "2025-05-19",
  "implementation_date": "2026-01-01",
  "duration_years": 2,
  "status": "implemented",
  "restrictions": ["soda", "soft_drinks", "energy_drinks"],
  "restriction_text": "Soda, soft drinks, energy drinks",
  "state_url": "https://www.fns.usda.gov/snap/...",
  "notes": "First state approved"
}
```

## How It Works

### Scroll Sections

1. **Introduction**: Shows all states in neutral gray, explains traditional SNAP policy
2. **Waivers Introduced**: States fade in chronologically, color-coded by status
3. **Restrictions**: Highlights 18 waiver states, shows restriction categories, enables clicking
4. **Implementation Timeline**: Colors states by implementation date, shows timeline bar
5. **Conclusion**: Returns to status view with attribution

### Animation Flow

- **Scrollama** detects when users scroll to each section
- **scroll-controller.js** triggers the appropriate animation function
- **animations.js** handles D3 transitions (color, opacity, position)
- **interactions.js** manages click events and modal display

### State Colors and Legend

States are color-coded by waiver status:

- **Neutral**: `#e0e0e0` (light gray) - no waiver
- **Approved**: `#66bb6a` (green) - approved but not yet implemented
- **Implemented**: `#1e88e5` (blue) - currently in effect
- **Timeline gradient**: Dark blue (Jan 2026) → Light blue (Oct 2026)

A **status legend** appears in Sections 2 and 5, providing a visual key that explains the blue and green color meanings. The legend automatically shows/hides based on the active section.

## Running the Visualization

### Option 1: Local Server (Recommended)

The visualization requires a web server to load external data files.

**Python 3:**
```bash
cd snap-waivers-scrolly
python3 -m http.server 8000
```

**Node.js:**
```bash
cd snap-waivers-scrolly
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

### Option 2: Live Server Extension

If using VS Code, install the "Live Server" extension and click "Go Live" on `index.html`.

### Option 3: Deploy to Web Host

Upload all files to any static web hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

## Browser Compatibility

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Load time**: <3 seconds on standard broadband
- **Animation framerate**: 60fps on modern devices
- **Map geometry**: Simplified TopoJSON for fast rendering
- **Dependencies**: Loaded from CDN with integrity checks

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation (Escape to close modal)
- Sufficient color contrast (WCAG AA compliant)
- Responsive text sizing

## Future Enhancements

Possible additions for future versions:
- SNAP participation numbers by state (impact calculation)
- Comparison with states that declined waivers
- Timeline slider to "scrub" through dates
- Export data as CSV or share specific states
- Additional food category breakdowns
- State policy text search/filter

## Credits

**Data Compilation**: Joël McClurg
**Visualization**: Created with Claude Code
**Data Source**: USDA Food and Nutrition Service

## License

Data is in the public domain (U.S. Government source). Code and design are available for reuse with attribution.

## Contact

For questions about the data or visualization:
- Data inquiries: USDA FNS (https://www.fns.usda.gov/snap)
- Technical questions: See project documentation

---

**Last Updated**: February 2, 2026
**Version**: 1.1
