import type { ProjectsResponse } from "../../app/apis/azul/hca-dcp/common/responses";
import {
  buildExportHero,
  buildExportMethodHeroCurlCommand,
  buildExportMethodHeroManifestDownload,
  buildExportMethodHeroTerra,
  buildMAHero,
  getProjectBreadcrumbs,
} from "../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

/**
 * Creates a mock ProjectsResponse with the given project title, for an accessible project.
 * @param projectTitle - Project title.
 * @returns Mock ProjectsResponse.
 */
const createMockProjectsResponse = (
  projectTitle: string | null
): ProjectsResponse =>
  ({
    dates: [{ aggregateLastModifiedDate: "2026-01-01T00:00:00.000000Z" }],
    projects: [{ accessible: true, projectTitle }],
  }) as unknown as ProjectsResponse;

describe("buildExportHero", () => {
  it("builds the breadcrumbs that follow the explore breadcrumb", () => {
    expect(buildExportHero()).toEqual({
      breadcrumbs: [{ path: "", text: "Export Selected Data" }],
      title: "Choose Export Method",
    });
  });
});

describe("export method heroes", () => {
  it.each([
    [buildExportMethodHeroCurlCommand, 'Download Selected Data Using "curl"'],
    [buildExportMethodHeroManifestDownload, "Request File Manifest"],
    [buildExportMethodHeroTerra, "Export to Terra"],
  ])(
    "%p builds the breadcrumbs that follow the explore breadcrumb",
    (builder, title) => {
      expect(builder()).toEqual({
        breadcrumbs: [
          { path: "/export", text: "Export Selected Data" },
          { path: "", text: title },
        ],
        title,
      });
    }
  );
});

describe("buildMAHero", () => {
  it("builds the breadcrumbs that follow the explore breadcrumb", () => {
    expect(
      buildMAHero(createMockProjectsResponse("Test Project")).breadcrumbs
    ).toEqual([{ path: "", text: "Test Project" }]);
  });
});

describe("getProjectBreadcrumbs", () => {
  it("returns the project title as the breadcrumb that follows the explore breadcrumb", () => {
    expect(
      getProjectBreadcrumbs(createMockProjectsResponse("Test Project"))
    ).toEqual([{ path: "", text: "Test Project" }]);
  });

  it("returns an Unspecified breadcrumb when the project has no title", () => {
    expect(getProjectBreadcrumbs(createMockProjectsResponse(null))).toEqual([
      { path: "", text: "Unspecified" },
    ]);
  });

  it("returns no breadcrumbs when the project title is empty", () => {
    expect(getProjectBreadcrumbs(createMockProjectsResponse(""))).toEqual([]);
  });
});
