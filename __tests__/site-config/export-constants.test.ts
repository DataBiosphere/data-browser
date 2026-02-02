import {
  EXPORTS,
  EXPORT_METHODS,
} from "../../site-config/anvil-cmg/dev/export/constants";
import { ROUTES } from "../../site-config/anvil-cmg/dev/export/routes";

describe("ROUTES constants", () => {
  it("has all required export routes defined", () => {
    expect(ROUTES.BIO_DATA_CATALYST).toBeDefined();
    expect(ROUTES.CAVATICA).toBeDefined();
    expect(ROUTES.CANCER_GENOMICS_CLOUD).toBeDefined();
    expect(ROUTES.MANIFEST_DOWNLOAD).toBeDefined();
    expect(ROUTES.TERRA).toBeDefined();
  });

  it("all routes are valid URL paths starting with /export/", () => {
    Object.values(ROUTES).forEach((route) => {
      expect(route).toMatch(/^\/export\/.+$/);
    });
  });

  it("no duplicate routes exist", () => {
    const routes = Object.values(ROUTES);
    const uniqueRoutes = new Set(routes);
    expect(uniqueRoutes.size).toBe(routes.length);
  });

  it("has correct route for BioData Catalyst", () => {
    expect(ROUTES.BIO_DATA_CATALYST).toBe("/export/biodata-catalyst");
  });

  it("has correct route for CAVATICA", () => {
    expect(ROUTES.CAVATICA).toBe("/export/cavatica");
  });

  it("has correct route for Cancer Genomics Cloud", () => {
    expect(ROUTES.CANCER_GENOMICS_CLOUD).toBe("/export/cancer-genomics-cloud");
  });
});

describe("EXPORTS constants", () => {
  const REQUIRED_EXPORT_KEYS = [
    "buttonLabel",
    "description",
    "successTitle",
    "title",
  ] as const;

  describe("structure validation", () => {
    it("has all three platform exports defined", () => {
      expect(EXPORTS.BIO_DATA_CATALYST).toBeDefined();
      expect(EXPORTS.CAVATICA).toBeDefined();
      expect(EXPORTS.CANCER_GENOMICS_CLOUD).toBeDefined();
    });

    it.each(Object.entries(EXPORTS))(
      "%s has all required keys",
      (_, config) => {
        for (const key of REQUIRED_EXPORT_KEYS) {
          expect(config).toHaveProperty(key);
          expect(config[key]).toBeTruthy();
        }
      }
    );

    it.each(Object.entries(EXPORTS))(
      "%s has all non-empty string values",
      (_, config) => {
        for (const [, value] of Object.entries(config)) {
          expect(typeof value).toBe("string");
          expect(value.trim().length).toBeGreaterThan(0);
        }
      }
    );
  });

  describe("BioData Catalyst export config", () => {
    it("has correct buttonLabel", () => {
      expect(EXPORTS.BIO_DATA_CATALYST.buttonLabel).toBe(
        "Open BioData Catalyst"
      );
    });

    it("has correct title", () => {
      expect(EXPORTS.BIO_DATA_CATALYST.title).toBe(
        "Analyze in BioData Catalyst"
      );
    });

    it("has correct successTitle", () => {
      expect(EXPORTS.BIO_DATA_CATALYST.successTitle).toBe(
        "Your BioData Catalyst Workspace Link is Ready"
      );
    });

    it("description mentions BDC-SB", () => {
      expect(EXPORTS.BIO_DATA_CATALYST.description).toContain("BDC-SB");
    });
  });

  describe("CAVATICA export config", () => {
    it("has correct buttonLabel", () => {
      expect(EXPORTS.CAVATICA.buttonLabel).toBe("Open CAVATICA");
    });

    it("has correct title", () => {
      expect(EXPORTS.CAVATICA.title).toBe("Analyze in CAVATICA");
    });

    it("has correct successTitle", () => {
      expect(EXPORTS.CAVATICA.successTitle).toBe(
        "Your CAVATICA Workspace Link is Ready"
      );
    });

    it("description mentions CAVATICA", () => {
      expect(EXPORTS.CAVATICA.description).toContain("CAVATICA");
    });
  });

  describe("Cancer Genomics Cloud export config", () => {
    it("has correct buttonLabel", () => {
      expect(EXPORTS.CANCER_GENOMICS_CLOUD.buttonLabel).toBe(
        "Open Cancer Genomics Cloud"
      );
    });

    it("has correct title", () => {
      expect(EXPORTS.CANCER_GENOMICS_CLOUD.title).toBe(
        "Analyze in Cancer Genomics Cloud"
      );
    });

    it("has correct successTitle", () => {
      expect(EXPORTS.CANCER_GENOMICS_CLOUD.successTitle).toBe(
        "Your Cancer Genomics Cloud Workspace Link is Ready"
      );
    });

    it("description mentions CGC", () => {
      expect(EXPORTS.CANCER_GENOMICS_CLOUD.description).toContain("CGC");
    });
  });
});

describe("EXPORT_METHODS constants", () => {
  const REQUIRED_METHOD_KEYS = [
    "buttonLabel",
    "description",
    "route",
    "title",
  ] as const;

  describe("structure validation", () => {
    it("has all three platform methods defined", () => {
      expect(EXPORT_METHODS.BIO_DATA_CATALYST).toBeDefined();
      expect(EXPORT_METHODS.CAVATICA).toBeDefined();
      expect(EXPORT_METHODS.CANCER_GENOMICS_CLOUD).toBeDefined();
    });

    it.each(Object.entries(EXPORT_METHODS))(
      "%s has all required keys",
      (_, config) => {
        for (const key of REQUIRED_METHOD_KEYS) {
          expect(config).toHaveProperty(key);
          expect(config[key]).toBeTruthy();
        }
      }
    );
  });

  describe("route references", () => {
    it("BIO_DATA_CATALYST method references correct route", () => {
      expect(EXPORT_METHODS.BIO_DATA_CATALYST.route).toBe(
        ROUTES.BIO_DATA_CATALYST
      );
    });

    it("CAVATICA method references correct route", () => {
      expect(EXPORT_METHODS.CAVATICA.route).toBe(ROUTES.CAVATICA);
    });

    it("CANCER_GENOMICS_CLOUD method references correct route", () => {
      expect(EXPORT_METHODS.CANCER_GENOMICS_CLOUD.route).toBe(
        ROUTES.CANCER_GENOMICS_CLOUD
      );
    });
  });

  describe("description consistency", () => {
    it("BIO_DATA_CATALYST method description matches EXPORTS description", () => {
      expect(EXPORT_METHODS.BIO_DATA_CATALYST.description).toBe(
        EXPORTS.BIO_DATA_CATALYST.description
      );
    });

    it("CAVATICA method description matches EXPORTS description", () => {
      expect(EXPORT_METHODS.CAVATICA.description).toBe(
        EXPORTS.CAVATICA.description
      );
    });

    it("CANCER_GENOMICS_CLOUD method description matches EXPORTS description", () => {
      expect(EXPORT_METHODS.CANCER_GENOMICS_CLOUD.description).toBe(
        EXPORTS.CANCER_GENOMICS_CLOUD.description
      );
    });
  });

  describe("BioData Catalyst method config", () => {
    it("has correct buttonLabel", () => {
      expect(EXPORT_METHODS.BIO_DATA_CATALYST.buttonLabel).toBe(
        "Analyze in NHLBI BioData Catalyst"
      );
    });

    it("has correct title mentioning Seven Bridges", () => {
      expect(EXPORT_METHODS.BIO_DATA_CATALYST.title).toContain("Seven Bridges");
      expect(EXPORT_METHODS.BIO_DATA_CATALYST.title).toContain("BDC-SB");
    });
  });

  describe("CAVATICA method config", () => {
    it("has correct buttonLabel", () => {
      expect(EXPORT_METHODS.CAVATICA.buttonLabel).toBe("Analyze in CAVATICA");
    });

    it("has correct title", () => {
      expect(EXPORT_METHODS.CAVATICA.title).toBe("Export to CAVATICA");
    });
  });

  describe("Cancer Genomics Cloud method config", () => {
    it("has correct buttonLabel", () => {
      expect(EXPORT_METHODS.CANCER_GENOMICS_CLOUD.buttonLabel).toBe(
        "Analyze in Cancer Genomics Cloud"
      );
    });

    it("has correct title mentioning CGC", () => {
      expect(EXPORT_METHODS.CANCER_GENOMICS_CLOUD.title).toContain("CGC");
    });
  });
});

describe("Cross-validation between EXPORTS and EXPORT_METHODS", () => {
  it("both have the same platforms defined", () => {
    const exportPlatforms = Object.keys(EXPORTS).sort();
    const methodPlatforms = Object.keys(EXPORT_METHODS).sort();
    expect(exportPlatforms).toEqual(methodPlatforms);
  });

  it("all method routes are valid paths", () => {
    const routeValues = Object.values(ROUTES);
    Object.values(EXPORT_METHODS).forEach((method) => {
      expect(routeValues).toContain(method.route);
    });
  });
});
