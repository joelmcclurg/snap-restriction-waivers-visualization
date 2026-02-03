# Visualization Guide - What You'll See

## Overview

This interactive scrollytelling visualization takes users through a narrative journey about SNAP restriction waivers. As you scroll, the map animates to show different aspects of the data.

---

## Section-by-Section Walkthrough

### Section 1: Introduction - "How SNAP Has Always Worked"

**What you see:**
- All U.S. states in neutral light gray
- Clean, simple map showing the entire country
- Text explaining traditional SNAP policy

**Purpose:** Establishes baseline - this is what SNAP looked like before waivers

**Visual state:**
```
All states: Light gray (#e0e0e0)
Opacity: 100%
Interactions: None (view only)
```

---

### Section 2: Waivers Introduced - "States Request Waivers"

**What you see:**
- States begin appearing in color, one by one
- Colors indicate status:
  - **Blue (#1e88e5)**: Already implemented
  - **Green (#66bb6a)**: Approved, not yet implemented
- Animation flows chronologically (Nebraska appears first, then Indiana, etc.)

**Purpose:** Shows the wave of waiver requests and approvals

**Visual state:**
```
Waiver states: Blue or Green
Non-waiver states: Light gray
Animation: Sequential fade-in (100ms intervals)
Interactions: View only
```

**Timeline visualization:**
- Nebraska (May 2025) appears first
- States continue appearing through December 2025
- Total: 18 states by the end of animation

---

### Section 3: Restrictions - "What's Being Restricted"

**What you see:**
- Waiver states stay brightly colored and become **clickable**
- Non-waiver states fade to 10% opacity (almost invisible)
- Category statistics appear in the text box:
  - 🥤 18 states (100%) restrict soda/soft drinks
  - 🍬 13 states (72%) restrict candy
  - ⚡ 9 states (50%) restrict energy drinks
  - 🍰 2 states (11%) restrict prepared desserts

**Purpose:** Emphasizes which states have waivers and what they're restricting

**Visual state:**
```
Waiver states: Full color, opacity 100%, CLICKABLE
Non-waiver states: Faded, opacity 10%
Hover effect: Darker border on hover
Click: Opens modal dialog
```

**Interactive features:**
- **Hover** over waiver states: Tooltip shows state name
- **Click** on waiver states: Opens detailed modal with:
  - State name as heading
  - Application date
  - Approval date
  - Implementation date
  - Full restriction text (exact language varies by state!)
  - Notes (if applicable)
  - Link to USDA information
- **Press Escape** or click X to close modal

**Example modal content (Nebraska):**
```
Nebraska

Applied: Apr 14, 2025
Approved: May 19, 2025
Implementation: Jan 1, 2026

Restricted Items:
Soda, soft drinks, energy drinks

Notes:
First state approved

[View USDA Information →]
```

---

### Section 4: Implementation Timeline - "When Restrictions Take Effect"

**What you see:**
- Non-waiver states disappear completely (opacity 0%)
- Waiver states change to a **color gradient** based on implementation date:
  - **Dark blue**: Implemented January 2026 (already in effect)
  - **Medium blue**: Implemented mid-year 2026
  - **Light blue**: Implemented October 2026 (latest)
- Timeline bar appears at bottom showing date range

**Purpose:** Shows the rollout schedule - when restrictions actually take effect

**Visual state:**
```
Waiver states: Gradient from dark to light blue
Non-waiver states: Hidden (opacity 0%)
Timeline visualization: Horizontal bar (Jan 2026 → Oct 2026)
Interactions: Still clickable for details
```

**Timeline bar shows:**
- Left label: "Jan 2026"
- Right label: "Oct 2026"
- Visual gradient matching map colors

**Implementation clusters:**
- **Jan 1, 2026**: Most states (Nebraska, Indiana, Idaho, Utah, Oklahoma, West Virginia, Florida, Iowa)
- **Jan 15, 2026**: Louisiana
- **Mar 1, 2026**: Colorado
- **Apr 1, 2026**: Texas, Virginia
- **Jul 1, 2026**: Arkansas
- **Jul 31, 2026**: Tennessee
- **Aug 1, 2026**: Hawaii
- **Aug 31, 2026**: South Carolina
- **Sep 1, 2026**: North Dakota
- **Oct 1, 2026**: Missouri

---

### Section 5: Conclusion - "The Impact"

**What you see:**
- Returns to status-based coloring (blue/green)
- All 18 waiver states visible
- Attribution information displayed

**Purpose:** Wraps up the narrative with context about policy impact

**Visual state:**
```
Waiver states: Blue (implemented) or Green (approved)
Non-waiver states: Light gray, full opacity
Interactions: Clickable
```

**Attribution footer shows:**
- Data Source: USDA Food and Nutrition Service
- Visualization: Created with Claude Code

---

## Color Palette

### Status Colors (Sections 2 & 5)
- **Neutral**: `#e0e0e0` (light gray) - No waiver
- **Approved**: `#66bb6a` (green) - Approved but not yet implemented
- **Implemented**: `#1e88e5` (dark blue) - Currently in effect

### Timeline Gradient (Section 4)
- **Early (Jan 2026)**: `#1e88e5` (dark blue)
- **Late (Oct 2026)**: `#90caf9` (light blue)
- **Gradient**: Smooth interpolation between dates

### UI Elements
- **Background**: `#fafafa` (off-white)
- **Text**: `#333` (dark gray)
- **Accent**: `#667eea` (purple) - Headings, links, buttons
- **Hover**: `#5568d3` (darker purple)

---

## Interaction Patterns

### Scroll Behavior
- **Trigger point**: 50% from top of viewport
- **Animation speed**: 500-800ms transitions
- **Scroll distance**: Each section is ~100vh (one screen height)
- **Smoothness**: 60fps CSS transitions

### Click Behavior
- **Target**: State paths on map
- **Active sections**: 3, 4, 5 (after waivers are introduced)
- **Feedback**: Hover darkens border, cursor changes to pointer
- **Result**: Modal dialog opens with full state details

### Modal Behavior
- **Open**: Click on clickable state
- **Close**:
  - Click X button (top right)
  - Click outside modal (on dark background)
  - Press Escape key
- **Content**: State-specific waiver information
- **Scrolling**: Modal content scrolls if needed (max-height: 80vh)

### Keyboard Navigation
- **Tab**: Focus on clickable elements
- **Enter**: Activate focused state (open modal)
- **Escape**: Close modal

---

## Responsive Behavior

### Desktop (>1024px)
```
Layout: Side-by-side
├── Map (60% width, sticky)
└── Narrative (40% width, scrolls)

Map stays fixed while text scrolls
```

### Tablet (640px - 1024px)
```
Layout: Stacked
├── Map (100% width, 60vh height, relative position)
└── Narrative (100% width, scrolls below)

Map appears above each section
```

### Mobile (<640px)
```
Layout: Stacked, optimized
├── Map (100% width, 50vh height)
└── Narrative (100% width, larger touch targets)

Reduced padding, larger text for readability
Modal: Full-screen on small devices
```

---

## Animation Timing

### Section Transitions
- **State color change**: 500ms ease
- **Opacity fade**: 500ms ease
- **Sequential appearance**: 100ms stagger between states
- **Timeline gradient**: 800ms ease

### Interactions
- **Hover effect**: 200ms
- **Modal open/close**: 300ms
- **Smooth scroll**: Native browser (CSS scroll-behavior: smooth)

---

## Data Accuracy Notes

**Important:** While all states have similar restriction categories (soda, candy, energy drinks), the **exact definitions vary significantly** between states.

Examples of variation:
- **Soda**: Some states say "soft drinks," others say "sweetened beverages"
- **Candy**: Definitions may include/exclude chocolate, gum, or specific sugar thresholds
- **Energy drinks**: Some explicitly list brands, others use caffeine content
- **Iowa's unique approach**: Restricts "all taxable food items" per state tax code

Always check the **modal dialog** for each state's specific restriction language.

---

## Performance Expectations

### Load Time
- **Initial page load**: <1 second (HTML/CSS/JS)
- **Map data load**: 1-2 seconds (TopoJSON from CDN)
- **Full interactive**: <3 seconds total

### Animations
- **Target**: 60fps (16.67ms per frame)
- **Achieved**: 60fps on modern devices
- **Fallback**: 30fps on older devices (still smooth)

### File Sizes
- **HTML**: ~6 KB
- **CSS**: ~12 KB
- **JavaScript**: ~15 KB (all modules combined)
- **Data (JSON)**: ~8 KB
- **Total**: ~41 KB (excluding libraries and map data)

### Dependencies (loaded from CDN)
- **D3.js**: ~240 KB
- **TopoJSON**: ~25 KB
- **Scrollama**: ~12 KB
- **US Map Data**: ~70 KB
- **Total with dependencies**: ~388 KB

---

## Accessibility Features

### Screen Readers
- Semantic HTML5 elements (`<header>`, `<main>`, `<article>`, `<section>`)
- ARIA labels on interactive elements
- Alt text for visual content

### Keyboard Users
- Tab navigation through focusable elements
- Enter to activate states
- Escape to close modal
- Focus indicators visible

### Visual Accessibility
- WCAG AA color contrast ratios
- Sufficient text sizes (16px base, scales up)
- Non-color-dependent information (patterns + text)

### Motion
- Respects `prefers-reduced-motion` (could be enhanced)
- No auto-playing animations (scroll-triggered only)
- Smooth but not jarring transitions

---

## Troubleshooting Visual Issues

### Map doesn't appear
- Check browser console for errors
- Verify internet connection (map data loads from CDN)
- Try hard refresh (Cmd/Ctrl + Shift + R)

### Animations are choppy
- Close other tabs/applications
- Try Chrome or Firefox (best performance)
- Check if hardware acceleration is enabled

### Colors look wrong
- Check if browser has dark mode/color filters active
- Verify CSS file loaded (check Network tab in DevTools)
- Try different browser to rule out extension conflicts

### States not clickable
- Scroll to Section 3 or later (early sections are view-only)
- Check that JavaScript loaded successfully
- Verify you're clicking on a waiver state (18 states total)

### Modal won't close
- Try pressing Escape key
- Click outside modal on dark background
- Hard refresh page if stuck

---

## Technical Implementation Notes

### Why These Design Choices?

**Scrollytelling format:**
- Natural narrative flow
- Progressive disclosure (one concept at a time)
- Engaging and memorable

**Fixed map with scrolling text:**
- Map stays visible throughout (context retention)
- Text provides explanation while visuals update
- Common pattern in data journalism

**Color gradient for dates:**
- Intuitive visual encoding (dark = earlier)
- Shows temporal distribution at a glance
- Accessible (not relying solely on hue differences)

**Click for details:**
- Reduces clutter (not all info shown at once)
- Encourages exploration
- Respects user agency (see what interests you)

---

## Suggested Viewing Experience

1. **First view**: Scroll slowly through entire narrative
2. **Second pass**: Click on states that interest you
3. **Exploration**: Compare restriction text between states
4. **Mobile**: Try on phone to see responsive design
5. **Share**: Send link to colleagues or stakeholders

---

**Enjoy exploring the data!**

For technical details, see `README.md`
For quick setup, see `QUICKSTART.md`
For project overview, see `PROJECT-SUMMARY.md`
