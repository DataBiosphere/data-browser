import type { AggregatedDataset } from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { DonorEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { DonorsResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import {
  buildDonorIdentity,
  buildOrganismType,
  buildPhenotypicSex,
} from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

const DATASET_TITLE = "Test Dataset Title";
const DONOR_ID = "test-donor-id";

/**
 * Creates a mock DonorsResponse for testing.
 * @param donorOverrides - Donor entity properties to override in the mock.
 * @param datasets - Aggregated datasets in the mock.
 * @returns Mock DonorsResponse.
 */
const createMockDonorsResponse = (
  donorOverrides: Partial<Record<keyof DonorEntity, unknown>> = {},
  datasets: AggregatedDataset[] = [
    { dataset_id: ["test-dataset-id"], title: [DATASET_TITLE] },
  ]
): DonorsResponse =>
  ({
    datasets,
    donors: [
      {
        donor_id: DONOR_ID,
        organism_type: "Human",
        phenotypic_sex: "Female",
        reported_ethnicity: ["European"],
        ...donorOverrides,
      },
    ],
    entryId: "test-entry-id",
  }) as DonorsResponse;

describe("buildDonorIdentity", () => {
  it("renders the donor ID as a plain text title, clamped to two lines, with no chips or subtitle", () => {
    expect(buildDonorIdentity(createMockDonorsResponse())).toEqual({
      maxLines: 2,
      title: { label: DONOR_ID, url: "" },
    });
  });
});

describe("buildOrganismType", () => {
  it("renders the organism type", () => {
    expect(buildOrganismType(createMockDonorsResponse()).value).toBe("Human");
  });
});

describe("buildPhenotypicSex", () => {
  it("renders the phenotypic sex", () => {
    expect(buildPhenotypicSex(createMockDonorsResponse()).value).toBe("Female");
  });
});
