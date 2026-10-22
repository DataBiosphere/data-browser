import type {
  AggregatedDataset,
  AggregatedDonor,
} from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { BioSampleEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { BioSamplesResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import {
  buildAnatomicalSite,
  buildBioSampleIdentity,
  buildBioSampleType,
} from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

const BIOSAMPLE_ID = "test-biosample-id";
const DATASET_TITLE = "Test Dataset Title";

/**
 * Creates a mock BioSamplesResponse for testing.
 * @param biosampleOverrides - Biosample entity properties to override in the mock.
 * @param donors - Aggregated donors in the mock.
 * @param datasets - Aggregated datasets in the mock.
 * @returns Mock BioSamplesResponse.
 */
const createMockBioSamplesResponse = (
  biosampleOverrides: Partial<BioSampleEntity> = {},
  donors: Partial<AggregatedDonor>[] = [{ organism_type: ["Human"] }],
  datasets: AggregatedDataset[] = [
    { dataset_id: ["test-dataset-id"], title: [DATASET_TITLE] },
  ]
): BioSamplesResponse =>
  ({
    biosamples: [
      {
        anatomical_site: "Blood",
        biosample_id: BIOSAMPLE_ID,
        biosample_type: "Tissue",
        ...biosampleOverrides,
      },
    ],
    datasets,
    donors,
    entryId: "test-entry-id",
  }) as BioSamplesResponse;

describe("buildBioSampleIdentity", () => {
  it("renders the biosample ID as a plain text title, clamped to two lines, with no chips or subtitle", () => {
    expect(buildBioSampleIdentity(createMockBioSamplesResponse())).toEqual({
      maxLines: 2,
      title: { label: BIOSAMPLE_ID, url: "" },
    });
  });
});

describe("buildAnatomicalSite", () => {
  it("renders the anatomical site", () => {
    expect(buildAnatomicalSite(createMockBioSamplesResponse()).value).toBe(
      "Blood"
    );
  });
});

describe("buildBioSampleType", () => {
  it("renders the biosample type", () => {
    expect(buildBioSampleType(createMockBioSamplesResponse()).value).toBe(
      "Tissue"
    );
  });
});
