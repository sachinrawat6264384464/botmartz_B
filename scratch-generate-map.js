const fs = require('fs');
const path = require('path');
const DottedMap = require('dotted-map').default || require('dotted-map');

function generateMap() {
  console.log('Generating dotted map SVG...');
  const map = new DottedMap({ height: 60, grid: 'diagonal' });
  const svg = map.getSVG({
    radius: 0.42,
    color: 'rgba(245, 194, 66, 0.4)',
    shape: 'circle',
    backgroundColor: 'transparent'
  });
  const outputPath = path.join(__dirname, 'public', 'dotted-map.svg');
  fs.writeFileSync(outputPath, svg, 'utf-8');
  console.log('Success! Dotted map SVG written to: ' + outputPath);
}

generateMap();
