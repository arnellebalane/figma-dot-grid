import React, { useState, useEffect } from 'react';

const usePluginMessage = (key, initialValue) => {
  const [state, setState] = useState(initialValue);
  const postState = () => {
    parent.postMessage({ pluginMessage: { type: key, data: state } }, '*');
  };

  useEffect(() => {
    const handleMessage = event => {
      const { type, data } = event.data.pluginMessage;
      if (type === key) {
        setState(data);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  });

  return [state, setState, postState];
};

export default App = () => {
  const [config, setConfig, postConfig] = usePluginMessage('config', {});

  const handleChange = event => {
    let { name, type, value } = event.target;
    if (type === 'number') {
      value = parseInt(value, 10);
    }
    setConfig({ ...config, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    postConfig();
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
          class="input"
          value={config.width}
          onChange={handleChange}
          required
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
          class="input"
          value={config.height}
          onChange={handleChange}
          required
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
          class="input"
          value={config.size}
          onChange={handleChange}
          required
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
          class="input"
          value={config.gap}
          onChange={handleChange}
          required
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
          class="input"
          value={config.color}
          onChange={handleChange}
          required
        />
      </div>

      <div class="actions">
        <button class="button button--primary">Generate</button>
      </div>
    </form>
  );
};
