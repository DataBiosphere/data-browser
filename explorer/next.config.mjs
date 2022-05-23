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
    reactStrictMode: true,
    images: {
      disableStaticImages: true,
    },
  },
]);
