import { TagWarning } from "@databiosphere/findable-ui/lib/components/common/Tag/tag.styles";
import { MDXComponents } from "mdx/types";
import { HelpIconButton } from "./app/components/common/MDXContent/components/HelpIconButton/helpIconButton";
import { Link } from "./app/components/common/MDXContent/components/Link/link";

const REGEX_URL = /{(portalURL|browserURL)}/g;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    HelpIconButton,
    TagWarning,
    a: Link,
  };
}

/**
 * If the URL contains "{portalURL}" or "{browserURL}", replace it with the corresponding configured value.
 * @param url - URL.
 * @param browserURL - Browser URL.
 * @param portalURL - Portal URL.
 * @returns URL.
 */
export function getURL(
  url = "",
  browserURL?: string,
  portalURL?: string
): string {
  return decodeURI(url).replace(REGEX_URL, (match) =>
    switchMatch(match, browserURL, portalURL)
  );
}

/**
 * Switch the match to the corresponding configured value.
 * @param match - Match.
 * @param browserURL - Browser URL.
 * @param portalURL - Portal URL.
 * @returns configured value.
 */
export function switchMatch(
  match: string,
  browserURL?: string,
  portalURL?: string
): string {
  switch (match) {
    case "{portalURL}":
      return portalURL ?? match;
    case "{browserURL}":
      return browserURL ?? match;
    default:
      return match;
  }
}
