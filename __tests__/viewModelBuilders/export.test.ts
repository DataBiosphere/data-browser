import { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import { FileFacet } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/common/entities";
import { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";
import { TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES } from "../../app/viewModelBuilders/azul/anvil-cmg/common/constants";
import {
  buildAlertTerraExportUnavailable,
  buildExportMethodTerra,
  buildExportToPlatform,
  buildExportToPlatformHero,
  buildExportToPlatformMethod,
  getSelectedTerraExportUnavailableDatasetTitles,
  renderCohortTerraExport,
  renderCohortTerraExportUnavailable,
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
      tabValue: "datasets",
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
          tabValue: "datasets",
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

describe("buildExportToPlatformHero", () => {
  it("returns provided title", () => {
    const title = "Export to BioData Catalyst";
    const builder = buildExportToPlatformHero(title);
    const viewContext = createMockViewContext();

    const result = builder(undefined, viewContext);

    expect(result.title).toBe(title);
  });

  it("builds correct breadcrumb structure", () => {
    const title = "Export to CAVATICA";
    const builder = buildExportToPlatformHero(title);
    const viewContext = createMockViewContext({
      exploreState: {
        categoryViews: [],
        filterState: [],
        tabValue: "files",
      },
    } as unknown as Partial<ViewContext<unknown>>);

    const result = builder(undefined, viewContext);
    const breadcrumbs = result.breadcrumbs as Breadcrumb[];

    expect(result.breadcrumbs).toBeDefined();
    expect(Array.isArray(result.breadcrumbs)).toBe(true);
    expect(breadcrumbs.length).toBe(3);

    // First breadcrumb should link to explore
    expect(breadcrumbs[0].text).toBe("Explore");
    expect(breadcrumbs[0].path).toContain("files");

    // Second breadcrumb should link to export
    expect(breadcrumbs[1].text).toBe("Export Selected Data");
    expect(breadcrumbs[1].path).toBe("/export");

    // Third breadcrumb should be the current page title
    expect(breadcrumbs[2].text).toBe(title);
  });

  it("uses tabValue from exploreState for explore breadcrumb path", () => {
    const title = "Export to Cancer Genomics Cloud";
    const builder = buildExportToPlatformHero(title);
    const viewContext = createMockViewContext({
      exploreState: {
        categoryViews: [],
        filterState: [],
        tabValue: "datasets",
      },
    } as unknown as Partial<ViewContext<unknown>>);

    const result = builder(undefined, viewContext);
    const breadcrumbs = result.breadcrumbs as Breadcrumb[];

    expect(breadcrumbs[0].path).toBe("/datasets");
  });
});

describe("buildExportToPlatformMethod", () => {
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

/**
 * Creates a mock ViewContext with the given dataset title filter selected.
 * @param datasetTitles - Selected dataset titles.
 * @returns Mock ViewContext.
 */
const createMockViewContextWithDatasetTitles = (
  datasetTitles: string[]
): ViewContext<unknown> => {
  const viewContext = createMockViewContext();
  viewContext.exploreState.filterState = [
    { categoryKey: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE, value: datasetTitles },
  ];
  return viewContext;
};

describe("getSelectedTerraExportUnavailableDatasetTitles", () => {
  it("returns selected datasets that cannot be exported to Terra", () => {
    const [unavailableTitle] = TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES;

    const result = getSelectedTerraExportUnavailableDatasetTitles([
      {
        categoryKey: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
        value: [unavailableTitle, "ANVIL_Other_Dataset"],
      },
    ]);

    expect(result).toEqual([unavailableTitle]);
  });

  it("returns an empty array when no dataset title filter is selected", () => {
    const result = getSelectedTerraExportUnavailableDatasetTitles([
      { categoryKey: "test.filter", value: ["value1"] },
    ]);

    expect(result).toEqual([]);
  });

  it("returns an empty array when only other datasets are selected", () => {
    const result = getSelectedTerraExportUnavailableDatasetTitles([
      {
        categoryKey: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
        value: ["ANVIL_Other_Dataset"],
      },
    ]);

    expect(result).toEqual([]);
  });
});

describe("buildExportMethodTerra", () => {
  it("ignores the selected datasets before the files facets have loaded", () => {
    const viewContext = createMockViewContextWithDatasetTitles([
      TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES[0],
    ]);
    viewContext.fileManifestState = createMockFileManifestState({
      isFacetsSuccess: false,
    });

    const result = buildExportMethodTerra(undefined, viewContext);

    expect(result.isAccessible).toBe(false);
    expect(result.footnote).toBeNull();
  });

  it("returns inaccessible with footnote naming the selected unavailable datasets", () => {
    const [unavailableTitle] = TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES;
    const viewContext = createMockViewContextWithDatasetTitles([
      unavailableTitle,
    ]);

    const result = buildExportMethodTerra(undefined, viewContext);

    expect(result.isAccessible).toBe(false);
    expect(result.footnote).toContain(unavailableTitle);
  });

  it("returns file manifest accessibility when no unavailable dataset is selected", () => {
    const fileManifestState = createMockFileManifestState({
      filesFacets: [createMockFileFacet()],
      isFacetsSuccess: true,
      summary: { fileCount: 10 },
    });
    const viewContext = createMockViewContext({ fileManifestState });

    const result = buildExportMethodTerra(undefined, viewContext);

    expect(result.isAccessible).toBe(true);
    expect(result.footnote).toBeNull();
  });
});

describe("renderCohortTerraExport and renderCohortTerraExportUnavailable", () => {
  it("renders neither the warning nor the Terra export before the file manifest is enabled", () => {
    const viewContext = createMockViewContextWithDatasetTitles([
      TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES[0],
    ]);
    viewContext.fileManifestState = createMockFileManifestState({
      isEnabled: false,
    });

    expect(renderCohortTerraExport(undefined, viewContext).isIn).toBe(false);
    expect(
      renderCohortTerraExportUnavailable(undefined, viewContext).isIn
    ).toBe(false);
  });

  it("renders the warning, not the Terra export, when an unavailable dataset is selected", () => {
    const viewContext = createMockViewContextWithDatasetTitles([
      TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES[0],
    ]);

    expect(renderCohortTerraExport(undefined, viewContext).isIn).toBe(false);
    expect(
      renderCohortTerraExportUnavailable(undefined, viewContext).isIn
    ).toBe(true);
  });

  it("renders the Terra export, not the warning, when no unavailable dataset is selected", () => {
    const viewContext = createMockViewContext();

    expect(renderCohortTerraExport(undefined, viewContext).isIn).toBe(true);
    expect(
      renderCohortTerraExportUnavailable(undefined, viewContext).isIn
    ).toBe(false);
  });
});

describe("buildAlertTerraExportUnavailable", () => {
  it("uses singular wording when one unavailable dataset is selected", () => {
    const [title] = TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES;
    const viewContext = createMockViewContextWithDatasetTitles([title]);

    const result = buildAlertTerraExportUnavailable(undefined, viewContext);

    expect(result.content).toBe(
      `Export to Terra is unavailable for ${title} because its metadata is too large for Terra to import. Remove this dataset from the selection to export to Terra.`
    );
  });

  it("uses plural wording when several unavailable datasets are selected", () => {
    const [firstTitle, secondTitle] = TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES;
    const viewContext = createMockViewContextWithDatasetTitles([
      firstTitle,
      secondTitle,
    ]);

    const result = buildAlertTerraExportUnavailable(undefined, viewContext);

    expect(result.content).toBe(
      `Export to Terra is unavailable for ${firstTitle}, ${secondTitle} because their metadata is too large for Terra to import. Remove these datasets from the selection to export to Terra.`
    );
  });
});
