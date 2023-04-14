/** @type {import('next-sitemap').IConfig} */
const siteMapConfig = {
  changefreq: "monthly",
  generateIndexSitemap: false,
  outDir: "./out/explore",
  siteUrl: `${process.env.NEXT_PUBLIC_SITEMAP_DOMAIN}${
    process.env.NEXT_PUBLIC_BASE_PATH || "/explore"
  }`,
};

export default siteMapConfig;
