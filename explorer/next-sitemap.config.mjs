/** @type {import('next-sitemap').IConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SEPARATOR = ",";

const siteMapConfig = {
  changefreq: "monthly",
  exclude: (process.env.SITEMAP_EXCLUDE ?? "").split(SEPARATOR),
  generateIndexSitemap: false,
  outDir: `./out${basePath}`,
  siteUrl: `${process.env.NEXT_PUBLIC_SITEMAP_DOMAIN}${basePath}`, // TODO(cc) where is this being used? Should there be a slash between NEXT_PUBLIC_SITEMAP_DOMAIN and basePath?
};

export default siteMapConfig;
