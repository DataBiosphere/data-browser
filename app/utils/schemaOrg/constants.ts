/**
 * Schema.org Dataset constants shared by consumer-specific JSON-LD builders.
 */

/**
 * Google Dataset Search description-length bounds. Descriptions outside this
 * range may be rejected or downranked by Google's structured-data validator.
 *
 * See https://developers.google.com/search/docs/appearance/structured-data/dataset
 */
export const DESCRIPTION_LENGTH = {
  MAX: 5000,
  MIN: 50,
} as const;
