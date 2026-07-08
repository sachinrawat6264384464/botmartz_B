import fs from 'fs';
import path from 'path';
import DottedMap from 'dotted-map';

function generateMap() {
  console.log('Generating dotted map SVG...');
  // Height 60 matching client-side config
  const map = new DottedMap.default({ height: 60, grid: "diagonal" });
  
  // Radius and styles matching client configuration
  const svg = map.getSVG({
    radius: 0.42,
    color: 'rgba(245, 194, 66, 0.4)', // ACCENT_COLOR 60% opacity default
    shape: 'circle',
    backgroundColor: 'transparent'
  });

  const outputPath = path.join(process.cwd(), 'public', 'dotted-map.svg');
  fs.writeFileSync(outputPath, svg, 'utf-8');
  console.log(`Success! Dotted map SVG written to: ${outputPath}`);
}

generateMap();
