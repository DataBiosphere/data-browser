import type {
  AggregatedDonorOrganismResponse,
  DonorOrganismAge,
} from "../../app/apis/azul/hca-dcp/common/aggregatedEntities";
import type { EntityResponse } from "../../app/apis/azul/hca-dcp/common/responses";
import { buildAggregatedDonorOrganismAge } from "../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

// Factories return a new object per call, as each donor organism entry is a separate object in the API response.
const age30Years = (): DonorOrganismAge => ({ unit: "year", value: "30" });
const age45Years = (): DonorOrganismAge => ({ unit: "year", value: "45" });

/**
 * Creates a mock EntityResponse with one donor organism entry per given list of organism ages.
 * @param organismAges - Organism ages for each donor organism entry.
 * @returns Mock EntityResponse.
 */
const createMockEntityResponse = (
  organismAges: AggregatedDonorOrganismResponse["organismAge"][]
): EntityResponse =>
  ({
    donorOrganisms: organismAges.map((organismAge) => ({ organismAge })),
  }) as unknown as EntityResponse;

describe("buildAggregatedDonorOrganismAge", () => {
  it("lists an age repeated across donor organism entries once", () => {
    const { values } = buildAggregatedDonorOrganismAge(
      createMockEntityResponse([[age30Years()], [age30Years()]])
    );
    expect(values).toEqual(["30 y"]);
  });

  it("keeps first-seen order when removing repeated ages", () => {
    const { values } = buildAggregatedDonorOrganismAge(
      createMockEntityResponse([
        [age30Years(), age45Years()],
        [age45Years(), age30Years()],
      ])
    );
    expect(values).toEqual(["30 y", "45 y"]);
  });

  it("keeps ages with units sharing a first letter distinct", () => {
    const { values } = buildAggregatedDonorOrganismAge(
      createMockEntityResponse([
        [{ unit: "month", value: "6" }],
        [{ unit: "minute", value: "6" }],
      ])
    );
    expect(values).toEqual(["6 m", "6 min"]);
  });

  it("removes null ages", () => {
    const { values } = buildAggregatedDonorOrganismAge(
      createMockEntityResponse([[null, age30Years()], [null]])
    );
    expect(values).toEqual(["30 y"]);
  });

  it("returns Unspecified when there are no ages", () => {
    const { values } = buildAggregatedDonorOrganismAge(
      createMockEntityResponse([[null], null])
    );
    expect(values).toEqual(["Unspecified"]);
  });
});
