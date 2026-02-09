// Scrollama setup and scroll event handling

let scroller = null;

// Get responsive Scrollama offset based on viewport width
function getScrollamaOffset() {
    const width = window.innerWidth;
    if (width <= 640) return 0.3;
    if (width <= 1024) return 0.35;
    return 0.5;
}

// Initialize scrollytelling
async function initScrollytelling() {
    // Wait for map to initialize
    const mapReady = await window.mapUtils.initMap();

    if (!mapReady) {
        console.error('Failed to initialize map');
        return;
    }

    // Initialize interactions
    window.interactions.initInteractions();

    // Initialize tooltips
    window.interactions.initTooltips();

    // Initialize category hovers
    window.interactions.initCategoryHovers();

    // Set up scrollama
    scroller = scrollama();

    scroller
        .setup({
            step: '.step',
            offset: getScrollamaOffset(),
            debug: false
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    // Handle resize
    window.addEventListener('resize', handleResize);
}

// Handle step enter
function handleStepEnter(response) {
    const step = response.element.dataset.step;

    // Trigger appropriate animation based on step
    switch (step) {
        case 'intro':
            window.animations.resetToNeutral();
            break;
        case 'waivers-introduced':
            window.animations.showWaiversByStatus();
            break;
        case 'restrictions':
            window.animations.showRestrictions();
            break;
        case 'implementation':
            window.animations.showImplementationTimeline();
            break;
        case 'conclusion':
            window.animations.showConclusion();
            break;
    }
}

// Handle step exit
function handleStepExit(response) {
    // Let the next step's enter animation handle the transition
}

// Handle window resize (debounced)
let resizeTimer;
function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (scroller) {
            scroller.resize();
            scroller.setup({
                step: '.step',
                offset: getScrollamaOffset(),
                debug: false
            });
        }
    }, 150);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollytelling);
} else {
    initScrollytelling();
}
