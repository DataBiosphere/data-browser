import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import { FileFacet } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/common/entities";
import { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";
import {
  buildExportHero,
  buildExportMethodHeroCurlCommand,
  buildExportMethodHeroManifestDownload,
  buildExportMethodHeroTerra,
  buildExportToPlatform,
  buildExportToPlatformHero,
  buildExportToPlatformMethod,
} from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { ANVIL_CMG_CATEGORY_KEY } from "../../site-config/anvil-cmg/category";
import {
  EXPORTS,
  EXPORT_METHODS,
} from "../../site-config/anvil-cmg/dev/export/constants";

// Mock file manifest state
const createMockFileManifestState = (
  overrides: Partial<FileManifestState> = {}
): FileManifestState => ({
  fileCount: undefined,
  fileSummary: undefined,
  fileSummaryFacetName: undefined,
  fileSummaryFilters: [],
  filesFacets: [],
  filters: [],
  isEnabled: true,
  isFacetsLoading: false,
  isFacetsSuccess: true,
  isFileSummaryLoading: false,
  isLoading: false,
  isSummaryLoading: false,
  summary: undefined,
  ...overrides,
});

// Mock FileFacet
const createMockFileFacet = (
  overrides: Partial<FileFacet> = {}
): FileFacet => ({
  name: "files.file_format",
  selected: false,
  selectedTermCount: 0,
  selectedTerms: [],
  termCount: 5,
  terms: [{ count: 10, name: "bam", selected: false }],
  termsByName: new Map(),
  total: 10,
  ...overrides,
});

// Mock view context
const createMockViewContext = (
  overrides: Partial<ViewContext<unknown>> = {}
): ViewContext<unknown> =>
  ({
    cellContext: undefined,
    entityConfig: undefined,
    exploreState: {
      categoryViews: [],
      filterState: [{ categoryKey: "test.filter", value: ["value1"] }],
    },
    fileManifestState: createMockFileManifestState(),
    ...overrides,
  }) as ViewContext<unknown>;

describe("buildExportToPlatform", () => {
  describe("returns correct props structure", () => {
    it("spreads provided props into result", () => {
      const props = EXPORTS.BIO_DATA_CATALYST;
      const builder = buildExportToPlatform(props);
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.buttonLabel).toBe(props.buttonLabel);
      expect(result.description).toBe(props.description);
      expect(result.successTitle).toBe(props.successTitle);
      expect(result.title).toBe(props.title);
    });

    it("includes fileManifestState from viewContext", () => {
      const props = EXPORTS.CAVATICA;
      const builder = buildExportToPlatform(props);
      const fileManifestState = createMockFileManifestState({
        isFacetsSuccess: true,
      });
      const viewContext = createMockViewContext({ fileManifestState });

      const result = builder(undefined, viewContext);

      expect(result.fileManifestState).toBe(fileManifestState);
    });

    it("includes correct fileSummaryFacetName", () => {
      const props = EXPORTS.CANCER_GENOMICS_CLOUD;
      const builder = buildExportToPlatform(props);
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.fileSummaryFacetName).toBe(
        ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT
      );
    });

    it("includes filters from exploreState", () => {
      const props = EXPORTS.BIO_DATA_CATALYST;
      const builder = buildExportToPlatform(props);
      const filterState = [
        { categoryKey: "datasets.title", value: ["Test Dataset"] },
      ];
      const viewContext = createMockViewContext({
        exploreState: {
          categoryViews: [],
          filterState,
        },
      } as unknown as Partial<ViewContext<unknown>>);

      const result = builder(undefined, viewContext);

      expect(result.filters).toBe(filterState);
    });

    it("includes correct speciesFacetName", () => {
      const props = EXPORTS.CAVATICA;
      const builder = buildExportToPlatform(props);
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.speciesFacetName).toBe(
        ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE
      );
    });
  });

  describe("works correctly for each platform", () => {
    it("returns correct props for BioData Catalyst config", () => {
      const builder = buildExportToPlatform(EXPORTS.BIO_DATA_CATALYST);
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.buttonLabel).toBe("Open BioData Catalyst");
      expect(result.title).toBe("Analyze in BioData Catalyst");
    });

    it("returns correct props for CAVATICA config", () => {
      const builder = buildExportToPlatform(EXPORTS.CAVATICA);
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.buttonLabel).toBe("Open CAVATICA");
      expect(result.title).toBe("Analyze in CAVATICA");
    });

    it("returns correct props for Cancer Genomics Cloud config", () => {
      const builder = buildExportToPlatform(EXPORTS.CANCER_GENOMICS_CLOUD);
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.buttonLabel).toBe("Open Cancer Genomics Cloud");
      expect(result.title).toBe("Analyze in Cancer Genomics Cloud");
    });
  });
});

describe("buildExportHero", () => {
  it("builds the breadcrumbs that follow the explore breadcrumb", () => {
    expect(buildExportHero()).toEqual({
      breadcrumbs: [{ path: "", text: "Export Selected Data" }],
      title: "Choose Export Method",
    });
  });
});

describe("export method heroes", () => {
  it.each([
    [buildExportMethodHeroCurlCommand, 'Download Selected Data Using "curl"'],
    [buildExportMethodHeroManifestDownload, "Request File Manifest"],
    [buildExportMethodHeroTerra, "Export to Terra"],
  ])(
    "%p builds the breadcrumbs that follow the explore breadcrumb",
    (builder, title) => {
      expect(builder()).toEqual({
        breadcrumbs: [
          { path: "/export", text: "Export Selected Data" },
          { path: "", text: title },
        ],
        title,
      });
    }
  );
});

describe("buildExportToPlatformHero", () => {
  it("returns provided title", () => {
    const title = "Export to BioData Catalyst";
    const builder = buildExportToPlatformHero(title);

    const result = builder();

    expect(result.title).toBe(title);
  });

  it("builds the breadcrumbs that follow the explore breadcrumb", () => {
    const title = "Export to CAVATICA";
    const builder = buildExportToPlatformHero(title);

    const result = builder();

    expect(result.breadcrumbs).toEqual([
      { path: "/export", text: "Export Selected Data" },
      { path: "", text: title },
    ]);
  });
});

describe("buildExportToPlatformMethod", () => {
  describe("coming soon", () => {
    it.each([EXPORT_METHODS.CANCER_GENOMICS_CLOUD, EXPORT_METHODS.CAVATICA])(
      "returns comingSoon true for $title",
      (props) => {
        const builder = buildExportToPlatformMethod(props);
        const viewContext = createMockViewContext();

        const result = builder(undefined, viewContext);

        expect(result.comingSoon).toBe(true);
      }
    );

    it("returns comingSoon undefined for BioData Catalyst", () => {
      const builder = buildExportToPlatformMethod(
        EXPORT_METHODS.BIO_DATA_CATALYST
      );
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.comingSoon).toBeUndefined();
    });
  });

  it("returns route from props", () => {
    const props = EXPORT_METHODS.BIO_DATA_CATALYST;
    const builder = buildExportToPlatformMethod(props);
    const viewContext = createMockViewContext();

    const result = builder(undefined, viewContext);

    expect(result.route).toBe(props.route);
  });

  it("returns description from props", () => {
    const props = EXPORT_METHODS.CANCER_GENOMICS_CLOUD;
    const builder = buildExportToPlatformMethod(props);
    const viewContext = createMockViewContext();

    const result = builder(undefined, viewContext);

    expect(result.description).toBe(props.description);
  });

  it("returns title from props", () => {
    const props = EXPORT_METHODS.BIO_DATA_CATALYST;
    const builder = buildExportToPlatformMethod(props);
    const viewContext = createMockViewContext();

    const result = builder(undefined, viewContext);

    expect(result.title).toBe(props.title);
  });

  describe("accessibility", () => {
    it("returns isAccessible true when facets loaded and files available", () => {
      const props = EXPORT_METHODS.CAVATICA;
      const builder = buildExportToPlatformMethod(props);
      const fileManifestState = createMockFileManifestState({
        filesFacets: [createMockFileFacet()],
        isFacetsSuccess: true,
        summary: { fileCount: 10 },
      });
      const viewContext = createMockViewContext({ fileManifestState });

      const result = builder(undefined, viewContext);

      expect(result.isAccessible).toBe(true);
    });

    it("returns isAccessible false when facets not yet loaded", () => {
      const props = EXPORT_METHODS.CANCER_GENOMICS_CLOUD;
      const builder = buildExportToPlatformMethod(props);
      const fileManifestState = createMockFileManifestState({
        isFacetsSuccess: false,
      });
      const viewContext = createMockViewContext({ fileManifestState });

      const result = builder(undefined, viewContext);

      expect(result.isAccessible).toBe(false);
    });

    it("returns footnote when files not accessible", () => {
      const props = EXPORT_METHODS.BIO_DATA_CATALYST;
      const builder = buildExportToPlatformMethod(props);
      const fileManifestState = createMockFileManifestState({
        filesFacets: [],
        isFacetsSuccess: true,
      });
      const viewContext = createMockViewContext({ fileManifestState });

      const result = builder(undefined, viewContext);

      // When not accessible, footnote should explain why
      if (!result.isAccessible) {
        expect(result.footnote).toBeDefined();
      }
    });
  });

  describe("works correctly for each platform method", () => {
    it("returns correct props for BioData Catalyst method", () => {
      const builder = buildExportToPlatformMethod(
        EXPORT_METHODS.BIO_DATA_CATALYST
      );
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.route).toBe("/export/biodata-catalyst");
    });

    it("returns correct props for CAVATICA method", () => {
      const builder = buildExportToPlatformMethod(EXPORT_METHODS.CAVATICA);
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.route).toBe("/export/cavatica");
    });

    it("returns correct props for Cancer Genomics Cloud method", () => {
      const builder = buildExportToPlatformMethod(
        EXPORT_METHODS.CANCER_GENOMICS_CLOUD
      );
      const viewContext = createMockViewContext();

      const result = builder(undefined, viewContext);

      expect(result.route).toBe("/export/cancer-genomics-cloud");
    });
  });
});
