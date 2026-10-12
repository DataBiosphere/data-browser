import { render } from "@testing-library/react";
import type {
  AggregatedDataset,
  AggregatedDonor,
} from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { BioSampleEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { BioSamplesResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import { buildBioSampleIdentity } from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

const BIOSAMPLE_ID = "test-biosample-id";
const DATASET_TITLE = "Test Dataset Title";
const UNSPECIFIED_CASES: [string, null | string][] = [
  ["null", null],
  ["unspecified", "Unspecified"],
];

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

/**
 * Returns the rendered text of each chip label built for the given biosamples response.
 * @param response - Biosamples response.
 * @returns Chip label text, in chip order.
 */
const getChipLabels = (response: BioSamplesResponse): string[] =>
  (buildBioSampleIdentity(response).chips ?? []).map(
    ({ label }) => render(<>{label}</>).container.textContent ?? ""
  );

describe("buildBioSampleIdentity", () => {
  it("renders the biosample ID as a plain text title", () => {
    const { title } = buildBioSampleIdentity(createMockBioSamplesResponse());
    expect(title).toEqual({ label: BIOSAMPLE_ID, url: "" });
  });

  it("renders biosample type, anatomical site, then organism type chips", () => {
    const response = createMockBioSamplesResponse({}, [
      { organism_type: ["Human"] },
      { organism_type: ["Mouse"] },
    ]);
    expect(getChipLabels(response)).toEqual([
      "biosample type Tissue",
      "anatomical site Blood",
      "organism type Human",
      "organism type Mouse",
    ]);
  });

  it.each(UNSPECIFIED_CASES)(
    "omits the biosample type chip when the biosample type is %s",
    (_, value) => {
      const response = createMockBioSamplesResponse({ biosample_type: value });
      expect(getChipLabels(response)).toEqual([
        "anatomical site Blood",
        "organism type Human",
      ]);
    }
  );

  it.each(UNSPECIFIED_CASES)(
    "omits the anatomical site chip when the anatomical site is %s",
    (_, value) => {
      const response = createMockBioSamplesResponse({ anatomical_site: value });
      expect(getChipLabels(response)).toEqual([
        "biosample type Tissue",
        "organism type Human",
      ]);
    }
  );

  it.each([
    ["empty", []],
    ["null", [null]],
    ["unspecified", ["Unspecified"]],
  ])("omits organism type chips when the organism type is %s", (_, value) => {
    const response = createMockBioSamplesResponse({}, [
      { organism_type: value },
    ]);
    expect(getChipLabels(response)).toEqual([
      "biosample type Tissue",
      "anatomical site Blood",
    ]);
  });

  it("renders one organism type chip per unique organism type across donors", () => {
    const response = createMockBioSamplesResponse({}, [
      { organism_type: ["Human"] },
      { organism_type: ["Human"] },
    ]);
    expect(getChipLabels(response)).toEqual([
      "biosample type Tissue",
      "anatomical site Blood",
      "organism type Human",
    ]);
  });

  it("renders no chips when every biosample field is unspecified", () => {
    const response = createMockBioSamplesResponse(
      { anatomical_site: null, biosample_type: null },
      []
    );
    expect(buildBioSampleIdentity(response).chips).toEqual([]);
  });

  it("renders the dataset title as a plain text subtitle", () => {
    const { subtitle } = buildBioSampleIdentity(createMockBioSamplesResponse());
    expect(subtitle).toEqual({ label: DATASET_TITLE, url: "" });
  });

  it("renders the dataset count as the subtitle when there is more than one dataset", () => {
    const response = createMockBioSamplesResponse({}, undefined, [
      { dataset_id: ["dataset-a"], title: ["Dataset A"] },
      { dataset_id: ["dataset-b"], title: ["Dataset B"] },
    ]);
    expect(buildBioSampleIdentity(response).subtitle).toEqual({
      label: "2 datasets",
      url: "",
    });
  });

  it("omits the subtitle when there are no datasets", () => {
    const response = createMockBioSamplesResponse({}, undefined, []);
    expect(buildBioSampleIdentity(response).subtitle).toBeUndefined();
  });
});
