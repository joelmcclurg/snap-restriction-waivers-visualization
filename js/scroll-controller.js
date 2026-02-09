// Scrollama setup and scroll event handling

let scroller = null;
let lastActiveStep = null;

// Get responsive Scrollama offset based on viewport width
function getScrollamaOffset() {
    const width = window.innerWidth;
    if (width <= 640) return 0.7;
    if (width <= 1024) return 0.65;
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
    try {
        scroller = scrollama();

        scroller
            .setup({
                step: '.step',
                offset: getScrollamaOffset(),
                debug: false
            })
            .onStepEnter(handleStepEnter)
            .onStepExit(handleStepExit);
    } catch (e) {
        console.warn('Scrollama failed to initialize:', e);
    }

    // Always add native scroll fallback for reliability on mobile
    initScrollFallback();

    // Handle resize
    window.addEventListener('resize', handleResize);
}

// Native scroll listener fallback — catches cases where Scrollama's
// IntersectionObserver doesn't fire (common on mobile with sticky elements)
function initScrollFallback() {
    window.addEventListener('scroll', function() {
        const steps = document.querySelectorAll('.step');
        const viewportHeight = window.innerHeight;
        // Trigger line: 65% down the viewport (matches Scrollama offset intent)
        const triggerY = viewportHeight * 0.65;

        let activeStep = null;

        for (const step of steps) {
            const rect = step.getBoundingClientRect();
            // A step is "active" when its top has scrolled above the trigger line
            // and its bottom is still below the trigger line
            if (rect.top <= triggerY && rect.bottom > triggerY) {
                activeStep = step;
                break;
            }
        }

        // Also catch case where we've scrolled past all steps (last step active)
        if (!activeStep) {
            const lastStep = steps[steps.length - 1];
            if (lastStep && lastStep.getBoundingClientRect().bottom <= triggerY) {
                activeStep = lastStep;
            }
        }

        if (activeStep && activeStep !== lastActiveStep) {
            lastActiveStep = activeStep;
            handleStepEnter({ element: activeStep });
        }
    }, { passive: true });
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
        }
        // Reset fallback so next scroll re-evaluates
        lastActiveStep = null;
    }, 150);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollytelling);
} else {
    initScrollytelling();
}
