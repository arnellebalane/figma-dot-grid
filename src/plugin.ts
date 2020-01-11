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

  let initialConfig = DEFAULT_CONFIG;
  if (grid) {
    initialConfig = {
      ...getPluginData(grid),
      width: grid.width,
      height: grid.height,
      editing: true
    };
  }
  figma.ui.postMessage(initialConfig);

  figma.ui.onmessage = async data => {
    if (grid) {
      clearGridFrame(grid);
    } else {
      grid = createGridFrame();
      figma.currentPage.appendChild(grid);
    }

    resizeGridFrame(grid, data);
    await createGridDots(grid, data);
    setPluginData(grid, data);

    figma.currentPage.selection = [grid];
    figma.viewport.scrollAndZoomIntoView([grid]);
    figma.closePlugin();
  };

  figma.on('selectionchange', figma.closePlugin);
  figma.on('currentpagechange', figma.closePlugin);
})();

function createGridFrame() {
  const grid = figma.createFrame();
  grid.name = 'Dot Grid';
  grid.backgrounds = [];
  return grid;
}

function clearGridFrame(grid) {
  grid.children.map(node => node.remove());
}

function resizeGridFrame(grid, { width, height }) {
  grid.resize(width, height);
}

async function createGridDots(grid, { width, height, size, gap, color }) {
  const rows = Math.floor((height + gap) / (size + gap));
  const cols = Math.floor((width + gap) / (size + gap));

  const rowFrame = figma.createFrame();
  rowFrame.locked = true;
  rowFrame.backgrounds = [];
  rowFrame.resize(width, size + gap);

  await asyncRange(cols, col => {
    const dot = figma.createEllipse();
    dot.resize(size, size);
    dot.fills = [{ type: 'SOLID', color: hex2rgb(color) }];
    dot.x = col * (size + gap);
    dot.y = 0;
    rowFrame.appendChild(dot);
  });

  await asyncRange(rows, row => {
    const currentRow = rowFrame.clone();
    currentRow.x = 0;
    currentRow.y = row * (size + gap);
    grid.appendChild(currentRow);
  });

  rowFrame.remove();
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

function asyncRange(max, callback) {
  let i = 0;
  return new Promise(resolve => {
    const run = () => {
      callback(i);
      return ++i < max ? setTimeout(run, 0) : resolve();
    };
    run();
  });
}
