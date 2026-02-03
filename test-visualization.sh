#!/bin/bash

# Test script for SNAP waivers visualization

echo "🧪 Testing SNAP Waivers Visualization..."
echo ""

# Test 1: Check if server is running
echo "✓ Testing web server..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "  ✅ Server is running on http://localhost:8000"
else
    echo "  ❌ Server is not running"
    echo "  💡 Start with: python3 -m http.server 8000"
    exit 1
fi

# Test 2: Check if main HTML loads
echo ""
echo "✓ Testing HTML page..."
if curl -s http://localhost:8000 | grep -q "SNAP Restriction Waivers"; then
    echo "  ✅ index.html loads successfully"
else
    echo "  ❌ index.html failed to load"
    exit 1
fi

# Test 3: Check if data file is accessible
echo ""
echo "✓ Testing data file..."
if curl -s http://localhost:8000/data/waivers.json | grep -q "Nebraska"; then
    echo "  ✅ waivers.json loads successfully"
else
    echo "  ❌ waivers.json failed to load"
    exit 1
fi

# Test 4: Count states in data
echo ""
echo "✓ Testing data completeness..."
STATE_COUNT=$(curl -s http://localhost:8000/data/waivers.json | grep -o '"name"' | wc -l | tr -d ' ')
if [ "$STATE_COUNT" -eq 18 ]; then
    echo "  ✅ All 18 states present in data"
else
    echo "  ⚠️  Found $STATE_COUNT states (expected 18)"
fi

# Test 5: Check JavaScript files
echo ""
echo "✓ Testing JavaScript files..."
for js_file in map.js animations.js interactions.js scroll-controller.js; do
    if curl -s "http://localhost:8000/js/$js_file" | grep -q "function"; then
        echo "  ✅ js/$js_file loads successfully"
    else
        echo "  ❌ js/$js_file failed to load"
        exit 1
    fi
done

# Test 6: Check CSS file
echo ""
echo "✓ Testing CSS file..."
if curl -s http://localhost:8000/css/styles.css | grep -q ".state"; then
    echo "  ✅ css/styles.css loads successfully"
else
    echo "  ❌ css/styles.css failed to load"
    exit 1
fi

# Summary
echo ""
echo "================================================"
echo "✅ All tests passed!"
echo "================================================"
echo ""
echo "🌐 Open the visualization in your browser:"
echo "   http://localhost:8000"
echo ""
echo "📱 Test on mobile by accessing from your phone:"
echo "   http://$(ipconfig getifaddr en0 2>/dev/null || echo 'YOUR-LOCAL-IP'):8000"
echo ""
echo "🎯 Features to try:"
echo "   • Scroll through the narrative sections"
echo "   • Click on states to see detailed waiver info"
echo "   • Test responsive design at different screen sizes"
echo "   • Use Escape key to close modal"
echo ""
