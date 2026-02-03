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

// Export interaction functions
window.interactions = {
    initInteractions,
    initTooltips
};
