import withPlugins from "next-compose-plugins";
import withOptimizedImages from "next-optimized-images";

export default withPlugins([
  [
    withOptimizedImages,
    {
      optimizeImagesInDev: true,
      handleImages: ["jpeg", "png", "svg"],
      imagesFolder: "images",
    },
  ],
  {
    basePath: "/explore",
    reactStrictMode: true,
    images: {
      disableStaticImages: true,
    },
  },
]);
