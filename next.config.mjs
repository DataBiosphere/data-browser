import nextMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import path from "path";

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
    transpilePackages: ["@databiosphere/findable-ui"],
  }
);
