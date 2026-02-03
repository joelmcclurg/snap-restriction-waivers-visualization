// Interaction handlers for state clicks and modal

// Initialize state click handlers
function initInteractions() {
    const modal = d3.select('#state-modal');
    const closeButton = modal.select('.close-button');

    // Handle state clicks
    d3.selectAll('.state').on('click', function(event, d) {
        // Only respond if state is clickable
        if (!d3.select(this).classed('clickable')) return;

        // Get waiver data for this state
        const waiverData = d.waiverData;
        if (!waiverData) return;

        // Populate modal
        populateModal(waiverData);

        // Show modal
        modal.classed('hidden', false);
    });

    // Close modal on button click
    closeButton.on('click', () => {
        modal.classed('hidden', true);
    });

    // Close modal on background click
    modal.on('click', function(event) {
        if (event.target === this) {
            modal.classed('hidden', true);
        }
    });

    // Close modal on Escape key
    d3.select(document).on('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.classed('hidden', true);
        }
    });
}

// Populate modal with state data
function populateModal(stateData) {
    d3.select('#modal-state-name').text(stateData.name);
    d3.select('#modal-applied').text(window.mapUtils.formatDate(stateData.application_date));
    d3.select('#modal-approved').text(window.mapUtils.formatDate(stateData.approval_date));
    d3.select('#modal-implemented').text(window.mapUtils.formatDate(stateData.implementation_date));
    d3.select('#modal-restrictions').text(stateData.restriction_text);
    d3.select('#modal-link').attr('href', stateData.state_url);

    // Show/hide notes based on content
    const notesContainer = d3.select('#modal-notes-container');
    if (stateData.notes && stateData.notes.trim() !== '') {
        d3.select('#modal-notes').text(stateData.notes);
        notesContainer.classed('hidden', false);
    } else {
        notesContainer.classed('hidden', true);
    }
}

// Optional: Add hover tooltips (can be enabled later)
function initTooltips() {
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip');

    d3.selectAll('.state')
        .on('mousemove', function(event, d) {
            if (!d3.select(this).classed('clickable')) return;

            const waiverData = d.waiverData;
            if (!waiverData) return;

            tooltip
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px')
                .html(`<strong>${waiverData.name}</strong>`)
                .classed('visible', true);
        })
        .on('mouseout', () => {
            tooltip.classed('visible', false);
        });
}

// Initialize category stat hover handlers
function initCategoryHovers() {
    const statItems = d3.selectAll('.stat-item');

    // Map stat items to their restriction categories
    const categoryMap = {
        0: ['soda', 'soft_drinks'],  // Soda/soft drinks
        1: ['candy'],                 // Candy
        2: ['energy_drinks'],         // Energy drinks
        3: ['prepared_desserts']      // Prepared desserts
    };

    statItems.each(function(d, i) {
        const item = d3.select(this);
        const categories = categoryMap[i];

        if (!categories) return;

        item
            .style('cursor', 'pointer')
            .on('mouseenter', () => {
                highlightStatesWithRestriction(categories);
            })
            .on('mouseleave', () => {
                restoreStatesView();
            });
    });
}

// Highlight states that have specific restrictions
function highlightStatesWithRestriction(categories) {
    const data = window.mapUtils.waiverData();
    if (!data) return;

    // Get states that have any of the specified restrictions
    const matchingStates = data.states.filter(state =>
        state.restrictions.some(r => categories.includes(r))
    );

    const matchingAbbrs = matchingStates.map(s => s.abbr);

    // Highlight matching states, fade others
    d3.selectAll('.state').each(function(d) {
        const state = d3.select(this);
        const abbr = d.properties.abbr;

        if (matchingAbbrs.includes(abbr)) {
            // Highlight matching state
            state
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style('stroke', '#ff9800')
                .style('stroke-width', '2px');
        } else {
            // Fade non-matching state
            state
                .transition()
                .duration(300)
                .style('opacity', 0.2);
        }
    });
}

// Restore normal view after hover
function restoreStatesView() {
    const waiverStates = window.mapUtils.getWaiverStates();
    const nonWaiverStates = window.mapUtils.getNonWaiverStates();

    // Restore waiver states
    waiverStates
        .transition()
        .duration(300)
        .style('opacity', 1)
        .style('stroke', '#333')
        .style('stroke-width', '0.5px');

    // Restore non-waiver states to faded
    nonWaiverStates
        .transition()
        .duration(300)
        .style('opacity', 0.1);
}

// Export interaction functions
window.interactions = {
    initInteractions,
    initTooltips,
    initCategoryHovers
};
