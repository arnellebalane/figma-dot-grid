// const nodes: SceneNode[] = [];
// for (let i = 0; i < numberOfRectangles; i++) {
//   const rect = figma.createRectangle();
//   rect.x = i * 150;
//   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//   figma.currentPage.appendChild(rect);
//   nodes.push(rect);
// }

const GRID_DEFAULTS = {
  width: 100,
  height: 100,
  size: 8,
  gap: 4,
  color: 'red'
};

function createDotGrid(options=GRID_DEFAULTS) {
  const grid = figma.createFrame();
  grid.name = 'Dot Grid';

  return grid;
}

const grid = createDotGrid();
figma.currentPage.appendChild(grid);

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
