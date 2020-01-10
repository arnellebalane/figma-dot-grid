(() => {
  const selection = figma.currentPage.selection;
  const gridSelection = selection.filter(hasPluginData);
  let grid;

  if (selection.length > 1) {
    return figma.closePlugin('Only one node can be selected');
  } else if (selection.length === 1 && gridSelection.length === 0) {
    return figma.closePlugin('Only dot grid nodes can be selected');
  } else if (selection.length === 1 && gridSelection.length === 1) {
    grid = selection[0];
  }

  const DEFAULT_CONFIG = {
    width: 100,
    height: 100,
    size: 3,
    gap: 6,
    color: 'd2d6db'
  };

  figma.showUI(__html__, { width: 200, height: 240 });

  const initialConfig = grid ? getPluginData(grid) : DEFAULT_CONFIG;
  figma.ui.postMessage(initialConfig);

  figma.ui.onmessage = data => {
    if (!grid) {
      grid = createGridFrame();
      figma.currentPage.appendChild(grid);
    }
    resizeGridFrame(grid, data);
    createGridDots(grid, data);
    setPluginData(grid, data);

    figma.currentPage.selection = [grid];
    figma.viewport.scrollAndZoomIntoView([grid]);
    figma.closePlugin();
  };
})();

function createGridFrame() {
  const grid = figma.createFrame();
  grid.name = 'Dot Grid';
  grid.backgrounds = [];
  return grid;
}

function resizeGridFrame(grid, { width, height }) {
  grid.resize(width, height);
  return grid;
}

function createGridDots(grid, { width, height, size, gap, color }) {
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

function setPluginData(grid, data) {
  grid.setPluginData('config', JSON.stringify(data));
}

function getPluginData(grid) {
  const data = grid.getPluginData('config');
  return data ? JSON.parse(data) : null;
}

function hasPluginData(grid) {
  return Boolean(grid.getPluginData('config'));
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
