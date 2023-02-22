import withPlugins from "next-compose-plugins";
import withOptimizedImages from "next-optimized-images";
import path from "path";

export default withPlugins(
  [
    [
      withOptimizedImages,
      {
        optimizeImagesInDev: true,
        handleImages: ["jpeg", "png", "svg"],
        imagesFolder: "images",
      },
    ],
  ],
  {
    basePath: "/explore",
    reactStrictMode: true,
    images: {
      disableStaticImages: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
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
      config.resolve.alias["uuid"] = path.resolve(
        process.cwd(),
        "node_modules/uuid"
      );
      return config;
    },
  }
);
