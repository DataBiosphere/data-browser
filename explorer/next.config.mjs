import withMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import withOptimizedImages from "next-optimized-images";
import path from "path";

export default withPlugins(
  [
    [
      withOptimizedImages,
      {
        handleImages: ["jpeg", "png", "svg"],
        imagesFolder: "images",
        inlineImageLimit: -1,
        optimizeImagesInDev: true,
      },
    ],
    withMDX,
  ],
  {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/explore",
    reactStrictMode: true,
    images: {
      disableStaticImages: true,
    },
    webpack: (config, { buildId, defaultLoaders, dev, isServer, webpack }) => {
      config.module = {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.mdx?$/,
            use: [
              {
                loader: "@mdx-js/loader",
              },
            ],
          },
        ],
      };
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
      config.resolve.alias["@tanstack/react-table"] = path.resolve(
        process.cwd(),
        "node_modules/@tanstack/react-table"
      );
      config.resolve.alias["axios"] = path.resolve(
        process.cwd(),
        "node_modules/axios"
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
      config.resolve.alias["uuid"] = path.resolve(
        process.cwd(),
        "node_modules/uuid"
      );
      return config;
    },
  }
);
