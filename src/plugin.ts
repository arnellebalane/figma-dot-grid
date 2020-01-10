const DEFAULT_CONFIG = {
  width: 100,
  height: 100,
  size: 3,
  gap: 6,
  color: 'd2d6db'
};

figma.showUI(__html__, {
  width: 200,
  height: 240
});

figma.ui.postMessage({
  type: 'config',
  data: DEFAULT_CONFIG
});

figma.ui.onmessage = ({ type, data }) => {
  if (type === 'config') {
    const grid = createDotGrid(data);
    figma.currentPage.appendChild(grid);
    figma.currentPage.selection = [grid];
    figma.viewport.scrollAndZoomIntoView([grid]);
    figma.closePlugin();
  }
};

function createDotGrid({ width, height, size, gap, color } = DEFAULT_CONFIG) {
  // This frame will contain the generated dots for the dot grid.
  const grid = figma.createFrame();
  grid.name = 'Dot Grid';
  grid.backgrounds = [];
  grid.resize(width, height);

  // Generate the dots.
  const rows = Math.floor((height + gap) / (size + gap));
  const cols = Math.floor((width + gap) / (size + gap));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dot = figma.createEllipse();
      dot.resize(size, size);
      dot.fills = [{ type: 'SOLID', color: hex2rgb(color) }];
      dot.locked = true;
      dot.x = col * (size + gap);
      dot.y = row * (size + gap);

      grid.appendChild(dot);
    }
  }

  return grid;
}

function hex2rgb(hex) {
  const [_, r, g, b] = hex.match(
    /^#?([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})$/
  );
  return {
    r: parseInt(r, 16) / 255,
    g: parseInt(g, 16) / 255,
    b: parseInt(b, 16) / 255
  };
}
