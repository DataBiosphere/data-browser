import { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import { FileFacet } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/common/entities";
import { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";
import {
  buildDatasetExportToPlatform,
  buildDatasetExportToPlatformHero,
  buildDatasetExportToPlatformMethod,
} from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { DatasetsResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import { ANVIL_CMG_CATEGORY_KEY } from "../../site-config/anvil-cmg/category";
import {
  EXPORTS,
  EXPORT_METHODS,
} from "../../site-config/anvil-cmg/dev/export/constants";

/**
 * Creates a mock FileManifestState for testing.
 * @param overrides - Properties to override in the mock.
 * @returns Mock FileManifestState.
 */
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

/**
 * Creates a mock FileFacet for testing.
 * @param overrides - Properties to override in the mock.
 * @returns Mock FileFacet.
 */
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

/**
 * Creates a mock DatasetsResponse for testing.
 * @param overrides - Properties to override in the mock.
 * @returns Mock DatasetsResponse.
 */
const createMockDatasetsResponse = (
  overrides: Partial<DatasetsResponse> = {}
): DatasetsResponse =>
  ({
    datasets: [
      {
        accessible: true,
        dataset_id: "test-dataset-id",
        title: "Test Dataset Title",
      },
    ],
    donors: [{ organism_type: ["Homo sapiens"] }],
    entryId: "test-dataset-id",
    files: [{ file_format: ["bam", "fastq"] }],
    ...overrides,
  }) as DatasetsResponse;

/**
 * Creates a mock ViewContext for testing.
 * @param overrides - Properties to override in the mock.
 * @returns Mock ViewContext.
 */
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

describe("buildDatasetExportToPlatform", () => {
  describe("returns correct props structure", () => {
    it("spreads provided props into result", () => {
      const props = EXPORTS.BIO_DATA_CATALYST;
      const builder = buildDatasetExportToPlatform(props);
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.buttonLabel).toBe(props.buttonLabel);
      expect(result.description).toBe(props.description);
      expect(result.successTitle).toBe(props.successTitle);
      expect(result.title).toBe(props.title);
    });

    it("includes fileManifestState from viewContext", () => {
      const props = EXPORTS.CAVATICA;
      const builder = buildDatasetExportToPlatform(props);
      const fileManifestState = createMockFileManifestState({
        isFacetsSuccess: true,
      });
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext({ fileManifestState });

      const result = builder(response, viewContext);

      expect(result.fileManifestState).toBe(fileManifestState);
    });

    it("includes correct fileSummaryFacetName", () => {
      const props = EXPORTS.CANCER_GENOMICS_CLOUD;
      const builder = buildDatasetExportToPlatform(props);
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.fileSummaryFacetName).toBe(
        ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT
      );
    });

    it("includes correct speciesFacetName", () => {
      const props = EXPORTS.BIO_DATA_CATALYST;
      const builder = buildDatasetExportToPlatform(props);
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.speciesFacetName).toBe(
        ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE
      );
    });

    it("includes filters derived from response", () => {
      const props = EXPORTS.CAVATICA;
      const builder = buildDatasetExportToPlatform(props);
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.filters).toBeDefined();
      expect(Array.isArray(result.filters)).toBe(true);
    });
  });

  describe("works correctly for each platform", () => {
    it("returns correct props for BioData Catalyst config", () => {
      const builder = buildDatasetExportToPlatform(EXPORTS.BIO_DATA_CATALYST);
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.buttonLabel).toBe("Open BioData Catalyst");
      expect(result.title).toBe("Analyze in BioData Catalyst");
    });

    it("returns correct props for CAVATICA config", () => {
      const builder = buildDatasetExportToPlatform(EXPORTS.CAVATICA);
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.buttonLabel).toBe("Open CAVATICA");
      expect(result.title).toBe("Analyze in CAVATICA");
    });

    it("returns correct props for Cancer Genomics Cloud config", () => {
      const builder = buildDatasetExportToPlatform(
        EXPORTS.CANCER_GENOMICS_CLOUD
      );
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.buttonLabel).toBe("Open Cancer Genomics Cloud");
      expect(result.title).toBe("Analyze in Cancer Genomics Cloud");
    });
  });
});

describe("buildDatasetExportToPlatformHero", () => {
  it("returns provided title as dataset title", () => {
    const title = "Analyze in BioData Catalyst";
    const builder = buildDatasetExportToPlatformHero(title);
    const response = createMockDatasetsResponse();
    const viewContext = createMockViewContext();

    const result = builder(response, viewContext);

    expect(result.title).toBe("Test Dataset Title");
  });

  it("builds correct breadcrumb structure", () => {
    const title = "Analyze in CAVATICA";
    const builder = buildDatasetExportToPlatformHero(title);
    const response = createMockDatasetsResponse();
    const viewContext = createMockViewContext();

    const result = builder(response, viewContext);
    const breadcrumbs = result.breadcrumbs as Breadcrumb[];

    expect(result.breadcrumbs).toBeDefined();
    expect(Array.isArray(result.breadcrumbs)).toBe(true);
    expect(breadcrumbs.length).toBe(4);

    // First breadcrumb should link to datasets list
    expect(breadcrumbs[0].text).toBe("Datasets");
    expect(breadcrumbs[0].path).toBe("/datasets");

    // Second breadcrumb should link to the dataset
    expect(breadcrumbs[1].text).toBe("Test Dataset Title");
    expect(breadcrumbs[1].path).toBe("/datasets/test-dataset-id");

    // Third breadcrumb should link to export choice
    expect(breadcrumbs[2].text).toBe("Choose Export Method");
    expect(breadcrumbs[2].path).toBe("/datasets/test-dataset-id/export");

    // Fourth breadcrumb should be the current page title
    expect(breadcrumbs[3].text).toBe(title);
  });

  it("uses dataset ID from response for paths", () => {
    const title = "Export to Cancer Genomics Cloud";
    const builder = buildDatasetExportToPlatformHero(title);
    const response = createMockDatasetsResponse({
      datasets: [
        {
          accessible: true,
          dataset_id: "custom-dataset-123",
          title: "Custom Dataset",
        },
      ],
      entryId: "custom-dataset-123",
    } as Partial<DatasetsResponse>);
    const viewContext = createMockViewContext();

    const result = builder(response, viewContext);
    const breadcrumbs = result.breadcrumbs as Breadcrumb[];

    expect(breadcrumbs[1].path).toBe("/datasets/custom-dataset-123");
    expect(breadcrumbs[2].path).toBe("/datasets/custom-dataset-123/export");
  });
});

describe("buildDatasetExportToPlatformMethod", () => {
  it("returns route with dataset path prefix", () => {
    const props = EXPORT_METHODS.BIO_DATA_CATALYST;
    const builder = buildDatasetExportToPlatformMethod(props);
    const response = createMockDatasetsResponse();
    const viewContext = createMockViewContext();

    const result = builder(response, viewContext);

    expect(result.route).toBe(
      "/datasets/test-dataset-id/export/biodata-catalyst"
    );
  });

  it("returns buttonLabel from props", () => {
    const props = EXPORT_METHODS.CAVATICA;
    const builder = buildDatasetExportToPlatformMethod(props);
    const response = createMockDatasetsResponse();
    const viewContext = createMockViewContext();

    const result = builder(response, viewContext);

    expect(result.buttonLabel).toBe(props.buttonLabel);
  });

  it("returns description from props", () => {
    const props = EXPORT_METHODS.CANCER_GENOMICS_CLOUD;
    const builder = buildDatasetExportToPlatformMethod(props);
    const response = createMockDatasetsResponse();
    const viewContext = createMockViewContext();

    const result = builder(response, viewContext);

    expect(result.description).toBe(props.description);
  });

  it("returns title from props", () => {
    const props = EXPORT_METHODS.BIO_DATA_CATALYST;
    const builder = buildDatasetExportToPlatformMethod(props);
    const response = createMockDatasetsResponse();
    const viewContext = createMockViewContext();

    const result = builder(response, viewContext);

    expect(result.title).toBe(props.title);
  });

  describe("accessibility", () => {
    it("returns isAccessible true when facets loaded and files available", () => {
      const props = EXPORT_METHODS.CAVATICA;
      const builder = buildDatasetExportToPlatformMethod(props);
      const response = createMockDatasetsResponse();
      const fileManifestState = createMockFileManifestState({
        filesFacets: [createMockFileFacet()],
        isFacetsSuccess: true,
        summary: { fileCount: 10 },
      });
      const viewContext = createMockViewContext({ fileManifestState });

      const result = builder(response, viewContext);

      expect(result.isAccessible).toBe(true);
    });

    it("returns isAccessible false when facets not yet loaded", () => {
      const props = EXPORT_METHODS.CANCER_GENOMICS_CLOUD;
      const builder = buildDatasetExportToPlatformMethod(props);
      const response = createMockDatasetsResponse();
      const fileManifestState = createMockFileManifestState({
        isFacetsSuccess: false,
      });
      const viewContext = createMockViewContext({ fileManifestState });

      const result = builder(response, viewContext);

      expect(result.isAccessible).toBe(false);
    });
  });

  describe("works correctly for each platform method", () => {
    it("returns correct props for BioData Catalyst method", () => {
      const builder = buildDatasetExportToPlatformMethod(
        EXPORT_METHODS.BIO_DATA_CATALYST
      );
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.buttonLabel).toBe("Analyze in NHLBI BioData Catalyst");
      expect(result.route).toBe(
        "/datasets/test-dataset-id/export/biodata-catalyst"
      );
    });

    it("returns correct props for CAVATICA method", () => {
      const builder = buildDatasetExportToPlatformMethod(
        EXPORT_METHODS.CAVATICA
      );
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.buttonLabel).toBe("Analyze in CAVATICA");
      expect(result.route).toBe("/datasets/test-dataset-id/export/cavatica");
    });

    it("returns correct props for Cancer Genomics Cloud method", () => {
      const builder = buildDatasetExportToPlatformMethod(
        EXPORT_METHODS.CANCER_GENOMICS_CLOUD
      );
      const response = createMockDatasetsResponse();
      const viewContext = createMockViewContext();

      const result = builder(response, viewContext);

      expect(result.buttonLabel).toBe("Analyze in Cancer Genomics Cloud");
      expect(result.route).toBe(
        "/datasets/test-dataset-id/export/cancer-genomics-cloud"
      );
    });
  });
});
