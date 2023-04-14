/* eslint-disable sonarjs/no-duplicate-string -- comment */
const URLS = {
  "anvil-catalog-dev": "https://anvil-portal.dev.clevercanary.com",
  "anvil-catalog-prod": "https://anvil-portal.dev.clevercanary.com",
  "anvil-cmg-dev": "https://anvil.gi.ucsc.edu",
  "anvil-cmg-prod": "https://anvil.gi.ucsc.edu",
  "anvil-dev": "https://anvil-portal.dev.clevercanary.com",
  "anvil-prod": "https://anvilproject.org/",
  "hca-dcp-dev": "https://dev.singlecell.gi.ucsc.edu",
  "hca-dcp-prod": "https://data.humancellatlas.org",
  "lungmap-dev": "https://data-browser.dev.lungmap.net",
  "lungmap-prod": "https://data-browser.lungmap.net",
  "ncpi-catalog-dev": "https://anvil-portal.dev.clevercanary.com",
  "ncpi-catalog-dug-dev": "https://anvil-portal.dev.clevercanary.com",
  "ncpi-catalog-dug-prod": "https://anvil-portal.dev.clevercanary.com",
  "ncpi-catalog-prod": "https://anvil-portal.dev.clevercanary.com",
};
/* eslint-enable sonarjs/no-duplicate-string -- comment */

/** @type {import('next-sitemap').IConfig} */
const siteMapConfig = {
  changefreq: "monthly",
  generateIndexSitemap: false,
  siteUrl: URLS[process.env.NEXT_PUBLIC_SITE_CONFIG],
};

export default siteMapConfig;
