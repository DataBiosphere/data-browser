import type { FileLocation } from "@databiosphere/findable-ui/lib/hooks/useRequestFileLocation";
import type { PlatformImport } from "../../app/components/Export/components/AnVILExplorer/platform/ExportToPlatform/types";
import {
  buildPlatformImportUrl,
  getPlatformImportUrl,
  isPlatformImportAvailable,
} from "../../app/components/Export/components/AnVILExplorer/platform/ExportToPlatform/utils";

const PLATFORM_IMPORT: PlatformImport = {
  baseUrl: "https://platform.sb.biodatacatalyst.nhlbi.nih.gov/import/pfb",
  source: "bdc",
};

const SIGNED_URL =
  "https://storage.googleapis.com/bucket/manifest.avro?X-Goog-Signature=a%2Fb&X-Goog-Expires=3600";

const IMPORT_URL =
  "https://platform.sb.biodatacatalyst.nhlbi.nih.gov/import/pfb?URL=https%3A%2F%2Fstorage.googleapis.com%2Fbucket%2Fmanifest.avro%3FX-Goog-Signature%3Da%252Fb%26X-Goog-Expires%3D3600&source=bdc";

const FILE_LOCATION: FileLocation = { location: SIGNED_URL, status: 302 };

describe("buildPlatformImportUrl", () => {
  it("encodes the signed URL and appends the source", () => {
    expect(buildPlatformImportUrl(PLATFORM_IMPORT, SIGNED_URL)).toBe(
      IMPORT_URL
    );
  });

  it("round-trips the signed URL through the URL parameter", () => {
    const url = new URL(buildPlatformImportUrl(PLATFORM_IMPORT, SIGNED_URL));
    expect(url.searchParams.get("URL")).toBe(SIGNED_URL);
    expect(url.searchParams.get("source")).toBe("bdc");
  });
});

describe("getPlatformImportUrl", () => {
  it("returns the import URL when enabled with a config and file location", () => {
    expect(getPlatformImportUrl(true, PLATFORM_IMPORT, FILE_LOCATION)).toBe(
      IMPORT_URL
    );
  });

  it("returns an empty string when the feature flag is off", () => {
    expect(getPlatformImportUrl(false, PLATFORM_IMPORT, FILE_LOCATION)).toBe(
      ""
    );
  });

  it("returns an empty string when the platform has no import config", () => {
    expect(getPlatformImportUrl(true, undefined, FILE_LOCATION)).toBe("");
  });

  it("returns an empty string before the file location is available", () => {
    expect(getPlatformImportUrl(true, PLATFORM_IMPORT, undefined)).toBe("");
  });
});

describe("isPlatformImportAvailable", () => {
  it("returns true when enabled with a config", () => {
    expect(isPlatformImportAvailable(true, PLATFORM_IMPORT)).toBe(true);
  });

  it("returns false when the feature flag is off", () => {
    expect(isPlatformImportAvailable(false, PLATFORM_IMPORT)).toBe(false);
  });

  it("returns false when the platform has no import config", () => {
    expect(isPlatformImportAvailable(true, undefined)).toBe(false);
  });
});
