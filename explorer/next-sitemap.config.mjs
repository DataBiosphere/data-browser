/** @type {import('next-sitemap').IConfig} */
const siteMapConfig = {
  changefreq: "monthly",
  generateIndexSitemap: false,
  siteUrl: process.env.NEXT_PUBLIC_SITEMAP_DOMAIN,
};

export default siteMapConfig;
