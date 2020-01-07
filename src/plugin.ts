const GRID_DEFAULTS = {
  width: 100,
  height: 100,
  size: 3,
  gap: 6,
  color: { r: 0.823529412, g: 0.839215686, b: 0.858823529 } // #d2d6db
};

function createDotGrid({ width, height, size, gap, color } = GRID_DEFAULTS) {
  // This frame will contain the generated dots for the dot grid.
  const grid = figma.createFrame();
  grid.name = 'Dot Grid';
  grid.backgrounds = [];

  // Generate the dots.
  const rows = Math.floor((height + gap) / (size + gap));
  const cols = Math.floor((width + gap) / (size + gap));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dot = figma.createEllipse();
      dot.resize(size, size);
      dot.fills = [{ type: 'SOLID', color }];
      dot.locked = true;
      dot.x = col * (size + gap);
      dot.y = row * (size + gap);

      grid.appendChild(dot);
    }
  }

  return grid;
}

const grid = createDotGrid();
figma.currentPage.appendChild(grid);
figma.currentPage.selection = [grid];
figma.viewport.scrollAndZoomIntoView([grid]);

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
