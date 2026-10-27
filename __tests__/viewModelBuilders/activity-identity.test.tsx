import type { AggregatedDataset } from "../../app/apis/azul/anvil-cmg/common/aggregatedEntities";
import type { ActivityEntity } from "../../app/apis/azul/anvil-cmg/common/entities";
import type { ActivitiesResponse } from "../../app/apis/azul/anvil-cmg/common/responses";
import {
  buildActivityIdentity,
  buildActivityType,
} from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

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

describe("buildActivityIdentity", () => {
  it("renders the document ID as a plain text title, clamped to two lines, with no chips or subtitle", () => {
    expect(buildActivityIdentity(createMockActivitiesResponse())).toEqual({
      maxLines: 2,
      title: { label: DOCUMENT_ID, url: "" },
    });
  });
});

describe("buildActivityType", () => {
  it("renders the activity type", () => {
    expect(buildActivityType(createMockActivitiesResponse()).value).toBe(
      "Sequencing"
    );
  });
});
