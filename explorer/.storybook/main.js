const path = require("path");
const toPath = (filePath) => path.join(process.cwd(), filePath);
module.exports = {
  stories: ["../app/**/*.stories.mdx", "../app/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          app: path.resolve(__dirname, "../app"),
          images: path.resolve(__dirname, "../images"),
          "site-config": path.resolve(__dirname, "../site-config"),
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    };
  },
  docs: {
    autodocs: true,
  },
};
