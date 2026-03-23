import { buildFileDownload } from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { FilesResponse } from "../../app/apis/azul/anvil-cmg/common/responses";

/**
 * Creates a mock FilesResponse with configurable file and dataset values.
 * @param overrides - Partial overrides for the files array.
 * @param datasetOverrides - Partial overrides for the datasets array.
 * @returns Mock FilesResponse.
 */
const createMockFilesResponse = (
  overrides: Partial<FilesResponse["files"][0]> = {},
  datasetOverrides: Partial<FilesResponse["datasets"][0]> = {}
): FilesResponse => ({
  activities: [
    {
      activity_type: ["Sequencing"],
      data_modality: ["Genomic"],
    },
  ],
  biosamples: [
    {
      anatomical_site: ["Blood"],
      biosample_type: ["Normal"],
    },
  ],
  datasets: [
    {
      dataset_id: ["dataset-123"],
      title: ["Test Dataset"],
      ...datasetOverrides,
    },
  ],
  donors: [
    {
      organism_type: ["Homo sapiens"],
      phenotypic_sex: ["Female"],
      reported_ethnicity: ["Not reported"],
    },
  ],
  entryId: "entry-123",
  files: [
    {
      accessible: true,
      azul_mirror_uri: null,
      azul_url: "https://service.azul.data/repository/files/file-123",
      data_modality: ["Genomic"],
      date_created: "2024-01-01",
      document_id: "doc-123",
      drs_uri: "drs://data.azul/file-123",
      file_format: "bam",
      file_id: "file-123",
      file_name: "sample.bam",
      file_size: 1024,
      file_type: "Analysis",
      ...overrides,
    },
  ],
  libraries: [
    {
      prep_material_name: ["RNA"],
    },
  ],
});

describe("buildFileDownload", () => {
  describe("url prop based on azul_mirror_uri", () => {
    it("returns undefined url when azul_mirror_uri is null", () => {
      const response = createMockFilesResponse({
        azul_mirror_uri: null,
        azul_url: "https://service.azul.data/repository/files/file-123",
      });

      const result = buildFileDownload(response);

      expect(result.url).toBeUndefined();
    });

    it("returns undefined url when azul_mirror_uri is empty string", () => {
      const response = createMockFilesResponse({
        azul_mirror_uri: "",
        azul_url: "https://service.azul.data/repository/files/file-123",
      });

      const result = buildFileDownload(response);

      expect(result.url).toBeUndefined();
    });

    it("returns azul_url when azul_mirror_uri has a value", () => {
      const azulUrl = "https://service.azul.data/repository/files/file-123";
      const response = createMockFilesResponse({
        azul_mirror_uri: "s3://bucket/path/to/file.bam",
        azul_url: azulUrl,
      });

      const result = buildFileDownload(response);

      expect(result.url).toBe(azulUrl);
    });

    it("returns azul_url value exactly as provided when mirror uri exists", () => {
      const azulUrl =
        "https://service.azul.data/repository/files/different-file-456";
      const response = createMockFilesResponse({
        azul_mirror_uri: "s3://other-bucket/other-path.bam",
        azul_url: azulUrl,
      });

      const result = buildFileDownload(response);

      expect(result.url).toBe(azulUrl);
    });
  });

  describe("other props", () => {
    it("returns correct entityName from file_name", () => {
      const response = createMockFilesResponse({
        file_name: "my-sample-file.bam",
      });

      const result = buildFileDownload(response);

      expect(result.entityName).toBe("my-sample-file.bam");
    });

    it("returns correct relatedEntityId from dataset_id", () => {
      const response = createMockFilesResponse(
        {},
        { dataset_id: ["my-dataset-id-123"] }
      );

      const result = buildFileDownload(response);

      expect(result.relatedEntityId).toBe("my-dataset-id-123");
    });

    it("returns correct relatedEntityName from dataset title", () => {
      const response = createMockFilesResponse(
        {},
        { title: ["My Research Dataset"] }
      );

      const result = buildFileDownload(response);

      expect(result.relatedEntityName).toBe("My Research Dataset");
    });
  });

  describe("integration scenarios", () => {
    it("returns all props correctly when download is enabled", () => {
      const response = createMockFilesResponse(
        {
          azul_mirror_uri: "s3://bucket/file.bam",
          azul_url: "https://azul.service/files/123",
          file_name: "research-data.bam",
        },
        {
          dataset_id: ["dataset-abc"],
          title: ["Genomics Research Project"],
        }
      );

      const result = buildFileDownload(response);

      expect(result).toEqual({
        entityName: "research-data.bam",
        relatedEntityId: "dataset-abc",
        relatedEntityName: "Genomics Research Project",
        url: "https://azul.service/files/123",
      });
    });

    it("returns all props correctly when download is disabled", () => {
      const response = createMockFilesResponse(
        {
          azul_mirror_uri: null,
          azul_url: "https://azul.service/files/123",
          file_name: "research-data.bam",
        },
        {
          dataset_id: ["dataset-abc"],
          title: ["Genomics Research Project"],
        }
      );

      const result = buildFileDownload(response);

      expect(result).toEqual({
        entityName: "research-data.bam",
        relatedEntityId: "dataset-abc",
        relatedEntityName: "Genomics Research Project",
        url: undefined,
      });
    });
  });
});
