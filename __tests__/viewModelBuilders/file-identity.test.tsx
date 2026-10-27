import { render } from "@testing-library/react";
import type { AggregatedDataset } from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { FileEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { FilesResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import {
  buildDatasetTitles,
  buildFileDataModality,
  buildFileFormat,
  buildFileIdentity,
  buildFileSize,
} from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

const DATASET_TITLE = "Test Dataset Title";
const FILE_NAME = "test-file.cram";
const FOLDER_PATH = "AnVIL_T2T/long_read/sv_jasmine";

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
        file_path: `${FOLDER_PATH}/${FILE_NAME}`,
        file_size: 2048,
        ...fileOverrides,
      },
    ],
  }) as FilesResponse;

describe("buildFileIdentity", () => {
  it("renders the file name as a plain text title", () => {
    const { title } = buildFileIdentity(createMockFilesResponse());
    expect(title).toEqual({
      TypographyProps: { sx: { wordBreak: "break-all" } },
      label: FILE_NAME,
      url: "",
    });
  });

  it("renders no chips", () => {
    expect(buildFileIdentity(createMockFilesResponse()).chips).toBeUndefined();
  });

  it("renders the folder path as a plain text subtitle that wraps between folders", () => {
    const { subtitle } = buildFileIdentity(createMockFilesResponse());
    expect(subtitle?.url).toBe("");
    const { container } = render(<>{subtitle?.label}</>);
    expect(container.textContent).toBe(FOLDER_PATH);
    expect(container.querySelectorAll("wbr")).toHaveLength(2);
  });

  it("omits the subtitle when the file is not in a folder", () => {
    const response = createMockFilesResponse({ file_path: FILE_NAME });
    expect(buildFileIdentity(response).subtitle).toBeUndefined();
  });
});

describe("buildFileFormat", () => {
  it("renders the file format", () => {
    expect(buildFileFormat(createMockFilesResponse()).value).toBe(".cram");
  });
});

describe("buildFileDataModality", () => {
  it("renders each unique data modality", () => {
    const response = createMockFilesResponse({
      data_modality: ["Genomic", "Transcriptomic", "Genomic"],
    });
    expect(buildFileDataModality(response).values).toEqual([
      "Genomic",
      "Transcriptomic",
    ]);
  });
});

describe("buildDatasetTitles", () => {
  it("renders the dataset titles", () => {
    const response = createMockFilesResponse({}, [
      { dataset_id: ["dataset-a"], title: ["Dataset A"] },
      { dataset_id: ["dataset-b"], title: ["Dataset B"] },
    ]);
    expect(buildDatasetTitles(response).values).toEqual([
      "Dataset A",
      "Dataset B",
    ]);
  });
});

describe("buildFileSize", () => {
  it("renders the file size", () => {
    expect(buildFileSize(createMockFilesResponse()).value).toBe("2 kB");
  });

  it("renders a zero size as 0 B", () => {
    const response = createMockFilesResponse({ file_size: 0 });
    expect(buildFileSize(response).value).toBe("0 B");
  });

  it("renders Unspecified when the size is missing", () => {
    const response = createMockFilesResponse({
      file_size: null as unknown as number,
    });
    expect(buildFileSize(response).value).toBe("Unspecified");
  });
});
