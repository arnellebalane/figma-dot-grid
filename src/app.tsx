import React, { useState, useEffect } from 'react';

export default App = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    window.onmessage = event => {
      const { type, data } = event.data.pluginMessage;
      if (type === 'config') {
        setConfig(data);
      }
    };
  });

  const handleSubmit = event => {
    event.preventDefault();
    parent.postMessage(
      {
        pluginMessage: {
          type: 'config',
          data: config
        }
      },
      '*'
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="field">
        <label for="width" class="label">
          Width
        </label>
        <input
          type="number"
          id="width"
          name="width"
          value={config.width}
          class="input"
        />
      </div>

      <div class="field">
        <label for="height" class="label">
          Height
        </label>
        <input
          type="number"
          id="height"
          name="height"
          value={config.height}
          class="input"
        />
      </div>

      <div class="field">
        <label for="size" class="label">
          Size
        </label>
        <input
          type="number"
          id="size"
          name="size"
          value={config.size}
          class="input"
        />
      </div>

      <div class="field">
        <label for="gap" class="label">
          Gap
        </label>
        <input
          type="number"
          id="gap"
          name="gap"
          value={config.gap}
          class="input"
        />
      </div>

      <div class="field">
        <label for="color" class="label">
          Color
        </label>
        <input
          type="text"
          id="color"
          name="color"
          value={config.color}
          class="input"
        />
      </div>

      <div class="actions">
        <button class="button button--primary">Generate</button>
      </div>
    </form>
  );
};
