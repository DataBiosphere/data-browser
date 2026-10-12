import type { AggregatedDataset } from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { FileEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { FilesResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import { buildFileIdentity } from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { getChipLabels } from "./utils/identityCell";

const DATASET_TITLE = "Test Dataset Title";
const FILE_NAME = "test-file.cram";

/**
 * Creates a mock FilesResponse for testing.
 * @param fileOverrides - File entity properties to override in the mock.
 * @param datasets - Aggregated datasets in the mock.
 * @returns Mock FilesResponse.
 */
const createMockFilesResponse = (
  fileOverrides: Partial<FileEntity> = {},
  datasets: AggregatedDataset[] = [
    { dataset_id: ["test-dataset-id"], title: [DATASET_TITLE] },
  ]
): FilesResponse =>
  ({
    datasets,
    entryId: "test-entry-id",
    files: [
      {
        data_modality: ["Genomic"],
        file_format: ".cram",
        file_name: FILE_NAME,
        file_size: 2048,
        ...fileOverrides,
      },
    ],
  }) as FilesResponse;

describe("buildFileIdentity", () => {
  it("renders the file name as a plain text title", () => {
    const { title } = buildFileIdentity(createMockFilesResponse());
    expect(title).toEqual({ label: FILE_NAME, url: "" });
  });

  it("renders format, size, then data modality chips", () => {
    const response = createMockFilesResponse({
      data_modality: ["Genomic", "Transcriptomic"],
    });
    expect(getChipLabels(buildFileIdentity(response).chips)).toEqual([
      "format .cram",
      "size 2 kB",
      "data modality Genomic",
      "data modality Transcriptomic",
    ]);
  });

  it("renders one data modality chip per unique data modality", () => {
    const response = createMockFilesResponse({
      data_modality: ["Genomic", "Genomic"],
    });
    expect(getChipLabels(buildFileIdentity(response).chips)).toEqual([
      "format .cram",
      "size 2 kB",
      "data modality Genomic",
    ]);
  });

  it("renders a zero size as 0 B", () => {
    const response = createMockFilesResponse({ file_size: 0 });
    expect(getChipLabels(buildFileIdentity(response).chips)).toEqual([
      "format .cram",
      "size 0 B",
      "data modality Genomic",
    ]);
  });

  it("omits the size chip when the size is missing", () => {
    const response = createMockFilesResponse({
      file_size: null as unknown as number,
    });
    expect(getChipLabels(buildFileIdentity(response).chips)).toEqual([
      "format .cram",
      "data modality Genomic",
    ]);
  });

  it.each([
    ["null", null as unknown as string],
    ["unspecified", "Unspecified"],
  ])("omits the format chip when the format is %s", (_, value) => {
    const response = createMockFilesResponse({ file_format: value });
    expect(getChipLabels(buildFileIdentity(response).chips)).toEqual([
      "size 2 kB",
      "data modality Genomic",
    ]);
  });

  it.each([
    ["empty", []],
    ["null", [null as unknown as string]],
    ["unspecified", ["Unspecified"]],
  ])("omits data modality chips when the data modality is %s", (_, value) => {
    const response = createMockFilesResponse({ data_modality: value });
    expect(getChipLabels(buildFileIdentity(response).chips)).toEqual([
      "format .cram",
      "size 2 kB",
    ]);
  });

  it("renders the dataset title as a plain text subtitle", () => {
    const { subtitle } = buildFileIdentity(createMockFilesResponse());
    expect(subtitle).toEqual({ label: DATASET_TITLE, url: "" });
  });

  it("renders the dataset count as the subtitle when there is more than one dataset", () => {
    const response = createMockFilesResponse({}, [
      { dataset_id: ["dataset-a"], title: ["Dataset A"] },
      { dataset_id: ["dataset-b"], title: ["Dataset B"] },
    ]);
    expect(buildFileIdentity(response).subtitle).toEqual({
      label: "2 datasets",
      url: "",
    });
  });

  it("omits the subtitle when there are no datasets", () => {
    const response = createMockFilesResponse({}, []);
    expect(buildFileIdentity(response).subtitle).toBeUndefined();
  });
});
