/**
 * Shared Schema.org Dataset types and helpers used by per-consumer JSON-LD
 * builders (HCA DCP, AnVIL, LungMAP). Each consumer composes its own
 * `SchemaDataset` from its source entity and renders it via the shared
 * `JsonLd` component.
 *
 * See https://developers.google.com/search/docs/appearance/structured-data/dataset
 * for Google's Dataset structured data guidelines.
 */

/**
 * Google Dataset Search caps description at 5000 characters.
 */
export const MAX_DESCRIPTION_LENGTH = 5000;

/**
 * Schema.org DataCatalog type.
 */
export interface SchemaDataCatalog {
  "@type": "DataCatalog";
  name: string;
  url: string;
}

/**
 * Schema.org DataDownload type.
 */
export interface SchemaDataDownload {
  "@type": "DataDownload";
  contentUrl: string;
  encodingFormat?: string;
}

/**
 * Schema.org Organization type.
 */
export interface SchemaOrganization {
  "@type": "Organization";
  name: string;
}

/**
 * Schema.org Person type.
 */
export interface SchemaPerson {
  "@type": "Person";
  affiliation?: SchemaOrganization;
  name: string;
}

/**
 * Schema.org ScholarlyArticle type.
 */
export interface SchemaScholarlyArticle {
  "@type": "ScholarlyArticle";
  author?: SchemaPerson[];
  headline: string;
  name: string;
  sameAs?: string;
}

/**
 * Schema.org Dataset JSON-LD structure.
 */
export interface SchemaDataset {
  "@context": "https://schema.org";
  "@type": "Dataset";
  citation?: SchemaScholarlyArticle[];
  creator?: (SchemaPerson | SchemaOrganization)[];
  description: string;
  distribution?: SchemaDataDownload[];
  identifier: string[];
  includedInDataCatalog: SchemaDataCatalog;
  isAccessibleForFree: boolean;
  keywords?: string[];
  measurementTechnique?: string[];
  name: string;
  sameAs?: string[];
  url: string;
}

/**
 * Strips HTML tags and collapses whitespace from a description string.
 * @param value - Source description (may contain HTML).
 * @returns Plain text suitable for embedding in JSON-LD.
 */
export function stripHtmlTags(value: string): string {
  return (
    value
      // eslint-disable-next-line sonarjs/slow-regex -- `[^>]+` is bounded by the next `>` or end-of-input; no nested quantifiers or alternation, so backtracking is linear.
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Truncates a description to the Google Dataset Search maximum, appending an
 * ellipsis when truncation occurs.
 * @param description - Plain text description.
 * @returns Truncated description.
 */
export function truncateDescription(description: string): string {
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  return description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + "…";
}

/**
 * Escapes a JSON string for safe embedding inside an HTML `<script>` tag.
 * Prevents script-context breakout via `</script>` or HTML entity injection.
 * @param json - Serialised JSON to embed.
 * @returns Escaped JSON safe for `dangerouslySetInnerHTML`.
 */
export function escapeJsonForHtml(json: string): string {
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * De-duplicates and removes empty/null/undefined entries from a string array.
 * @param values - Source array (may contain null, undefined, or duplicates).
 * @returns Deduplicated array of non-empty strings, preserving first-seen order.
 */
export function uniqueNonEmpty(
  values: (string | null | undefined)[]
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}
