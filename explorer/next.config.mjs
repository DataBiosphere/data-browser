import nextMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import path from "path";

const ESM_PACKAGES = [
  "ky",
  "@databiosphere/findable-ui",
  "@tanstack/react-table",
];

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withPlugins(
  [
    withMDX,
    {
      pageExtensions: ["md", "mdx", "ts", "tsx"],
    },
  ],
  {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    images: {
      unoptimized: true,
    },
    output: "export",
    reactStrictMode: true,
    staticPageGenerationTimeout: 120,
    transpilePackages: [...ESM_PACKAGES],
    webpack: (config) => {
      // Add the alias for the peer dependency
      config.resolve.alias["@emotion/react"] = path.resolve(
        process.cwd(),
        "node_modules/@emotion/react"
      );
      config.resolve.alias["@emotion/styled"] = path.resolve(
        process.cwd(),
        "node_modules/@emotion/styled"
      );
      config.resolve.alias["@mui/icons-material"] = path.resolve(
        process.cwd(),
        "node_modules/@mui/icons-material"
      );
      config.resolve.alias["@mui/material"] = path.resolve(
        process.cwd(),
        "node_modules/@mui/material"
      );
      config.resolve.alias["react-dropzone"] = path.resolve(
        process.cwd(),
        "node_modules/react-dropzone"
      );
      config.resolve.alias["isomorphic-dompurify"] = path.resolve(
        process.cwd(),
        "node_modules/isomorphic-dompurify"
      );
      config.resolve.alias["match-sorter"] = path.resolve(
        process.cwd(),
        "node_modules/match-sorter"
      );
      config.resolve.alias["next"] = path.resolve(
        process.cwd(),
        "node_modules/next"
      );
      config.resolve.alias["react"] = path.resolve(
        process.cwd(),
        "node_modules/react"
      );
      config.resolve.alias["react-dom"] = path.resolve(
        process.cwd(),
        "node_modules/react-dom"
      );
      config.resolve.alias["react-gtm-module"] = path.resolve(
        process.cwd(),
        "node_modules/react-gtm-module"
      );
      config.resolve.alias["react-window"] = path.resolve(
        process.cwd(),
        "node_modules/react-window"
      );
      config.resolve.alias["uuid"] = path.resolve(
        process.cwd(),
        "node_modules/uuid"
      );
      config.resolve.alias["validate.js"] = path.resolve(
        process.cwd(),
        "node_modules/validate.js"
      );
      return config;
    },
  }
);
