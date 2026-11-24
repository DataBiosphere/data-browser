import type { ProjectsResponse } from "../../app/apis/azul/hca-dcp/common/responses";
import { buildHero } from "../../app/viewModelBuilders/azul/lungmap/common/viewModelBuilders";

/**
 * Creates a mock ProjectsResponse with the given project title, for an accessible project.
 * @param projectTitle - Project title.
 * @returns Mock ProjectsResponse.
 */
const createMockProjectsResponse = (projectTitle: string): ProjectsResponse =>
  ({
    dates: [{ aggregateLastModifiedDate: "2026-01-01T00:00:00.000000Z" }],
    projects: [{ accessible: true, projectTitle }],
  }) as unknown as ProjectsResponse;

describe("buildHero", () => {
  it("builds the breadcrumbs that follow the explore breadcrumb", () => {
    expect(
      buildHero(createMockProjectsResponse("Test Project")).breadcrumbs
    ).toEqual([{ path: "", text: "Test Project" }]);
  });
});
