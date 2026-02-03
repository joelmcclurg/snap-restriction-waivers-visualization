// Scrollama setup and scroll event handling

let scroller = null;

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
            offset: 0.5, // Trigger when step is 50% from top of viewport
            debug: false // Set to true to see trigger lines during development
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    // Handle resize
    window.addEventListener('resize', handleResize);

    console.log('Scrollytelling initialized');
}

// Handle step enter
function handleStepEnter(response) {
    const { element, direction, index } = response;
    const step = element.dataset.step;

    console.log('Entering step:', step, 'direction:', direction, 'index:', index);

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
        default:
            console.log('Unknown step:', step);
    }
}

// Handle step exit
function handleStepExit(response) {
    const { element, direction, index } = response;
    const step = element.dataset.step;

    console.log('Exiting step:', step, 'direction:', direction, 'index:', index);

    // Optional: Handle exit animations if needed
    // For now, we let the next step's enter animation handle the transition
}

// Handle window resize
function handleResize() {
    if (scroller) {
        scroller.resize();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollytelling);
} else {
    initScrollytelling();
}
