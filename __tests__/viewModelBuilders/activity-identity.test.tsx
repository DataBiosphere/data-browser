import { render } from "@testing-library/react";
import type { AggregatedDataset } from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { ActivityEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { ActivitiesResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import { buildActivityIdentity } from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

const DATASET_TITLE = "Test Dataset Title";
const DOCUMENT_ID = "test-document-id";

/**
 * Creates a mock ActivitiesResponse for testing.
 * @param activityOverrides - Activity entity properties to override in the mock.
 * @param datasets - Aggregated datasets in the mock.
 * @returns Mock ActivitiesResponse.
 */
const createMockActivitiesResponse = (
  activityOverrides: Partial<ActivityEntity> = {},
  datasets: AggregatedDataset[] = [
    { dataset_id: ["test-dataset-id"], title: [DATASET_TITLE] },
  ]
): ActivitiesResponse =>
  ({
    activities: [
      {
        activity_type: "Sequencing",
        data_modality: [],
        document_id: DOCUMENT_ID,
        ...activityOverrides,
      },
    ],
    datasets,
    entryId: "test-entry-id",
  }) as ActivitiesResponse;

/**
 * Returns the rendered text of each chip label built for the given activities response.
 * @param response - Activities response.
 * @returns Chip label text, in chip order.
 */
const getChipLabels = (response: ActivitiesResponse): string[] =>
  (buildActivityIdentity(response).chips ?? []).map(
    ({ label }) => render(<>{label}</>).container.textContent ?? ""
  );

describe("buildActivityIdentity", () => {
  it("renders the document ID as a plain text title", () => {
    const { title } = buildActivityIdentity(createMockActivitiesResponse());
    expect(title).toEqual({ label: DOCUMENT_ID, url: "" });
  });

  it("renders an activity type chip", () => {
    expect(getChipLabels(createMockActivitiesResponse())).toEqual([
      "activity type Sequencing",
    ]);
  });

  it("renders an activity type chip for the Unknown activity type", () => {
    const response = createMockActivitiesResponse({ activity_type: "Unknown" });
    expect(getChipLabels(response)).toEqual(["activity type Unknown"]);
  });

  it.each([
    ["null", null as unknown as string],
    ["unspecified", "Unspecified"],
  ])("renders no chips when the activity type is %s", (_, value) => {
    const response = createMockActivitiesResponse({ activity_type: value });
    expect(buildActivityIdentity(response).chips).toEqual([]);
  });

  it("renders the dataset title as a plain text subtitle", () => {
    const { subtitle } = buildActivityIdentity(createMockActivitiesResponse());
    expect(subtitle).toEqual({ label: DATASET_TITLE, url: "" });
  });

  it("renders the dataset count as the subtitle when there is more than one dataset", () => {
    const response = createMockActivitiesResponse({}, [
      { dataset_id: ["dataset-a"], title: ["Dataset A"] },
      { dataset_id: ["dataset-b"], title: ["Dataset B"] },
    ]);
    expect(buildActivityIdentity(response).subtitle).toEqual({
      label: "2 datasets",
      url: "",
    });
  });

  it("omits the subtitle when there are no datasets", () => {
    const response = createMockActivitiesResponse({}, []);
    expect(buildActivityIdentity(response).subtitle).toBeUndefined();
  });
});
