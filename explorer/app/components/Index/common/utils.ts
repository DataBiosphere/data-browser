// App dependencies
import { MetadataValue } from "./entities";

/**
 * String-concatenates the specified list of metadata values to a string value, joined by a comma ",".
 * @param metadataValues - List of metadata values.
 * @returns the metadata values in a string, each value joined by a comma.
 */
export function stringifyMetadataValues(
  metadataValues: MetadataValue[]
): string {
  return metadataValues.join(", ");
}
