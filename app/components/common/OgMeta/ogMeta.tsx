import NextHead from "next/head";
import { useRouter } from "next/router";
import { JSX } from "react";
import type { OgMetaProps } from "./types";

/**
 * Builds the canonical path from the router's asPath, stripping query and hash.
 * @param asPath - The router's asPath value.
 * @returns clean path.
 */
function buildPath(asPath: string): string {
  return asPath.split("?")[0].split("#")[0];
}

/**
 * Builds the OG title from the page title and app title.
 * @param appTitle - The application title.
 * @param pageTitle - The page-specific title.
 * @returns formatted title.
 */
function buildTitle(appTitle: string, pageTitle?: string | null): string {
  if (pageTitle && pageTitle !== appTitle) {
    return `${pageTitle} - ${appTitle}`;
  }
  return appTitle;
}

/**
 * Renders Open Graph and Twitter meta tags for rich link sharing.
 * @param props - The component props.
 * @param props.appTitle - The application title.
 * @param props.browserURL - The site's base URL.
 * @param props.defaultDescription - Fallback description when no page description is provided.
 * @param props.pageDescription - Page-specific description.
 * @param props.pageTitle - Page-specific title.
 * @returns head element with meta tags.
 */
export const OgMeta = ({
  appTitle,
  browserURL,
  defaultDescription,
  pageDescription,
  pageTitle,
}: OgMetaProps): JSX.Element => {
  const { asPath } = useRouter();
  const description = pageDescription || defaultDescription;
  const image = `${browserURL}/og/og-image.png`;
  const path = buildPath(asPath);
  const title = buildTitle(appTitle, pageTitle);
  const url = `${browserURL}${path}`;
  return (
    <NextHead>
      <meta key="description" content={description} name="description" />
      <meta
        key="og:description"
        content={description}
        property="og:description"
      />
      <meta key="og:image" content={image} property="og:image" />
      <meta key="og:image:height" content="630" property="og:image:height" />
      <meta key="og:image:width" content="1200" property="og:image:width" />
      <meta key="og:site_name" content={appTitle} property="og:site_name" />
      <meta key="og:title" content={title} property="og:title" />
      <meta key="og:type" content="website" property="og:type" />
      <meta key="og:url" content={url} property="og:url" />
      <meta
        key="twitter:card"
        content="summary_large_image"
        name="twitter:card"
      />
      <meta key="twitter:image" content={image} name="twitter:image" />
    </NextHead>
  );
};
