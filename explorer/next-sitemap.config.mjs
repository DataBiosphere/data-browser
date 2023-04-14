/** @type {import('next-sitemap').IConfig} */
const siteMapConfig = {
  changefreq: "monthly",
  generateIndexSitemap: false,
  siteUrl: process.env.BROWSER_URL,
};

export default siteMapConfig;
