import { DESCRIPTION_LENGTH } from "./constants";

/**
 * Builds a Schema.org description string from a raw entity description, padding
 * short or empty values by prepending the entity name and appending a
 * caller-supplied fallback suffix. The padded result is `name — suffix` (or
 * `name — source — suffix` when the source description is non-empty but short),
 * relying on the entity name's length plus the suffix to clear Google's
 * 50-character description minimum in practice.
 * @param sourceDescription - Raw description (may contain HTML, may be empty).
 * @param name - Entity name used in the padded fallback. Prepended to the
 * output; its length is the main contributor to clearing the 50-char minimum
 * when the source description is short or empty.
 * @param fallbackSuffix - Caller-owned suffix (e.g. catalog + entity kind)
 * appended after the name and (when present) the source description. The
 * caller controls phrasing and punctuation; the helper does not add a period.
 * @returns HTML-stripped description, padded when short, truncated when long.
 */
export function buildDescription(
  sourceDescription: string,
  name: string,
  fallbackSuffix: string
): string {
  const stripped = stripHtmlTags(sourceDescription || "");
  if (stripped.length >= DESCRIPTION_LENGTH.MIN) {
    return truncateDescription(stripped);
  }
  const padded = stripped
    ? `${name} — ${stripped} — ${fallbackSuffix}`
    : `${name} — ${fallbackSuffix}`;
  return truncateDescription(padded);
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
  if (description.length <= DESCRIPTION_LENGTH.MAX) return description;
  return description.slice(0, DESCRIPTION_LENGTH.MAX - 1) + "…";
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
