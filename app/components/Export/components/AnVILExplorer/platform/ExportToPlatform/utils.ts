import type { FileLocation } from "@databiosphere/findable-ui/lib/hooks/useRequestFileLocation";
import type { PlatformImport } from "./types";

/**
 * Builds the platform import URL for the given signed PFB URL.
 * @param platformImport - Platform import endpoint and source.
 * @param signedUrl - Signed URL of the PFB to import.
 * @returns import URL, with the signed URL and source as query parameters.
 */
export function buildPlatformImportUrl(
  platformImport: PlatformImport,
  signedUrl: string
): string {
  const url = new URL(platformImport.baseUrl);
  url.searchParams.set("URL", signedUrl);
  url.searchParams.set("source", platformImport.source);
  return url.toString();
}

/**
 * Returns the platform import URL once the PFB location is available.
 * @param isEnabled - Whether the platform export feature flag is on.
 * @param platformImport - Platform import endpoint and source; undefined when the platform has none.
 * @param fileLocation - PFB file location; undefined until the manifest request succeeds.
 * @returns import URL, or undefined when the flag is off, the platform has no import endpoint, or the PFB location is not yet available.
 */
export function getPlatformImportUrl(
  isEnabled: boolean,
  platformImport: PlatformImport | undefined,
  fileLocation: FileLocation | undefined
): string | undefined {
  if (!isEnabled || !platformImport || !fileLocation) return undefined;
  return buildPlatformImportUrl(platformImport, fileLocation.location);
}

/**
 * Returns true if the platform import is available: the feature flag is on and the platform has an import endpoint.
 * @param isEnabled - Whether the platform export feature flag is on.
 * @param platformImport - Platform import endpoint and source; undefined when the platform has none.
 * @returns true if a platform import link can be built.
 */
export function isPlatformImportAvailable(
  isEnabled: boolean,
  platformImport: PlatformImport | undefined
): boolean {
  return isEnabled && platformImport !== undefined;
}
