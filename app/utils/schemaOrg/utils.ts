import { DESCRIPTION_LENGTH } from "./constants";

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
