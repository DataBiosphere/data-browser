import nextMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import path from "path";

const ESM_PACKAGES = [
  "ky",
  "@databiosphere/findable-ui",
  "@observablehq/plot",
  "@tanstack/react-table",
  "@tanstack/react-virtual",
  "@mui/material",
  "@mui/system",
  "@mui/icons-material",
  "@mui/utils",
];

const r = (pkg) => path.resolve(process.cwd(), "node_modules", pkg);

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
      config.resolve.alias["react"] = r("react");
      config.resolve.alias["react-dom"] = r("react-dom");
      return config;
    },
  }
);
