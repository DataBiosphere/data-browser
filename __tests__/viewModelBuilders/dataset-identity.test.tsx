import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";
import type { DatasetEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { DatasetsResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import {
  buildConsentGroup,
  buildDatasetAccess,
  buildDatasetIdentity,
  buildRegisteredIdentifiers,
} from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

const DATASET_ID = "test-dataset-id";
const DATASET_TITLE = "Test Dataset Title";

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

describe("buildDatasetIdentity", () => {
  it("links the title to the dataset page", () => {
    const { title } = buildDatasetIdentity(createMockDatasetsResponse());
    expect(title).toEqual({
      label: DATASET_TITLE,
      url: `/datasets/${DATASET_ID}`,
    });
  });

  it("renders no chips", () => {
    expect(
      buildDatasetIdentity(createMockDatasetsResponse()).chips
    ).toBeUndefined();
  });
});

describe("buildDatasetAccess", () => {
  it.each([
    [true, CHIP_PROPS.COLOR.SUCCESS, "Granted"],
    [false, CHIP_PROPS.COLOR.WARNING, "Required"],
  ])(
    "renders the access badge when accessible is %s",
    (accessible, color, label) => {
      const response = createMockDatasetsResponse({ accessible });
      expect(buildDatasetAccess(response)).toEqual({ color, label });
    }
  );
});

describe("buildRegisteredIdentifiers", () => {
  it("renders each unique registered identifier", () => {
    const response = createMockDatasetsResponse({
      registered_identifier: ["phs000693", "phs001272", "phs000693"],
    });
    expect(buildRegisteredIdentifiers(response)).toEqual({
      label: "dbGap ids",
      values: ["phs000693", "phs001272"],
    });
  });
});

describe("buildConsentGroup", () => {
  it("renders each consent group", () => {
    const response = createMockDatasetsResponse({
      consent_group: ["DS-BDIS-MDS", "GRU"],
    });
    expect(buildConsentGroup(response)).toEqual({
      label: "consent codes",
      values: ["DS-BDIS-MDS", "GRU"],
    });
  });
});
