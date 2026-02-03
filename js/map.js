// Map setup and rendering
let waiverData = null;
let statesGeoData = null;
let svg = null;
let g = null;
let projection = null;
let path = null;

// Load data and initialize map
async function initMap() {
    try {
        // Load waiver data
        const response = await fetch('data/waivers.json');
        waiverData = await response.json();

        // Load US states TopoJSON from external source
        const usData = await d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
        statesGeoData = topojson.feature(usData, usData.objects.states);

        // Set up SVG
        svg = d3.select('#us-map');
        const width = 900;
        const height = 600;

        svg.attr('viewBox', `0 0 ${width} ${height}`)
           .attr('preserveAspectRatio', 'xMidYMid meet');

        // Create projection (Albers USA for standard US map)
        projection = d3.geoAlbersUsa()
            .scale(1100)
            .translate([width / 2, height / 2]);

        path = d3.geoPath().projection(projection);

        // Create group for states
        g = svg.append('g');

        // Create state ID to abbr mapping
        const stateIdMap = {
            '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
            '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
            '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
            '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
            '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
            '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
            '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
            '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
            '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
            '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
            '56': 'WY'
        };

        // Create waiver state lookup
        const waiverStates = {};
        waiverData.states.forEach(state => {
            waiverStates[state.abbr] = state;
        });

        // Draw states
        g.selectAll('path')
            .data(statesGeoData.features)
            .enter()
            .append('path')
            .attr('class', 'state neutral')
            .attr('d', path)
            .attr('data-state', d => stateIdMap[d.id])
            .attr('data-has-waiver', d => {
                const abbr = stateIdMap[d.id];
                return waiverStates[abbr] ? 'true' : 'false';
            })
            .each(function(d) {
                const abbr = stateIdMap[d.id];
                if (waiverStates[abbr]) {
                    this.__data__.waiverData = waiverStates[abbr];
                }
            });

        console.log('Map initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing map:', error);
        return false;
    }
}

// Get state element by abbreviation
function getStateElement(abbr) {
    return g.select(`path[data-state="${abbr}"]`);
}

// Get all waiver states
function getWaiverStates() {
    return g.selectAll('path[data-has-waiver="true"]');
}

// Get all non-waiver states
function getNonWaiverStates() {
    return g.selectAll('path[data-has-waiver="false"]');
}

// Calculate color for implementation date gradient
function getImplementationColor(dateString) {
    const date = new Date(dateString);
    const minDate = new Date('2026-01-01');
    const maxDate = new Date('2026-10-01');

    // Calculate position between min and max (0 to 1)
    const range = maxDate - minDate;
    const position = (date - minDate) / range;

    // Interpolate between dark blue (early) and light blue (late)
    const startColor = d3.rgb(30, 136, 229); // #1e88e5
    const endColor = d3.rgb(144, 202, 249); // #90caf9

    return d3.interpolateRgb(startColor, endColor)(position);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Export functions for use in other modules
window.mapUtils = {
    initMap,
    getStateElement,
    getWaiverStates,
    getNonWaiverStates,
    getImplementationColor,
    formatDate,
    waiverData: () => waiverData,
    statesGeoData: () => statesGeoData
};
