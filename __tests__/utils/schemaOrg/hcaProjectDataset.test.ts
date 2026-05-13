import type { ProjectsResponse } from "../../../app/apis/azul/hca-dcp/common/responses";
import { buildHcaProjectJsonLd } from "../../../app/utils/schemaOrg/hcaProjectDataset";
import { MAX_DESCRIPTION_LENGTH } from "../../../app/utils/schemaOrg/types";

const BROWSER_URL = "https://explore.data.humancellatlas.org";

/**
 * Builds a minimal valid HCA project response with optional overrides for
 * top-level (project) and aggregated (donor/sample/specimen/protocol) fields.
 * @param overrides - Partial overrides applied to the base response.
 * @returns A `ProjectsResponse` shape suitable for builder tests.
 */
function makeProjectsResponse(
  overrides: Partial<ProjectsResponse> = {}
): ProjectsResponse {
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
        projectDescription: "A study of cells.",
        projectId: "uuid-1",
        projectShortname: "Cell Study",
        projectTitle: "Cells of the body",
        publications: [],
        supplementaryLinks: [],
        tissueAtlas: [],
      },
    ],
    protocols: [],
    samples: [],
    specimens: [],
    status: 200,
    ...overrides,
  } as unknown as ProjectsResponse;
}

describe("buildHcaProjectJsonLd", () => {
  it("returns undefined when no project is present", () => {
    const response = makeProjectsResponse({ projects: [] });
    expect(buildHcaProjectJsonLd(response, BROWSER_URL)).toBeUndefined();
  });

  it("populates required Schema.org Dataset fields", () => {
    const result = buildHcaProjectJsonLd(makeProjectsResponse(), BROWSER_URL);
    expect(result).toBeDefined();
    expect(result!["@context"]).toBe("https://schema.org");
    expect(result!["@type"]).toBe("Dataset");
    expect(result!.name).toBe("Cells of the body");
    expect(result!.description).toBe("A study of cells.");
    expect(result!.url).toBe(`${BROWSER_URL}/projects/uuid-1`);
    expect(result!.identifier).toEqual(["uuid-1"]);
    expect(result!.isAccessibleForFree).toBe(true);
    expect(result!.includedInDataCatalog).toEqual({
      "@type": "DataCatalog",
      name: "Human Cell Atlas Data Coordination Platform",
      url: BROWSER_URL,
    });
  });

  it("falls back to projectShortname when projectTitle is empty", () => {
    const response = makeProjectsResponse();
    response.projects[0].projectTitle = "";
    const result = buildHcaProjectJsonLd(response, BROWSER_URL);
    expect(result!.name).toBe("Cell Study");
  });

  it("strips HTML tags from description", () => {
    const response = makeProjectsResponse();
    response.projects[0].projectDescription =
      "<p>Single-cell <strong>RNA-seq</strong> data.</p>";
    const result = buildHcaProjectJsonLd(response, BROWSER_URL);
    expect(result!.description).toBe("Single-cell RNA-seq data.");
  });

  it("truncates descriptions over 5000 characters and appends an ellipsis", () => {
    const longDescription = "a".repeat(MAX_DESCRIPTION_LENGTH + 200);
    const response = makeProjectsResponse();
    response.projects[0].projectDescription = longDescription;
    const result = buildHcaProjectJsonLd(response, BROWSER_URL);
    expect(result!.description).toHaveLength(MAX_DESCRIPTION_LENGTH);
    expect(result!.description.endsWith("…")).toBe(true);
  });

  it("includes accession ids in identifier and identifiers.org URLs in sameAs", () => {
    const response = makeProjectsResponse();
    response.projects[0].accessions = [
      { accession: "GSE12345", namespace: "geo_series" },
      { accession: "PRJNA9999", namespace: "insdc_project" },
      { accession: "X", namespace: "unknown_namespace" },
    ];
    const result = buildHcaProjectJsonLd(response, BROWSER_URL);
    expect(result!.identifier).toEqual([
      "uuid-1",
      "GSE12345",
      "PRJNA9999",
      "X",
    ]);
    expect(result!.sameAs).toEqual([
      "https://identifiers.org/geo:GSE12345",
      "https://identifiers.org/ena.embl:PRJNA9999",
    ]);
  });

  it("omits sameAs when no accessions map to a known namespace", () => {
    const result = buildHcaProjectJsonLd(makeProjectsResponse(), BROWSER_URL);
    expect(result!.sameAs).toBeUndefined();
  });

  it("builds creators from contributors with affiliation", () => {
    const response = makeProjectsResponse();
    response.projects[0].contributors = [
      {
        contactName: "Smith,Alice,B",
        email: null,
        institution: "Example University",
      },
      {
        contactName: "",
        email: null,
        institution: "Should be skipped (no name)",
      },
      {
        contactName: "Jones,Bob",
        email: null,
        institution: "",
      },
    ];
    const result = buildHcaProjectJsonLd(response, BROWSER_URL);
    expect(result!.creator).toEqual([
      {
        "@type": "Person",
        affiliation: { "@type": "Organization", name: "Example University" },
        name: "Alice B Smith",
      },
      { "@type": "Person", name: "Bob Jones" },
    ]);
  });

  it("builds citations from publications using DOI then publicationUrl as sameAs", () => {
    const response = makeProjectsResponse();
    response.projects[0].publications = [
      {
        doi: "10.1000/example",
        officialHcaPublication: true,
        publicationTitle: "Cell Paper",
        publicationUrl: "https://example.org/cell-paper",
      },
      {
        doi: null,
        officialHcaPublication: false,
        publicationTitle: "Other Paper",
        publicationUrl: "https://example.org/other",
      },
      {
        doi: null,
        officialHcaPublication: false,
        publicationTitle: "",
        publicationUrl: "https://example.org/no-title",
      },
    ];
    const result = buildHcaProjectJsonLd(response, BROWSER_URL);
    expect(result!.citation).toEqual([
      {
        "@type": "ScholarlyArticle",
        headline: "Cell Paper",
        name: "Cell Paper",
        sameAs: "https://doi.org/10.1000/example",
      },
      {
        "@type": "ScholarlyArticle",
        headline: "Other Paper",
        name: "Other Paper",
        sameAs: "https://example.org/other",
      },
    ]);
  });

  it("builds deduplicated keywords from donor, sample, specimen, and protocol fields", () => {
    const response = makeProjectsResponse({
      donorOrganisms: [
        {
          biologicalSex: null,
          developmentStage: [],
          disease: ["normal"],
          donorCount: 1,
          genusSpecies: ["Homo sapiens"],
          organismAge: null,
        },
      ],
      protocols: [
        {
          libraryConstructionApproach: ["10x v2", "10x v3"],
        },
      ],
      samples: [
        {
          disease: ["normal"],
          id: ["s1"],
          organ: ["brain"],
          organPart: ["cortex"],
          sampleEntityType: ["specimens"],
        },
      ],
      specimens: [
        {
          disease: ["normal"],
          id: ["s1"],
          organ: ["brain"],
          organPart: ["cortex"],
          preservationMethod: [],
          source: [],
        },
      ],
    } as unknown as Partial<ProjectsResponse>);
    const result = buildHcaProjectJsonLd(response, BROWSER_URL);
    expect(result!.keywords).toEqual([
      "Homo sapiens",
      "normal",
      "brain",
      "cortex",
      "specimens",
      "10x v2",
      "10x v3",
    ]);
  });

  it("omits keywords, creator, citation, sameAs when sources are empty", () => {
    const result = buildHcaProjectJsonLd(makeProjectsResponse(), BROWSER_URL);
    expect(result!.keywords).toBeUndefined();
    expect(result!.creator).toBeUndefined();
    expect(result!.citation).toBeUndefined();
    expect(result!.sameAs).toBeUndefined();
  });
});
