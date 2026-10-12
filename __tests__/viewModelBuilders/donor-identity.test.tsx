import type { AggregatedDataset } from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { DonorEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { DonorsResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import { buildDonorIdentity } from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";
import { getChipLabels } from "./utils/identityCell";

const DATASET_TITLE = "Test Dataset Title";
const DONOR_ID = "test-donor-id";
const UNSPECIFIED_CASES: [string, null | string][] = [
  ["null", null],
  ["unspecified", "Unspecified"],
];

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
  it("renders the donor ID as a plain text title", () => {
    const { title } = buildDonorIdentity(createMockDonorsResponse());
    expect(title).toEqual({ label: DONOR_ID, url: "" });
  });

  it("renders organism type, phenotypic sex, then reported ethnicity chips", () => {
    const response = createMockDonorsResponse({
      reported_ethnicity: ["European", "Hispanic or Latin American"],
    });
    expect(getChipLabels(buildDonorIdentity(response).chips)).toEqual([
      "organism type Human",
      "phenotypic sex Female",
      "reported ethnicity European",
      "reported ethnicity Hispanic or Latin American",
    ]);
  });

  it.each(UNSPECIFIED_CASES)(
    "omits the organism type chip when the organism type is %s",
    (_, value) => {
      const response = createMockDonorsResponse({ organism_type: value });
      expect(getChipLabels(buildDonorIdentity(response).chips)).toEqual([
        "phenotypic sex Female",
        "reported ethnicity European",
      ]);
    }
  );

  it.each(UNSPECIFIED_CASES)(
    "omits the phenotypic sex chip when the phenotypic sex is %s",
    (_, value) => {
      const response = createMockDonorsResponse({ phenotypic_sex: value });
      expect(getChipLabels(buildDonorIdentity(response).chips)).toEqual([
        "organism type Human",
        "reported ethnicity European",
      ]);
    }
  );

  it.each([
    ["empty", []],
    ["null", [null]],
    ["unspecified", ["Unspecified"]],
  ])(
    "omits reported ethnicity chips when the reported ethnicity is %s",
    (_, value) => {
      const response = createMockDonorsResponse({ reported_ethnicity: value });
      expect(getChipLabels(buildDonorIdentity(response).chips)).toEqual([
        "organism type Human",
        "phenotypic sex Female",
      ]);
    }
  );

  it("renders no chips when every donor field is unspecified", () => {
    const response = createMockDonorsResponse({
      organism_type: null,
      phenotypic_sex: null,
      reported_ethnicity: [],
    });
    expect(buildDonorIdentity(response).chips).toEqual([]);
  });

  it("renders the dataset title as a plain text subtitle", () => {
    const { subtitle } = buildDonorIdentity(createMockDonorsResponse());
    expect(subtitle).toEqual({ label: DATASET_TITLE, url: "" });
  });

  it("renders the dataset count as the subtitle when there is more than one dataset", () => {
    const response = createMockDonorsResponse({}, [
      { dataset_id: ["dataset-a"], title: ["Dataset A"] },
      { dataset_id: ["dataset-b"], title: ["Dataset B"] },
    ]);
    expect(buildDonorIdentity(response).subtitle).toEqual({
      label: "2 datasets",
      url: "",
    });
  });

  it("counts datasets by ID when two datasets share a title", () => {
    const response = createMockDonorsResponse({}, [
      { dataset_id: ["dataset-a"], title: [DATASET_TITLE] },
      { dataset_id: ["dataset-b"], title: [DATASET_TITLE] },
    ]);
    expect(buildDonorIdentity(response).subtitle).toEqual({
      label: "2 datasets",
      url: "",
    });
  });

  it("omits the subtitle when the donor has no datasets", () => {
    const response = createMockDonorsResponse({}, []);
    expect(buildDonorIdentity(response).subtitle).toBeUndefined();
  });

  it("omits the subtitle when the dataset title is unspecified", () => {
    const response = createMockDonorsResponse({}, [
      { dataset_id: ["test-dataset-id"], title: [null as unknown as string] },
    ]);
    expect(buildDonorIdentity(response).subtitle).toBeUndefined();
  });
});
