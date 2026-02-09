// Animation functions for scroll-triggered transitions

// Section 1: Reset to neutral state
function resetToNeutral() {
    const allStates = d3.selectAll('.state');

    allStates
        .classed('requested approved implemented faded clickable', false)
        .classed('neutral', true)
        .transition()
        .duration(500)
        .style('opacity', 1)
        .style('fill', '#e0e0e0');

    // Hide legend and timeline
    d3.select('#legend').classed('hidden', true);
    d3.select('#timeline-viz').classed('hidden', true);
}

// Create and show status legend
function showStatusLegend() {
    const legendDiv = d3.select('#legend');

    legendDiv.html(''); // Clear previous content

    // Add legend items
    const legendData = [
        { color: '#1e88e5', label: 'Implemented - Already in effect' },
        { color: '#66bb6a', label: 'Approved - Not yet implemented' }
    ];

    legendData.forEach(item => {
        const legendItem = legendDiv.append('div')
            .attr('class', 'legend-item');

        legendItem.append('div')
            .attr('class', 'legend-color')
            .style('background-color', item.color);

        legendItem.append('span')
            .text(item.label);
    });

    legendDiv.classed('hidden', false);
}

// Section 2: Show waiver states by status
function showWaiversByStatus() {
    const waiverStates = window.mapUtils.getWaiverStates();
    const nonWaiverStates = window.mapUtils.getNonWaiverStates();
    const data = window.mapUtils.waiverData();

    if (!data) return;

    // Keep non-waiver states neutral
    nonWaiverStates
        .classed('requested approved implemented faded', false)
        .classed('neutral', true)
        .transition()
        .duration(500)
        .style('opacity', 1)
        .style('fill', '#e0e0e0');

    // Sort waiver states by approval date for sequential animation
    const sortedStates = [...data.states].sort((a, b) =>
        new Date(a.approval_date + 'T00:00:00Z') - new Date(b.approval_date + 'T00:00:00Z')
    );

    // Animate waiver states in chronological order
    sortedStates.forEach((stateData, index) => {
        const stateElement = window.mapUtils.getStateElement(stateData.abbr);

        setTimeout(() => {
            let statusClass = 'approved';
            let color = '#66bb6a'; // green

            if (stateData.status === 'implemented') {
                statusClass = 'implemented';
                color = '#1e88e5'; // blue
            }

            stateElement
                .classed('neutral requested faded', false)
                .classed(statusClass, true)
                .classed('clickable', true)
                .transition()
                .duration(500)
                .style('opacity', 1)
                .style('fill', color);
        }, index * 100); // Stagger animation
    });

    // Show status legend, hide timeline
    showStatusLegend();
    d3.select('#timeline-viz').classed('hidden', true);
}

// Section 3: Highlight waiver states, fade others, enable clicks
function showRestrictions() {
    const waiverStates = window.mapUtils.getWaiverStates();
    const nonWaiverStates = window.mapUtils.getNonWaiverStates();

    // Fade non-waiver states
    nonWaiverStates
        .classed('neutral', false)
        .classed('faded', true)
        .transition()
        .duration(500)
        .style('opacity', 0.1);

    // Highlight waiver states and make clickable
    waiverStates
        .classed('faded', false)
        .classed('clickable', true)
        .transition()
        .duration(500)
        .style('opacity', 1);

    // Hide timeline, keep legend hidden for now
    d3.select('#timeline-viz').classed('hidden', true);
    d3.select('#legend').classed('hidden', true);
}

// Section 4: Show implementation timeline gradient
function showImplementationTimeline() {
    const waiverStates = window.mapUtils.getWaiverStates();
    const nonWaiverStates = window.mapUtils.getNonWaiverStates();
    const data = window.mapUtils.waiverData();

    if (!data) return;

    // Fade out non-waiver states completely
    nonWaiverStates
        .transition()
        .duration(500)
        .style('opacity', 0);

    // Color waiver states by implementation date
    waiverStates.each(function(d) {
        if (d.waiverData) {
            const color = window.mapUtils.getImplementationColor(d.waiverData.implementation_date);

            d3.select(this)
                .classed('clickable', true)
                .transition()
                .duration(800)
                .style('opacity', 1)
                .style('fill', color);
        }
    });

    // Show timeline visualization
    showTimelineVisualization();

    // Hide legend
    d3.select('#legend').classed('hidden', true);
}

// Section 5: Conclusion - return to status view
function showConclusion() {
    showWaiversByStatus();
}

// Create and show timeline visualization
function showTimelineVisualization() {
    const timelineDiv = d3.select('#timeline-viz');

    timelineDiv.html(''); // Clear previous content

    timelineDiv.append('div')
        .attr('class', 'timeline-header')
        .text('Implementation Dates');

    timelineDiv.append('div')
        .attr('class', 'timeline-bar');

    const labels = timelineDiv.append('div')
        .attr('class', 'timeline-labels');

    labels.append('span').text('Jan 2026');
    labels.append('span').text('Jun 2026');
    labels.append('span').text('Oct 2026');

    timelineDiv.classed('hidden', false);
}

// Export animation functions
window.animations = {
    resetToNeutral,
    showWaiversByStatus,
    showRestrictions,
    showImplementationTimeline,
    showConclusion
};
