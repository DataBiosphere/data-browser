import { ROUTES } from "../../site-config/anvil-cmg/dev/export/routes";
import { isUnavailablePlatformExportRoute } from "../../site-config/anvil-cmg/dev/export/utils";

describe("isUnavailablePlatformExportRoute", () => {
  it.each([ROUTES.CANCER_GENOMICS_CLOUD, ROUTES.CAVATICA])(
    "returns true for %s, which has no import endpoint",
    (route) => {
      expect(isUnavailablePlatformExportRoute(route)).toBe(true);
    }
  );

  it("returns false for BioData Catalyst, which has an import endpoint", () => {
    expect(isUnavailablePlatformExportRoute(ROUTES.BIO_DATA_CATALYST)).toBe(
      false
    );
  });

  it.each([ROUTES.CURL_DOWNLOAD, ROUTES.MANIFEST_DOWNLOAD, ROUTES.TERRA])(
    "returns false for %s, which is not a platform export",
    (route) => {
      expect(isUnavailablePlatformExportRoute(route)).toBe(false);
    }
  );

  it("returns false for an unknown route", () => {
    expect(isUnavailablePlatformExportRoute("/export/unknown")).toBe(false);
  });
});
