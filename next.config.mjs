import nextMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";

const ESM_PACKAGES = [
  "ky",
  "@databiosphere/findable-ui",
  // "@mui/icons-material",
  // "@mui/material",
  // "@mui/system",
  // "@mui/types",
  // "@mui/utils",
  // "@emotion/react",
  // "@emotion/styled",
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
      // config.resolve.alias["@emotion/react"] = r("@emotion/react");
      // config.resolve.alias["@emotion/styled"] = r("@emotion/styled");
      // config.resolve.alias["@mui/material"] = r("@mui/material");
      // config.resolve.alias["@mui/system"] = r("@mui/system");
      // config.resolve.alias["@mui/icons-material"] = r("@mui/icons-material");
      // config.resolve.alias["@mui/utils"] = r("@mui/utils");
      config.resolve.alias["react"] = r("react");
      config.resolve.alias["react-dom"] = r("react-dom");
      return config;
    },
  }
);
