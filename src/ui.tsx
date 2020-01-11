import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const useDotGridConfig = () => {
  const [config, setConfig] = useState({});
  const postConfig = () => parent.postMessage({ pluginMessage: config }, '*');

  useEffect(() => {
    const handleMessage = event => setConfig(event.data.pluginMessage);
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  });

  return [config, setConfig, postConfig];
};

const App = () => {
  const [config, setConfig, postConfig] = useDotGridConfig();

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
          min="1"
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
          min="1"
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
          min="1"
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
          min="0"
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
        <button class="button button--primary">
          {config.editing ? 'Update' : 'Generate'}
        </button>
      </div>
    </form>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
