import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";
import { render } from "@testing-library/react";
import type { DatasetEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { DatasetsResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import { buildDatasetIdentity } from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

const DATASET_ID = "test-dataset-id";
const DATASET_TITLE = "Test Dataset Title";
const UNSPECIFIED_CASES: [string, (string | null)[]][] = [
  ["empty", []],
  ["null", [null]],
  ["unspecified", ["Unspecified"]],
];

/**
 * Creates a mock DatasetsResponse for testing.
 * @param overrides - Dataset entity properties to override in the mock.
 * @returns Mock DatasetsResponse.
 */
const createMockDatasetsResponse = (
  overrides: Partial<DatasetEntity> = {}
): DatasetsResponse =>
  ({
    datasets: [
      {
        accessible: true,
        consent_group: ["GRU"],
        dataset_id: DATASET_ID,
        duos_id: null,
        registered_identifier: ["phs000693"],
        title: DATASET_TITLE,
        ...overrides,
      },
    ],
    entryId: DATASET_ID,
  }) as DatasetsResponse;

/**
 * Returns the rendered text of each chip label built for the given datasets response.
 * @param response - Datasets response.
 * @returns Chip label text, in chip order.
 */
const getChipLabels = (response: DatasetsResponse): string[] =>
  (buildDatasetIdentity(response).chips ?? []).map(
    ({ label }) => render(<>{label}</>).container.textContent ?? ""
  );

describe("buildDatasetIdentity", () => {
  it("links the title to the dataset page", () => {
    const { title } = buildDatasetIdentity(createMockDatasetsResponse());
    expect(title).toEqual({
      label: DATASET_TITLE,
      url: `/datasets/${DATASET_ID}`,
    });
  });

  it("renders access, identifier, then consent group chips", () => {
    const response = createMockDatasetsResponse({
      consent_group: ["DS-BDIS-MDS", "GRU"],
    });
    expect(getChipLabels(response)).toEqual([
      "access Granted",
      "identifier phs000693",
      "consent group DS-BDIS-MDS",
      "consent group GRU",
    ]);
  });

  it("renders one identifier chip per unique registered identifier", () => {
    const response = createMockDatasetsResponse({
      registered_identifier: ["phs000693", "phs001272", "phs000693"],
    });
    expect(getChipLabels(response)).toEqual([
      "access Granted",
      "identifier phs000693",
      "identifier phs001272",
      "consent group GRU",
    ]);
  });

  it.each([
    [true, CHIP_PROPS.COLOR.SUCCESS, "access Granted"],
    [false, CHIP_PROPS.COLOR.WARNING, "access Required"],
  ])(
    "renders the access chip when accessible is %s",
    (accessible, color, label) => {
      const response = createMockDatasetsResponse({ accessible });
      const [accessChip] = buildDatasetIdentity(response).chips ?? [];
      expect(accessChip.color).toBe(color);
      expect(getChipLabels(response)[0]).toBe(label);
    }
  );

  it.each(UNSPECIFIED_CASES)(
    "omits the identifier chip when the identifier is %s",
    (_, value) => {
      const response = createMockDatasetsResponse({
        registered_identifier: value,
      });
      expect(getChipLabels(response)).toEqual([
        "access Granted",
        "consent group GRU",
      ]);
    }
  );

  it.each(UNSPECIFIED_CASES)(
    "omits consent group chips when the consent group is %s",
    (_, value) => {
      const response = createMockDatasetsResponse({ consent_group: value });
      expect(getChipLabels(response)).toEqual([
        "access Granted",
        "identifier phs000693",
      ]);
    }
  );
});
