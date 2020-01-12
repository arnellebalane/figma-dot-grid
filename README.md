<img src="logo.png" alt="Dot Grid Logo" height="80px" />

---

Easily generate dot grids for your Figma designs.

The following properties can be configured: **grid width**, **grid height**,
**dot size**, **dot color**, **grid gap**.

## Issues and feature requests

If you encounter any issues while using the plugin, or have a feature that you
would like to see added to it, please [open an issue](https://github.com/arnellebalane/figma-dot-grid/issues/new)
describing the problem or feature.

The plugin as it is now already addresses my personal use cases, but I will
definitely consider additional features if they make sense.

## Development

**Dependencies:**

- [NodeJS](https://nodejs.org/) (at least the latest LTS)
- [Figma Desktop App](https://www.figma.com/downloads/)

```bash
# Clone the repository
git clone git@github.com:arnellebalane/figma-dot-grid.git

# Install dependencies
npm ci

# Build the project
npm run build
```

To load the plugin from your local file system:

- Open the Figma desktop app
- From the sidebar, go to the **Plugins** page
- From the Plugins page's right-hand sidebar, there should be a section called
  **Development**, click on the "+" button beside the section label.
- A **Create a plugin** dialog should appear. Choose **Link existing plugin**,
  and select the `manifest.json` file from this project.
- You should now have a local version of this plugin available in your Figma.
