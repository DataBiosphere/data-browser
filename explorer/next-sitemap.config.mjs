/** @type {import('next-sitemap').IConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/explore";

const siteMapConfig = {
  changefreq: "monthly",
  generateIndexSitemap: false,
  outDir: `./out${basePath}`,
  siteUrl: `${process.env.NEXT_PUBLIC_SITEMAP_DOMAIN}${basePath}`,
};

export default siteMapConfig;
