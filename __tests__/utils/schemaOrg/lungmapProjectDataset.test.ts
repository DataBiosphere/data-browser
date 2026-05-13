import type { ProjectsResponse } from "../../../app/apis/azul/hca-dcp/common/responses";
import { buildLungmapProjectJsonLd } from "../../../app/utils/schemaOrg/lungmapProjectDataset";

const BROWSER_URL = "https://data-browser.lungmap.net";

/**
 * Builds a minimal valid project response for the LungMAP wrapper. The full
 * mapping is covered by `hcaProjectDataset.test.ts` (same shared core); this
 * file only verifies the LungMAP-specific catalog identity surfaces correctly.
 * @returns A `ProjectsResponse` shape sufficient for catalog-identity checks.
 */
function makeProjectsResponse(): ProjectsResponse {
  return {
    dates: [],
    donorOrganisms: [],
    entryId: "abc",
    fileTypeSummaries: [],
    projects: [
      {
        accessible: true,
        accessions: [],
        bionetworkName: [],
        contributedAnalyses: {},
        contributors: [],
        dataUseRestriction: null,
        duosId: null,
        estimatedCellCount: null,
        laboratory: [],
        matrices: {},
        projectDescription:
          "A study of lung development and disease across many donors.",
        projectId: "uuid-1",
        projectShortname: "Lung Study",
        projectTitle: "Lung development atlas",
      },
    ],
    protocols: [],
    samples: [],
    specimens: [],
    status: 200,
  } as unknown as ProjectsResponse;
}

describe("buildLungmapProjectJsonLd", () => {
  it("returns undefined when no project is present", () => {
    const response = { ...makeProjectsResponse(), projects: [] };
    expect(
      buildLungmapProjectJsonLd(response as ProjectsResponse, BROWSER_URL)
    ).toBeUndefined();
  });

  it("surfaces LungMAP as the catalog identity and uses the projects URL pattern", () => {
    const result = buildLungmapProjectJsonLd(
      makeProjectsResponse(),
      BROWSER_URL
    );
    expect(result).toBeDefined();
    expect(result!.includedInDataCatalog).toEqual({
      "@type": "DataCatalog",
      name: "LungMAP Data Explorer",
      url: BROWSER_URL,
    });
    expect(result!.url).toBe(`${BROWSER_URL}/projects/uuid-1`);
  });

  it("pads short descriptions with the LungMAP catalog suffix", () => {
    const response = makeProjectsResponse();
    response.projects[0].projectDescription = "Short.";
    const result = buildLungmapProjectJsonLd(response, BROWSER_URL);
    expect(result!.description).toBe(
      "Lung development atlas — Short. — LungMAP Data Explorer project."
    );
  });
});
